// lib/lessEasings.js

'use strict';

function lessEasings() {
  //node modules
  var fs = require('fs'),
      path = require('path'),
      YAML = require('yamljs'),
      filename = path.join('./', 'easings.net', 'easings.yml');

  function _readYAML(file) {
    var data = YAML.parse(fs.readFileSync(file, 'utf-8'));

    return data;
    data.forEach(function (v) {
      console.log(v['name'], v['css']);
    });
  }

  function _variablesList(data) {
    data = data || [];

    var obj = {};

    data.forEach(function (v) {
      var varName = '@',
          varValue = '';
      if (!v['css'] || v['css'] === 'no') {
        return false;
      } else {
        varName += v['name'] + ':';
        varValue = v['css'] + ';';

        obj[varName] = varValue;
      }
    });

    return obj;
  }

  function _createVariablesList(obj) {
    obj = obj || {};

    var filename = 'lessEasingsVars.less',
        str = '';

    str += '// ' + filename + ' variables based on http://easings.net/\n\n';

    for (var item in obj) {
      str += item.toString() + ' ' + obj[item].toString() + '\n';
    }

    fs.writeFile(filename, str, 'utf-8', function (err) {
      if (err) {
        console.log('Error: ' + err);
        return false;
      } else {
        console.log('File ' + filename + ' was created!');
      }
    });

  }

  _createVariablesList(_variablesList(_readYAML(filename)));
}

lessEasings();