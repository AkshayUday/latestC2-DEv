let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let SearchComplete = require('../PatternAddAnAsset/js/components/SearchComplete'); 
let chai = require('chai');
let expect = chai.expect;

/*describe('SearchComplete testcases', function () {
  
  before('before creating SearchComplete', function() {
  	var onSuggestionsUpdateRequested=function(){};
  	var onSuggestionSelected=function(){};
  	var shouldRenderSuggestions=function(){};
    this.SearchCompleteComp = TestUtils.renderIntoDocument(React.createElement(SearchComplete, { onSuggestionsUpdateRequested: onSuggestionsUpdateRequested, onSuggestionSelected: onSuggestionSelected, shouldRenderSuggestions: shouldRenderSuggestions }));
    console.log(this.SearchCompleteComp);
 });

  it('renders a composite component', () => {
   	var onSuggestionsUpdateRequested=function(){};
  	var onSuggestionSelected=function(){};
  	var shouldRenderSuggestions=function(){};
  let SearchCompleteComp = TestUtils.renderIntoDocument(React.createElement(SearchComplete, { onSuggestionsUpdateRequested: onSuggestionsUpdateRequested, onSuggestionSelected: onSuggestionSelected, shouldRenderSuggestions: shouldRenderSuggestions }));
  expect(TestUtils.isCompositeComponent(SearchCompleteComp)).to.equal(true);
});

it('does not render a react element', () => {
	var onSuggestionsUpdateRequested=function(){};
  	var onSuggestionSelected=function(){};
  	var shouldRenderSuggestions=function(){};
  let SearchCompleteComp = TestUtils.renderIntoDocument(React.createElement(SearchComplete, { onSuggestionsUpdateRequested: onSuggestionsUpdateRequested, onSuggestionSelected: onSuggestionSelected, shouldRenderSuggestions: shouldRenderSuggestions }));
  expect(TestUtils.isElement(SearchCompleteComp)).to.equal(false);
});

it('does render a DOM Component', () => {
	var onSuggestionsUpdateRequested=function(){};
  	var onSuggestionSelected=function(){};
  	var shouldRenderSuggestions=function(){};
  let SearchCompleteComp = TestUtils.renderIntoDocument(React.createElement(SearchComplete, { onSuggestionsUpdateRequested: onSuggestionsUpdateRequested, onSuggestionSelected: onSuggestionSelected, shouldRenderSuggestions: shouldRenderSuggestions }));
  expect(TestUtils.isDOMComponent(SearchCompleteComp)).to.equal(fa);
});



   });*/