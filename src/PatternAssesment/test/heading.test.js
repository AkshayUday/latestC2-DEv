let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let Heading = require('../../common/components/Heading'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('Heading testcases', function () {
  before('before creating Heading', function() {
    this.HeadingComp = TestUtils.renderIntoDocument(<Heading />);
    this.heading = TestUtils.findRenderedDOMComponentWithTag(this.HeadingComp, 'h3');
  });

  it('Renders heading component with h3 tag', function() {
  this.HeadingComp = TestUtils.renderIntoDocument(<Heading />);
   let renderedDOM = ReactDOM.findDOMNode(this.HeadingComp);
    expect(renderedDOM.tagName).to.equal("H3");
  });

  it('renders a composite component', () => {
  let HeadingComp = TestUtils.renderIntoDocument(<Heading />);
  expect(TestUtils.isCompositeComponent(HeadingComp)).to.equal(true);
});

  it('does not renders a DOM component', () => {
  let HeadingComp = TestUtils.renderIntoDocument(<Heading />);
  expect(TestUtils.isDOMComponent(HeadingComp)).to.equal(false);
});


});