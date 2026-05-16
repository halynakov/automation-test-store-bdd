import { getCatalogCategory } from './catalog'

export const storefrontRoutes = {
  home: () => '/',
  cart: () => '/index.php?rt=checkout/cart',
  checkout: () => '/index.php?rt=checkout/shipping',
  accountLogin: () => '/index.php?rt=account/login',
  accountCreate: () => '/index.php?rt=account/create',
  forgottenPassword: () => '/index.php?rt=account/forgotten/password',
  addToCart: () => '/index.php?rt=r/product/product/addToCart',
  search: (keyword: string) => `/index.php?rt=product/search&keyword=${encodeURIComponent(keyword)}`,
  category: (categoryName: string) => `/index.php?rt=product/category&path=${getCatalogCategory(categoryName).path}`
}
