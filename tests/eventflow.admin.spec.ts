import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

test("creer un event puis verifier qu'il est listé", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    expect(page.getByText("Admin EventFlow")).toBeVisible();

    const backoffice = page.getByRole("link", { name: /back-?office/i });
    expect(backoffice).toBeVisible();

    await backoffice.click();

    expect(page.getByRole("heading", { name: /back-?office/i })).toBeVisible();

    const addEventButton = page.getByRole("link", {
        name: /nouvel evenement/i,
    });

    await addEventButton.click();

    const uuid = randomUUID();

    const eventName = "EventTest #" + uuid;

    await page.getByRole("textbox").first().fill(eventName);
    await page.getByRole("textbox").nth(1).fill("Bruxelles évidemment");
    await page.getByRole("textbox").nth(2).fill("A mi casa");
    await page.getByRole("spinbutton").fill("4000");
    await page.getByRole("combobox").selectOption("published");
    await page.locator('input[type="color"]').fill("#e9b807");
    await page.locator('input[type="datetime-local"]').fill("2026-10-15T14:30");

    await page.getByRole("button", { name: "Creer" }).click();
    await page.goto("http://localhost:5173/admin");

    await expect(page.getByText(eventName).first()).toBeVisible();
});
