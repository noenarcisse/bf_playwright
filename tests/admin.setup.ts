import { expect, test as setup } from "@playwright/test";
//le setup.ts est une conv, c'est un simple ts sans impact sur PW

const file = "playwright/.auth/EF_admin.json";

// setup("auth", async ({ page }) => {
//     await page.goto("https://www.saucedemo.com/");

//     await page.getByTestId("username").fill("standard_user");
//     await page.getByTestId("password").fill("secret_sauce");
//     await page.getByRole("button", { name: "Login" }).click();
//     await expect(page.getByText("products")).toBeVisible();

//     await page.context().storageState({ path: file });
// });

setup("auth", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.locator('input[type="email"]').fill("admin@eventflow.test");
    await page.locator('input[type="password"]').fill("admin1234");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page.getByText("Vivez l'evenement")).toBeVisible();

    await page.context().storageState({ path: file });
});
