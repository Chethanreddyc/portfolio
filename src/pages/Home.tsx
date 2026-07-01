import TiltedCard from "@/components/TiltedCard";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
              CHETHAN
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
            <InteractiveHoverButton
              onClick={() => navigate("/projects")}
              className="cursor-target"
            >
              View My Work
            </InteractiveHoverButton>
            <RainbowButton
              variant="outline"
              asChild
              className="cursor-target rounded-full font-semibold"
            >
              <Link to="/contact">
                Get In Touch
              </Link>
            </RainbowButton>
          </div>
        </div>

        {/* TiltedCard */}
        <div className="flex flex-1 items-center justify-center">
          <TiltedCard
            imageSrc="/DSC00147.JPG"
            altText="Chethan - GNX Album Cover"
            captionText="CHETHAN"
            containerHeight="340px"
            containerWidth="340px"
            imageHeight="340px"
            imageWidth="340px"
            rotateAmplitude={29}
            scaleOnHover={1.05}
            showMobileWarning={true}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text">
                CHETHAN
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
}

export default Home;