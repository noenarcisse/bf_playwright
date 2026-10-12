import { expect, test } from "@playwright/test";

const url = "https://www.letec.be/";

test("Lustin Bridou", async ({ page }) => {
  //lustin -> gare du midi 17: h arrivée, verifier si les heures sont bien dans l'ordre
  //on ecrit lus dans la recherche et on clique dans l'auto complete

  await page.goto(url, { timeout: 10000 });

  const refuserLesGateaux = page.getByRole("button", { name: "enregistrer" });
  await refuserLesGateaux?.click();

  // const headings = page.getByRole("heading", { level: 2 });
  // const monvoyagevoyage = headings.getByText("Mon voyage");
  // await expect(monvoyagevoyage).toHaveText("Mon voyage");

  const inputs = page.getByPlaceholder("Lieu, adresse, arrêt");
  console.log(await inputs.count());

  const from = inputs.first();
  const to = inputs.last();

  await from.pressSequentially("Lus");
  await page.waitForTimeout(3_000);
  const b = page.getByRole("listbox");
  console.log("LISTBOXES : " + await b.count());

  const listFromOptions = page.getByRole("option");
  await listFromOptions.nth(1).click();

  await to.fill("frapp");
  await to.press("e");
  // await page.waitForTimeout(5_000);
  const listToOptions = page.getByRole("option");

  await listToOptions.nth(1).click();

  const partirAtButton = page.getByRole("button", {
    name: /partir maintenant/i,
  });

  await partirAtButton.click();

  //attention chantier
  // const hours = `${new Date(Date.now()).getHours()} : ${
  //   new Date(Date.now()).getMinutes()
  // }`;
  // const regHours = new RegExp(`${new Date(Date.now()).getHours()} : `);
  // const hourInput = page.getByRole("textbox", { name: "Heure de départ" });
  // console.log(await hourInput.count());

  //fin des travaux

  await page.getByRole("textbox", { name: "Heure de départ" }).fill("17:00");
  await page.getByRole("button", { name: "Valider" }).click();

  const submitButton = page.getByRole("button", { name: /calculer/i });
  // console.log(await submitButton.count());
  await submitButton.click();

  await expect(page.getByText("planification")).toBeVisible({
    timeout: 10_000,
  });

  await page.waitForTimeout(10_000);

  page.getByRole("tabpanel", { name: "Rapide" }).getByText(
    "Résultats de recherche",
  );
  const heuresFound = page.getByRole("link", {
    name: /\d{2}:\d{2}\s+\d{2}:\d{2}/,
  });
  const horaires = [];

  for (const h of await heuresFound.all()) {
    await expect(h).toBeVisible();

    const hSplit = (await h.innerText()).split("\n");
    const d = hSplit[0];
    const e = hSplit[1];

    horaires.push({ "debut": d, "fin": e });
  }

  console.log(horaires);
});
