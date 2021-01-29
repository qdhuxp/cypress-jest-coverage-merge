# cypress-jest-coverage-merge
## A helper to merge Cypress and Jest coverage reports into one report file.

This script is inspired by this example of merging Cypress & Jest reports: https://github.com/bahmutov/cypress-and-jest and https://github.com/transmissionsdev/merge-cypress-jest-coverag.

For better compatibility with multiple OS(Windows/Linux), this project uses nodejs APIs to handle files, such as copy/move/mkdir etc.

## Usage

1. configure jest.config.js to set jest coverage report directory to `tests/coverage/jest`:
    ```
    ...
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: '<rootDir>/tests/coverage/jest',
    ...
    ```
2. configure `nyc` in `package.json` to set Cypress coverage report directory to `tests/coverage/cypress`:
    ```
    ...
    "nyc": {
            "report-dir": "tests/coverage/cypress"
        }
    ...
    ```
3. Run your Cypress tests and output coverage to a `tests/coverage/cypress/` directory.
4. Run your Jest tests and output coverage to a `tests/coverage/jest` directory.
5. Run npx cypress-jest-coverage-merge and check the `tests/coverage/reports` directory for the merged report!
