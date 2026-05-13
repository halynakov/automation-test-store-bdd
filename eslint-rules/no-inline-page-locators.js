const locatorFactoryNames = new Set([
  'locator',
  'getByAltText',
  'getByLabel',
  'getByPlaceholder',
  'getByRole',
  'getByTestId',
  'getByText',
  'getByTitle',
  'frameLocator'
])

function getPropertyName(memberExpression) {
  if (memberExpression.property.type === 'Identifier') {
    return memberExpression.property.name
  }

  if (memberExpression.property.type === 'Literal') {
    return String(memberExpression.property.value)
  }

  return undefined
}

function isPageReference(node) {
  if (!node) {
    return false
  }

  if (node.type === 'Identifier' && node.name === 'page') {
    return true
  }

  return node.type === 'MemberExpression' && node.object.type === 'ThisExpression' && getPropertyName(node) === 'page'
}

const noInlinePageLocatorsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow root page locator factories outside constructors in Page Objects and components'
    },
    messages: {
      noInlinePageLocator:
        'Move this root page locator to the class constructor and use the initialized Locator field in methods.'
    },
    schema: []
  },
  create(context) {
    const methodStack = []

    return {
      MethodDefinition(node) {
        methodStack.push(node.kind === 'constructor')
      },

      'MethodDefinition:exit'() {
        methodStack.pop()
      },

      CallExpression(node) {
        const currentMethodIsConstructor = methodStack[methodStack.length - 1] === true

        if (currentMethodIsConstructor || node.callee.type !== 'MemberExpression') {
          return
        }

        const propertyName = getPropertyName(node.callee)

        if (!propertyName || !locatorFactoryNames.has(propertyName)) {
          return
        }

        if (!isPageReference(node.callee.object)) {
          return
        }

        context.report({
          node,
          messageId: 'noInlinePageLocator'
        })
      }
    }
  }
}

export default noInlinePageLocatorsRule
