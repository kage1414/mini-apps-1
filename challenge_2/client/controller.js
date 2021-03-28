class Listeners {

  constructor() {
    this.getLatest();
    this.submitFile();
    this.submitText();
  }

  getLatest() {
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
  }

  submitFile() {
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
  }

  submitText() {
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
          console.log(data);
          model.csvTableHTML = data;
          view.appendCsvDiv();
        }
      });
    });
  }
}

class Controller extends Listeners {

}