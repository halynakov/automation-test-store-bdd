import { Locator, Page } from '@playwright/test'
import { getCatalogCategory } from '../../support/catalog'

export class CategoryMenuComponent {
  readonly categoryLinks: Locator
  readonly mobileCategorySelect: Locator

  constructor(page: Page) {
    this.categoryLinks = page.locator(
      '#categorymenu a[href*="product/category"], .categorymenu a[href*="product/category"]'
    )
    this.mobileCategorySelect = page.locator('select#category_id, select[name="category_id"]').first()
  }

  async openCategory(categoryName: string): Promise<boolean> {
    const categoryLink = this.categoryLinks.filter({ hasText: categoryName }).first()

    if (await categoryLink.isVisible().catch(() => false)) {
      await categoryLink.click()
      return true
    }

    if (await this.mobileCategorySelect.isVisible().catch(() => false)) {
      await this.mobileCategorySelect.selectOption({ value: getCatalogCategory(categoryName).selectValue })
      return true
    }

    return false
  }
}
