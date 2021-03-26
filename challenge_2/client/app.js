// Review
let model = {
  csvTableData: '',
  initialHtml: `<h1>Submit JSON</h1>
  <form id="submitJSON" enctype="multipart/form-data">
    <textarea id="json" rows="50" cols="50"></textarea>
    <input id="submitText" type="submit" value="Submit">
  </form>
  <form id="submitJSONFile" enctype="multipart/form-data">
    <input type="file" id="jsonFile" rows="50" cols="50"></textarea>
    <input id="submitJSON" type="submit" value="Submit">
  </form>
  <button id="latest">Get Latest File</button>
  <div id="csvDiv"></div>`
};

let view = {
  initialize: () => {
    document.body.innerHTML = model.initialHtml;
  },
  appendCsvDiv: () => {
    var $children = $('#csvDiv').children().detach();
    $(model.csvTableData).appendTo('#csvDiv');
  }
};

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
        file.text()
          .then((jsonData) => {
            $.ajax({
              method: 'POST',
              url: '/json',
              data: {json: jsonData},
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
        $.ajax({
          method: 'POST',
          url: '/json',
          data: {json: jsonData},
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