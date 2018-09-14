const path = require("path")

const distDir = path.resolve(__dirname, "dist")

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node-modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "main.js",
    path: distDir
  },
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 9000
  }
}
