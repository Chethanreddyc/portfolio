import { motion } from "framer-motion";
import { TypingKeyboard } from "@/components/ui/typing-keyboard";
import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SplitText from "@/components/ui/SplitText";
import { RippleDisplacementSlider } from "@/components/ui/ripple-displacement-slider";
import { Skiper31 } from "@/components/ui/skiper-ui/skiper31";

function About() {
  const [scale, setScale] = useState(0.85);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale(1);
      } else if (window.innerWidth < 1024) {
        setScale(1);
      } else {
        setScale(0.7);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const keyboardText = `const developer = {
  name: "Chethan",
  role: "Software Engineer",
  stack: ["React", "TS", "Node", "Python"],
  motto: "Every challenge is a growth opportunity"
}`;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-full mx-auto px-6 md:px-16 lg:px-24 py-12 flex flex-col items-center">
        {/* Bio Header Section */}
        <section className="w-full flex min-h-[calc(100vh-14rem)] items-center justify-center -mt-6 md:-mt-10 lg:-mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 justify-between bg-foreground/[0.04] dark:bg-foreground/[0.02] border border-foreground/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl transition-all duration-300"
          >
            {/* Left Column: Keyboard Component */}
            <div className="flex-[4] w-full flex items-center justify-center min-h-[250px] sm:min-h-[350px] md:min-h-[450px] overflow-visible">
              <TypingKeyboard
                autoTypeText={keyboardText}
                accentColor="#7c5a9b"
                secondaryAccent="#B497CF"
                scale={scale}
                className="w-full h-full max-w-lg"
              />
            </div>

            {/* Right Column: Bio Text */}
            <div className="flex-[6] w-full space-y-6 text-left">
              <span
                className="inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60 backdrop-blur-sm"
                style={{ border: "1px solid rgba(128,128,128,0.15)" }}
              >
                About Me
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Software Engineer
              </h2>

              <div className="space-y-2 text-foreground/75 leading-relaxed text-base md:text-lg">
                <p>
                  I'm an engineering student focused on software engineering and modern web development.
                  I enjoy transforming ideas into practical applications while continuously strengthening
                  my problem-solving skills.
                </p>
                <p>
                  My primary stack includes React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB,
                  and Python. Alongside building projects, I regularly practice data structures and
                  algorithms to improve my understanding of efficient software development.
                </p>
                <p>
                  What motivates me most is learning how systems work, writing maintainable code, and
                  continuously refining my skills through real-world projects and consistent practice.
                  Every challenge is an opportunity to become a better developer.
                </p>
                <p>
                  I'm currently looking for opportunities where I can contribute, learn from
                  experienced engineers, and grow into a software engineer capable of building
                  scalable and impactful products.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education Timeline Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full mt-24 pt-16 border-t border-foreground/10 text-left"
        >
          <div className="mb-12">
            <SplitText
              text="Education"
              tag="h2"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mt-2 block"
              textAlign="left"
              delay={40}
              duration={1.0}
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />
          </div>

          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
            containerClassName="w-full"
          >
            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-foreground/10 max-w-4xl">
              {/* Timeline Item 1 */}
              <div className="relative mb-12 timeline-item">
                <div className="absolute -left-[38px] top-1.5 size-5 rounded-full border-4 border-background bg-[#7c5a9b] shadow-sm transition-transform duration-300 hover:scale-125" />
                <div className="rounded-2xl border border-foreground/10 bg-[#7c5a9b]/5 dark:bg-[#7c5a9b]/2 border-t-[#7c5a9b]/20 backdrop-blur-md p-6 shadow-md transition-all duration-300 hover:border-foreground/20 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Bachelor of Engineering</h3>
                      <p className="text-sm font-semibold text-foreground/50">Computer Science & Engineering</p>
                    </div>
                    <span className="self-start sm:self-center inline-block rounded-full bg-[#7c5a9b]/10 text-[#7c5a9b] dark:text-[#B497CF] dark:bg-[#B497CF]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      2022 — 2026
                    </span>
                  </div>
                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base">
                    Specializing in core software engineering, data structures, algorithms, and full-stack web applications. Participated in practical labs, system design workshops, and collaborative projects.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative timeline-item">
                <div className="absolute -left-[38px] top-1.5 size-5 rounded-full border-4 border-background bg-foreground/30 shadow-sm transition-transform duration-300 hover:scale-125" />
                <div className="rounded-2xl border border-foreground/10 bg-[#B497CF]/5 dark:bg-[#B497CF]/2 border-t-[#B497CF]/20 backdrop-blur-md p-6 shadow-md transition-all duration-300 hover:border-foreground/20 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Pre-University College (Class XII)</h3>
                      <p className="text-sm font-semibold text-foreground/50">Physics, Chemistry, Mathematics & Computer Science</p>
                    </div>
                    <span className="self-start sm:self-center inline-block rounded-full bg-foreground/10 text-foreground/70 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      2020 — 2022
                    </span>
                  </div>
                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base">
                    Completed higher secondary education with a focus on core sciences and programming fundamentals, building a strong base for computer science studies.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </motion.section>
      </div>

      <Skiper31 />

      {/* Certifications Section — heading + giant floating slider, side by side */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full mt-24 pt-16 border-t border-foreground/10"
      >
        <div className="relative w-full min-h-[95vh] flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Text column — narrowed to give slider more room */}
          <div className="w-full lg:w-[28%] text-left z-10 shrink-0">
            <SplitText
              text="Certifications"
              tag="h2"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl block"
              textAlign="left"
              delay={40}
              duration={1.0}
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />
            <p className="mt-6 text-foreground/60 text-base sm:text-lg max-w-xs">
              A collection of certifications and credentials earned over the years.
            </p>
          </div>

          {/* Slider column — bigger frame, still bounded to viewport */}
          <div className="relative w-full lg:flex-1 h-[480px] sm:h-[600px] lg:h-[85vh] max-h-[820px]">
            <div className="absolute inset-0 rounded-2xl border border-foreground/15 overflow-hidden shadow-2xl">
              <RippleDisplacementSlider className="w-full h-full" />
            </div>
          </div>

        </div>
      </motion.section>

    </div>
  );
}

export default About;
