const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
    })
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, "public"),
    },
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
        {
            test: /\.(jsx|js|tsx|ts)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          type: 'asset/resource',
        },
    ],
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  }
};