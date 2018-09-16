const path = require("path")

const distDir = path.resolve(__dirname, "dist")

const config = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node-modules/
      },
      {
        test: /\.glsl$/,
        loader: "webpack-glsl-loader"
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

module.exports = (_env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "inline-source-map"
  }

  return config
}
