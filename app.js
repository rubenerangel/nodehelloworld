var express = require('express');
const { exec } = require('child_process');
var app = express();

app.get('/', function (req, res) {
  exec('node ./script.js', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }

    res.send(`stdout: ${stdout}`);
  })
  //res.send('Hello World');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});