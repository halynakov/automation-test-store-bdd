import { expect, Locator, Page } from '@playwright/test'

export class HeaderComponent {
  readonly logoLink: Locator
  readonly searchInput: Locator
  readonly searchButton: Locator
  readonly cartLink: Locator
  readonly cartItemCount: Locator
  readonly accountLink: Locator
  readonly homeLink: Locator

  constructor(page: Page) {
    this.logoLink = page.locator('a.logo').first()
    this.searchInput = page.locator('#filter_keyword')
    this.searchButton = page.locator('.button-in-search, [title="Go"]').first()
    this.cartLink = page.locator('a[href*="checkout/cart"]').first()
    this.cartItemCount = page.locator('.nav.topcart .dropdown-toggle span.label').first()
    this.accountLink = page
      .locator('a[href*="account/login"], a[href*="account/account"]')
      .filter({ hasText: /account|login/i })
      .first()
    this.homeLink = page
      .locator('#categorymenu a[href$="/"], #categorymenu a[href*="index.php?rt=index/home"]')
      .filter({ hasText: /^home$/i })
      .first()
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

  async openAccount(): Promise<boolean> {
    if (!(await this.accountLink.isVisible().catch(() => false))) {
      return false
    }

    await this.accountLink.click()

    return true
  }

  async openHome(): Promise<boolean> {
    if (await this.logoLink.isVisible().catch(() => false)) {
      await this.logoLink.click()
      return true
    }

    if (await this.homeLink.isVisible().catch(() => false)) {
      await this.homeLink.click()
      return true
    }

    return false
  }

  async expectCartItemCount(count: number) {
    await expect(this.cartItemCount).toContainText(String(count))
  }

  async expectSearchIsVisible() {
    await expect(this.searchInput).toBeVisible()
  }

  async expectCartLinkIsVisible() {
    await expect(this.cartLink).toBeVisible()
  }
}
