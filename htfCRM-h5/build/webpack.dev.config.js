const path = require('path');
const webpack = require('webpack');
const merge = require('merge');
const webpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');

Object.keys(webpackConfig.entry).forEach(function(name) {
    webpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(webpackConfig.entry[name])
})

module.exports = merge(webpackConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/resources/js'),
                to: path.resolve(__dirname, '../dist/js'),
                force: true
            },
            {
                from: path.resolve(__dirname, '../src/resources/images'),
                to: path.resolve(__dirname, '../dist/images'),
                force: true
            }
        ])
    ]
});