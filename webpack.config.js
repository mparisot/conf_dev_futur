var webpack = require('webpack');

// PostCSS Plugins
var autoprefixer = require('autoprefixer');
var customProperties = require("postcss-custom-properties");

var webpackCustomColor = customProperties();
webpackCustomColor.setVariables({
    "--button-primary-color":"blue"
});

module.exports = {
    entry: "./main.jsx",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js|\.jsx/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:['es2015'],
                    plugins: ["transform-react-jsx", "transform-class-properties"],
                    cacheDirectory: true
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader!postcss" },
            { test: /\.gif$|\.png$|\.jpg$/, loader: "file-loader?name=[path][name].[ext]" }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    postcss: function () {
        return [autoprefixer, webpackCustomColor];
    }

};