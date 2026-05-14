import { Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { CartTableComponent } from './components/CartTableComponent'
import { storefrontRoutes } from '../support/routes'
import { SelectedProduct } from '../support/scenarioContext'

export class CartPage extends BasePage {
  readonly cartTable: CartTableComponent

  constructor(page: Page) {
    super(page)
    this.cartTable = new CartTableComponent(page)
  }

  async expectCartContains(productName: string) {
    await this.cartTable.expectCartContains(productName)
  }

  async expectCartContainsSelectedProducts(products: SelectedProduct[]) {
    for (const product of products) {
      await this.cartTable.expectCartContains(product.name)
      await this.cartTable.expectProductQuantity(product.name, product.quantity)
    }
  }

  async setFirstItemQuantity(quantity: number) {
    await this.cartTable.setFirstItemQuantity(quantity)
  }

  async expectFirstItemQuantity(quantity: number) {
    await this.cartTable.expectFirstItemQuantity(quantity)
  }

  async removeFirstItem() {
    await this.cartTable.removeFirstItem()
  }

  async expectCartIsEmpty() {
    await this.cartTable.expectCartIsEmpty()
  }

  async proceedToCheckout() {
    if (!(await this.cartTable.checkoutButton.isVisible().catch(() => false))) {
      await this.page.goto(storefrontRoutes.checkout())
      return
    }

    await this.cartTable.checkoutButton.click()
  }
}
