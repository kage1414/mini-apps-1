let model = {};

let view = {
  appendFormToBody: () => {
    document.body.innerHTML =
    `<h1>Submit JSON</h1>
    <form method="POST" action="/json" enctype="multipart/form-data">
      <input type="file" name="json" accept".json"></input>
      <input type="submit" value="Submit">
    </form>`;
  }
};

let controller = {
  initialize: () => {
    view.appendFormToBody();
  }
};

controller.initialize();