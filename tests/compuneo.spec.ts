import { expect, test } from "@playwright/test";

const url = "https://www.compuneo.be/";

type Product = {
    in_stock: number;
    price: number;
    product_id: number;
    refurbished: boolean;
};

function isProduct(p: unknown): p is Product {
    return (
        typeof p === "object" &&
        p !== null &&
        "in_stock" in p &&
        typeof p.in_stock === "number" &&
        "price" in p &&
        typeof p.price === "number" &&
        "product_id" in p &&
        typeof p.product_id === "number" &&
        "refurbished" in p &&
        typeof p.refurbished === "boolean"
    );
}

test("hummmm", async ({ page }) => {
    // https://www.compuneo.be/shop/variant_stock_min?ids=30506,31328,27452,2088
    const waiting = page.waitForResponse("*/**/shop/variant_stock_min*");

    await page.goto(url);
    const res = await waiting;
    expect(res.status()).toBe(200);

    const productsDTO = await res.json();
    const products: Product[] = [];

    for (const p of Object.values(productsDTO)) {
        if (isProduct(p)) {
            products.push(p);
        } else {
            console.log("ERROR");
        }
    }

    console.log(products);
});
