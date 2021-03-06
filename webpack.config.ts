import { resolve } from "path"
import { Configuration, ConfigurationFactory, ProvidePlugin } from "webpack"

const distDir = resolve(__dirname, "dist")

const config: Configuration = {
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
    alias: {
      three$: "three/build/three.min.js",
      "three/.*$": "three"
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new ProvidePlugin({
      THREE: "three"
    })
  ],
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

module.exports = <ConfigurationFactory>((_env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "inline-source-map"
  }

  return config
})
