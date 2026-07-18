import type { ComponentType } from "react";
import { GithubIcon, LinkedinIcon, type BrandIconProps } from "@/components/ide/BrandIcons";

export interface SocialLink {
  id: string;
  href: string;
  label: string;
  handle: string;
  icon: ComponentType<BrandIconProps>;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: "github",
    href: "https://github.com/Dennis-Diehl",
    label: "GitHub",
    handle: "Dennis-Diehl",
    icon: GithubIcon,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/de-diehl/",
    label: "LinkedIn",
    handle: "de-diehl",
    icon: LinkedinIcon,
  },
];
