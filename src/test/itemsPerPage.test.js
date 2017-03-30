let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let itemsPerPage = require('../PatternAddAnAsset/js/components/paginate/itemsPerPage'); 
let chai = require('chai');
let expect = chai.expect;

describe('itemsPerPage testcases', function () {
  before('before creating itemsPerPage', function() {
    this.itemsPerPageComp = TestUtils.renderIntoDocument(<itemsPerPage />);
   
    
 });

   it('renders a composite component', () => {
  let itemsPerPageComp = TestUtils.renderIntoDocument(<itemsPerPage />);
  expect(TestUtils.isCompositeComponent(itemsPerPageComp)).to.equal(false);
});


   it('does not render a react element', () => {
  let itemsPerPageComp = TestUtils.renderIntoDocument(<itemsPerPage />);
  expect(TestUtils.isElement(itemsPerPageComp)).to.equal(false);
});


it('should rendered with ITEMSPERPAGE tag', function() { 
   	this.itemsPerPageComp = TestUtils.renderIntoDocument(<itemsPerPage />);
    let renderedDOM = ReactDOM.findDOMNode(this.itemsPerPageComp);
    expect(renderedDOM.tagName).to.equal("ITEMSPERPAGE");
});

it('does render a DOM Component', () => {
  let itemsPerPageComp = TestUtils.renderIntoDocument(<itemsPerPage />);
  expect(TestUtils.isDOMComponent(itemsPerPageComp)).to.equal(true);
});



 });