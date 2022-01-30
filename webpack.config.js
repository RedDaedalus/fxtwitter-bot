const path = require("path");
const mode = process.env.NODE_ENV || "production";

module.exports = {
  mode,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "worker.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [],
    fallback: { util: false }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "ts-loader",
      options: {
        transpileOnly: true
      }
    }]
  }
};
