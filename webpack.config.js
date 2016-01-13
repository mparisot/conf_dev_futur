var webpack = require('webpack');

// PostCSS Plugins
var autoprefixer = require('autoprefixer');
var customProperties = require("postcss-custom-properties")


var plugin = customProperties();
plugin.setVariables({
    "--btn-primary-color":"blue"
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
                test: /\.jsx$$/,
                loader: "babel-loader",
                query: {
                    presets: [ "es2015"],
                    plugins: ["transform-react-jsx","transform-class-properties"],
                    cacheDirectory:true
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.gif$|\.png$|\.jpg$/, loader: "file-loader?name=[path][name].[ext]" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    postcss: function () {
        return [autoprefixer,plugin];
    }
};