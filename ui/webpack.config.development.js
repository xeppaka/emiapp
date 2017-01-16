let webpack = require('webpack');
// this plugin generates index.html file from configuration
let HtmlWebpackPlugin = require('html-webpack-plugin');
// this plugin allows to extract all compiled CSS into one or several files
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  ['babel-polyfill', './src/emi/index.js'],
    output: {
        path:     'build/resources/main/static',
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'E.Mi order app',
            template: './src/emi/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin("styles.css", {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.Tether': 'tether'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!sass")
            }
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        },
        port: 10777
    }
};