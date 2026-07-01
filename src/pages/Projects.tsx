import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    title: "Project Alpha",
    description: "A premium interactive dashboard featuring real-time data visualization, glassmorphism UI widgets, and customizable drag-and-drop layouts.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    github: "#",
    live: "#"
  },
  {
    title: "Project Beta",
    description: "An immersive e-commerce platform built with Next.js, featuring smooth animated page transitions, localized payment integration, and a rich admin workspace.",
    tags: ["Next.js", "Stripe", "Prisma", "Framer Motion"],
    github: "#",
    live: "#"
  },
  {
    title: "Project Gamma",
    description: "A creative web experience utilizing three.js and custom shaders to visualize complex planetary orbits and simulate gravity fields.",
    tags: ["React Three Fiber", "Three.js", "GLSL", "GSAP"],
    github: "#",
    live: "#"
  }
];

function Projects() {
  return (
    <section
      id="projects"
      className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 py-12 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-6xl">
        <div className="mb-12 text-center md:text-left">
          <span className="mb-4 inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60"
            style={{ border: "1px solid rgba(128,128,128,0.15)" }}
          >
            My Work
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-foreground/60 max-w-2xl">
            A selection of projects that showcase my technical skills, creative problem solving, and attention to user experience design details.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-foreground/[0.04] shadow-md hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                  <a
                    href={project.github}
                    className="cursor-target flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <Github className="size-4" />
                    Source
                  </a>
                  <a
                    href={project.live}
                    className="cursor-target flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
