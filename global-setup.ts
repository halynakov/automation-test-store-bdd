import { FullConfig } from '@playwright/test'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { runtimeConfig } from './src/config/runtimeConfig'

async function globalSetup(config: FullConfig) {
  await rm('allure-results', { recursive: true, force: true })
  await mkdir('allure-results', { recursive: true })

  await writeFile(
    'allure-results/environment.properties',
    [
      `Base URL=${runtimeConfig.baseURL}`,
      `Playwright=${config.version}`,
      `Node.js=${process.version}`,
      `CI=${process.env.CI ? 'enabled' : 'disabled'}`
    ].join('\n')
  )

  await writeFile(
    'allure-results/executor.json',
    JSON.stringify(
      {
        name: process.env.CI ? 'GitHub Actions' : 'Local machine',
        type: process.env.CI ? 'github' : 'local',
        url: process.env.GITHUB_SERVER_URL,
        buildName: process.env.GITHUB_WORKFLOW,
        buildUrl:
          process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
            ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
            : undefined
      },
      null,
      2
    )
  )

  console.log(`Automation Test Store BDD suite`)
  console.log(`Base URL: ${runtimeConfig.baseURL}`)
  console.log(`Playwright version: ${config.version}`)
  console.log(`CI mode: ${process.env.CI ? 'enabled' : 'disabled'}`)
}

export default globalSetup
