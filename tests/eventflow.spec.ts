import { expect, Locator, test } from "@playwright/test";

type Ticket = {
    price: number;
    dispo: number;
};

test("ajouter des tickets et verifier le prix", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const cards = page.getByText("voir");

    console.log(cards);

    await cards.first().click();

    const plusbutt3 = page.getByRole("button", { name: "+" }).nth(2);

    for (let i = 0; i < 3; i++) {
        await plusbutt3.click();
    }
    const tickets: Record<string, Ticket> = {};

    const catrows = page.locator(".cat-row");

    for (const i in await catrows.all()) {
        console.log("I : " + i);

        const ticketCategories = await page.locator(".cat-row div div")
            .all();
        const muteds = await page.locator(".cat-row .muted").all();

        const cat = await ticketCategories[i].innerText();
        const content = await muteds[i].innerText();

        console.log("CAT : " + cat);
        console.log("CONT : " + content);

        console.log("muted : " + content);
        const splet = content.split("·");

        const p = Number.parseFloat(splet[0].trim());
        const d = Number.parseInt(splet[1].trim());

        tickets[cat] = {
            price: p,
            dispo: d,
        };
    }

    console.log(tickets);
});
