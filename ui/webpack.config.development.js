let webpack = require('webpack');
let path = require('path');
// this plugin generates index.html file from configuration
let HtmlWebpackPlugin = require('html-webpack-plugin');
// this plugin allows to extract all compiled CSS into one or several files
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  ['./src/emi/index.js'],
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
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
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
        port: 8081
    },
    devtool: 'eval-source-map'
};