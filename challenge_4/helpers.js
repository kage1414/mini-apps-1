
const checkRows = (color, colors) => {
  for (let i = 0; i < colors.length; i++) {
    let row = colors[i];
    let count = 0;
    for (let j = 0; j < row.length; j++) {
      if (row[j] === color) {
        count++;
      } else {
        count = 0;
      }
      if (count === 4) {
        return true;
      }
    }
  }
  return false;
};

const checkColumns = (color, colors) => {
  let length = colors[0].length;
  for (let i = 0; i < length; i++) {
    let count = 0;
    for (let j = 0; j < colors.length; j++) {
      if (colors[j][i] === color) {
        count++;
      } else {
        count = 0;
      }
      if (count === 4) {
        return true;
      }
    }
  }
  return false;
};

const checkMinDiag = (color, colors) => {

  let starters = [[5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]];

  for (let i = 0; i < starters.length; i++) {
    let starterI = starters[i][0];
    let starterJ = starters[i][1];

    let count = 0;
    for (let j = 0; colors[starterI + j] && colors[starterI + j][starterJ + j]; j++) {
      let cell = colors[starterI + j][starterJ + j];
      if (cell === color) {
        count++;
      } else {
        count = 0;
      }
      if (count === 4) {
        return true;
      }
    }

  }
  return false;

};

const checkMajDiag = (color, colors) => {

  let starters = [[5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6]];

  for (let i = 0; i < starters.length; i++) {
    let starterI = starters[i][0];
    let starterJ = starters[i][1];

    let count = 0;
    for (let j = 0; colors[starterI - j] && colors[starterI - j][starterJ + j]; j++) {
      let cell = colors[starterI - j][starterJ + j];
      if (cell === color) {
        count++;
      } else {
        count = 0;
      }
      if (count === 4) {
        return true;
      }
    }

  }
  return false;

};

module.exports.checkTie = (colors) => {
  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < colors[i].length; j++) {
      if (colors[i][j] === ' ') {
        return false;
      }
    }
  }
  return true;
};

module.exports.checkWins = (color, colors) => {

  if (checkRows(color, colors) || checkColumns(color, colors) || checkMajDiag(color, colors) || checkMinDiag(color, colors)) {
    return color;
  }
  return null;
};