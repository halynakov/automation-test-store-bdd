const noOnlyTagRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow @only tag in Gherkin feature files'
    },
    messages: {
      noOnlyTag: 'Remove @only before committing feature files.'
    },
    schema: []
  },
  create(context) {
    const filename = context.getFilename()
    if (!filename.endsWith('.feature')) {
      return {}
    }

    return {
      Program(node) {
        const sourceCode = context.getSourceCode()
        const text = sourceCode.getText()
        const match = /@only\b/.exec(text)

        if (match) {
          context.report({
            node,
            messageId: 'noOnlyTag',
            loc: sourceCode.getLocFromIndex(match.index)
          })
        }
      }
    }
  }
}

export default noOnlyTagRule
