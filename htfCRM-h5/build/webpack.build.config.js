const path = require('path');
const webpack = require('webpack');
const baseWebpack = require('./webpack.base.config');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');

module.exports = merge(baseWebpack, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: './',
        filename: '[name].[hash:7].js'
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/manifest.min.json'),
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,  //插入位置
            minify: {
                removeComments: true,  //移除HTML中的注释
                collapseWhitespace: true, //删除空白符与换行符
                removeAttributeQuotes: true  //删除属性引用
            },
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:7].css'
        }),
        //打包压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false  //是否显示打包详情
            }
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
})
