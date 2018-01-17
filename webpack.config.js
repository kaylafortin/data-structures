var path = require('path');
var webpack = require('webpack');
 module.exports = {
     entry: './BFS/app.js',
     output: {
         path: path.resolve(__dirname, 'BFS/build'),
         filename: 'app.bundle.js'
     },
     watch: true,
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                     // ignore: ["**/d3.js"]
                 }
                 
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };