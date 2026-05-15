import * as allure from 'allure-js-commons'
import { After, AfterStep, Before } from '../steps/bdd'
import { logger } from '../support/logger'

Before(async ({ $bddContext, scenarioContext }) => {
  const title = $bddContext.testInfo.title
  const tags = $bddContext.testInfo.tags.map((tag) => tag.replace(/^@/, ''))
  const domain = tags.find((tag) => ['catalog', 'cart', 'checkout', 'journey'].includes(tag))

  await allure.epic('Automation Test Store E2E')
  await allure.feature(domain ? domain[0].toUpperCase() + domain.slice(1) : 'General')
  await allure.story(title)
  await allure.owner('Halyna Kovalenko')
  await allure.layer('e2e')

  logger.info(`Scenario started: ${title} (${scenarioContext.id})`)
})

AfterStep(async ({ $bddContext }) => {
  logger.debug(`Step completed: ${$bddContext.step.title}`)
})

After(async ({ page, $bddContext }) => {
  const testInfo = $bddContext.testInfo
  const failed = testInfo.status !== testInfo.expectedStatus
  const title = $bddContext.testInfo.title

  if (!failed) {
    logger.info(`Scenario passed: ${title}`)
    return
  }

  const screenshot = await page.screenshot({ fullPage: true })
  await testInfo.attach('failure-full-page-screenshot', {
    body: screenshot,
    contentType: 'image/png'
  })

  logger.error(`Scenario failed: ${title}`)
})
