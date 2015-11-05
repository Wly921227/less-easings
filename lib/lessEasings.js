// lib/lessEasings.js

'use strict';

function lessEasings() {
  //node modules
  var fs = require('fs'),
      path = require('path'),
      filename = path.join('./', 'easings.net', 'easings.yml');

  function _readYAML(file) {
    console.log(fs.readFileSync(filename, 'utf8'));
  }

  return {
    readYAML: _readYAML
  };
}

console.log(lessEasings().readYAML());