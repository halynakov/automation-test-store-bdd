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
| Generate reports     | Playwright and Allure     | Create technical and BDD-friendly HTML reports     |
| Upload artifacts     | GitHub artifact upload    | Store reports, traces, videos, and raw results     |
| Publish Pages report | GitHub Pages              | Publish the combined Allure report from `main`     |

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
- `allure-report/`: BDD-friendly HTML report.
- `allure-results/`: raw Allure result files for report regeneration.
- GitHub Pages: public Allure report for the latest successful push to `main`.

## Reporting Strategy

The framework produces several report formats because they serve different
audiences:

- Playwright HTML report is used for technical debugging with traces,
  screenshots, and videos.
- JUnit XML is used for CI compatibility.
- Allure Report is used for BDD-friendly presentation of features, scenarios,
  steps, durations, and failure attachments.
- GitHub Pages is used to present the latest combined Allure report without a
  local `127.0.0.1` server.

ReportPortal remains a future enterprise-level extension for centralized launch
history, flaky analysis, and dashboards when a dedicated ReportPortal server is
available.

## Diploma Relevance

The pipeline demonstrates CI/CD integration by combining static validation,
BDD test generation, browser execution, artifact publication, and readable
test reporting.
