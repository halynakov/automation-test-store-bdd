import { expect, Locator, Page } from '@playwright/test'

export class CartTableComponent {
  readonly checkoutButton: Locator
  readonly removeButtons: Locator
  readonly quantityInput: Locator
  readonly updateButton: Locator
  readonly cartTable: Locator
  readonly cartRows: Locator
  readonly emptyCartMessage: Locator
  readonly totalsTable: Locator
  readonly cartTotalRows: Locator

  constructor(page: Page) {
    this.checkoutButton = page.locator('#cart_checkout1, a[title="Checkout"], a:has-text("Checkout")').first()
    this.removeButtons = page.locator('a[href*="checkout/cart&remove"], button[name*="remove"], .fa-trash-o')
    this.quantityInput = page.locator('.cart-info table input[name*="quantity"]').first()
    this.updateButton = page.locator('#cart_update, button[title="Update"], button:has-text("Update")').first()
    this.cartTable = page.locator('.cart-info table').first()
    this.cartRows = page.locator('.cart-info table tr:visible')
    this.emptyCartMessage = page.getByText(/your shopping cart is empty/i)
    this.totalsTable = page.locator('#totals_table, .confirm_total table').first()
    this.cartTotalRows = page.locator('#totals_table tr, .confirm_total table tr')
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

  async expectFirstItemHasUnitPrice() {
    await expect(this.firstProductRowCells().nth(3)).toContainText(/\$\d/)
  }

  async expectFirstItemRowTotalMatchesQuantity(quantity: number) {
    const unitPrice = await this.moneyFromCell(this.firstProductRowCells().nth(3))
    const rowTotal = await this.moneyFromCell(this.firstProductRowCells().nth(5))

    expect(rowTotal).toBeCloseTo(unitPrice * quantity, 2)
  }

  async expectCartTotalsAreDisplayed() {
    await expect(this.totalsTable).toContainText(/Sub-Total:/)
    await expect(this.totalsTable).toContainText(/Total:/)
  }

  async expectCartTotalEqualsSubtotalPlusShipping() {
    const subtotal = await this.totalByLabel('Sub-Total:')
    const shipping = await this.totalByLabel('Flat Shipping Rate:')
    const total = await this.totalByLabel('Total:')

    expect(total).toBeCloseTo(subtotal + shipping, 2)
  }

  async expectCartTotalIsGreaterThanSubtotal() {
    const subtotal = await this.totalByLabel('Sub-Total:')
    const total = await this.totalByLabel('Total:')

    expect(total).toBeGreaterThan(subtotal)
  }

  async removeFirstItem() {
    await this.removeButtons.first().click()
  }

  async expectCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible()
  }

  private firstProductRowCells(): Locator {
    return this.cartRows.nth(1).locator('td')
  }

  private async moneyFromCell(cell: Locator): Promise<number> {
    return this.parseMoney(await cell.textContent())
  }

  private async totalByLabel(label: string): Promise<number> {
    await expect(this.totalsTable).toContainText(/Sub-Total:/)
    let total: number | undefined

    await expect(async () => {
      const rowCount = await this.cartTotalRows.count()

      for (let index = 0; index < rowCount; index += 1) {
        const row = this.cartTotalRows.nth(index)
        const labelText = (await row.locator('td').first().textContent())?.trim()

        if (labelText === label) {
          total = this.parseMoney(await row.locator('td').last().textContent())
          return
        }
      }

      throw new Error(`Cart total row "${label}" was not found.`)
    }).toPass()

    return total as number
  }

  private parseMoney(value: string | null): number {
    const normalizedValue = value?.match(/\$([\d,.]+)/)?.[1].replace(/,/g, '')

    if (!normalizedValue) {
      throw new Error(`Could not parse money value from "${value}".`)
    }

    return Number(normalizedValue)
  }
}
