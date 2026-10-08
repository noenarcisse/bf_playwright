import { expect, test } from "@playwright/test";

const url = "https://www.letec.be/";

test("lustin bridou", async ({ page }) => {
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
  // const listFromOptions = page.getByRole("listitem", { name: /lus/i });
  await listFromOptions.nth(1).click();

  await to.pressSequentially("bruxelles", { timeout: 6_000 });
  await page.waitForTimeout(6_000);
  const listToOptions = page.getByRole("option");
  // await expect(listToOptions).toBeVisible();

  await listToOptions.nth(1).click();

  const submitButton = page.getByRole("button", { name: /calculer/i });
  console.log(await submitButton.count());
  await submitButton.click();

  await expect(page.getByText("planification")).toBeVisible({
    timeout: 10_000,
  });
});
