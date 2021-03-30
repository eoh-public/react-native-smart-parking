const getCoverageResult = require('./coverage_utils').getCoverageResult;

const fs = require('fs');

let config = fs.readFileSync('jest.config.js', {
  encoding: 'utf-8',
});

const [statements, branches, functions, lines] = getCoverageResult();

config = config.replace(/statements: \d+.?\d+?,/, `statements: ${statements},`);
config = config.replace(/branches: \d+.?\d+?,/, `branches: ${branches},`);
config = config.replace(/functions: \d+.?\d+?,/, `functions: ${functions},`);
config = config.replace(/lines: \d+.?\d+?,/, `lines: ${lines},`);

fs.writeFileSync('jest.config.js', config, {
  encoding: 'utf-8',
});
