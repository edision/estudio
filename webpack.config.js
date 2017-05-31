var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var debug = process.env.NODE_ENV === "development";

// html注入支持
var plugins = [new HtmlWebpackPlugin({
    inject: "body",
    template: "./src/index.html"
})];

if (debug) {
    plugins.push(new webpack.DefinePlugin({
            DEBUG: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    );
} else {
    plugins.push(
        new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            // new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                sourcemap: false
            })
        );
    }

    module.exports = {
        entry: debug ? [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './src/index.js'
        ] : ['babel-polyfill', "./src/index.js"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js?qtag=[hash:8]",
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
        devtool: debug ? "source-map" : false,
        plugins: plugins
    }
