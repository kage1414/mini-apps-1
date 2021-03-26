let view = {
  appendFormToBody: () => {
    document.body.innerHTML =
    `<h1>Submit JSON</h1>
    <form id="submitJSON" enctype="multipart/form-data">
      <textarea id="json" rows="50" cols="50"></textarea>
      <input id="submitText" type="submit" value="Submit">
    </form>
    <form id="submitJSONFile" enctype="multipart/form-data">
      <input type="file" id="jsonFile" rows="50" cols="50"></textarea>
      <input id="submitJSON" type="submit" value="Submit">
    </form>
    <button id="latest">Get Latest File</button>`;
  }
};

let controller = {
  initialize: () => {
    view.appendFormToBody();
    controller.listeners.getLatest();
    controller.listeners.submitFile();
    controller.listeners.submitText();
  },

  listeners: {
    getLatest: () => {
      $('#latest').on('click', (r) => {
        $.ajax({
          method: 'GET',
          url: '/latest',
          success: (data) => {
            if ($('#jsonTable').length > 0) {
              $('#jsonTable').detach();
            }
            $(data).appendTo('body');
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
                if ($('#jsonTable').length > 0) {
                  $('#jsonTable').detach();
                }
                $(data).appendTo('body');
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
            if ($('#jsonTable').length > 0) {
              $('#jsonTable').detach();
            }
            $(data).appendTo('body');
          }
        });
      });
    }
  }

};

controller.initialize();