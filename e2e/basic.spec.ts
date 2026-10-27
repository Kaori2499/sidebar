import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders sidebar nav and trigger", async ({ page }) => {
  await expect(page.getByTestId("sidebar-trigger")).toBeVisible();
  await expect(page.getByTestId("nav-home")).toBeVisible();
  await expect(page.getByTestId("active-config")).toContainText("variant=sidebar");
});

test("can switch sidebar variant", async ({ page }) => {
  await page.getByTestId("control-variant-floating").click();
  await expect(page.getByTestId("active-config")).toContainText(
    "variant=floating",
  );
  await expect(page.getByTestId("nav-home")).toBeVisible();
  await expect(page.getByTestId("sidebar-trigger")).toBeVisible();

  await page.getByTestId("control-variant-inset").click();
  await expect(page.getByTestId("active-config")).toContainText("variant=inset");
  await expect(page.getByTestId("sidebar-inset")).toBeVisible();
});

test("can switch collapsible and side", async ({ page }) => {
  await page.getByTestId("control-collapsible-icon").click();
  await expect(page.getByTestId("active-config")).toContainText(
    "collapsible=icon",
  );

  await page.getByTestId("control-side-right").click();
  await expect(page.getByTestId("active-config")).toContainText("side=right");
  await expect(page.getByTestId("nav-home")).toBeVisible();
});
