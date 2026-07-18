import type { ReactNode } from "react";
import { IdeShell } from "@/components/ide/IdeShell";

export default function IdeLayout({ children }: { children: ReactNode }) {
  return <IdeShell>{children}</IdeShell>;
}
