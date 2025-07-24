# REM Waste Automation Task

This project uses [Playwright](https://playwright.dev/) to automate API and UI testing for the Practice Expandtesting application. It demonstrates login and CRUD functionality testing and note management features via API, as well as UI tests.

## Project Structure

```
rem-waste-automationTask/
├── package.json
├── playwright.config.ts
├── tests/
│   ├── API_test.spec.ts
│   └── UI_test.spec.ts
├── playwright-report/
│   └── index.html
├── test-results/
```

- **package.json**: Project dependencies and scripts.
- **playwright.config.ts**: Playwright configuration.
- **tests/**: Contains all test files.
  - `API_test.spec.ts`: API tests for login, note creation, retrieval, update, and deletion.
  - `UI_test.spec.ts`: UI tests Login with valid/invalid credentials, Creating a new note, Editing an existing     note and Deleting the notes.
- **playwright-report/**: HTML reports generated after test runs.
- **test-results/**: Raw test result files.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository or download the project files.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Install Playwright browsers:
   ```powershell
   npx playwright install
   ```

### Running Tests

- **Run all tests:**
  ```powershell
  npx playwright test
  ```
- **Run a specific test file:**
  ```powershell
  npx playwright test API_test.spec.ts
  ```
- **Run a test file on specific browser:**
  ```powershell
  npx playwright test UI_test.spec.ts --project=chromium
  ```

### Viewing Reports
After running tests, view the HTML report:
```powershell
npx playwright show-report
```
