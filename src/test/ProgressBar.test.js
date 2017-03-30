let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let ProgressBar = require('../common/components/ProgressBar'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('ProgressBar testcases', function () {
  before('before creating ProgressBar', function() {
    this.ProgressBarComp = TestUtils.renderIntoDocument(<ProgressBar/>);
  });

  it('renders a composite component', () => {
  let ProgressBarComp = TestUtils.renderIntoDocument(<ProgressBar />);
  expect(TestUtils.isCompositeComponent(ProgressBarComp)).to.equal(true);
});

it('does not render a react element', () => {
  let ProgressBarComp = TestUtils.renderIntoDocument(<ProgressBar />);
  expect(TestUtils.isElement(ProgressBarComp)).to.equal(false);
});

it('Renderes component with div tag', function() {
   
     this.ProgressBarComp = TestUtils.renderIntoDocument(<ProgressBar />);
    let renderedDOM = ReactDOM.findDOMNode(this.ProgressBarComp);
    expect(renderedDOM.tagName).to.equal("DIV");
   
  });

it('should be rendered with several div', () => {
  let ProgressBarComp = TestUtils.renderIntoDocument(<ProgressBar />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(ProgressBarComp, 'div');
  expect(divs.length).to.equal(3);
});

it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<ProgressBar />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});


});