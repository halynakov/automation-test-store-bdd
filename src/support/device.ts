import { Page } from '@playwright/test'

export function isMobileViewport(page: Page): boolean {
  const viewport = page.viewportSize()

  return Boolean(viewport && viewport.width <= 767)
}
