/* eslint-disable no-console */
const { exec } = require('child_process');
const fs = require('fs');

const maxPrevFind = 3;

const isCreateNotInAct = (filename) => {
  if (!fs.existsSync(filename)) {
    return false;
  }

  const content = fs.readFileSync(filename, { encoding: 'utf-8' });
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(' create(') || line.includes('renderer.create(')) {
      let found = false;
      for (let j = 0; j < maxPrevFind; j++) {
        const findingLine = lines[i - j];
        if (findingLine.includes('act(')) {
          found = true;
          break;
        }
      }
      if (!found) {
        return true;
      }
    }
  }
  return false;
};

exec(
  'git diff origin/master --name-only',
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    let files = [];
    stdout.split('\n').forEach((line) => {
      line = line.trim();
      if (!line) {
        return;
      }
      if (!line.includes('.test.')) {
        return;
      }
      if (isCreateNotInAct(line)) {
        files.push(line);
      }
    });
    if (files.length) {
      console.error(
        'for testing render, create method must be called in act method'
      );
      console.error(files);
      process.exit(1);
    }
  }
);
