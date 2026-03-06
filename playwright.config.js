// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',     // folder where your test files are
  timeout: 60000,         // global timeout for each test
  use: {
    headless: false,      // run in headed mode by default
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  },
});