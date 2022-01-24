const path = require("path");
const webpack = require("webpack");
const TersetJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    modules: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-bootstrap",
      "react-device-detect",
      "react-notifications-component",
      "react-player",
      "react-redux",
      "react-router",
      "react-router-redux",
      "react-switch-selector",
      "redux-persist",
      "redux-thunk",
      // "bootstrap",
      "@material-ui/core", // esto se puede mover o colocar especificamente los compomentes que se usan

      // "google-map-react", -- no se usa
      // "react-card-flip", -- no se usa
      // "react-flippy", -- no se usa
      // "react-motion", -- no se usa
      // "react-scripts",--no se usa
      // "react-scroll", --no se usa
      // "react-select-search", --no se usa
      // "react-transition-group", --no se usa
      // "redux-devtools-extension", --no se usa
    ],
  },
  optimization: {
    minimizer: [new TersetJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].dll.js",
    library: "[name]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      path: path.join(__dirname, "[name]-manifest.json"),
    }),
  ],
};
