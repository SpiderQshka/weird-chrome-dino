const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  mode: "development",
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
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/assets/input.html",
      filename: "input.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/assets/output.html",
      filename: "output.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
  devServer: {
    compress: true,
    port: 8080,
  },
}
