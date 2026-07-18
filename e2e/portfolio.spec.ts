import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const isMobile = (project: string) => project === "mobile";

test.describe("IDE portfolio", () => {
  test("first visit shows the README without any interaction", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Hi, I'm Dennis/i })).toBeVisible();
    // The logo is present in the title bar.
    await expect(page.getByRole("button", { name: /Dennis Diehl home/i })).toBeVisible();
    // README tab is open by default.
    await expect(page.getByRole("tab", { name: /README\.md/i })).toBeVisible();
  });

  test("opening a project from the explorer adds a tab", async ({ page }, testInfo) => {
    await page.goto("/");
    if (isMobile(testInfo.project.name)) {
      await page.getByRole("button", { name: /Open file explorer/i }).click();
    }
    await page.getByRole("button", { name: /ai-newsletter-agent\.py/i }).click();
    await expect(page).toHaveURL(/projects\/ai-newsletter-agent/);
    await expect(page.getByRole("tab", { name: /ai-newsletter-agent\.py/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "AI Newsletter Agent", level: 1 }),
    ).toBeVisible();
  });

  test("deep-linking directly to a project works", async ({ page }) => {
    await page.goto("/projects/smart-document-agent");
    await expect(
      page.getByRole("heading", { name: "Smart Document Agent", level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("tab", { name: /smart-document-agent\.py/i })).toBeVisible();
  });

  test("search finds a file and opens it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Search files/i }).click();
    const input = page.getByRole("textbox", { name: "Search" });
    await input.fill("langgraph");
    await expect(page.getByRole("option", { name: /ai-newsletter-agent/i })).toBeVisible();
    await input.press("Enter");
    await expect(page).toHaveURL(/projects\/ai-newsletter-agent/);
  });

  test("closing the active tab via keyboard navigates to a neighbor", async ({ page }) => {
    await page.goto("/projects/smart-document-agent");
    const tab = page.getByRole("tab", { name: /smart-document-agent\.py/i });
    await tab.focus();
    await tab.press("Delete");
    await expect(page.getByRole("tab", { name: /smart-document-agent\.py/i })).toHaveCount(0);
  });

  test("repeated Backspace closes tabs in a chain, and closing the last tab empties the bar", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    if (isMobile(testInfo.project.name)) {
      await page.getByRole("button", { name: /Open file explorer/i }).click();
    }
    await page.getByRole("button", { name: /ai-newsletter-agent\.py/i }).click();
    if (isMobile(testInfo.project.name)) {
      await page.getByRole("button", { name: /Open file explorer/i }).click();
    }
    await page.getByRole("button", { name: /smart-document-agent\.py/i }).click();
    await expect(page.getByRole("tab")).toHaveCount(3);

    const activeTab = () => page.locator('[role="tab"][aria-selected="true"]');
    // Wait for the just-clicked tab to actually become the active one before
    // focusing it — clicking and the tab bar reflecting the new active file
    // are not perfectly synchronous.
    await expect(activeTab()).toHaveAttribute("data-tab-path", "projects/smart-document-agent");
    await activeTab().focus();
    await activeTab().press("Backspace");
    // Focus should have followed onto the new active tab (no click in between),
    // so this second Backspace closes it too.
    await expect(activeTab()).toHaveAttribute("data-tab-path", "projects/ai-newsletter-agent");
    await activeTab().press("Backspace");
    await expect(page.getByRole("tab")).toHaveCount(1);
    await expect(page.getByRole("tab", { name: /README\.md/i })).toBeVisible();

    // Closing the very last tab empties the bar entirely — README must not
    // silently reappear as a tab.
    await activeTab().press("Backspace");
    await expect(page.getByRole("tab")).toHaveCount(0);
    await expect(page.getByText(/No file open/i)).toBeVisible();
  });

  test("reloading resets to only README, discarding previously accumulated tabs", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    if (isMobile(testInfo.project.name)) {
      await page.getByRole("button", { name: /Open file explorer/i }).click();
    }
    await page.getByRole("button", { name: /ai-newsletter-agent\.py/i }).click();
    if (isMobile(testInfo.project.name)) {
      await page.getByRole("button", { name: /Open file explorer/i }).click();
    }
    await page.getByRole("button", { name: /smart-document-agent\.py/i }).click();
    await expect(page.getByRole("tab")).toHaveCount(3);

    // Navigate back to the root and reload — the accumulated tabs from this
    // session must not survive; only README should be open afterwards.
    await page.goto("/");
    await page.reload();
    await expect(page.getByRole("tab")).toHaveCount(1);
    await expect(page.getByRole("tab", { name: /README\.md/i })).toBeVisible();
  });

  test("mobile shows the explorer as an overlay", async ({ page }, testInfo) => {
    test.skip(!isMobile(testInfo.project.name), "mobile-only");
    await page.goto("/");
    await page.getByRole("button", { name: /Open file explorer/i }).click();
    await expect(page.getByRole("tree", { name: /Portfolio files/i })).toBeVisible();
  });

  test("has no critical accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
