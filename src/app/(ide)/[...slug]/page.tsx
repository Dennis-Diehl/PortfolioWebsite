import type { Metadata } from "next";
import { FileView } from "@/components/ide/views/FileView";
import { getAllFilePaths, getFileByPath } from "@/content/registry";
import { getProject } from "@/content/projects";

export function generateStaticParams() {
  return getAllFilePaths().map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { slug: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const file = getFileByPath(path);
  if (!file) return { title: "File not found" };

  let description: string | undefined;
  if (file.kind === "project" && file.refId) {
    description = getProject(file.refId)?.shortDescription;
  }

  return {
    title: file.title,
    description,
    openGraph: { title: `${file.title} — Dennis Diehl`, description },
  };
}

export default async function FilePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <FileView path={slug.join("/")} />;
}
