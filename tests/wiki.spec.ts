import { expect, test } from "@playwright/test";

test("nombre de langues", async ({ page }) => {
    await page.goto(
        "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal",
    );

    const languesButton = page.getByRole("button", { name: "langues" });
    await expect.soft(languesButton).toBeVisible();

    const languesButtonText = page.getByText(/\d+\s*langues/).first();
    await expect.soft(languesButtonText).toBeVisible();
    const inner = await languesButtonText.innerText();
    console.log(inner);
    const nbLangues = parseInt(inner);
    console.log(nbLangues);

    await languesButton.click();
    const languesList = page.getByRole("dialog", { name: "Langues" });
    await expect.soft(languesList).toBeVisible();

    //on doit scroller pour afficher le reste des elems a charger
    await languesList.hover();
    await page.mouse.wheel(0, 10_000);

    const langues = languesList.getByRole("link");

    const langues2 = [];
    for (const l of await langues.all()) {
        langues2.push(await l.innerText());
    }

    // console.log(langues2);
    const languesSet = new Set<string>(langues2);
    console.log("ARR LEN : " + langues2.length);
    console.log("SET LEN : " + languesSet.size);

    // y'a des doublons, cette valeur est fausse
    // const nbLanguesVues = await langues.count();

    expect(languesSet.size).toBe(nbLangues);
});

test("lien correspond au titre de l'article", async ({ page }) => {
    //utiliser l'article au hasard en cliquant sur le bouton pour
    await page.goto(
        "https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard",
    );

    console.log(page.url());
    const url = new URL(page.url());
    const pagename = url.pathname;
    const pagenameUnescaped =
        decodeURI(pagename.replaceAll("_", " ")).split("/")[2]; //ghetto, replace "/wiki/" -> "" est ghetto aussi

    console.log(pagenameUnescaped);

    const titre = page.getByRole("heading", {
        level: 1,
        name: pagenameUnescaped,
    });

    await expect(titre).toBeVisible();
});

test("tester le premier lien d'un article", async ({ page }) => {
    //utiliser l'article au hasard et cliquer sur le premier lien de la page
    //verifier que l'url a changé
    await page.goto(
        "https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard",
    );

    const url1 = page.url();

    const article = page.locator("#bodyContent");
    const firstlink = article.getByRole("link").first();

    await firstlink.click();
    const url2 = page.url();

    expect(url1).not.toBe(url2);
});
