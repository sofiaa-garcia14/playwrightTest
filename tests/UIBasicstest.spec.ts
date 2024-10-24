import { expect, test } from "@playwright/test";

test("First Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.google.com/maps");
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://www.google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("Third Playwright test", async ({ page }) => {
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshetty");
  await page.locator("#password").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  /*  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent()); */
  const allTitles = await cardTitles.allTextContents();

  console.log(allTitles);
});

test("Ingreso a Meli", async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.ar/");
  await page.locator("#cb1-edit").fill("Apple Watch");
  await page.locator("button[type='submit']").click();
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  /* await page.pause(); */
});

test("Child windows hadl", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = (await newPage.locator(".red").textContent()) as string;
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").fill(domain);
  await page.pause();
  console.log(await page.locator("#username").textContent());
});
