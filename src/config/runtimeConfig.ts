type RuntimeConfig = {
  baseURL: string
  ciRetries: number
  localRetries: number
  actionTimeoutMs: number
  navigationTimeoutMs: number
  expectTimeoutMs: number
  testTimeoutMs: number
  ciWorkers: number
  localWorkers: string
}

function readNumber(name: string, fallback: number) {
  const rawValue = process.env[name]
  const parsed = rawValue ? Number(rawValue) : Number.NaN

  return Number.isFinite(parsed) ? parsed : fallback
}

export const runtimeConfig: RuntimeConfig = {
  baseURL: process.env.BASE_URL ?? 'https://automationteststore.com',
  ciRetries: readNumber('CI_RETRIES', 1),
  localRetries: readNumber('LOCAL_RETRIES', 0),
  actionTimeoutMs: readNumber('ACTION_TIMEOUT_MS', 15_000),
  navigationTimeoutMs: readNumber('NAVIGATION_TIMEOUT_MS', 30_000),
  expectTimeoutMs: readNumber('EXPECT_TIMEOUT_MS', 10_000),
  testTimeoutMs: readNumber('TEST_TIMEOUT_MS', 90_000),
  ciWorkers: readNumber('CI_WORKERS', 2),
  localWorkers: process.env.LOCAL_WORKERS ?? '50%'
}
