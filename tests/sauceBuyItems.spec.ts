import { expect, Locator, test } from "@playwright/test";

type user = {
    name: string;
    pwd: string;
};

type userkey =
    | "standard"
    | "locked"
    | "problem"
    | "glitch"
    | "error"
    | "visual";

// deno-fmt-ignore
const login : Record<userkey, user> = {
    "standard": {
        name  : "standard_user",
        pwd   : "secret_sauce",
    },
    "locked"  : {
        name  : "locked_out_user",
        pwd   : "secret_sauce",
    },
    "problem" : {
        name  : "problem_user",
        pwd   : "secret_sauce",
    },
    "glitch"  : {
        name  : "performance_glitch_user",
        pwd   : "secret_sauce",
    },
    "error"   : {
        name  : "error_user",
        pwd   : "secret_sauce",
    },
    "visual"  : {
        name  : "visual_user",
        pwd   : "secret_sauce",
    },
} satisfies Record<userkey, user>;

test.beforeEach("login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByTestId("username").fill(login["standard"].name);
    await page.getByTestId("password").fill(login["standard"].pwd);
    await page.getByRole("button", { name: "Login" }).click();
});

test("Ajouter backpack et bike au panier puis retirer bike", async ({ page }) => {
    // const backpack = page.getByRole("link", { name: /backpack/i });
    // const bike = page.getByRole("link", { name: /bike/i });
    const items = page.getByTestId("inventory-item");

    // deno-fmt-ignore
    const items2 : Record<string, Locator | null> = {
        "bike"    : null,
        "backpack": null,
    };
    for (const i of await items.all()) {
        let content = await i.textContent();
        if (content === null) continue;

        if (content.toLowerCase().includes("bike")) {
            items2.bike = i;
        }

        if (content.toLowerCase().includes("backpack")) {
            items2.backpack = i;
        }
    }

    console.log(items2);

    for (const i of Object.values(items2)) {
        if (i === null) continue;
        await i.getByRole("button", { name: /add to/i }).click();
    }

    const nbItemsICart = page.getByTestId(
        "shopping-cart-badge",
    );
    await expect(nbItemsICart).toBeVisible();
    await expect(nbItemsICart).toContainText("2");

    // console.log(items2.bike);
    await items2.bike?.getByRole("button", { name: /remove/i }).click();
    await expect(nbItemsICart).toContainText("1");
});

test("Adder 1 article, checkouter, expecter le message de validation", async ({ page }) => {
    //bonus verifier le montant total qui est correct

    const items = page.getByTestId("inventory-item");
    const f = items.first();

    const item = {
        name: (await f.getByTestId("inventory-item-name").textContent()) ||
            "Nothing",
        price: await f.getByTestId("inventory-item-price").textContent() || "0",
    };

    console.log(item);

    await f.getByRole("button", { name: /add/i }).click();
    await page.getByTestId("shopping-cart-link").click();
    await page.getByRole("button", { name: /checkout/i }).click();

    await page.getByTestId("firstName").fill("a");
    await page.getByTestId("lastName").fill("a");
    await page.getByTestId("postalCode").fill("a");
    await page.getByRole("button", { name: /continue/i }).click();

    await expect(page.getByTestId("subtotal-label")).toContainText(
        item.price,
    );

    await page.getByRole("button", { name: /finish/i }).click();

    await expect(page.getByTestId("checkout-complete-container")).toContainText(
        "Thank you for your order!",
    );
});
