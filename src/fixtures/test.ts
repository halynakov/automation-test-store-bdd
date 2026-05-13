import { expect } from '@playwright/test'
import { test as base } from 'playwright-bdd'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { HomePage } from '../pages/HomePage'
import { ProductPage } from '../pages/ProductPage'
import { runtimeConfig } from '../config/runtimeConfig'
import { StorefrontClient } from '../api/storefront/StorefrontClient'

export type AppPages = {
  cart: CartPage
  checkout: CheckoutPage
  home: HomePage
  product: ProductPage
}

export type ScenarioContext = {
  id: string
  startedAt: string
}

type FrameworkFixtures = {
  pages: AppPages
  scenarioContext: ScenarioContext
  appConfig: typeof runtimeConfig
  storefrontClient: StorefrontClient
}

export const test = base.extend<FrameworkFixtures>({
  appConfig: async ({}, use) => {
    await use(runtimeConfig)
  },

  pages: async ({ page }, use) => {
    await use({
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      home: new HomePage(page),
      product: new ProductPage(page)
    })
  },

  storefrontClient: async ({ page }, use) => {
    await use(new StorefrontClient(page.request))
  },

  scenarioContext: async ({}, use, testInfo) => {
    await use({
      id: `${testInfo.project.name}-${testInfo.parallelIndex}-${Date.now()}`,
      startedAt: new Date().toISOString()
    })
  }
})

export { expect }
