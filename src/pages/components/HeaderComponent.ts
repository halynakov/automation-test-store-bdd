import { expect, Locator, Page } from '@playwright/test'

export class HeaderComponent {
  readonly logoLink: Locator
  readonly searchInput: Locator
  readonly searchButton: Locator
  readonly cartLink: Locator
  readonly cartItemCount: Locator

  constructor(page: Page) {
    this.logoLink = page.locator('a.logo').first()
    this.searchInput = page.locator('#filter_keyword')
    this.searchButton = page.locator('.button-in-search, [title="Go"]').first()
    this.cartLink = page.locator('a[href*="checkout/cart"]').first()
    this.cartItemCount = page.locator('.nav.topcart .dropdown-toggle span.label').first()
  }

  async expectLogoVisible() {
    await expect(this.logoLink).toBeVisible()
  }

  async submitSearch(keyword: string): Promise<boolean> {
    if (!(await this.searchInput.isVisible().catch(() => false))) {
      return false
    }

    await this.searchInput.fill(keyword)
    await this.searchButton.click()

    return true
  }

  async openCart(): Promise<boolean> {
    if (!(await this.cartLink.isVisible().catch(() => false))) {
      return false
    }

    await this.cartLink.click()

    return true
  }

  async expectCartItemCount(count: number) {
    await expect(this.cartItemCount).toContainText(String(count))
  }
}
