const path = require('path');
const webpack = require("webpack");


module.exports = {
  output: {
    path: path.resolve(__dirname),
    filename: "../dist/bundle.js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "vue$": "vue/dist/vue.common.js",
      // // allows you to specify a relative require to source without absolute directory
      // "src": sourceDir,
      "Vue": "vue",
      "should": "should"
    }

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.ProvidePlugin({
      // alias these global variables to their appropriate modules in node
      // so that they don"t have to be explicitly required in your code
      Vue: "Vue",
      $: "jquery"
    })
  ]

};
