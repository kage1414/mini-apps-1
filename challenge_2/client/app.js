let model = {
  JSONurl: '/json'
};

let view = {
  appendFormToBody: () => {
    document.body.innerHTML =
    `<h1>Submit JSON</h1>
    <form id="submitJSON" enctype="multipart/form-data">
      <textarea id="json"></textarea>
      <input id="submit" type="submit" value="Submit">
    </form>`;
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
        url: model.JSONurl,
        data: {json: jsonData}
      });
    });
  }
};

controller.initialize();