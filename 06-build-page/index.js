const path = require('path');
const fs = require('fs');

const pathToSourceTemplate = path.join(__dirname, 'template.html');
const pathToTargetFolder = path.join(__dirname, 'project-dist');
const pathToTargetHtmlFile = path.join(pathToTargetFolder, 'index.html');
const targetSymbolStart = '{';
const targetSymbolEnd = '}';
const pathToSourceFolder = path.join(__dirname, 'styles');
const pathToTargetCssFile = path.join(pathToTargetFolder, 'style.css');
const sourceAssetsPath = path.join(__dirname, 'assets');
const targetAssetsPath = path.join(pathToTargetFolder, 'assets');

fs.mkdir(pathToTargetFolder, { recursive: true }, err => {
  if (err) throw err;
});

fs.readFile(pathToSourceTemplate,'utf-8', (err, originalContent) => {
  if (err) throw err;

  let resultHtml = '';
  for (let i = 0; i < originalContent.length; i++) {
    if (originalContent[i] === targetSymbolStart && originalContent[i+1] === targetSymbolStart) {
      for (let j = i + 2; j < originalContent.length; j++) {
        if (originalContent[j] === targetSymbolEnd && originalContent[j+1] === targetSymbolEnd) {
          const componentName = originalContent.substring(i+2, j);
          const pathToRelatedFile = path.join(__dirname, 'components', `${componentName}.html`);

          const componentHtml = fs.readFileSync(pathToRelatedFile,'utf-8');
          resultHtml = resultHtml + componentHtml;

          i = j + 1;
          break;
        }
      }
    } else {
      resultHtml = resultHtml + originalContent[i];
    }
  }

  fs.writeFile(pathToTargetHtmlFile, resultHtml, (err) => {
    if (err) {
      return console.log(err);
    }
  });
});

fs.readdir(pathToSourceFolder, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const pathToFile = path.join(pathToSourceFolder, file);

    if (fs.statSync(pathToFile).isFile() && path.extname(file) === '.css') {
      fs.readFile(pathToFile, 'utf-8', (err, data) => {
        if (err) throw err;

        fs.appendFile(pathToTargetCssFile, data, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});

fs.cp(sourceAssetsPath, targetAssetsPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});
