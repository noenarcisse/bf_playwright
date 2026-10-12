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

test("test de keyboard", async ({ page }) => {
    await page.goto(Url("auth_ecommerce"));
    const heading = page.getByRole("heading", { level: 2 });
    await heading.selectText();
    await page.keyboard.press("Control+C");
    await page.getByRole("textbox").first().press("Control+V");
});

test("hover", async ({ page }) => {
    await page.goto(Url("mouse-hover"));

    const sub = page.getByRole("button", { name: "hover over me" });
    await sub.hover();
    await expect(page.getByText("am shown when")).toBeVisible();
});

test("alert", async ({ page }) => {
    page.on("dialog", async (dialog) => {
        expect.soft(dialog.message()).toBe("Hello! I am an error");
        expect.soft(dialog.message()).toBe("Hello! I am an alert box!!");
        expect.soft(dialog.message()).toContain("Hello");
        await dialog.accept();
    });

    await page.goto(Url("alerts"));

    const but = page.getByRole("button", { name: "alert" });
    await but.click();
});

test("upload", async ({ page }) => {
    await page.goto(Url("file-upload"));
    const fileup = page.locator("#file_upload");
    const submitBut = page.getByRole("button", { name: "submit" });
    fileup.setInputFiles("files/truc.txt");
    await submitBut.click();
    await expect(page.getByText("successfully")).toBeVisible();
});

test("download", async ({ page }) => {
    await page.goto("https://nodejs.org/fr/download");
    const waiting = page.waitForEvent("download");
    const downloadButton = page.getByRole("button", {
        name: "Windows Installateur (.msi)",
    });

    await downloadButton.click();
    const file = await waiting;

    expect(file.suggestedFilename()).toContain("node-");
    expect(file.suggestedFilename()).toContain(".msi");
});

test("ping", async ({ page }) => {
    await expect.poll(async () => {
        const res = await page.request.get(
            "https://qa-practice.razvanvancea.ro/file-upload.html",
        );
        return res.status();
    }).toBe(200);
});
