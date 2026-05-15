import type { ReporterDescription } from '@playwright/test'

const htmlReporter: ReporterDescription = ['html', { open: 'never', outputFolder: 'playwright-report' }]
const junitReporter: ReporterDescription = ['junit', { outputFile: 'test-results/junit.xml' }]
const allureReporter: ReporterDescription = [
  'allure-playwright',
  {
    outputFolder: 'allure-results',
    detail: true,
    suiteTitle: true
  }
]

export function buildReporters(): ReporterDescription[] {
  return process.env.CI
    ? [['list'], htmlReporter, ['github'], junitReporter, allureReporter]
    : [['list'], htmlReporter, allureReporter]
}
