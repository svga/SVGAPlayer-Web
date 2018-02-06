var path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: {
        "svga.min": "./src/canvas/index.ts",
        "svga.createjs.min": "./src/CreateJS/index.ts",
        "svga.layabox.min": "./src/LayaBox/index.ts",
        "svga.egret.min": "./src/egret/index.ts",
    },

    output: {
        path: __dirname,
        filename: "build/[name].js",
        libraryTarget: 'umd',
        library: 'SVGA',
    },
    
    module: {
        loaders: [{  
            test: /\.ts$/,  
            loader:'ts-loader'  
        }]
    },

    resolve: {  
        extensions: ['*', '.webpack.js', '.web.js', '.ts', '.js']  
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            output: { comments: false },
        })
    ],
}