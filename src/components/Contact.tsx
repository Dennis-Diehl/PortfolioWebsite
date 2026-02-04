import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser"

// Image imports
import githubIcon from "../assets/images/contact_icons/git.png";
import linkedinIcon from "../assets/images/contact_icons/linkedin.svg";
import gmailIcon from "../assets/images/contact_icons/gmail.svg";

// TypeScript Interfaces
interface SocialLink {
  href: string;
  icon: string;
  alt: string;
  className?: string;
}


const Contact: React.FC = () => {
  // Ref für das Formular
  const refForm = useRef<HTMLFormElement>(null);

  // Animation Variants mit TypeScript
  const slideIn: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1,
        delay: 0.2
      }
    }
  };

  // Social Media Links mit TypeScript
  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/Dennis-Diehl",
      icon: githubIcon,
      alt: "GitHub",
      className: "w-20 h-20"
    },
    {
      href: "https://www.linkedin.com/in/de-diehl/",
      icon: linkedinIcon,
      alt: "LinkedIn",
      className: "w-24 h-24"
    },
    {
      href: "mailto:dediehl@gmx.de",
      icon: gmailIcon,
      alt: "Gmail",
      className: "w-16 h-16"
    }
  ];

// Handle form submission
const sendEmail = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (refForm.current) {
    emailjs.sendForm(
      'service_ts7cqyd',
      'template_ue3sxc5', 
      refForm.current,
      '_c12MqW7WYntjkcYv'
    )
    .then(() => {
      alert('Message sent successfully!');
      refForm.current?.reset();
    })
    .catch((error) => {
      alert('Failed to send message.');
      console.error(error);
    });
  }
};


  return (
    /* Kontakt Karte */
    <motion.div
      variants={slideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="max-w-flex rounded-2xl border border-white/10 bg-gray-800/90 p-8 shadow-xl backdrop-blur-md"
    >
      {/* Header */}
      <div className="flex flex-col items-start">
        <p className="text-sm uppercase tracking-wide text-gray-400">
          Get in touch
        </p>
        <h3 className="mt-2 text-4xl font-bold text-white">
          Contact Me
        </h3>
      </div>
      
      {/* Inhalt: Social Icons + Formular */}
      <div className="mt-6 flex flex-row items-start justify-between"> 
        {/* Linke Seite: Social Icons */}
        <div className="mt-12 flex flex-col items-center gap-8">
          {socialLinks.map((link) => (
            <a 
              key={link.alt}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : "_blank"}
              rel={link.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
              className="transition-transform duration-300 hover:scale-110"
              aria-label={link.alt}
            >
              <img 
                src={link.icon} 
                alt={link.alt} 
                className={link.className}
              />
            </a>
          ))}
        </div>

        {/* Rechte Seite: Kontaktformular */}
        <div className="ml-8 flex-1">
          <form ref={refForm} onSubmit={sendEmail} className="mt-8 space-y-4">
            {/* Name & Email in einer Reihe */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-lg border border-white/10 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full rounded-lg border border-white/10 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-white/10 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Submit Button */}
            <div>
              <input
                type="submit"
                value="SEND"
                className="cursor-pointer rounded-lg bg-sky-500 px-8 py-3 font-semibold uppercase tracking-wide text-white transition-all hover:bg-sky-600 active:scale-95"
              />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;