// Review
class Model {
  constructor() {
    this.csvTableData = '';
  }
}

let model = new Model();

class View {
  constructor() {
    this.html = `<h1>Submit JSON</h1>
    <form id="submitJSON" enctype="multipart/form-data">
      <textarea id="json" rows="50" cols="50"></textarea>
      <br>
      <input id="submitText" type="submit" value="Submit">
    </form>
    <form id="submitJSONFile" enctype="multipart/form-data">
      <input type="file" id="jsonFile" rows="50" cols="50"></textarea>
      <input id="submitJSON" type="submit" value="Submit">
    </form>
    <span>Filter Parameters</span><input id="filter" type="text">
    <br>
    <button id="latest">Get Latest File</button>
    <div id="csvDiv"></div>`;
    document.body.innerHTML = model.initialHtml;
  }

  appendCsvDiv () {
    this.removePreviousTable();
    $(model.csvTableData).appendTo('#csvDiv');
  }

  removePreviousTable() {
    $('#csvDiv').children().detach();
  }
}

let view = new View();

let controller = {
  initialize: () => {
    $(document).ready(() => {
      view.initialize();
      controller.listeners.initialize();
    });
  },

  listeners: {
    initialize: () => {
      controller.listeners.getLatest();
      controller.listeners.submitFile();
      controller.listeners.submitText();
    },
    getLatest: () => {
      $('#latest').on('click', (e) => {
        e.preventDefault();
        $.ajax({
          method: 'GET',
          url: '/latest',
          success: (data) => {
            model.csvTableData = data;
            view.appendCsvDiv();
          }
        });
      });
    },
    submitFile: () => {
      $('#submitJSONFile').on('submit', (e) => {
        e.preventDefault();
        var file = document.getElementById('jsonFile').files[0];
        var $filter = $('#filter').val();
        file.text()
          .then((jsonData) => {
            $.ajax({
              method: 'POST',
              url: '/json',
              data: {
                json: jsonData,
                filter: $filter
              },
              success: (data) => {
                model.csvTableData = data;
                view.appendCsvDiv();
              }
            });
          });
      });
    },
    submitText: () => {
      $('#submitJSON').on('submit', (e) => {
        e.preventDefault();
        var jsonData = $('#json').val();
        var $filter = $('#filter').val();
        $.ajax({
          method: 'POST',
          url: '/json',
          data: {
            json: jsonData,
            filter: $filter
          },
          success: (data) => {
            model.csvTableData = data;
            view.appendCsvDiv();
          }
        });
      });
    }
  }

};

controller.initialize();