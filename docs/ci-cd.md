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
| Publish launch       | ReportPortal reporter     | Send CI execution metadata and test results        |

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

## ReportPortal

Local runs use only the Playwright HTML report. CI runs can additionally publish
results to ReportPortal through `@reportportal/agent-js-playwright`.

ReportPortal is enabled only when these values are configured:

- `RP_API_KEY`: GitHub Secret.
- `RP_ENDPOINT`: GitHub Secret or Variable.
- `RP_PROJECT`: GitHub Secret or Variable.

The launch name includes the GitHub event, suite tag, Playwright project, and
workflow run number. Launch attributes include branch, commit, base URL, suite,
browser project, and `framework=playwright-bdd`.

If ReportPortal is not configured, the pipeline still runs and keeps the
Playwright HTML/JUnit artifacts. This keeps the reporting layer optional and
prevents external infrastructure from blocking framework validation.

## Diploma Relevance

The pipeline demonstrates CI/CD integration by combining static validation,
BDD test generation, browser execution, artifact publication, and optional
enterprise-style centralized reporting.
