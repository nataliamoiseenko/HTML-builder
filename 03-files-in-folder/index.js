const path = require('path');
const fs = require('fs');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const pathToFile = path.join(pathToFolder, file);
    if (fs.statSync(pathToFile).isFile()) {
      const { size } = fs.statSync(pathToFile);
      console.log(`${path.parse(file).name} - ${path.extname(file).substring(1)} - ${size / 1024} kb`);
    }
  });
});
