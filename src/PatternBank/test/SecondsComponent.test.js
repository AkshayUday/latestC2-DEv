let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let SecondsComponent = require('../../common/components/SecondsComponent');
let chai = require('chai');
let expect = chai.expect;


describe('SecondsComponent testcases', function () {
  before('before creating SecondsComponent', function() {
    this.SecondsComponentComp = TestUtils.renderIntoDocument(<SecondsComponent />);
    this.SecondsComponent = TestUtils.findRenderedDOMComponentWithTag(this.SecondsComponentComp, 'div');
  });

  it('check rendered tagName', function() {
    let renderedDOM = ReactDOM.findDOMNode(this.SecondsComponentComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});

  it('renders a composite component', () => {
  let SecondsComponentComp = TestUtils.renderIntoDocument(<SecondsComponent />);
  expect(TestUtils.isCompositeComponent(SecondsComponentComp)).to.equal(true);
});

  it('does not render a react element', () => {
  let SecondsComponentComp = TestUtils.renderIntoDocument(<SecondsComponent />);
  expect(TestUtils.isElement(SecondsComponentComp)).to.equal(false);
});

  it('does not render a DOMComponent', () => {
  let SecondsComponentComp = TestUtils.renderIntoDocument(<SecondsComponent />);
  expect(TestUtils.isDOMComponent(SecondsComponentComp)).to.equal(false);
});

  it('should be rendered with single div tag', () => {
  let SecondsComponentComp = TestUtils.renderIntoDocument(<SecondsComponent />);
  var div = TestUtils.scryRenderedDOMComponentsWithTag(SecondsComponentComp, 'div');
  expect(div.length).to.equal(1);
});

it('should be rendered with single label tag', () => {
  let SecondsComponentComp = TestUtils.renderIntoDocument(<SecondsComponent />);
  var label = TestUtils.scryRenderedDOMComponentsWithTag(SecondsComponentComp, 'label');
  expect(label.length).to.equal(1);
});


});
