import { expect, Locator, Page } from '@playwright/test'

export class ProductListComponent {
  readonly productLinks: Locator
  readonly addToCartButtons: Locator
  readonly productTitle: Locator
  readonly productPrice: Locator
  readonly productDetailsAddToCartButton: Locator
  readonly pageContent: Locator

  constructor(page: Page) {
    this.productLinks = page.locator('a.prdocutname, a.productname')
    this.addToCartButtons = page.locator(
      'a.productcart, a[title*="Add to Cart"], button[title*="Add to Cart"], a:has-text("Add to Cart"), button:has-text("Add to Cart")'
    )
    this.productTitle = page.locator('h1 .maintext, h1, .maintext').first()
    this.productPrice = page.locator('.productfilneprice, .productprice, .oneprice, .pricenew, .price').first()
    this.productDetailsAddToCartButton = page.locator('#product_add_to_cart, button:has-text("Add to Cart")').first()
    this.pageContent = page.locator('body')
  }

  productByName(productName: string): Locator {
    return this.productLinks
      .filter({ hasText: productName })
      .or(this.productTitle.filter({ hasText: productName }))
      .first()
  }

  async openProduct(productName: string) {
    const productLink = this.productLinks.filter({ hasText: productName }).first()

    if (await productLink.isVisible().catch(() => false)) {
      await productLink.click()
    }

    await expect(this.productTitle).toContainText(productName)
  }

  async expectProductIsVisible(productName: string) {
    await expect(this.productByName(productName)).toBeVisible()
  }

  async expectProductIsNotVisible(productName: string) {
    await expect(this.productByName(productName)).toBeHidden()
  }

  async expectNoSearchResults() {
    await expect(this.pageContent).toContainText(/no product|no results|matches the search/i)
  }

  async expectProductDetails(productName: string) {
    await expect(this.productTitle).toContainText(productName)
    await expect(this.productPrice).toBeVisible()
    await expect(this.productDetailsAddToCartButton.or(this.addToCartButtons).first()).toBeVisible()
  }

  async expectProductPriceIsDisplayed() {
    await expect(this.productPrice).toBeVisible()
  }

  async expectAddToCartIsAvailable() {
    await expect(this.productDetailsAddToCartButton.or(this.addToCartButtons).first()).toBeVisible()
  }
}
