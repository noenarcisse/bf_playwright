import { expect, test } from "@playwright/test";

type Ticket = {
    price: number;
    dispo: number;
};

test("acceder au bacl office en tant qu'admin", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    expect(page.getByText("Admin EventFlow")).toBeVisible();

    const backoffice = page.getByRole("link", { name: /back-?office/i });
    expect(backoffice).toBeVisible();

    await backoffice.click();

    expect(page.getByRole("heading", { name: /back-?office/i })).toBeVisible();
});
