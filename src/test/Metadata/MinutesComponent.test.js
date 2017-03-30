let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let MinutesComponent = require('../../common/components/MinutesComponent');
let chai = require('chai');
let expect = chai.expect;


describe('MinutesComponent testcases', function () {
  before('before creating MinutesComponent', function() {
    this.MinutesComponentComp = TestUtils.renderIntoDocument(<MinutesComponent />);
    this.MinutesComponent = TestUtils.findRenderedDOMComponentWithTag(this.MinutesComponentComp, 'div');
  });

  it('check rendered tagName', function() {
    let renderedDOM = ReactDOM.findDOMNode(this.MinutesComponentComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});

  it('renders a composite component', () => {
  let MinutesComponentComp = TestUtils.renderIntoDocument(<MinutesComponent />);
  expect(TestUtils.isCompositeComponent(MinutesComponentComp)).to.equal(true);
});

  it('does not render a react element', () => {
  let MinutesComponentComp = TestUtils.renderIntoDocument(<MinutesComponent />);
  expect(TestUtils.isElement(MinutesComponentComp)).to.equal(false);
});

  it('does not render a DOMComponent', () => {
  let MinutesComponentComp = TestUtils.renderIntoDocument(<MinutesComponent />);
  expect(TestUtils.isDOMComponent(MinutesComponentComp)).to.equal(false);
});

  it('should be rendered with single div tag', () => {
  let MinutesComponentComp = TestUtils.renderIntoDocument(<MinutesComponent />);
  var div = TestUtils.scryRenderedDOMComponentsWithTag(MinutesComponentComp, 'div');
  expect(div.length).to.equal(1);
});

it('should be rendered with single label tag', () => {
  let MinutesComponentComp = TestUtils.renderIntoDocument(<MinutesComponent />);
  var label = TestUtils.scryRenderedDOMComponentsWithTag(MinutesComponentComp, 'label');
  expect(label.length).to.equal(1);
});


});
