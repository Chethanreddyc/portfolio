import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { RainbowButton } from "@/components/ui/rainbow-button";

const STAGE_1_PROJECTS = [
  {
    title: "STAY – Rental Platform",
    description: "Built and deployed a full-stack MERN property rental platform supporting authentication, property listings, image uploads, and search functionality. Implemented JWT-based role authorization and developed RESTful backend APIs for listing and user management. Integrated Cloudinary for asynchronous image uploads and deployed services using Vercel and Render.",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "JWT", "Cloudinary"],
    github: "https://github.com/Chethanreddyc",
    live: "https://stay-two.vercel.app"
  },
  {
    title: "Code Analyzer",
    description: "Developed a browser extension for LeetCode and HackerRank that performs AI-assisted code review directly within coding platforms. Engineered DOM-based workflows to analyze submitted solutions for code quality, optimal approaches, and complexity analysis. Implemented dynamic AI provider configuration supporting Gemini, OpenAI, and Groq model integration.",
    tags: ["JavaScript", "Manifest V3", "Gemini API", "OpenAI API", "Groq API"],
    github: "https://github.com/Chethanreddyc/Code_Analyzer",
    live: "#"
  }
];

const STAGE_2_PROJECTS = [
  {
    title: "AI-Powered Cyber Tool",
    description: "Developed a desktop-based cybersecurity suite integrating AI-assisted threat analysis into a unified security utility. Built modules for password entropy analysis, phishing email detection, credential security assessment, and automated report generation. Integrated Google Gemini API to analyze suspicious emails for phishing indicators, sender spoofing, and malicious links.",
    tags: ["Python", "CustomTkinter", "Gemini API"],
    github: "https://github.com/Chethanreddyc/Cyber-Tool",
    live: "#"
  }
];

function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom smooth scroll velocity control (inertial damping)
  useEffect(() => {
    window.scrollTo(0, 0);
    let currentScroll = 0;
    let targetScroll = 0;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Decrease velocity: scale down the scroll distance per tick
      targetScroll += e.deltaY * 0.45;
      targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      const diff = targetScroll - currentScroll;
      // Damping factor: lower values = slower, smoother scrolling
      currentScroll += diff * 0.085;
      window.scrollTo(0, currentScroll);

      if (Math.abs(diff) > 0.5) {
        requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
      }
    };

    const handleScroll = () => {
      if (!isScrolling) {
        currentScroll = window.scrollY;
        targetScroll = window.scrollY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Track scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create smooth springs for the progress animations
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 90,
    mass: 0.2
  });

  // Map progress to drawing the path
  const pathLength = useTransform(smoothProgress, [0, 1], [0.5, 1]);

  // Stage 1 animation logic: visible from ~15% to 55% scroll progress
  const stage1Opacity = useTransform(smoothProgress, [0.1, 0.2, 0.45, 0.55], [0, 1, 1, 0]);
  const stage1Y = useTransform(smoothProgress, [0.1, 0.2, 0.45, 0.55], [60, 0, 0, -60]);
  const stage1PointerEvents = useTransform(smoothProgress, [0.15, 0.5], (val) => 
    val >= 0.15 && val <= 0.5 ? "auto" : "none"
  );

  // Stage 2 animation logic: visible from ~50% to 85% scroll progress
  const stage2Opacity = useTransform(smoothProgress, [0.45, 0.55, 0.78, 0.85], [0, 1, 1, 0]);
  const stage2Y = useTransform(smoothProgress, [0.45, 0.55, 0.78, 0.85], [60, 0, 0, -60]);
  const stage2PointerEvents = useTransform(smoothProgress, [0.5, 0.8], (val) => 
    val >= 0.5 && val <= 0.8 ? "auto" : "none"
  );

  // Header fade-out animation as we scroll
  const headerOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.15], [0, -30]);

  // CTA fade-in animation at the end
  const ctaOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.8, 0.9], [40, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-[300vh] bg-background text-foreground flex flex-col items-center bg-gradient-to-b from-transparent via-violet-500/[0.03] dark:via-violet-400/[0.02] to-transparent"
    >
      {/* Sticky horizontal progress bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500 origin-[0%] z-[1002]"
        style={{ scaleX: smoothProgress }}
      />

      {/* Vector Path that animates down the center of the page */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center opacity-40 dark:opacity-20">
        <svg
          viewBox="0 0 1278 2319"
          fill="none"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[1278px] h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" /> {/* Violet */}
              <stop offset="50%" stopColor="#ec4899" /> {/* Pink */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
            </linearGradient>
          </defs>
          <motion.path
            d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
            stroke="url(#line-gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              pathLength,
              strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
            }}
          />
        </svg>
      </div>

      {/* Header (Start of the page) */}
      <motion.div 
        style={{ opacity: headerOpacity, y: headerY }}
        className="sticky top-28 z-10 flex flex-col items-center text-center px-4 max-w-2xl mt-12"
      >
        <span 
          className="mb-4 inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60"
          style={{ border: "1px solid rgba(128,128,128,0.15)" }}
        >
          Portfolio Journey
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 gradient-text">
          Featured Projects
        </h1>
        <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
          Scroll down to animate the progress path and reveal the stages of my creations.
        </p>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex items-center justify-center rounded-full border border-foreground/15 p-2 bg-foreground/[0.02]"
        >
          <ArrowDown className="size-5 text-foreground/60" />
        </motion.div>
      </motion.div>

      {/* Stage 1 Container */}
      <motion.div
        style={{ 
          opacity: stage1Opacity, 
          y: stage1Y,
          pointerEvents: stage1PointerEvents 
        }}
        className="absolute top-[80vh] left-[5%] md:left-[8%] lg:left-[12%] w-[90%] md:w-[45%] lg:w-[38%] z-10 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Stage 01
            </span>
            <span className="text-xs text-foreground/50 font-medium">Web & Extensions</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Web Apps & Browser Extensions
          </h2>
          <p className="text-foreground/60 text-sm">
            Full-stack web applications and browser extensions developed to solve real-world problems and enhance productivity.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {STAGE_1_PROJECTS.map((project, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.04] shadow-md hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-foreground/10">
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <Github className="size-4" />
                      Source
                    </a>
                  )}
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="size-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stage 2 Container */}
      <motion.div
        style={{ 
          opacity: stage2Opacity, 
          y: stage2Y,
          pointerEvents: stage2PointerEvents 
        }}
        className="absolute top-[165vh] right-[5%] md:right-[8%] lg:right-[12%] w-[90%] md:w-[45%] lg:w-[38%] z-10 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-pink-500/10 text-pink-400 border border-pink-500/20">
              Stage 02
            </span>
            <span className="text-xs text-foreground/50 font-medium">Desktop & AI</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Desktop & Security Utilities
          </h2>
          <p className="text-foreground/60 text-sm">
            Desktop-based utilities and security suites utilizing local GUI libraries and AI integrations.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {STAGE_2_PROJECTS.map((project, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.04] shadow-md hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-foreground/10">
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <Github className="size-4" />
                      Source
                    </a>
                  )}
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="size-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section (End of the trail) */}
      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="absolute top-[245vh] left-[5%] right-[5%] flex flex-col items-center justify-center text-center pb-24 z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Journey Complete
        </h2>
        <p className="text-foreground/60 text-base max-w-md mb-8">
          You've traced the entire progress line. Ready to discuss a collaboration or custom project?
        </p>
        <div className="flex items-center gap-4">
          <RainbowButton asChild variant="outline" size="lg" className="rounded-full cursor-target">
            <Link to="/contact">
              Get in Touch
            </Link>
          </RainbowButton>
          <a
            href="https://github.com/Chethanreddyc"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target rounded-full px-6 py-2.5 text-sm font-semibold border border-foreground/15 hover:bg-foreground/5 transition-colors"
          >
            See Github
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Projects;