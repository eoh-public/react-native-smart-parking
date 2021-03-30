const fs = require('fs');
const parse = require('node-html-parser').parse;

const getCoverageResult = () => {
  const report = fs.readFileSync('coverage/lcov-report/index.html', {
    encoding: 'utf-8',
  });

  const reportRoot = parse(report);

  let results = reportRoot.querySelectorAll('.pad1 .strong');

  results = results.map((element) => {
    const number = element.innerText.trim();
    return parseFloat(number.substr(0, number.length - 1));
  });

  const [statements, branches, functions, lines] = results;

  return [statements, branches, functions, lines];
};

module.exports = {
  getCoverageResult,
};
