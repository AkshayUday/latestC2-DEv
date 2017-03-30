let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let paging = require('../PatternAddAnAsset/js/components/paginate/paging.js');
let chai = require('chai');
let expect = chai.expect;
import Paginator from 'react-pagify';
import segmentize from 'segmentize';

//import pagifyBootstrapPreset from './pagifyBootstrapPreset';

describe('Paging testcases ', function () {
  before('before creating Paging ', function() {
    this.pagingComp = TestUtils.renderIntoDocument(<paging />);
});
/*it('Component Renders with the Correct DOM', function() {
    let renderedDOM = ReactDOM.findDOMNode(this.pagingComp);
    expect(renderedDOM.tagName).to.equal("PAGING");
    expect(renderedDOM.classList.length).to.equal(0);
    var children = renderedDOM.querySelectorAll('div');
    expect(children.length).to.equal(0);
});*/
it("renders a list in a box with proper CSS classes", function() {
    let renderedDOM = ReactDOM.findDOMNode(this.pagingComp);
    expect(renderedDOM.tagName).to.equal("PAGING");
    expect(renderedDOM.classList.length).to.equal(0);
    expect(renderedDOM.children.length).to.equal(0);
  });

it('renders a composite component', () => {
  let pagingComp = TestUtils.renderIntoDocument(<paging />);
  expect(TestUtils.isCompositeComponent(pagingComp)).to.equal(false);
});

it('does not render a react element', () => {
  let pagingComp = TestUtils.renderIntoDocument(<paging />);
  expect(TestUtils.isElement(pagingComp)).to.equal(false);
});
/*it('Renderes div tag with "pagingdiv" class and row class', function() {
    this.pagingComp = TestUtils.renderIntoDocument(<paging />);
    var divs = TestUtils.scryRenderedDOMComponentsWithTag(this.pagingComp, 'div');
    let renderedDOM = ReactDOM.findDOMNode(this.pagingComp);
    expect(renderedDOM.tagName).to.equal("div");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("pagingdiv");
    expect(renderedDOM.classList[1]).to.equal("row");

});
*/
/*it('should be rendered with several divs', () => {
   let pagingComp = TestUtils.renderIntoDocument(<paging />);
  var children = TestUtils.findAllInRenderedTree(pagingComp, 'div');

  expect(children.length).to.equal(2);
});*/


});