var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        bundle: './src/index.js',
        vender: [
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router-dom',
            'mobx',
            'mobx-react',
            'mobx-utils',
            'react-addons-transition-group',
            'moment',
            'qnui'
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js?qntag=[hash:8]",
        publicPath: "/"
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            loader: "babel-loader"
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"],
        alias: {
            "COMPONENTS": path.resolve(__dirname, "src", "components"),
            "STORES": path.resolve(__dirname, "src", "stores"),
            "UTILS": path.resolve(__dirname, "src", "utils"),
        }
    },
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            DEBUG: false
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vender', filename: 'vender.js' }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "dist"),
            to: path.resolve(__dirname, "public")
        }], {
            copyUnmodified: false
        })
    ]
}
