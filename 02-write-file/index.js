const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Hello! Type something\n');

stdin.on('data', data => {
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    (err) => {
      if (err) throw err;
      console.log('Text has been added');
    }
  );
});

process.on('SIGINT', () => {
  stdout.write('Good bye!');
  process.exit();
});