const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  // entry point of our app
  entry: path.resolve(__dirname,'./src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    //output 'publicPath'
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    // match the output 'publicPath'
    static: {
      directory: path.resolve(__dirname, 'build'), // replaces contentBase
      publicPath: '/',                            // this stays here
    },
    host: 'localhost',
    port: 8080,
    //enable HMR on the devServer
    hot: true,
    //open a new window in the browser when running script
    open: true,
    // fallback to root for other urls
    historyApiFallback: true,
    /**
     * proxy is required in order to make api calls to
     * express server while using hot-reload webpack server
     * routes api fetch requests from localhost:8080/api/* (webpack dev server)
     * to localhost:3000/api/* (where our Express server is running)
     */
    proxy: [
      {
        context: ['/','/build'],   // array of paths to proxy
        target: 'http://localhost:3000',
        changeOrigin: true,        // optional but recommended
        secure: false,             // if you're using https locally and want to ignore cert errors
      },
    ],
  },
  devtool: 'eval-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      },
      //ublock the bellow code for testing react, wasn't needed for supertest
      // query: {
      //   presets: ['@babel/env', '@babel/preset-react'],
      //   loader: 'babel-loader'
      // },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      /* loads files as base64 encoded data url if image file is less than set limit,
      if file is  greater than the limit (bytes), file-loader is used as fallback*/
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        }
      }
    }
    ]
  },
  plugins: [
    //CleanWebpackPlugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.
    new CleanWebpackPlugin(),
    //creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
      extensions: ['*', '.js', '.jsx']
    },
};