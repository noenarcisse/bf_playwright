# Playwright

On recupere jamais de class!

## cmd

pour tirer un nav apres pull a bf: npx playwright install

vu dans le cli Inside that directory, you can run several commands:

npx playwright test Runs the end-to-end tests.

npx playwright test --ui Starts the interactive UI mode.

npx playwright test --project=chromium Runs the tests only on Desktop Chrome.

npx playwright test example Runs the tests in a specific file.

npx playwright test --debug Runs the tests in debug mode.

npx playwright codegen Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

## test attributes

pour les conventions entre dev et testeurs : on peut aller modifier les
testIdAttributes pour playwright ici :

```
  use: {
    testIdAttribute: "data-test",
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
```

On evite le .locator et les classes autant que possible, on vise des trucs safe
et generiques

getByRole good, gestBuTesId good
