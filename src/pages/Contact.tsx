import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { MagicCard } from "@/components/ui/magic-card";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the mailto link
    const mailto = `mailto:chethanreddy0503@gmail.com?subject=${encodeURIComponent(
      `Portfolio Message from ${name}`
    )}&body=${encodeURIComponent(
      `Hi Chethan,\n\nYou have received a new message from your portfolio contact form:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n\n` +
      `Best regards,\n${name}`
    )}`;
    
    // Open the mail client
    window.location.href = mailto;
    
    // Set success state
    setStatus("success");
    
    // Reset form after a brief delay
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
    }, 100);
  };

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
              href="mailto:chethanreddy0503@gmail.com"
              className="cursor-target flex items-center gap-3 text-foreground/75 hover:text-foreground transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 group-hover:scale-110 transition-transform">
                <Mail className="size-4" />
              </div>
              <span className="font-medium">chethanreddy0503@gmail.com</span>
            </a>

            <div className="flex items-center gap-4 pt-6">
              <a
                href="https://github.com/Chethanreddyc"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/chethan-reddy-chundu-65a783296"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-[1.2] w-full relative">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center h-full space-y-6 py-12 animate-fade-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7c5a9b]/10 border border-[#7c5a9b]/20 text-[#7c5a9b] dark:text-[#B497CF]">
                <Send className="size-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Prepared!</h3>
                <p className="text-foreground/60 text-sm max-w-sm mx-auto">
                  Your default email client has been triggered. Please check and click "Send" inside your email application to complete delivery.
                </p>
              </div>
              <RainbowButton
                variant="outline"
                onClick={() => setStatus("idle")}
                className="cursor-target rounded-lg px-6 py-2 text-sm font-semibold text-white"
              >
                Send Another Message
              </RainbowButton>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
          )}
        </div>
      </div>
    </MagicCard>
  </section>
  );
}

export default Contact;
