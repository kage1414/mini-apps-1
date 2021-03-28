const _ = require('lodash');

module.exports = class CSV {

  constructor(json, filterParam) {
    this.idxReference = [];
    this.uniqueInteger = 1;
    this.lines = [];
    this.object = {};
    this.csv = this.jsonToCsv(json, filterParam);
    this.html = this.csvToHtml(this.csv);

    this.response = {
      csv: this.csv,
      html: this.html
    };

    return this.response;
  }

  jsonToCsv(json, filterParam) {
    this.object = JSON.parse(json);
    this.filter();
    let keys = Object.keys(this.object);

    _.each(keys, (key) => {
      if (key !== 'children') {
        this.idxReference.push(key);
      }
    });

    this.writeValues(this.object);
    this.idxReference.push('parent');
    this.idxReference.unshift('0');
    this.lines.unshift(this.idxReference.join(','));
    if (filterParam) {
      this.filter(filterParam);
    }

    return this.lines.join('\n');
  }

  jsonFileToCsv(json) {
    let string = json.data.toString();
    return this.jsonToCsv(string);
  }

  csvToHtml(csv) {
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
  }

  filter(filterParam) {
    // Will implement in future
  }

  addUniqueInteger(valArray) {
    valArray.unshift(this.uniqueInteger);
    this.uniqueInteger++;
    return valArray;
  }

  writeValues(json, parent) {
    var valArray = [];

    for (var key in json) {
      if (key !== 'children') {
        var idx = this.idxReference.indexOf(key);
        if (idx === -1) {
          this.idxReference.push(key);
          idx = this.idxReference.indexOf(key);
        }
        valArray[idx] = json[key];
      }
    }

    for (let i = 0; i < this.idxReference.length; i++) {
      if (!valArray[i]) {
        valArray[i] = '';
      }
    }

    if (parent) {
      valArray.push(parent);
    }

    valArray = this.addUniqueInteger(valArray);
    let line = valArray.join(',');
    this.addLineToDocument(line);

    if (json.children.length > 0) {
      _.each(json.children, (child) => {
        let parentId = valArray[0];
        this.writeValues(child, parentId);
      });
    }
  }

  addLineToDocument(line) {
    this.lines.push(line);
  }
};