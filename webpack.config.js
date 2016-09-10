var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: [
    './components/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'components')
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    })
  ]
}
