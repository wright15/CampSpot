const assert = require('assert');
const { expect } = require('@playwright/test');
const { Before, After, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60000);

let browser;
let context;
let page;

Before(async () => {
    // Launch the Chromium browser
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    // Close the browser and its associated context
    await context.close();
    await browser.close();
  });

Given('The user navigates to {string}', async (url) => {
    await page.goto(url);
    await page.waitForTimeout(5000);
  });



/*
Location 
feature 
step 
defintions
*/
Then('Where do you want to go is visible', async function () {
    const inputElement = await page.locator('input[placeholder="Where do you want to go?"]');
    await expect(inputElement).toHaveAttribute('placeholder', 'Where do you want to go?');
  });

When('Entering letters AU', async function () {
    await page.getByPlaceholder('Where do you want to go?').click();
    await page.getByPlaceholder('Where do you want to go?').fill('au');

  });

Then('Austin Texas autocompletes', async function () {
    await page.getByRole('button', { name: 'Austin, Texas' }).click();
  });



/*
Dates 
feature 
step 
defintions
*/
When('The Dates field is selected', async function () {
    await page.getByLabel('Check In Date: Add Dates').click();
});

Then('The calendar should display the current and next month', async function () {
    const now = new Date();
    const thisMonthYear = now.getFullYear();
    const thisMonth = now.toLocaleString('default', { month: 'long' });

    now.setMonth(now.getMonth() + 1);
    const nextMonth = now.toLocaleString('default', { month: 'long' });
    const nextMonthYear = now.getFullYear();

    const thisMonthselector = 'body > app-root > div > main > search > main > section.home-hero-fall-2023 > div > div > div.home-hero-search-form > div.home-hero-search-form-dates > aggredator > div > div.aggredator-dropdown.mod-show-2-months.mod-short > section.aggredator-dropdown-calendar.app-dropdown-calendar > div.aggredator-dropdown-calendar-month.app-month-9 > h3';
    const thisMonthelement = await page.$(thisMonthselector);
    const thisMonthelementText = await thisMonthelement.textContent();
    expect(thisMonthelementText).toContain(`${thisMonth} ${thisMonthYear}`);

    const nextMonthSelector = 'body > app-root > div > main > search > main > section.home-hero-fall-2023 > div > div > div.home-hero-search-form > div.home-hero-search-form-dates > aggredator > div > div.aggredator-dropdown.mod-show-2-months.mod-short > section.aggredator-dropdown-calendar.app-dropdown-calendar > div.aggredator-dropdown-calendar-month.app-month-10 > h3';
    const nextMonthElement = await page.$(nextMonthSelector);
    const nextMonthElementText = await nextMonthElement.textContent();
    expect(nextMonthElementText).toContain(`${nextMonth} ${nextMonthYear}`);
  });

  Then('I can scroll to previous and future months', async function () {
    await page.getByLabel('Previous Month').click();
    await page.getByLabel('Next Month').click();
    await page.getByLabel('Next Month').click();
  });



/*
Guests 
feature 
step 
defintions
*/
  Then('Guest is defaulted to {int} Adults', async function (int) {
    const guestsSelector = 'body > app-root > div > main > search > main > section.home-hero-fall-2023 > div > div > div.home-hero-search-form > div.home-hero-search-form-guests > guest-categories-selectors > div > button > div'
    const guestsElement = await page.$(guestsSelector);
    const guestsElementText = await guestsElement.textContent();
    expect(guestsElementText).toContain(`${int} Adults`);
    });

  When('Guests is selected', async function () {
    await page.getByRole('button', { name: '2 Adults' }).click();
  });

  Then('Options should display allowing, update the number of Adults, Children, and Pets', async function () {
    await page.getByRole('button', { name: '2 Adults' }).click();
    await page.getByRole('button', { name: 'Increase' }).first().click();
    await page.getByRole('button', { name: 'Increase' }).nth(1).click();
    await page.getByRole('button', { name: 'Increase' }).nth(2).click();
  });
