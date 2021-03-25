const _ = require('lodash');

module.exports.jsonToCsv = (json) => {
  let parsed = JSON.parse(json);
  let idxReference = [];
  let keys = Object.keys(parsed);

  _.map(keys, (key) => {
    if (key !== 'children') {
      idxReference.push(key);
    }
  });

  // Render first line of csv
  let lines = [];
  lines.push(idxReference.join(','));

  // Render subsequent lines of children

  let writeValues = (json) => {
    var valArray = [];

    for (var key in json) {
      if (key !== 'children') {
        var idx = idxReference.indexOf(key);
        if (idx === -1) {
          idxReference.push(key);
          idx = idxReference.indexOf(key);
        }
        valArray[idx] = json[key];
      }
    }

    for (let i = 0; i < idxReference.length; i++) {
      if (!valArray[i]) {
        valArray[i] = '';
      }
    }

    lines.push(valArray.join(','));

    if (json.children.length > 0) {
      _.each(json.children, (child) => {
        writeValues(child);
      });
    }
  };

  writeValues(parsed);

  return lines.join('\n');
};

module.exports.jsonFileToCsv = (json) => {
  let string = json.data.toString();

  return module.exports.jsonToCsv(string);
};