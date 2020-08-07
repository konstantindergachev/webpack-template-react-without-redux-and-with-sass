const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = [ 'style-loader', 'css-loader', 'sass-loader' ];
const cssProd = [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ];
const cssConfig = isProd ? cssProd : cssDev;

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].css' : '/css/[name].[hash].css',
      chunkFilename: !isProd ? '[id].css' : '/css/[id].[hash].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/img/favicon', to: 'img/favicon', toType: 'dir' },
        { from: 'src/img/favicon.ico', to: 'favicon.ico', toType: 'file' },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  devServer: {
    noInfo: true,
    overlay: true,
    hot: true,
    historyApiFallback: true, //to 404s-error will fallback to index.html
    open: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};

module.exports = (env, options) => {
  const production = options.mode === 'production';
  config.devtool = production ? false : 'cheap-module-source-map';
  return config;
};
