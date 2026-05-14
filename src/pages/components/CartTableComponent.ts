import { expect, Locator, Page } from '@playwright/test'

export class CartTableComponent {
  readonly checkoutButton: Locator
  readonly removeButtons: Locator
  readonly quantityInput: Locator
  readonly updateButton: Locator
  readonly cartTable: Locator
  readonly cartRows: Locator
  readonly emptyCartMessage: Locator

  constructor(page: Page) {
    this.checkoutButton = page.locator('#cart_checkout1, a[title="Checkout"], a:has-text("Checkout")').first()
    this.removeButtons = page.locator('a[href*="checkout/cart&remove"], button[name*="remove"], .fa-trash-o')
    this.quantityInput = page.locator('.cart-info table input[name*="quantity"]').first()
    this.updateButton = page.locator('#cart_update, button[title="Update"], button:has-text("Update")').first()
    this.cartTable = page.locator('.cart-info table').first()
    this.cartRows = page.locator('.cart-info table tr:visible')
    this.emptyCartMessage = page.getByText(/your shopping cart is empty/i)
  }

  async expectCartContains(productName: string) {
    await expect(this.cartRows.filter({ hasText: productName }).first()).toBeVisible()
  }

  async expectProductQuantity(productName: string, quantity: number) {
    const productRow = this.cartRows.filter({ hasText: productName }).first()
    const quantityInput = productRow.locator('input[name*="quantity"]').first()

    await expect(productRow).toBeVisible()
    await expect(quantityInput).toHaveValue(String(quantity))
  }

  async setFirstItemQuantity(quantity: number) {
    await this.quantityInput.fill(String(quantity))
    await this.updateButton.click()
  }

  async expectFirstItemQuantity(quantity: number) {
    await expect(this.quantityInput).toHaveValue(String(quantity))
  }

  async removeFirstItem() {
    await this.removeButtons.first().click()
  }

  async expectCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible()
  }
}
