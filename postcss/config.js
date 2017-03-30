var postCSSConfig = [
    /* npm install --save-dev
     postcss-loader

     autoprefixer

     postcss-initial   : 
     postcss-autoreset : 

     postcss-import
     postcss-mixins
     postcss-nested
     postcss-simple-vars
     postcss-math
     postcss-color-function

     lost              : flexbox layout; vertical layout
     postcss-assets    : resolves URL
     rucksack-css      : responsive text ;
     precss            : SASS like syntax  - nesting, variables, mixin, conditionals, loops,
     postcss-cssnext   : CSS4 ; bable for css
     stylelint         : CSS linting
     */

    /* autoprefix for different browser vendors
    NOTE: It's included in postcss-cssnext
    require('autoprefixer'),
    */

    /* reset inherited rules */
    require('postcss-initial')({
        reset: 'inherited' // reset only inherited rules
    }),

    /*
    require('postcss-autoreset')({
    }),
     */

    /* enable css @imports like Sass/Less 
    require('postcss-import'),
     */

    /* enable mixins like Sass/Less 
    require('postcss-mixins')({
        mixins: require('./mixins')
    }),
     */

    /* enable nested css selectors like Sass/Less 
    require('postcss-nested'),
     */

    /* require global variables 
    require('postcss-simple-vars')({
        variables: function variables() {
            return require('./variables');
        },
        unknown: function unknown(node, name, result) {
            node.warn(result, 'Unknown variable ' + name);
        }
    }),
     */

    /* PostCSS plugin for making calculations with math.js  
    require('postcss-math'),
     */

    /* transform W3C CSS color function to more compatible CSS. 
    require('postcss-color-function')
     */

    require('lost'),
    /*
     require('postcss-assets'),
     require('rucksack-css'),
     */
    require('precss'),
    require('postcss-cssnext'),
    require('postcss-inline-base64')

    /*
     require('stylelint')
     */
];

// Export the PostCSS Config for usage in webpack
module.exports = postCSSConfig;  
