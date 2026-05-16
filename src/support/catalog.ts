export type CatalogProduct = {
  id: number
  name: string
  category: CatalogCategoryName
}

export type CatalogCategory = {
  name: string
  path: string
  selectValue: string
}

export const catalogCategories = {
  Makeup: {
    name: 'Makeup',
    path: '36',
    selectValue: '0,36'
  },
  Skincare: {
    name: 'Skincare',
    path: '43',
    selectValue: '0,43'
  },
  Fragrance: {
    name: 'Fragrance',
    path: '49',
    selectValue: '0,49'
  },
  'Hair Care': {
    name: 'Hair Care',
    path: '52',
    selectValue: '0,52'
  },
  Books: {
    name: 'Books',
    path: '65',
    selectValue: '0,65'
  }
} as const

export type CatalogCategoryName = keyof typeof catalogCategories

export const catalogProducts = {
  'Skinsheen Bronzer Stick': {
    id: 50,
    name: 'Skinsheen Bronzer Stick',
    category: 'Makeup'
  },
  'Tropiques Minerale Loose Bronzer': {
    id: 53,
    name: 'Tropiques Minerale Loose Bronzer',
    category: 'Makeup'
  },
  'Flash Bronzer Body Gel': {
    id: 67,
    name: 'Flash Bronzer Body Gel',
    category: 'Skincare'
  }
} as const satisfies Record<string, CatalogProduct>

export function getCatalogProduct(productName: string): CatalogProduct {
  const product = catalogProducts[productName as keyof typeof catalogProducts]

  if (!product) {
    throw new Error(`Product "${productName}" is not configured in catalog test data.`)
  }

  return product
}

export function getCatalogCategory(categoryName: string): CatalogCategory {
  const category = catalogCategories[categoryName as CatalogCategoryName]

  if (!category) {
    throw new Error(`Category "${categoryName}" is not configured in catalog test data.`)
  }

  return category
}
