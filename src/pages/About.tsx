function About() {
  return (
    <section
      id="about"
      className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-4xl rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 md:p-12 backdrop-blur-md shadow-xl">
        <span className="mb-4 inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60"
          style={{ border: "1px solid rgba(128,128,128,0.15)" }}
        >
          About Me
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6">
          Creative Developer & Designer
        </h2>
        <div className="space-y-6 text-foreground/75 leading-relaxed text-base md:text-lg">
          <p>
            Hello! I'm Chethan, a software engineer with a passion for building interactive, user-centric web applications.
            I focus on creating fluid, highly engaging digital products that combine clean logic with exceptional aesthetics.
          </p>
          <p>
            With expertise across modern frontend technologies (React, Next.js, Vite, Tailwind CSS) and robust backend design,
            I bridges the gap between design and code to create websites that don't just work well, but feel premium.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-foreground/10">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/45 mb-2">Location</h4>
            <p className="font-medium text-foreground">India</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/45 mb-2">Experience</h4>
            <p className="font-medium text-foreground">2+ Years</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/45 mb-2">Role</h4>
            <p className="font-medium text-foreground">Full-Stack Dev</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/45 mb-2">Interests</h4>
            <p className="font-medium text-foreground">UI/UX, 3D, WebGL</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
