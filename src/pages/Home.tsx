import TiltedCard from "@/components/TiltedCard";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { CreepyButton } from "@/components/ui/creepy-button";
import SplitText from "@/components/ui/SplitText";
import BlurText from "../components/BlurText";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-13rem)] items-center justify-center px-6 md:px-16 lg:px-24"
    >
      <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:gap-16 lg:gap-24">
        {/* Intro Text */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-4 inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60 backdrop-blur-sm"
            style={{ border: "1px solid rgba(128,128,128,0.15)" }}
          >
            Welcome to my portfolio
          </span>

          <h1 className="flex flex-wrap items-center justify-center md:justify-start gap-x-[0.2em] text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl pb-2">
            <SplitText
              text="Hi, I'm"
              delay={40}
              duration={0.8}
              tag="span"
              textAlign="left"
              className="text-foreground inline-block"
            />
            <span
              className="inline-block rounded-lg px-3 py-1"
              style={{ background: "#000000" }}
            >
              <SplitText
                text="Chethan"
                delay={40}
                duration={0.8}
                tag="span"
                textAlign="left"
                className="gradient-text inline-block"
              />
            </span>
          </h1>

          <BlurText
            text="Full-Stack Developer & Creative Technologist"
            className="mt-3 text-lg font-medium text-foreground/70 sm:text-xl justify-center md:justify-start flex-wrap"
            delay={40}
            animateBy="words"
          />

          <BlurText
            text="I craft beautiful, performant digital experiences that blend cutting-edge technology with thoughtful design. Let's build something extraordinary together."
            className="mt-5 max-w-md text-base leading-relaxed text-foreground/50 justify-center md:justify-start flex-wrap"
            delay={20}
            animateBy="words"
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <InteractiveHoverButton
              onClick={() => navigate("/projects")}
              className="cursor-target"
            >
              View My Work
            </InteractiveHoverButton>
            <CreepyButton
              onClick={() => navigate("/contact")}
              className="cursor-target"
            >
              Get In Touch
            </CreepyButton>
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
            showTooltip={true}
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