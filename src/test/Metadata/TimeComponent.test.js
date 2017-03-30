/* let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let TimeComponent = require('../../common/components/TimePicker');
let chai = require('chai');
let expect = chai.expect;


describe('TimeComponent testcases', function () {
  before('before creating TimeComponent', function() {
    this.TimeComponentComp = TestUtils.renderIntoDocument(<TimeComponent />);
    this.TimeComponent = TestUtils.findRenderedDOMComponentWithTag(this.TimeComponentComp, 'div');
  });


  it('check rendered tagName', function() {
    let renderedDOM = ReactDOM.findDOMNode(this.TimeComponentComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});
  it('renders a composite component', () => {
  let TimeComponentComp = TestUtils.renderIntoDocument(<TimeComponent />);
  expect(TestUtils.isCompositeComponent(TimeComponentComp)).to.equal(true);
});

  it('does not render a react element', () => {
  let TimeComponentComp = TestUtils.renderIntoDocument(<TimeComponent />);
  expect(TestUtils.isElement(TimeComponentComp)).to.equal(false);
});

  it('does not render a DOMComponent', () => {
  let TimeComponentComp = TestUtils.renderIntoDocument(<TimeComponent />);
  expect(TestUtils.isDOMComponent(TimeComponentComp)).to.equal(false);
});

  it('should be rendered with single div tag', () => {
  let TimeComponentComp = TestUtils.renderIntoDocument(<TimeComponent />);
  var div = TestUtils.scryRenderedDOMComponentsWithTag(TimeComponentComp, 'div');
  expect(div.length).to.equal(1);
});

  it('should be rendered with several label tag', () => {
  let TimeComponentComp = TestUtils.renderIntoDocument(<TimeComponent />);
  var labels = TestUtils.scryRenderedDOMComponentsWithTag(TimeComponentComp, 'label');
  expect(labels.length).to.equal(3);
});




});
*/
