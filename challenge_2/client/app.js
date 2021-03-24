let model = {};

let view = {
  appendFormToBody: () => {
    document.body.innerHTML =
    `<h1>Submit JSON</h1>
    <form method="POST" action="/json" enctype="multipart/form-data">
      <textarea name="json"></textarea>
      <input type="submit" value="Submit">
    </form>`;
  }
};

// <input type="file" name="json" accept".json"></input>

let controller = {
  initialize: () => {
    view.appendFormToBody();
  }
};

controller.initialize();