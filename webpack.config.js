const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: {
    input: "./src/modules/input/index.ts",
    output: "./src/modules/output/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: [],
      template: "./src/assets/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: "input.html",
      template: "./src/assets/input.html",
      chunks: ["input"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: "output.html",
      template: "./src/assets/output.html",
      chunks: ["output"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
  ],
}
