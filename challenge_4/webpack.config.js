const path = require('path');

module.exports = {
  entry: `${path.join(__dirname, 'client')}/app.jsx`,
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
};
