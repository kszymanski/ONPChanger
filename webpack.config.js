const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCss = new ExtractTextPlugin({ filename: "[name].css" })

module.exports = {
    entry: {
        vendor: './App/vendor.js',
        app: './App/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: extractCss.extract({
                    use: [{
                        loader: "css-loader"
                    }]
                })
            },
            {
                test: /\.(html)$/,
                use: {
                  loader: 'html-loader'
                }
            },
            {
                test: /\.(png|jpg|gif|ico|ttf|eot|woff|svg|woff2)$/,
                use: [
                  {
                    loader: 'file-loader'
                  }
                ]
              }
        ]
    },
    plugins: [
        extractCss,
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery", 
            jQuery: "jquery"
      })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        overlay: true,
        historyApiFallback: true
    }
}