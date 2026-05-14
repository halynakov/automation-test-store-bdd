import { expect, Locator, Page } from '@playwright/test'
import { SelectedProduct } from '../../support/scenarioContext'

export class ProductListComponent {
  readonly productCards: Locator
  readonly productLinks: Locator
  readonly addToCartButtons: Locator
  readonly productTitle: Locator
  readonly productPrice: Locator
  readonly productDetailsAddToCartButton: Locator
  readonly pageContent: Locator

  constructor(page: Page) {
    this.productCards = page.locator(
      '.thumbnails.grid > div:has(a.prdocutname), .thumbnails.grid > div:has(a.productname)'
    )
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

  async selectFirstAvailableProduct(categoryName: string, quantity = 1): Promise<SelectedProduct> {
    const productCardsCount = await this.productCards.count()

    for (let index = 0; index < productCardsCount; index += 1) {
      const productCard = this.productCards.nth(index)
      const productLink = productCard.locator('a.prdocutname, a.productname').first()
      const addToCartButton = productCard.locator('a.productcart, a[title*="Add to Cart"]').first()

      if (!(await productLink.isVisible().catch(() => false))) {
        continue
      }

      if ((await addToCartButton.count()) === 0) {
        continue
      }

      const productName = (await productLink.getAttribute('title')) ?? (await productLink.textContent())
      const productId = await this.resolveProductId(productLink, addToCartButton)
      const price = await productCard
        .locator('.oneprice, .pricenew, .price')
        .first()
        .textContent()
        .catch(() => undefined)

      if (!productName || !productId) {
        continue
      }

      return {
        name: productName.trim(),
        category: categoryName,
        id: productId,
        price: price?.trim(),
        quantity
      }
    }

    throw new Error(`No addable product was found in category "${categoryName}".`)
  }

  async addProductToCart(productName: string) {
    const productCard = this.productCards.filter({ hasText: productName }).first()

    if (await productCard.isVisible().catch(() => false)) {
      await productCard.locator('a.productcart, a[title*="Add to Cart"]').first().click()
      return
    }

    await this.productDetailsAddToCartButton.or(this.addToCartButtons).first().click()
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

  async expectVisibleProductCountAtLeast(expectedCount: number) {
    await expect(async () => {
      const visibleCount = await this.countVisibleProducts()
      expect(visibleCount).toBeGreaterThanOrEqual(expectedCount)
    }).toPass()
  }

  private async countVisibleProducts(): Promise<number> {
    const productCardsCount = await this.productCards.count()
    let visibleCount = 0

    for (let index = 0; index < productCardsCount; index += 1) {
      if (
        await this.productCards
          .nth(index)
          .isVisible()
          .catch(() => false)
      ) {
        visibleCount += 1
      }
    }

    return visibleCount
  }

  private async resolveProductId(productLink: Locator, addToCartButton: Locator): Promise<number | undefined> {
    const dataId = await addToCartButton.getAttribute('data-id')
    const href = await productLink.getAttribute('href')
    const productId = dataId ?? href?.match(/product_id=(\d+)/)?.[1]

    return productId ? Number(productId) : undefined
  }
}
