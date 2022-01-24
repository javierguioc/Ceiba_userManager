const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // entry: path.resolve(__dirname, "./index.tsx"),
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "js/[name].js",
    publicPath: "/",
    chunkFilename: "js/[id].[chunkhash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    port: 9001,
    hot: true,
  },
  module: {
    rules: [
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
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
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
      // {
      //   test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       outputPath: "assets/",
      //     },
      //   },
      // },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      //   exclude: /node_modules/,
      //   use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif|otf)$/,
        loader: "url-loader?limit=1",
      },
      
    ],
  },
  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      title: "webpack-dev-server",
    }),
  ],
};
