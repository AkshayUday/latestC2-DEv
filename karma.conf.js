var webpack = require('webpack');
var path = require('path');
// var webpackConfig = require('./webpack.config');
var postCSSConfig = require('./postcss/config');

var plugins = [];


plugins.push(new webpack.LoaderOptionsPlugin({
    options: { postcss: function() { return postCSSConfig; }
             }
}));

module.exports = function (config) {
  config.set({
     browsers: [ 'Chrome' ], //run in Chrome
     browserDisconnectTimeout:'100000',
    singleRun: true, //just run once by default
    frameworks: ['mocha','sinon','chai-sinon'], //use the mocha test framework
    files: ['./src/test/PatternSearchSelect/*.test.js',
    './src/test/ProductLink/*.test.js'],

    plugins: [ 'karma-chrome-launcher', 'karma-phantomjs-launcher','karma-chai', 'karma-mocha',
      'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage',
      'karma-mocha-reporter', 'karma-chai-sinon','karma-sinon'
    ],

    preprocessors: {
    
      './src/test/PatternSearchSelect/*.test.js' :  [ 'webpack' ],
      './src/test/ProductLink/*.test.js': ['webpack']

       //preprocess with webpack and our sourcemap loader
    },
    //reporters: [ 'dots','mocha','coverage','progress' ], //report results in this format
    reporters: ['mocha','coverage'],
    webpack: {  
           entry :'./src/PatternBroker.js',
           devtool: 'inline-source-map',
           plugins: plugins,
      module:  {
       
        rules: [{
            test: /\.jsx$|\.js$/,
            enforce: "pre",
            loader: 'eslint-loader',
              },
                {
                     test: /\.js$/,
                      use: [{
                        loader: 'istanbul-instrumenter-loader'
                      }
                         ],
                     include: path.join(__dirname, 'src'),
                     exclude: path.join(__dirname, 'src/test')
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
                    include: path.join(__dirname, 'src')
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
    },
    webpackMiddleware: {
             noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e. 
                chunks: false
            }
        },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
     coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage/', //path to created html doc
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    }
  });
};

