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
    document.body.innerHTML = this.html;
  }

  appendCsvDiv() {
    this.removePreviousTable();
    $(model.csvTableData).appendTo('#csvDiv');
  }

  removePreviousTable() {
    $('#csvDiv').children().detach();
  }
}