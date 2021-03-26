const _ = require('lodash');

module.exports.jsonToCsv = (json, filter) => {
  let parsed = JSON.parse(json);
  let idxReference = [];
  let keys = Object.keys(parsed);
  let uniqueInteger = 1;

  _.each(keys, (key) => {
    if (key !== 'children') {
      idxReference.push(key);
    }
  });


  // Render first line of csv
  let lines = [];

  // Render subsequent lines of children
  let writeValues = (json, parent) => {
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

    if (parent) {
      valArray.push(parent);
    }


    if (!valArray.includes(filter)) {
      valArray.unshift(uniqueInteger);
      parentId = valArray[0];
      uniqueInteger++;
      lines.push(valArray.join(','));
    }

    if (json.children.length > 0) {
      _.each(json.children, (child) => {
        writeValues(child, parentId);
      });
    }
  };

  writeValues(parsed);
  idxReference.push('parent');
  idxReference.unshift('0');
  lines.unshift(idxReference.join(','));

  return lines.join('\n');
};

module.exports.jsonFileToCsv = (json) => {
  let string = json.data.toString();

  return module.exports.jsonToCsv(string);
};

module.exports.csvToHtml = (csv) => {
  csv = csv.toString();
  let rows = csv.split('\n');
  var tableRows = _.map(rows, (row) => {
    var cells = row.split(',');
    var cells = _.map(cells, (cell) => {
      return '<td>' + cell + '</td>';
    });

    return '<tr>' + cells.join('') + '</tr>';
  });
  tableRows.unshift('<table id="jsonTable">');
  tableRows.push('</table>');
  return tableRows.join('');
};
