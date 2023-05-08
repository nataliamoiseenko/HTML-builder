const path = require('path');
const fs = require('fs');

const pathToSourceFolder = path.join(__dirname, 'styles');
const pathToTargetFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(pathToSourceFolder, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const pathToFile = path.join(pathToSourceFolder, file);

    if (fs.statSync(pathToFile).isFile() && path.extname(file) === '.css') {
      fs.readFile(pathToFile, 'utf-8', (err, data) => {
        if (err) throw err;

        fs.appendFile(pathToTargetFile, data, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});