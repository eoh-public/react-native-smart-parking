/* eslint-disable no-console */
const { exec } = require('child_process');

exec(
  'git diff origin/master:jest.config.js jest.config.js',
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    const configs = ['branches', 'lines', 'functions', 'statements'];
    let error = '';

    let isIncreased = false;

    configs.forEach((config) => {
      const re = new RegExp(`- {6}${config}: ([+-]?([0-9]*[.])?[0-9]{1,2}),`);
      const found = stdout.match(re);
      const oldValue = found ? parseFloat(found[1]) : 0;

      const re2 = new RegExp(
        `\\+ {6}${config}: ([+-]?([0-9]*[.])?[0-9]{1,2}),`
      );
      const found2 = stdout.match(re2);
      const newValue = found2 ? parseFloat(found2[1]) : 0;

      if (oldValue > newValue) {
        error += `Coverage config for ${config} is down from ${oldValue} to ${newValue}\n`;
      }
      if (newValue > oldValue) {
        console.log(
          `${config} is increased ${(newValue - oldValue).toFixed(
            2
          )} from ${oldValue} to ${newValue}`
        );
      }
      if (newValue - oldValue >= 0.1) {
        isIncreased = true;
      }
    });

    if (error) {
      console.error(error);
      process.exit(1);
    } else if (!isIncreased) {
      console.error('At least 0.1 coverage category must be increased');
      process.exit(1);
    } else {
      console.error('Coverage config is increased');
    }
  }
);
