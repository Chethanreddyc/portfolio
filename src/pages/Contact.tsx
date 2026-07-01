import { Mail, Github, Linkedin, Send } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { MagicCard } from "@/components/ui/magic-card";

function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6 py-12 md:px-16 lg:px-24"
    >
      <MagicCard className="w-full max-w-5xl rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-12 p-8 md:p-12">
        
        {/* Info Side */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="mb-4 inline-block rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/60"
              style={{ border: "1px solid rgba(128,128,128,0.15)" }}
            >
              Get In Touch
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6">
              Let's build something together
            </h2>
            <p className="text-foreground/60 leading-relaxed max-w-sm mb-8">
              Whether you have a question, a project proposal, or just want to say hi, feel free to drop a message. I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:contact@example.com"
              className="cursor-target flex items-center gap-3 text-foreground/75 hover:text-foreground transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 group-hover:scale-110 transition-transform">
                <Mail className="size-4" />
              </div>
              <span className="font-medium">contact@example.com</span>
            </a>

            <div className="flex items-center gap-4 pt-6">
              <a
                href="#"
                className="cursor-target flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="#"
                className="cursor-target flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-[1.2] w-full">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="cursor-target w-full rounded-lg border border-foreground/15 bg-transparent px-4 py-3 text-foreground focus:border-foreground/30 focus:outline-none transition-colors"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="cursor-target w-full rounded-lg border border-foreground/15 bg-transparent px-4 py-3 text-foreground focus:border-foreground/30 focus:outline-none transition-colors"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="cursor-target w-full rounded-lg border border-foreground/15 bg-transparent px-4 py-3 text-foreground focus:border-foreground/30 focus:outline-none transition-colors resize-none"
                placeholder="Hi Chethan, let's connect..."
                required
              ></textarea>
            </div>

            <RainbowButton
              variant="outline"
              type="submit"
              className="cursor-target flex items-center justify-center gap-2 rounded-lg w-full py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              <Send className="size-4" />
              Send Message
            </RainbowButton>
          </form>
        </div>
      </div>
    </MagicCard>
  </section>
  );
}

export default Contact;
