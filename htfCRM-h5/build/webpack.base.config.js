const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        //打包入口文件在项目更目录下
        app:[
            './index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        // publicPath: './',
        filename: '[name].js',

    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({  //将入口文件中的less编译打包成独立文件
                fallback: 'style-loader',
                use: 'css-loader!less-loader'
            })
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.(jpg|png|gif|eot|ttf|woff|svg)$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            options:{
                publicPath:'./images'
            }
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
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
}