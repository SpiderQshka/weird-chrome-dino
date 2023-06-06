const HtmlWebpackPlugin = require("html-webpack-plugin")
const TSConfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin")
const path = require("path")

module.exports = {
  entry: {
    index: "./src/scripts/index/index.ts",
    input: "./src/scripts/input/index.ts",
    output: "./src/scripts/output/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
    plugins: [new TSConfigPathsWebpackPlugin()],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      title: "Home",
      template: "./src/pages/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: "input.html",
      title: "Input",
      chunks: ["input"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: "output.html",
      title: "Output",
      chunks: ["output"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
    }),
  ],
}
