let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let SearchFilter = require('../PatternAddAnAsset/js/components/SearchFilter'); 
let Label = require('../common/components/Label'); 
let chai = require('chai');
let expect = chai.expect;

/*describe('SearchFilter testcases', function () {
  before('before creating SearchFilter', function() {
    this.SearchFilterComp = TestUtils.renderIntoDocument(<SearchFilter />);
   
    
 });

   it('renders a composite component', () => {
  let SearchFilterComp = TestUtils.renderIntoDocument(<SearchFilter />);
  expect(TestUtils.isCompositeComponent(SearchFilterComp)).to.equal(true);
});


   it('does not render a react element', () => {
  let SearchFilterComp = TestUtils.renderIntoDocument(<SearchFilter />);
  expect(TestUtils.isElement(SearchFilterComp)).to.equal(false);
});

it('does render a DOM Component', () => {
  let SearchFilterComp = TestUtils.renderIntoDocument(<SearchFilter />);
  expect(TestUtils.isDOMComponent(SearchFilterComp)).to.equal(false);
});


it('Renderes component with div tag', function() {
   
     this.SearchFilterComp = TestUtils.renderIntoDocument(<SearchFilter />);
    let renderedDOM = ReactDOM.findDOMNode(this.SearchFilterComp);
    expect(renderedDOM.tagName).to.equal("DIV");
   
  });

it('should be rendered with single div', () => {
	  let SearchFilterComp = TestUtils.renderIntoDocument(<SearchFilter />);
	  var div = TestUtils.scryRenderedDOMComponentsWithTag(SearchFilterComp, 'div');
	  expect(div.length).to.equal(1);
	});

it('should be rendered with several label', () => {
	  let SearchFilterComp = TestUtils.renderIntoDocument(<SearchFilter />);
	  var label = TestUtils.scryRenderedDOMComponentsWithTag(SearchFilterComp, 'Label');
	  expect(label.length).to.equal(5);
	});

it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<SearchFilter />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});



   });*/