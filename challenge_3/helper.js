module.exports.generateRandomString = (length) => {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let string = '';

  for (let i = 0; i < length; i++) {
    let randomIdx = Math.floor(Math.random() * chars.length);
    string += chars[randomIdx];
  }

  return string;
};

module.exports.hideAllButLastFour = (number) => {

  if (number.length <= 4) {
    return number;
  }

  let arr = number.split('');

  for (let i = arr.length - 5; i >= 0; i--) {
    arr[i] = '*';
  }

  const hidden = arr.join('');
  console.log('hidden', hidden);
  return hidden;
};