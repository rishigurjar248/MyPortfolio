import { motion } from "framer-motion";
import {
  CheckCircle,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useState } from "react";
import { personalInfo } from "../data/portfolio";
import { useInView } from "../hooks/useInView";
import { buildWhatsAppLink } from "../lib/contact.js";

export function Contact() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setSending(true);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      source: "contact",
      submittedAt: new Date().toISOString(),
    };

    const endpoint =
      import.meta.env.VITE_CONTACT_ENDPOINT ||
      import.meta.env.VITE_FEEDBACK_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } else {
        const messageText = `Hello! My name is ${payload.name}, email: ${payload.email}\n\n${payload.message}`;
        const whatsappUrl = buildWhatsAppLink(messageText);
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Contact form submit error:", error);
      const fallbackText = `New message from ${payload.name} (${payload.email})\n\n"${payload.message}"`;
      window.open(
        buildWhatsAppLink(fallbackText),
        "_blank",
        "noopener,noreferrer",
      );
    } finally {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: null,
      color: "text-accent",
      bg: "bg-accent/10 border-accent/20",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/rishigurjar",
      href: personalInfo.github,
      color: "text-foreground",
      bg: "bg-muted/50 border-border",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rishigurjar",
      href: personalInfo.linkedin,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-sm text-primary font-mono mb-4">
            <span className="text-accent">$</span> git commit -m "Let's connect"
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open to SDE opportunities, collaborations, and interesting projects.
            Let&apos;s build something great together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-2">
                Let&apos;s work together
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                I&apos;m currently looking for SDE internship and full-time
                opportunities. Whether you have a question, a project idea, or
                just want to say hi — my inbox is always open!
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl border ${info.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <info.icon className={`w-4 h-4 ${info.color}`} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-medium ${info.color} hover:underline`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium">{info.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Find me on</h3>
              <div className="flex gap-3">
                {[
                  { href: personalInfo.github, icon: Github, label: "GitHub" },
                  {
                    href: personalInfo.linkedin,
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: personalInfo.leetcode,
                    icon: ExternalLink,
                    label: "LeetCode",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(social.href, "_blank", "noopener,noreferrer");
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl glass border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>

              {sent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                  <h4 className="text-xl font-bold text-green-400 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Thanks for reaching out. I&apos;ll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      rows={5}
                      placeholder="Tell me about the opportunity, project, or just say hello..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all glow-primary disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
