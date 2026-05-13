# CI/CD Pipeline

## Pipeline Goal

The GitHub Actions pipeline validates the framework before executing browser
tests. It is designed to catch code quality issues, BDD generation issues, and
E2E regressions in one flow.

## Pipeline Stages

| Stage                | Command                   | Purpose                                            |
| -------------------- | ------------------------- | -------------------------------------------------- |
| Install dependencies | `npm ci`                  | Reproducible dependency installation from lockfile |
| Typecheck            | `npm run typecheck`       | Validate TypeScript contracts                      |
| Lint                 | `npm run lint`            | Enforce framework and Playwright rules             |
| Format check         | `npm run format:check`    | Enforce consistent code style                      |
| Generate BDD tests   | `npm run bddgen`          | Convert Gherkin scenarios into Playwright tests    |
| Execute suite        | `npx playwright test ...` | Run selected browser project and tag suite         |
| Upload artifacts     | GitHub artifact upload    | Store HTML report and raw test results             |

## Execution Modes

| Mode          | Trigger             | Default suite                                       |
| ------------- | ------------------- | --------------------------------------------------- |
| Pull request  | `pull_request`      | `@smoke` on desktop Chromium and mobile Chrome      |
| Push to main  | `push`              | `@smoke` on desktop Chromium and mobile Chrome      |
| Manual run    | `workflow_dispatch` | User-selected `smoke` or `regression`               |
| Scheduled run | `schedule`          | `@regression` on desktop Chromium and mobile Chrome |

## Configurable Inputs

- `suite`: `smoke` or `regression`
- `browser_project`: `desktop-chromium`, `desktop-firefox`, or `mobile-chrome`
- `base_url`: optional target environment override

## Artifacts

- `playwright-report/`: HTML report.
- `test-results/`: traces, screenshots, videos, and custom failure attachments.
- `test-results/junit.xml`: CI-friendly JUnit report.

## Diploma Relevance

The pipeline demonstrates CI/CD integration by combining static validation,
BDD test generation, browser execution, and artifact publication.
