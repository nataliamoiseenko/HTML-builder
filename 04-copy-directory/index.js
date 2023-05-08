const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const targetPath = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.cp(sourcePath, targetPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

copyDir();
