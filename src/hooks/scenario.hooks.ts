import { After, AfterStep, Before } from '../steps/bdd'
import { logger } from '../support/logger'

Before(async ({ $bddContext, scenarioContext }) => {
  logger.info(`Scenario started: ${$bddContext.testInfo.title} (${scenarioContext.id})`)
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
