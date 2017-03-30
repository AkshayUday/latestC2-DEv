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
 *
 * When invoking webpack with -p option, webpack sets :
 * --optimize-minimize --define process.env.NODE_ENV="production" 
 */

/* eslint-disable no-var */
var webpack = require('webpack');
var pathresolve = require('path');
//var babelPolyfill = require("babel-polyfill");

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var env = process.env.RUN_ENV;  //used to be ... process.env.WEBPACK_ENV;

/* import postcss config array */
var postCSSConfig = require('./postcss/config')

var libraryName = 'PatternsLib';
var plugins = [], outputFile;
var entryPoints = [];
var evalValue = 'eval';

plugins.push(new CommonsChunkPlugin({name: 'main', children:  true, minChunks: 2}));
plugins.push(new webpack.LoaderOptionsPlugin({
         options: { postcss: function() {
                      return postCSSConfig;
                    }
                  }
        }));

if (env === 'production') {
   /* This is checked by React for doing parms check ??? */
   process.env.BABEL_ENV = process.env.NODE_ENV; 

    plugins.push(new (webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)());
    plugins.push(new webpack.optimize.UglifyJsPlugin(
       {compress: { warnings: true},
         include: /\.min\.js$/,
         sourceMap: true,
         minimize: true
        }
    ));

    // Below plugin set react runtime to production (turns off props checks)
    plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));

    outputFile = libraryName + '.min.js';
    //entryPoints.push('babel-polyfill');
    entryPoints.push('./src/index.js');
    evalValue = 'cheap-module-source-map';
    // 'eval'                    : PatternsLib.js   5.18 MB; no map
    // 'eval-source-map'         : PatternsLib.js  12.9  MB; no map
    // 'cheap-module-source-map' : PatternsLib.js   1.53 MB; PatternsLib.js.map 565 bytes;
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());

    //prints more readable module names in the browser console on HMR updates
    plugins.push(new webpack.NamedModulesPlugin());

    plugins.push(new webpack.NoEmitOnErrorsPlugin());

    outputFile = libraryName + '.js';

    //entryPoints.push('babel-polyfill');   // using babel-transform

    //activate HMR for React
    entryPoints.push('react-hot-loader/patch');

    //bundle the client for webpack dev server
    //and connect to the provided endpoint
    entryPoints.push('webpack-dev-server/client?http://localhost:8080');

    //bundle the client for hot reloading
    //only- means to only hot reload for successful updates
    //entryPoints.push('webpack/hot/dev-server');
    entryPoints.push('webpack/hot/only-dev-server');

    //the entry point of our app
    entryPoints.push('./src/index.js');

    evalValue = 'cheap-module-eval-source-map';
    // 'eval'                                 : PatternsLib.js   5.71 MB; no map
    // 'cheap-module-eval-source-map'         : PatternsLib.js  13.8 MB   MB; no map
}

module.exports = {
  entry: entryPoints,
  output: {
	  path: pathresolve.join(__dirname, 'lib'),
	  filename: libraryName + '.js',
	  publicPath: '/',                        //necessary for HMR to know where to load the hot update chunks

	  library: libraryName,
	  libraryTarget: 'umd'
	  //umdNamedDefine: true
  },

  //context: pathresolve.join(__dirname, 'src'),
  context: __dirname,

  //externals: {
  //  'react': 'react',
  //  'react-dom': 'react-dom'
  //},
  resolve: {
    extensions: ['.js']
  },
  devtool: evalValue,


  devServer: {
    hot: true,
    //activate hot reloading

    contentBase: '.',
    //contentBase: './lib',
    //match the output path

    publicPath: '/lib/'
    //match the output publicPath
  },

  plugins: plugins,
  module: {
    rules: [{
        test: /\.jsx$|\.js$/,
        enforce: "pre",
        loader: 'eslint-loader',
        include: pathresolve.join(__dirname, 'src'),
        exclude: pathresolve.join(__dirname, 'src/test')
      },
      {
		    test: /\.jsx?$/,
		    use: [{
            loader: 'babel-loader',
            options: {                                                   // Options to configure babel with
              plugins: ['react-hot-loader/babel', 'transform-runtime']
            }
          } 
        ],
		    include: pathresolve.join(__dirname, 'src'),
      },
      {
        test: /\.css$/, 
        use : [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?modules=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&camelCase'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
		    test: /\.html/,
		    loader: 'html',
	    }
    ]
  }
};
