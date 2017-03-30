/**
 * WEBPACK CONFIG
 *
 * Notes on config properties:
 *
 * 'entry'
 * Entry point for the bundle.
 *
 * 'output'
 * If you pass an array - the modules are loaded on startup. The last one is exported.
 *
 * 'resolve'
 * Array of file extensions used to resolve modules.
 *
 * 'webpack-dev-server'
 * Is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle.
 * It also has a little runtime which is connected to the server via Socket.IO.
 *
 * 'webpack/hot/dev-server'
 * By adding a script to your index.html file and a special entry point in your configuration
 * you will be able to get live reloads when doing changes to your files.
 *
 * devtool: 'eval-source-map'
 * http://www.cnblogs.com/Answer1215/p/4312265.html
 * The source map file will only be downloaded if you have source maps enabled and your dev tools open.
 *
 * HotModuleReplacementPlugin()
 * Hot Module Replacement (HMR) exchanges, adds or removes modules while an application is running without page reload.
 *
 * NoErrorsPlugin()
 * Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server since it eliminates page reloads
 * altogether and recovers after syntax errors.
 *
 * 'react-hot'
 * React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state
 * while editing React components.
 *
 * 'babel'
 * Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
 * that is actually delivered to the end user browser.
 */

/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var babelPolyfill = require("babel-polyfill");

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var env = process.env.WEBPACK_ENV;

var libraryName = 'PatternsLib';
var plugins = [], outputFile;

plugins.push(new CommonsChunkPlugin({name: 'main', children:  true, minChunks: 2}));

if (env === 'build') {
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new UglifyJsPlugin({compress: { warnings: false, 
			minimize: true
			}}));
    plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));

    outputFile = libraryName + '.min.js';
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());

    outputFile = libraryName + '.js';
}


module.exports = {
  loaders: [
      { test: /jquery-mousewheel/, loader: "imports?define=>false&this=>window" },
      { test: /malihu-custom-scrollbar-plugin/, loader: "imports?define=>false&this=>window" }
    ],
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/dev-server',
    './src/index'
  ],
  output: {
	path: path.join(__dirname, 'lib'),
	filename: libraryName + '.js',
	publicPath: '/',

	library: libraryName,
	libraryTarget: 'umd',
	umdNamedDefine: true
  },
  //externals: {
  //  'react': 'react',
  //  'react-dom': 'react-dom'
  //},
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: plugins,
  module: {
    preLoaders: [{
		test: /\.jsx$|\.js$/,
		loader: 'eslint-loader',
		include: path.join(__dirname, 'src')
	    }],
    loaders: [{
		test: /\.jsx?$/,
		loaders: ['babel'],
		include: path.join(__dirname, 'src')
	    },
            {
		test: /\.css$/,
		loader: "style!css",
		exclude: /node_modules\lib/
	    },            
            {
		test: /\.scss/,
		loader: 'style!css!sass',
	    },
            {
		test: /\.html/,
		loader: 'html',
	    }]
    }
};
