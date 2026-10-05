import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" }))
    .toBeVisible();
});

test("test perso", async ({ page }) => {
  await page.goto("http://localhost:4444/login");
  await expect(page).toHaveTitle("Invoicika - Invoice Management");

  await page.getByRole("textbox", { name: "Username" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin");

  await page.getByRole("button", { name: "Log in" }).click();

  // pas ouf mais quand on a pas le choix c'est okayish
  // ici l'info est connue car on s'est log précédemment
  await expect(page.getByText("admin")).toBeVisible();
});
