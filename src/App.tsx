import { useEffect, useState, useRef } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import { flushSync } from "react-dom"
import DotField from "./components/ui/DotField"
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler"
import { Dock, DockIcon } from "./components/ui/dock"
import TargetCursor from "./components/TargetCursor"
import PillNav from "./components/PillNav"
import HomePage from "./pages/Home"
import AboutPage from "./pages/About"
import ProjectsPage from "./pages/Projects"
import ContactPage from "./pages/Contact"
import { Github, Linkedin, FileText, Mail } from "lucide-react"
import Preloader from "./components/Preloader"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const pillNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
]

function useTheme() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"))
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return isDark
}

function AppContent() {
  const isDark = useTheme()
  const location = useLocation()

  // Theme-adaptive colors
  const cursorColor = isDark ? "#e7e3ebff" : "#2d2a30"
  const cursorColorOnTarget = isDark ? "#ece9f7ff" : "#2e2c31ff"

  const glassBackground = isDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(255, 255, 255, 0.55)"
  const glassBorder = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.08)"

  // PillNav theme-adaptive colors (black & white)
  const pillBaseColor = isDark ? "#ffffff" : "#000000"
  const pillPillColor = isDark ? "#000000" : "#ffffff"
  const pillHoveredTextColor = isDark ? "#000000" : "#ffffff"
  const pillTextColor = isDark ? "#ffffff" : "#000000"

  const [showLoader, setShowLoader] = useState(() => {
    return window.location.pathname === "/" && !sessionStorage.getItem("portfolio-visited");
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("portfolio-visited", "true");

    if (typeof document.startViewTransition === "function") {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setShowLoader(false);
        });
      });

      transition.ready.then(() => {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        const maxRadius = Math.hypot(x, y);

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 850,
            easing: "ease-in-out",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setShowLoader(false);
    }
  };

  if (showLoader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Custom Target Cursor – key forces remount on theme change to pick up new colors */}
      <TargetCursor
        key={isDark ? "dark" : "light"}
        targetSelector=".cursor-target"
        cursorColor={cursorColor}
        cursorColorOnTarget={cursorColorOnTarget}
        spinDuration={2.5}
        hideDefaultCursor={true}
      />

      {/* Background – DotField fills the entire viewport (hidden on /projects page) */}
      {location.pathname !== "/projects" && (
        <div className="fixed inset-0 z-0">
          <DotField
            dotRadius={2}
            dotSpacing={22}
            bulgeStrength={67}
            glowRadius={0}
            sparkle={false}
            waveAmplitude={0}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly
            gradientFrom={isDark ? "#5b595dff" : "#a8a3adcc"}
            gradientTo={isDark ? "#B497CF" : "#7c5a9b"}
            glowColor={isDark ? "#120F17" : "#f5f0fa"}
          />
        </div>
      )}

      {/* PillNav – fixed top center */}
      <div className="pillnav-container fixed top-1 left-1/2 z-50 -translate-x-1/2">
        <PillNav
          logo="/icons8-c-100.png"
          logoAlt="Portfolio"
          items={pillNavItems}
          activeHref={location.pathname}
          baseColor={pillBaseColor}
          pillColor={pillPillColor}
          hoveredPillTextColor={pillHoveredTextColor}
          pillTextColor={pillTextColor}
        />
      </div>

      {/* Theme Toggler – fixed top-right corner */}
      <div className="theme-toggle-wrapper fixed top-5 right-6 z-[1001]">
        <div
          className="flex items-center justify-center rounded-full p-2 shadow-lg transition-all duration-300"
          style={{
            background: glassBackground,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: glassBorder,
            backdropFilter: "blur(8px) saturate(140%)",
            WebkitBackdropFilter: "blur(8px) saturate(140%)",
          }}
        >
          <AnimatedThemeToggler
            className="cursor-target rounded-full p-1.5 text-foreground/80 transition-colors hover:text-foreground"
            variant="circle"
            duration={500}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Glossy Dock – fixed bottom center */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 dock-glass">
        <Dock
          direction="middle"
          className="shadow-2xl transition-colors duration-300"
          style={{
            background: glassBackground,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: glassBorder,
            backdropFilter: "blur(10px) saturate(140%)",
            WebkitBackdropFilter: "blur(10px) saturate(140%)",
          }}
        >
          <DockIcon className="cursor-target">
            <a href="https://github.com/Chethanreddyc" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" aria-label="GitHub">
              <Github className="size-5 text-foreground/80" />
            </a>
          </DockIcon>
          <DockIcon className="cursor-target">
            <a href="https://www.linkedin.com/in/chethan-reddy-chundu-65a783296" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" aria-label="LinkedIn">
              <Linkedin className="size-5 text-foreground/80" />
            </a>
          </DockIcon>
          <DockIcon className="cursor-target">
            <a href="https://x.com/Chethan_1303" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" aria-label="X (formerly Twitter)">
              <XLogo className="size-5 text-foreground/80" />
            </a>
          </DockIcon>
          <DockIcon className="cursor-target">
            <a href="mailto:chethanreddy0503@gmail.com" className="flex items-center justify-center" aria-label="Email">
              <Mail className="size-5 text-foreground/80" />
            </a>
          </DockIcon>
          <DockIcon className="cursor-target">
            <a
              href="/CHETHAN_RESUME (1).pdf"
              download="Chundu_Chethan_Reddy_Resume.pdf"
              className="flex items-center justify-center"
              aria-label="Resume"
            >
              <FileText className="size-5 text-foreground/80" />
            </a>
          </DockIcon>
        </Dock>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const lastPathname = useRef(pathname)

  if (lastPathname.current !== pathname) {
    window.scrollTo(0, 0)
    lastPathname.current = pathname
  }

  useEffect(() => {
    // Refresh ScrollTrigger to ensure all trigger positions are recalculated for the new layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}

export default App