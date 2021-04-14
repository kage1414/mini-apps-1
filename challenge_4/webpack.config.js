const path = require('path');

module.exports = {
  entry: './client/app.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'production'
};