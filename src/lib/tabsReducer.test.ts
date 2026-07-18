import { describe, it, expect } from "vitest";
import { tabsReducer, neighborAfterClose, type TabsState } from "./tabsReducer";

describe("tabsReducer", () => {
  const base: TabsState = { openPaths: ["", "projects/a", "projects/b"] };

  it("opens a new tab at the end", () => {
    const next = tabsReducer(base, { type: "open", path: "about" });
    expect(next.openPaths).toEqual(["", "projects/a", "projects/b", "about"]);
  });

  it("does not duplicate an already-open tab", () => {
    const next = tabsReducer(base, { type: "open", path: "projects/a" });
    expect(next).toBe(base);
  });

  it("closes a tab", () => {
    const next = tabsReducer(base, { type: "close", path: "projects/a" });
    expect(next.openPaths).toEqual(["", "projects/b"]);
  });

  it("reorders tabs", () => {
    const next = tabsReducer(base, { type: "reorder", from: 2, to: 0 });
    expect(next.openPaths).toEqual(["projects/b", "", "projects/a"]);
  });

  it("hydrates from a stored list", () => {
    const next = tabsReducer(base, { type: "hydrate", openPaths: ["", "skills"] });
    expect(next.openPaths).toEqual(["", "skills"]);
  });
});

describe("neighborAfterClose", () => {
  it("selects the tab that shifts into the closed slot", () => {
    expect(neighborAfterClose(["", "a", "b"], "a")).toBe("b");
  });

  it("falls back to the previous tab when closing the last", () => {
    expect(neighborAfterClose(["", "a", "b"], "b")).toBe("a");
  });

  it("falls back to root when nothing remains", () => {
    expect(neighborAfterClose(["only"], "only", "")).toBe("");
  });
});
