import { FullConfig } from '@playwright/test'
import { runtimeConfig } from './src/config/runtimeConfig'

async function globalSetup(config: FullConfig) {
  console.log(`Automation Test Store BDD suite`)
  console.log(`Base URL: ${runtimeConfig.baseURL}`)
  console.log(`Playwright version: ${config.version}`)
  console.log(`CI mode: ${process.env.CI ? 'enabled' : 'disabled'}`)
}

export default globalSetup
