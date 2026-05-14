import { defineConfig, devices } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'
import 'dotenv/config'
import { buildReporters } from './src/config/reporters'
import { runtimeConfig } from './src/config/runtimeConfig'

const bddTestDir = defineBddConfig({
  features: 'tests/bdd/**/*.feature',
  steps: ['src/steps/**/*.steps.ts', 'src/hooks/**/*.ts', 'src/fixtures/test.ts']
})

export default defineConfig({
  testDir: bddTestDir,
  globalSetup: './global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? runtimeConfig.ciRetries : runtimeConfig.localRetries,
  workers: process.env.CI ? runtimeConfig.ciWorkers : runtimeConfig.localWorkers,
  timeout: runtimeConfig.testTimeoutMs,
  expect: {
    timeout: runtimeConfig.expectTimeoutMs
  },
  reporter: buildReporters(),
  use: {
    baseURL: runtimeConfig.baseURL,
    actionTimeout: runtimeConfig.actionTimeoutMs,
    navigationTimeout: runtimeConfig.navigationTimeoutMs,
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    }
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      }
    },
    {
      name: 'desktop-firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1440, height: 900 }
      }
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7']
      }
    }
  ]
})
