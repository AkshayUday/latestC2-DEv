/*var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    browserDisconnectTimeout:'100000',
    singleRun: false, //just run once by default
    frameworks: ['mocha','sinon','chai-sinon'], //use the mocha test framework
    files: [
      { pattern: 'tests.webpack.js', watched: true },
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {
              presets: ['es2015', 'stage-0', 'react'],
              babelrc: false,
              env: {
                production: {
                  plugins: []
                }              }
            }
          }
        ]
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};

var webpack = require('webpack');
var RewirePlugin = require("rewire-webpack");

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: false, //just run once by default
    frameworks: ['mocha','sinon','chai-sinon'], //use the mocha test framework
    files: [
      { pattern: 'tests.webpack.js', watched: true },
    ],
    plugins: [ 'karma-chrome-launcher', 'karma-chai', 'karma-mocha','karma-sinon',
      'karma-chai-sinon',
      'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'mocha', 'coverage' ],  //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,query: {
              presets: ['es2015', 'stage-0', 'react'],
              babelrc: false,
              env: {
                production: {
                  plugins: []
                }
              }
            }
          }
        ],
        postLoaders: [ { //delays coverage til after tests are run, fixing transpiled source coverage error
            test: /\.js$/,
            exclude: /(test|node_modules|bower_components)\//,
            //include: [path.resolve('./js/'),path.resolve('./test/')],
            loader: 'istanbul-instrumenter' } ]
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage/' //path to created html doc
    }
  });
};
*/

var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.config');
//webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    browserDisconnectTimeout:'100000',
    singleRun: true, //just run once by default
    frameworks: ['mocha','sinon','chai-sinon'], //use the mocha test framework
    files: [
      { pattern: 'tests.webpack.js', watched: true },
    ],
    plugins: [ 'karma-chrome-launcher', 'karma-chai', 'karma-mocha',
      'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage',
      'karma-mocha-reporter', 'karma-chai-sinon','karma-sinon'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    //reporters: [ 'dots','mocha','coverage','progress' ], //report results in this format
   reporters: ['mocha','coverage'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
     coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage/', //path to created html doc
      /* reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ],*/
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    }
  });
};