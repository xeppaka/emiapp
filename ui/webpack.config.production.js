let webpack = require('webpack');
let path = require('path');
// this plugin generates index.html file from configuration
let HtmlWebpackPlugin = require('html-webpack-plugin');
// this plugin allows to extract all compiled CSS into one or several files
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  ['babel-polyfill', './src/emi/index.js'],
    output: {
        path:     path.join(__dirname, 'build/resources/main/static'),
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'E.Mi order app',
            template: './src/emi/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Tether: 'tether'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    }
};