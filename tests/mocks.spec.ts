import { expect, test } from "@playwright/test";

test("pingoogle", async ({ page }) => {
    page.on("request", (req) => {
        console.log(`${req.method()} on ${req.url()}`);
    });
    page.on("response", (res) => {
        console.log(res.status());
    });

    await page.goto("https://demo.playwright.dev/api-mocking/");
});

test("truc", async ({ page }) => {
    const waiting = page.waitForResponse("**/api/v1/fruits");
    await page.goto("https://demo.playwright.dev/api-mocking/");
    const res = await waiting;
    expect(res.status()).toBe(200);

    const fruits = await res.json();

    console.log(fruits);

    expect(fruits).toContainEqual({ name: "Banana", id: 1 });
});

//fabrique un json pour une req bidon en mock
test("truc2", async ({ page }) => {
    await page.route("*/**/api/v1/fruits", async (route) => {
        await route.fulfill({
            status: 200,
            json: [{ "name": "Fraise", "id": 2 }],
        });
    });

    await page.goto("https://demo.playwright.dev/api-mocking/");

    await expect(page.getByText("Fraise")).toBeVisible();
});

//recup de la req et modifie le json
test("truc3", async ({ page }) => {
    await page.route("*/**/api/v1/fruits", async (route) => {
        const res = await route.fetch();
        const fruits = await res.json();

        fruits.push({ "name": "Fraise", "id": 2 });

        await route.fulfill({
            response: res,
            json: fruits,
        });
    });

    await page.goto("https://demo.playwright.dev/api-mocking/");

    await expect(page.getByText("Banana")).toBeVisible();
    await expect(page.getByText("Fraise")).toBeVisible();
});
