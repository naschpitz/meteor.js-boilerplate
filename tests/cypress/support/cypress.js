const cypress = require('cypress');
const fse = require('fs-extra');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

async function runTests() {
    await fse.emptyDir('tests/cypress/results');
    await fse.ensureDir('tests/cypress/results');
    const { totalFailed } = await cypress.run(); // get the number of failed tests
    const jsonReport = await merge({reportDir: 'tests/cypress/results'}); // generate JSON report

    await generator.create(jsonReport, {reportDir: 'tests/cypress/results'});
    process.exit(0) // exit with the number of failed tests
}

runTests();