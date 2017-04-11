/* eslint-disable no-var */
var webpack = require('webpack');
var pathresolve = require('path');

//var babelPolyfill = require("babel-polyfill");

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.RUN_ENV;  //used to be ... process.env.WEBPACK_ENV;

/* import postcss config array */
var postCSSConfig = require('./postcss/config');

var libraryName = 'Pattern';
var plugins = [];
var entryPoints;
var evalValue = 'eval';

plugins.push(new webpack.LoaderOptionsPlugin({
    options: { postcss: function() { return postCSSConfig; }
             }
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: libraryName + '[name]' + '.js',
    //minChunks: 2,
    minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
    },
    Infinity
}));

entryPoints = {};
//entryPoints.push('babel-polyfill');
//entryPoints.push('./src/index.js');
entryPoints['PatternBroker'] = './src/PatternBroker.js';
entryPoints['PatternAssessment'] = './src/PatternAssesment/js/components/App.js';
entryPoints['PatternBank'] = './src/PatternBank/js/components/App.js';
entryPoints['PatternQuestion'] = './src/PatternQuestion/js/components/App.js';
entryPoints['PatternAddAnAsset'] = './src/PatternAddAnAsset/js/components/App.js';
entryPoints['PatternProductLink'] = './src/PatternProductLink/js/components/App.js';
entryPoints['SearchSCPatterns'] = './src/SearchSCPatterns/js/components/App.js';

//The CommonsChunkPlugin above detects additional vendor packages and adds them to following list 
entryPoints['vendor'] = ['react', 'redux', 'react-redux', 'react-router', 'react-dom', 'react-intl', 'lodash', 'bean', 'localforage'];

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
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
    
    evalValue = 'cheap-module-source-map';
    
    // 'eval'                    : PatternsLib.js   5.18 MB; no map
    // 'eval-source-map'         : PatternsLib.js  12.9  MB; no map
    // 'cheap-module-source-map' : PatternsLib.js   1.53 MB; PatternsLib.js.map 565 bytes;
}
else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    
    //prints more readable module names in the browser console on HMR updates
    plugins.push(new webpack.NamedModulesPlugin());
    
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
    
    var vendorEP = entryPoints['vendor'];
    //entryPoints.push('babel-polyfill');   // using babel-transform
    
    //activate HMR for React
    vendorEP.push('react-hot-loader/patch');
    
    //bundle the client for webpack dev server
    //and connect to the provided endpoint
    vendorEP.push('webpack-dev-server/client?http://localhost:8080');
    
    //bundle the client for hot reloading
    //only- means to only hot reload for successful updates
    //entryPoints.push('webpack/hot/dev-server');
    vendorEP.push('webpack/hot/only-dev-server');
    
    //the entry point of our app
    //vendorEP.push('./src/index.js');
    
    evalValue = 'cheap-module-eval-source-map';
    // 'eval'                                 : PatternsLib.js   5.71 MB; no map
    // 'cheap-module-eval-source-map'         : PatternsLib.js  13.8 MB   MB; no map
}

module.exports = {
    entry: entryPoints,
    output: {
	      path: pathresolve.join(__dirname, 'lib'),
	      filename: '[name]' + '.js',
	      publicPath: '/',                        //necessary for HMR to know where to load the hot update chunks
        
        //library: [libraryName, "[name]"],
	      //library: libraryName,
	      library: '[name]',
	      libraryTarget: 'umd'
	      //umdNamedDefine: true
    },
    /* This requires index.html to include <script src='lodash.js'> 
     If using this, remove lodash from PatternVendor chunked file
     This will be used in future when QuAD uses multiple patterns from different groups. ie. C2 and C3 patterns
     externals: {
     "lodash": {
     commonjs: "lodash",
     commonjs2: "lodash",
     amd: "lodash",
     root: "_"
     }
     },
     */
    
    //context: pathresolve.join(__dirname, 'src'),
    context: __dirname,
    
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
            include: pathresolve.join(__dirname, 'src')
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
		                include: pathresolve.join(__dirname, 'src')
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
		                loader: 'html'
	              }
               ]
    }
};
