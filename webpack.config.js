var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var debug = process.env.NODE_ENV === "development";

// html注入支持
var plugins = [new HtmlWebpackPlugin({
    inject: "body",
    template: "./src/index.html"
}), new webpack.DefinePlugin({
    DEBUG: debug
}), new webpack.optimize.CommonsChunkPlugin({name: 'vender', filename:'vender.js'})];

if (debug) {
    plugins.push(
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
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "dist"),
            to: path.resolve(__dirname, "public")
        }], {
            copyUnmodified: true
        })
    );
}

const vender = ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'mobx-utils', 'react-addons-transition-group', 'moment', 'qnui'];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vender: debug ? vender.push['react-hot-loader/patch', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'] : vender
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
    devtool: debug ? "source-map" : false,
    plugins: plugins
}
