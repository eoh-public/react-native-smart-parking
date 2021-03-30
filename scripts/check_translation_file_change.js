/* eslint-disable no-console */
const { exec } = require('child_process');

const checkTranslationChange = (name) => {
  exec(
    `git diff origin/master:src/utils/I18n/translations/${name} src/utils/I18n/translations/${name}`,
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(1);
        return;
      }
      stdout.split('\n').forEach((line) => {
        line = line.trim();
        if (!line) {
          return;
        }
        if (line.substr(0, 2) !== '+ ') {
          return;
        }
        if (line[line.length - 1] !== ',') {
          console.log(line);
          console.error(
            `Don't add new translation at the end of ${name} file.`
          );
          process.exit(1);
        }
      });
    }
  );
};

checkTranslationChange('vi.json');
checkTranslationChange('en.json');
