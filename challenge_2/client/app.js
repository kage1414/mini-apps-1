let view = {
  appendFormToBody: () => {
    document.body.innerHTML =
    `<h1>Submit JSON</h1>
    <form id="submitJSON" enctype="multipart/form-data">
      <textarea id="json"></textarea>
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
        data: {json: jsonData}
      });
    });

    $('#latest').on('click', (r) => {
      $.ajax({
        method: 'GET',
        url: '/latest'
      });
    });
  }
};

controller.initialize();