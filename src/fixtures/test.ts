import { expect } from '@playwright/test'
import { test as base } from 'playwright-bdd'
import { AccountPage } from '../pages/AccountPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { HomePage } from '../pages/HomePage'
import { ProductPage } from '../pages/ProductPage'
import { runtimeConfig } from '../config/runtimeConfig'
import { StorefrontClient } from '../api/storefront/StorefrontClient'
import { ProductDiscoveryService } from '../support/ProductDiscoveryService'
import { ScenarioContext } from '../support/scenarioContext'

export type AppPages = {
  account: AccountPage
  cart: CartPage
  checkout: CheckoutPage
  home: HomePage
  product: ProductPage
}

type FrameworkFixtures = {
  pages: AppPages
  scenarioContext: ScenarioContext
  appConfig: typeof runtimeConfig
  storefrontClient: StorefrontClient
  productDiscovery: ProductDiscoveryService
}

export const test = base.extend<FrameworkFixtures>({
  appConfig: async ({}, use) => {
    await use(runtimeConfig)
  },

  pages: async ({ page }, use) => {
    await use({
      account: new AccountPage(page),
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      home: new HomePage(page),
      product: new ProductPage(page)
    })
  },

  storefrontClient: async ({ page }, use) => {
    await use(new StorefrontClient(page.request))
  },

  productDiscovery: async ({ pages, scenarioContext, storefrontClient }, use) => {
    await use(new ProductDiscoveryService(pages, scenarioContext, storefrontClient))
  },

  scenarioContext: async ({}, use, testInfo) => {
    await use({
      id: `${testInfo.project.name}-${testInfo.parallelIndex}-${Date.now()}`,
      startedAt: new Date().toISOString(),
      selectedProducts: []
    })
  }
})

export { expect }
