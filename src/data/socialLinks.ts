import githubIcon from "../assets/images/contact_icons/git.png";
import linkedinIcon from "../assets/images/contact_icons/linkedin.svg";
import gmailIcon from "../assets/images/contact_icons/gmail.svg";

export interface SocialLink {
  href: string;
  icon: string;
  alt: string;
  className?: string;
}

export const socialLinks: SocialLink[] = [
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
