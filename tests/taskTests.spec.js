// tests/taskTests.spec.js
const { test, expect } = require('@playwright/test');

const LOGIN_URL = 'https://animated-gingersnap-8cf7f2.netlify.app/';
const credentials = { username: 'admin', password: 'password123' };

const testData = [
  { app: 'Web Application', task: 'Implement user authentication', column: 'To Do', tags: ['Feature', 'High Priority'] },
  { app: 'Web Application', task: 'Fix navigation bug', column: 'To Do', tags: ['Bug'] },
  { app: 'Web Application', task: 'Design system updates', column: 'In Progress', tags: ['Design'] },
  { app: 'Mobile Application', task: 'Push notification system', column: 'To Do', tags: ['Feature'] },
  { app: 'Mobile Application', task: 'Offline mode', column: 'In Progress', tags: ['Feature', 'High Priority'] },
  { app: 'Mobile Application', task: 'App icon design', column: 'Done', tags: ['Design'] }
];

test.describe('Task Board Verification', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('input[type="text"]', credentials.username);
    await page.fill('input[type="password"]', credentials.password);
    await page.click('button:has-text("Sign in")');
    await page.waitForSelector('text=Web Application');
  });

  for (const data of testData) {
    test(`Verify task "${data.task}" in ${data.app}`, async ({ page }) => {
      await page.click(`text=${data.app}`);

      const column = page.locator(`text=${data.column}`).locator('..');
      await expect(column).toBeVisible();

      const taskCard = column.locator(`h3:has-text("${data.task}")`);
      await expect(taskCard).toBeVisible();

      const cardContainer = taskCard.locator('..');
      for (const tag of data.tags) {
        const tagLocator = cardContainer.locator(`span:has-text("${tag}")`);
        await expect(tagLocator).toBeVisible();
      }
    });
  }
});