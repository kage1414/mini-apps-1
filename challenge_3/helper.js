module.exports.generateRandomString = (length) => {
  let chars = 'abcdefghijklmnopqrstuvwxyz';
  let string = '';

  for (let i = 0; i < length; i++) {
    let randomIdx = Math.floor(Math.random() * chars.length);
    string += chars[randomIdx];
  }

  return string;
};