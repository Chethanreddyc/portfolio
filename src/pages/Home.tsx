import TiltedCard from "@/components/TiltedCard";

function Home() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6 md:px-16 lg:px-24"
    >
      <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:gap-16 lg:gap-24">
        {/* Intro Text */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-4 inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60 backdrop-blur-sm"
            style={{ border: "1px solid rgba(128,128,128,0.15)" }}
          >
            Welcome to my portfolio
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I'm{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #B497CF 0%, #7c5a9b 50%, #B497CF 100%)",
              }}
            >
              Cr7ch
            </span>
          </h1>

          <p className="mt-3 text-lg font-medium text-foreground/70 sm:text-xl">
            Full-Stack Developer & Creative Technologist
          </p>

          <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/50">
            I craft beautiful, performant digital experiences that blend
            cutting-edge technology with thoughtful design. Let's build
            something extraordinary together.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="cursor-target inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #7c5a9b 0%, #B497CF 100%)",
              }}
            >
              View My Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="cursor-target inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-foreground/80 transition-all duration-300 hover:text-foreground hover:scale-105"
              style={{
                border: "1px solid rgba(128,128,128,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* TiltedCard */}
        <div className="flex flex-1 items-center justify-center">
          <TiltedCard
            imageSrc=""
            altText="Kendrick Lamar - GNX Album Cover"
            captionText="Kendrick Lamar - GNX"
            containerHeight="340px"
            containerWidth="340px"
            imageHeight="340px"
            imageWidth="340px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="tilted-card-demo-text">
                Kendrick Lamar - GNX
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
}

export default Home;