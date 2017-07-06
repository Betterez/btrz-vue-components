const path = require('path');
const webpack = require("webpack");

// WARNING: This conf is only for testing

module.exports = {
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
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        query: {
          loaders:
          {
            js: "babel-loader?cacheDirectory",
            css: "ignore-loader", // Ignore css for tests
            less: "ignore-loader",
            sass: "ignore-loader",
            scss: "ignore-loader",
            stylus: "ignore-loader",
            styl: "ignore-loader"
          },
          preserveWhitespace: false
        }
      },
      {
        test: /\.css$/,
        use: ["ignore-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Leave the image like it was but don't copy the file
        loader: "file-loader",
        query: {
          emitFile: false,
          name: "[path][name].[ext]"
        }
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
