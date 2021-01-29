"use strict";

const { execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');

const reportPath = 'tests/coverage';

function runCommand(command, log = true) {
    const output = execSync(command).toString();

    if (log) {
        console.log(output);
    }
}

function fsCallback(err) {
    if (err) {
        console.log(chalk.red(err));
    }
}

function mergeReport() {
    console.log(chalk.cyan('Merging reports from Cypress & Jest....'));

    fs.mkdir(`${reportPath}/reports`, fsCallback);
    fs.mkdir('.nyc_output', fsCallback);

    // Copy coverage reports
    fs.copyFile(
        `${reportPath}/cypress/coverage-final.json`,
        `${reportPath}/reports/from-cypress.json`,
        fsCallback,
    );
    fs.copyFile(
        `${reportPath}/jest/coverage-final.json`,
        `${reportPath}/reports/from-jest.json`,
        fsCallback,
    );

    // Merge the reports folder's json
    runCommand(`npx nyc merge ${reportPath}/reports`);

    // Move merged coverage.json to .nyc_output
    fs.rename('coverage.json', `.nyc_output/out.json`, fsCallback);

    // Create lcov report and output to coverage directory
    runCommand(`npx nyc report --reporter lcov --reporter html --report-dir ${reportPath}/reports`);

    console.log(chalk.green.bold('Merged your Cypress & Jest reports successfully!'));
}

module.exports = {
    mergeReport
};
