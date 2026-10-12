import { expect, test } from "@playwright/test";

const url = "https://the-internet.herokuapp.com/";

test("hovers", async ({ page }) => {
    await page.goto(url + "hovers");

    const user1 = page.getByAltText("User Avatar").first();
    await user1.hover();

    await expect(page.getByText("user1")).toBeVisible();
});
