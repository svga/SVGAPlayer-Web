var path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: {
        "svga.min": "./src/Canvas/index.js",
        "svga.createjs.min": "./src/CreateJS/index.js",
        "svga.layabox.min": "./src/LayaBox/index.js",
    },
    output: {
        path: __dirname,
        filename: "build/[name].js",
        libraryTarget: 'umd',
        library: 'SVGA',
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-0"]
                }
            }
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            output: { comments: false },
        })
    ],
}