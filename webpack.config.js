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
    }));
} else {
    plugins.push(
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        })
    );
}

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
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
        }
    },
    devtool: debug ? "source-map" : false,
    plugins: plugins
}
