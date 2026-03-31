import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://staging.agenticagency.dev',
    headless: true,
    screenshot: 'only-on-failure',
    httpCredentials: {
      username: '',
      password: 'Spark2026',
    },
  },
});
