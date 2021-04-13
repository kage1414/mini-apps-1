module.exports.generateRandomString = (length) => {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let string = '';

  for (let i = 0; i < length; i++) {
    let randomIdx = Math.floor(Math.random() * chars.length);
    string += chars[randomIdx];
  }

  return string;
};