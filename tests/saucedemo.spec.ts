import { expect, test } from "@playwright/test";

//before each pour init le meme setup !

test("saucedemo1", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator("[data-test=username]").fill("standard_user");
    await page.locator("[data-test=password]").fill("secret_sauce");

    await page.getByRole("button", { name: "Login" }).click();
    await expect(
        page.locator("[data-test=title]"),
    ).toBeVisible();
});

test("On fait des emplettes", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");

    await page.getByRole("button", { name: "Login" }).click();

    const bs = await page.getByRole("button", { name: /add to cart/i });
    console.log(await bs.count());
    await bs.nth(1).click();

    await page.getByTestId("shopping-cart-link").click();
    await expect(page.getByTestId("inventory-item-name")).toBeVisible();
    await expect(page.getByTestId("inventory-item-name")).toContainText(
        "Sauce Labs Bike Light",
    );
});

test("test machin", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");

    await page.getByRole("button", { name: "Login" }).click();

    const bs = page.getByTestId("inventory-item");
    const articles = bs.filter({ hasText: "bike" });
    const buttons = articles.getByRole("button", { name: /add to/i });

    await buttons.first().click();
});
