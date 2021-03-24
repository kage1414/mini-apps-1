let model = {};

let view = {
  appendFormToBody: () => {
    document.body.innerHTML =
    `<h1>Submit JSON</h1>
    <form method="POST" action="/json">
      <textarea id="json" name="json" rows="50" cols="50">Enter JSON Data Here</textarea>
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