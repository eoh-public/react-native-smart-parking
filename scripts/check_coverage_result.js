/* eslint-disable no-console */
const getCoverageResult = require('./coverage_utils').getCoverageResult;

const config = require('../jest.config.js').coverageThreshold.global;

const [statements, branches, functions, lines] = getCoverageResult();

if (
  config.statements !== statements ||
  config.branches !== branches ||
  config.functions !== functions ||
  config.lines !== lines
) {
  console.error(
    'Coverage config is not updated. Please update jest.config.js coverageThreshold as new value.'
  );
  console.log('Config');
  console.log(config);
  console.log('Actually');
  console.log({ statements, branches, functions, lines });
  process.exit(1);
}
