import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import path from 'node:path'

const reportDir = 'allure-report'
const dataDir = path.join(reportDir, 'data')
const testCasesDir = path.join(dataDir, 'test-cases')
const widgetsDir = path.join(reportDir, 'widgets')

function hash(value) {
  return createHash('md5').update(value).digest('hex')
}

function emptyStat() {
  return {
    failed: 0,
    broken: 0,
    skipped: 0,
    passed: 0,
    unknown: 0,
    total: 0
  }
}

function addStatus(statistic, status) {
  const normalizedStatus = status && status in statistic ? status : 'unknown'
  statistic[normalizedStatus] += 1
  statistic.total += 1
}

function getLabel(testCase, name) {
  return testCase.labels?.find((label) => label.name === name)?.value
}

function getOrCreateChild(parent, name) {
  parent.children ??= []

  let child = parent.children.find((item) => item.name === name)

  if (!child) {
    child = {
      name,
      children: [],
      uid: hash(`${parent.uid}:${name}`)
    }
    parent.children.push(child)
  }

  return child
}

function updateStatistics(node, status) {
  node.statistic ??= emptyStat()
  addStatus(node.statistic, status)
}

async function readTestCases() {
  if (!existsSync(testCasesDir)) {
    return []
  }

  const fileNames = await readdir(testCasesDir)
  const testCaseFiles = fileNames.filter((fileName) => fileName.endsWith('.json'))

  return Promise.all(
    testCaseFiles.map(async (fileName) => {
      const content = await readFile(path.join(testCasesDir, fileName), 'utf8')

      return JSON.parse(content)
    })
  )
}

function buildBehaviors(testCases) {
  const root = {
    uid: hash('behaviors'),
    name: 'behaviors',
    children: []
  }

  for (const testCase of testCases.filter((item) => !item.hidden)) {
    const epic = getLabel(testCase, 'epic') ?? 'E2E'
    const feature = getLabel(testCase, 'feature') ?? 'General'
    const story = getLabel(testCase, 'story') ?? testCase.name

    const epicNode = getOrCreateChild(root, epic)
    const featureNode = getOrCreateChild(epicNode, feature)
    const storyNode = getOrCreateChild(featureNode, story)

    updateStatistics(epicNode, testCase.status)
    updateStatistics(featureNode, testCase.status)
    updateStatistics(storyNode, testCase.status)

    storyNode.children.push({
      name: testCase.name,
      uid: testCase.uid,
      parentUid: storyNode.uid,
      status: testCase.status,
      time: testCase.time,
      flaky: testCase.flaky,
      newFailed: testCase.newFailed,
      newPassed: testCase.newPassed,
      newBroken: testCase.newBroken,
      retriesCount: testCase.retriesCount,
      retriesStatusChange: testCase.retriesStatusChange,
      parameters: testCase.parameters,
      tags: testCase.extra?.tags ?? []
    })
  }

  return root
}

function buildWidget(tree) {
  const items = tree.children.map((item) => ({
    uid: item.uid,
    name: item.name,
    statistic: item.statistic ?? emptyStat()
  }))

  return {
    total: items.length,
    items
  }
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value)}\n`)
}

const testCases = await readTestCases()
const behaviors = buildBehaviors(testCases)

await mkdir(dataDir, { recursive: true })
await mkdir(widgetsDir, { recursive: true })

await writeJson(path.join(dataDir, 'behaviors.json'), behaviors)
await writeJson(path.join(widgetsDir, 'behaviors.json'), buildWidget(behaviors))
await writeJson(path.join(widgetsDir, 'packages.json'), { total: 0, items: [] })
await writeJson(path.join(widgetsDir, 'launches.json'), [])
