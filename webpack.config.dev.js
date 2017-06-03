var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        bundle: './src/index.dev.js',
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
            'qnui',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
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
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            DEBUG: true
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vender', filename: 'vender.js' }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}
