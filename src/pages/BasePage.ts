import { expect, Locator, Page } from '@playwright/test'

export abstract class BasePage {
  protected readonly page: Page

  protected constructor(page: Page) {
    this.page = page
  }

  async expectPageTitle(titlePart: string | RegExp) {
    await expect(this.page).toHaveTitle(titlePart)
  }

  protected async clickFirstVisible(...locators: Locator[]) {
    const deadline = Date.now() + 10_000

    while (Date.now() < deadline) {
      for (const locator of locators) {
        const count = await locator.count().catch(() => 0)

        for (let index = 0; index < count; index += 1) {
          const candidate = locator.nth(index)

          if (await candidate.isVisible().catch(() => false)) {
            await candidate.click()
            return
          }
        }
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 250)
      })
    }

    throw new Error('No visible locator was found for click action')
  }
}
