let view = {
  appendFormToBody: () => {
    document.body.innerHTML =
    `<h1>Submit JSON</h1>
    <form id="submitJSON" enctype="multipart/form-data">
      <textarea id="json" rows="50" cols="50"></textarea>
      <input id="submit" type="submit" value="Submit">
    </form>
    <button id="latest">Get Latest File</button>`;
  }
};

let controller = {
  initialize: () => {
    view.appendFormToBody();

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
  }
};

controller.initialize();