let table = document.createElement('table');
document.body.appendChild(table);

let i = 0;
while (i < 3) {
  let row = document.createElement('tr');
  // row.innerHTML = ' ';
  let j = 0;
  while (j < 3) {
    let cell = document.createElement('td');
    cell.innerHTML = ' ';
    cell.setAttribute('class', j);
    cell.setAttribute('class', 'cell');
    cell.setAttribute('id', i.toString() + j.toString());
    cell.setAttribute('style', 'height: 200px; width: 200px; text-align: center; vertical-align: sub; font-size: 100px; background-color: #d9d9d9;');
    row.appendChild(cell);
    j++
  }
  row.setAttribute('class', i);
  table.appendChild(row);
  i++;
}

var cells = document.getElementsByClassName('cell')

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', () => {
    console.log('click');
  })
}