let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let HoursComponent = require('../../common/components/HoursComponent');
let chai = require('chai');
let expect = chai.expect;


describe('HoursComponent testcases', function () {
  before('before creating HoursComponent', function() {
    this.HoursComponentComp = TestUtils.renderIntoDocument(<HoursComponent />);
    this.hourscomponent = TestUtils.findRenderedDOMComponentWithTag(this.HoursComponentComp, 'div');
  });

  it('check rendered tagName', function() {
    let renderedDOM = ReactDOM.findDOMNode(this.HoursComponentComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});

  it('renders a composite component', () => {
  let HoursComponentComp = TestUtils.renderIntoDocument(<HoursComponent />);
  expect(TestUtils.isCompositeComponent(HoursComponentComp)).to.equal(true);
});

  it('does not render a react element', () => {
  let HoursComponentComp = TestUtils.renderIntoDocument(<HoursComponent />);
  expect(TestUtils.isElement(HoursComponentComp)).to.equal(false);
});

  it('does not render a DOMComponent', () => {
  let HoursComponentComp = TestUtils.renderIntoDocument(<HoursComponent />);
  expect(TestUtils.isDOMComponent(HoursComponentComp)).to.equal(false);
});

  it('should be rendered with single div tag', () => {
  let HoursComponentComp = TestUtils.renderIntoDocument(<HoursComponent />);
  var div = TestUtils.scryRenderedDOMComponentsWithTag(HoursComponentComp, 'div');
  expect(div.length).to.equal(1);
});

it('should be rendered with single label tag', () => {
  let HoursComponentComp = TestUtils.renderIntoDocument(<HoursComponent />);
  var label = TestUtils.scryRenderedDOMComponentsWithTag(HoursComponentComp, 'label');
  expect(label.length).to.equal(1);
});


});
