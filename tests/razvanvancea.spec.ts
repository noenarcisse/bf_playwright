import { expect, test } from "@playwright/test";

// const url = "https://the-internet.herokuapp.com/";
const url = "https://qa-practice.razvanvancea.ro/";

function Url(s: string): string {
    return `https://qa-practice.razvanvancea.ro/${s}.html`;
}

test("boite de cheques", async ({ page }) => {
    await page.goto(url + "checkboxes.html");
    const cases = page.getByRole("checkbox");

    await cases.first().check();
    await cases.last().uncheck();
    await cases.first().setChecked(false);

    for (const c of await cases.all()) {
        expect(c).not.toBeChecked();
    }
});

test("ecrire comme un vrai petit garcon", async ({ page }) => {
    await page.goto(url + "auth_ecommerce.html");

    const emailInput = page.getByRole("textbox", { name: "email" });
    const submitButton = page.getByRole("button", { name: "submit" });
    const pwdInput = page.getByRole("textbox", { name: "password" });

    await emailInput.pressSequentially("admin@admin.com", { delay: 100 });
    await pwdInput.pressSequentially("admin123", { delay: 100 });
    await submitButton.click();

    await expect(page.getByRole("heading", { level: 2 })).toContainText(
        /shopping/i,
    );
});

test("test de dropdown", async ({ page }) => {
    await page.goto(Url("dropdowns"));
    const drop = page.getByRole("combobox");

    await drop.selectOption({ index: 12 });
    await drop.selectOption("Belgium");

    const dropbutt = page.getByRole("button", { name: "dropdown" });
    await dropbutt.click();

    const action = page.getByRole("link", { name: "some action" });
    await action.click();

    await expect(page).toHaveURL(/#some-action/);
    await expect(drop).toHaveValue("Belgium");
});
