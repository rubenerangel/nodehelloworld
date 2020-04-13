const express = require('express');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const { exec } = require('child_process');
const app = express();


async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
};

app.get('/', function (req, res) {
  exec('ls -la', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    getVersion();
    res.send(`stdout: ${stdout}`);
  })
  //res.send('Hello World');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});