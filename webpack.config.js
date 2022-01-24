// UglifyJsPlugin
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  entry: "./index.tsx",
  output: {
    path: path.join(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif|otf)$/,
        loader: "url-loader?limit=100000",
      },

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "awesome-typescript-loader",
        // },
        // use: ['awesome-typescript-loader', 'babel-loader']
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },


    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.png",
    }),
    //   new WebpackObfuscator ({
    //     rotateStringArray: true
    // }, [])
  ],
  devServer: {
    historyApiFallback: true,
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
