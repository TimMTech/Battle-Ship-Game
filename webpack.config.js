const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, '/src/index.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: '[name][ext]',
        clean: true,
    },

    devtool: 'inline-source-map',

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 5001,
        open: true,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator : {
                    filename: './Images/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|org)$/i,
                type: 'asset resource',
                generator: {
                    filename: './Fonts/[name][ext]',
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '/src/temp.html')
        }),

        new MiniCssExtractPlugin(),
    ]
}