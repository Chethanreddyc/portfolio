import { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  [key: string]: unknown;
}

const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius: _glowRadius = 160,
  sparkle: _sparkle = false,
  waveAmplitude: _waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor: _glowColor = '#120F17',
  ...rest
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const engagement = useRef(0);
  const propsRef = useRef<Record<string, unknown>>({});
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, gradientFrom, gradientTo };
  const rebuildRef = useRef<(() => void) | null>(null);

  // Cached gradient – only rebuilt on resize or color change
  const gradientRef = useRef<CanvasGradient | null>(null);
  const gradientKeyRef = useRef('');

  // Grid spatial index for fast cursor proximity checks
  const gridRef = useRef<{
    cellSize: number;
    cols: number;
    rows: number;
    cells: Int32Array;
    indices: Int32Array;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: ReturnType<typeof setTimeout>;

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function doResize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      // Invalidate gradient cache on resize
      gradientRef.current = null;

      buildDots(w, h);
    }

    function buildGrid(dots: Dot[], w: number, h: number) {
      const p = propsRef.current;
      const cellSize = (p.cursorRadius as number);
      const cols = Math.ceil(w / cellSize) || 1;
      const rows = Math.ceil(h / cellSize) || 1;
      const totalCells = cols * rows;

      // Count dots per cell
      const counts = new Int32Array(totalCells);
      for (let i = 0; i < dots.length; i++) {
        const col = Math.min(Math.floor(dots[i].ax / cellSize), cols - 1);
        const row = Math.min(Math.floor(dots[i].ay / cellSize), rows - 1);
        counts[row * cols + col]++;
      }

      // Build cell start offsets (flat array: [start, count] pairs)
      const cells = new Int32Array(totalCells * 2);
      let offset = 0;
      for (let c = 0; c < totalCells; c++) {
        cells[c * 2] = offset;
        cells[c * 2 + 1] = counts[c];
        offset += counts[c];
      }

      // Fill sorted index array
      const indices = new Int32Array(dots.length);
      const cursors = new Int32Array(totalCells);
      for (let i = 0; i < dots.length; i++) {
        const col = Math.min(Math.floor(dots[i].ax / cellSize), cols - 1);
        const row = Math.min(Math.floor(dots[i].ay / cellSize), rows - 1);
        const cellIdx = row * cols + col;
        indices[cells[cellIdx * 2] + cursors[cellIdx]] = i;
        cursors[cellIdx]++;
      }

      gridRef.current = { cellSize, cols, rows, cells, indices };
    }

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = (p.dotRadius as number) + (p.dotSpacing as number);
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
      buildGrid(dots, w, h);
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.offsetX;
      mouseRef.current.y = e.pageY - s.offsetY;
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    // Throttled to 50ms instead of 20ms — still smooth, 60% fewer calls
    const speedInterval = setInterval(updateMouseSpeed, 50);

    let frameCount = 0;
    let idleFrames = 0;

    function tick() {
      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      // Skip heavy drawing when idle and all dots have settled
      if (eng < 0.001) {
        idleFrames++;
        if (idleFrames > 10) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      } else {
        idleFrames = 0;
      }

      ctx!.clearRect(0, 0, w, h);

      // Cache gradient — rebuild only when size or colors change
      const gradKey = `${w}:${h}:${p.gradientFrom}:${p.gradientTo}`;
      if (gradientKeyRef.current !== gradKey || !gradientRef.current) {
        const grad = ctx!.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, p.gradientFrom as string);
        grad.addColorStop(1, p.gradientTo as string);
        gradientRef.current = grad;
        gradientKeyRef.current = gradKey;
      }
      ctx!.fillStyle = gradientRef.current;

      const cr = p.cursorRadius as number;
      const crSq = cr * cr;
      const rad = (p.dotRadius as number) / 2;
      const isBulge = p.bulgeOnly as boolean;

      // Use spatial grid to only check dots near cursor (3x3 cell neighborhood)
      const grid = gridRef.current;
      if (grid && eng > 0.01) {
        const mcol = Math.floor(m.x / grid.cellSize);
        const mrow = Math.floor(m.y / grid.cellSize);
        const minCol = Math.max(0, mcol - 1);
        const maxCol = Math.min(grid.cols - 1, mcol + 1);
        const minRow = Math.max(0, mrow - 1);
        const maxRow = Math.min(grid.rows - 1, mrow + 1);

        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            const cellIdx = r * grid.cols + c;
            const start = grid.cells[cellIdx * 2];
            const count = grid.cells[cellIdx * 2 + 1];
            for (let j = 0; j < count; j++) {
              const i = grid.indices[start + j];
              const d = dots[i];
              const dx = m.x - d.ax;
              const dy = m.y - d.ay;
              const distSq = dx * dx + dy * dy;

              if (distSq < crSq) {
                const dist = Math.sqrt(distSq);
                if (isBulge) {
                  const t = 1 - dist / cr;
                  const push = t * t * (p.bulgeStrength as number) * eng;
                  const angle = Math.atan2(dy, dx);
                  d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
                  d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
                } else {
                  const angle = Math.atan2(dy, dx);
                  const move = (500 / dist) * (m.speed * (p.cursorForce as number));
                  d.vx += Math.cos(angle) * -move;
                  d.vy += Math.sin(angle) * -move;
                }
              } else if (isBulge) {
                d.sx += (d.ax - d.sx) * 0.1;
                d.sy += (d.ay - d.sy) * 0.1;
              }

              if (!isBulge) {
                d.vx *= 0.9;
                d.vy *= 0.9;
                d.x = d.ax + d.vx;
                d.y = d.ay + d.vy;
                d.sx += (d.x - d.sx) * 0.1;
                d.sy += (d.y - d.sy) * 0.1;
              }
            }
          }
        }

        // Spring-back dots outside the cursor neighborhood
        if (isBulge) {
          for (let i = 0; i < len; i++) {
            const d = dots[i];
            const dx = m.x - d.ax;
            const dy = m.y - d.ay;
            const distSq = dx * dx + dy * dy;
            if (distSq >= crSq) {
              d.sx += (d.ax - d.sx) * 0.1;
              d.sy += (d.ay - d.sy) * 0.1;
            }
          }
        }
      } else if (isBulge) {
        // No engagement – spring all back
        for (let i = 0; i < len; i++) {
          const d = dots[i];
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }
      }

      // Batch draw all dots in a single path
      ctx!.beginPath();
      for (let i = 0; i < len; i++) {
        const d = dots[i];
        ctx!.moveTo(d.sx + rad, d.sy);
        ctx!.arc(d.sx, d.sy, rad, 0, TWO_PI);
      }
      ctx!.fill();

      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) buildDots(w, h);
    };

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="w-full h-full relative" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
