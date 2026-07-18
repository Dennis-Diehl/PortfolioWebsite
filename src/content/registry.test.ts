import { describe, it, expect } from "vitest";
import {
  FILE_TREE,
  ALL_FILES,
  getFileByPath,
  getAllFilePaths,
  ROOT_FILE,
} from "./registry";

describe("registry", () => {
  it("exposes README as the root file", () => {
    expect(ROOT_FILE.path).toBe("");
    expect(ALL_FILES[0]).toBe(ROOT_FILE);
  });

  it("resolves files by path, trimming slashes", () => {
    expect(getFileByPath("skills")?.fileName).toBe("skills.json");
    expect(getFileByPath("/projects/ai-newsletter-agent/")?.kind).toBe("project");
  });

  it("returns undefined for unknown paths", () => {
    expect(getFileByPath("does/not/exist")).toBeUndefined();
  });

  it("builds static params for every file except the root", () => {
    const paths = getAllFilePaths();
    expect(paths).not.toContainEqual([""]);
    expect(paths).toContainEqual(["projects", "ai-newsletter-agent"]);
    expect(paths).toHaveLength(ALL_FILES.length - 1);
  });

  it("nests project and education files under folders", () => {
    const folders = FILE_TREE.filter((n) => n.type === "folder").map((n) =>
      n.type === "folder" ? n.segment : "",
    );
    expect(folders).toEqual(expect.arrayContaining(["projects", "education"]));
  });
});
