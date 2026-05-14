import type { ReporterDescription } from '@playwright/test'
import { runtimeConfig } from './runtimeConfig'

const htmlReporter: ReporterDescription = ['html', { open: 'never', outputFolder: 'playwright-report' }]
const junitReporter: ReporterDescription = ['junit', { outputFile: 'test-results/junit.xml' }]

type ReportPortalAttribute = {
  key?: string
  value: string
}

type ReportPortalConfig = {
  apiKey: string
  endpoint: string
  project: string
  launch: string
  attributes: ReportPortalAttribute[]
  description: string
  includeTestSteps: boolean
  uploadVideo: boolean
  uploadTrace: boolean
  restClientConfig: {
    timeout: number
    maxBodyLength: number
    maxContentLength: number
    retryDelay: number
    retries: number
  }
}

function readEnv(name: string) {
  const value = process.env[name]?.trim()

  return value && value.length > 0 ? value : undefined
}

function buildReportPortalReporter(): ReporterDescription | undefined {
  if (!process.env.CI || process.argv.includes('--list')) {
    return undefined
  }

  const apiKey = readEnv('RP_API_KEY')
  const endpoint = readEnv('RP_ENDPOINT')
  const project = readEnv('RP_PROJECT')

  if (!apiKey || !endpoint || !project) {
    return undefined
  }

  const suite = readEnv('TEST_SUITE') ?? 'smoke'
  const browserProject = readEnv('PLAYWRIGHT_PROJECT') ?? 'desktop-chromium'
  const eventName = readEnv('GITHUB_EVENT_NAME') ?? 'manual'
  const branch = readEnv('GITHUB_REF_NAME') ?? 'local'
  const commit = readEnv('GITHUB_SHA')?.slice(0, 7) ?? 'local'
  const runNumber = readEnv('GITHUB_RUN_NUMBER') ?? 'local'

  const attributes: ReportPortalAttribute[] = [
    { key: 'framework', value: 'playwright-bdd' },
    { key: 'suite', value: suite },
    { key: 'project', value: browserProject },
    { key: 'event', value: eventName },
    { key: 'branch', value: branch },
    { key: 'commit', value: commit },
    { key: 'baseUrl', value: runtimeConfig.baseURL },
    { key: 'ci', value: 'github-actions' }
  ]

  const reportPortalConfig: ReportPortalConfig = {
    apiKey,
    endpoint,
    project,
    launch: `Automation Test Store BDD | ${eventName} | ${suite} | ${browserProject} | run ${runNumber}`,
    attributes,
    description: `${suite} suite on ${browserProject} against ${runtimeConfig.baseURL}`,
    includeTestSteps: true,
    uploadVideo: true,
    uploadTrace: true,
    restClientConfig: {
      timeout: 90_000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      retryDelay: 3_000,
      retries: 3
    }
  }

  return ['@reportportal/agent-js-playwright', reportPortalConfig]
}

export function buildReporters(): ReporterDescription[] {
  const reporters: ReporterDescription[] = process.env.CI
    ? [['list'], htmlReporter, ['github'], junitReporter]
    : [['list'], htmlReporter]

  const reportPortalReporter = buildReportPortalReporter()

  if (reportPortalReporter) {
    reporters.push(reportPortalReporter)
  }

  return reporters
}
