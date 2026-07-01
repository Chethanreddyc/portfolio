import { useEffect, useState } from "react"
import DotField from "./components/ui/DotField"
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler"
import { Dock, DockIcon } from "./components/ui/dock"
import TargetCursor from "./components/TargetCursor"
import PillNav from "./components/PillNav"
import HomePage from "./pages/Home"
import { Home, User, Briefcase, Mail, Github } from "lucide-react"

const pillNavItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
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

function App() {
  const isDark = useTheme()

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

      {/* Background – DotField fills the entire viewport */}
      <div className="fixed inset-0 z-0">
        <DotField
          dotRadius={2}
          dotSpacing={14}
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

      {/* PillNav – fixed top center */}
      <div className="pillnav-container fixed top-4 left-1/2 z-50 -translate-x-1/2">
        <PillNav
          logo="/favicon.svg"
          logoAlt="Portfolio"
          items={pillNavItems}
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
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
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
      <main className="relative z-10 pt-24">
        <HomePage />
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
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <DockIcon className="cursor-target">
            <Home className="size-5 text-foreground/80" />
          </DockIcon>
          <DockIcon className="cursor-target">
            <User className="size-5 text-foreground/80" />
          </DockIcon>
          <DockIcon className="cursor-target">
            <Briefcase className="size-5 text-foreground/80" />
          </DockIcon>
          <DockIcon className="cursor-target">
            <Mail className="size-5 text-foreground/80" />
          </DockIcon>
          <DockIcon className="cursor-target">
            <Github className="size-5 text-foreground/80" />
          </DockIcon>
        </Dock>
      </div>
    </div>
  )
}

export default App