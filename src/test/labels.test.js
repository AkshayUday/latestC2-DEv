let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let Labels = require('../common/components/Labels'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('Labels testcases', function () {
  before('before creating Labels', function() {
    this.LabelsComp = TestUtils.renderIntoDocument(<Labels label="sample" />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.LabelsComp, 'div');
  });

  it('renders a composite component', () => {
  let LabelsComp = TestUtils.renderIntoDocument(<Labels />);
  expect(TestUtils.isCompositeComponent(LabelsComp)).to.equal(true);
});

it('does not render a react element', () => {
  let LabelsComp = TestUtils.renderIntoDocument(<Labels />);
  expect(TestUtils.isElement(LabelsComp)).to.equal(false);
});

it('Renderes component with div tag', function() {
   
     this.LabelsComp = TestUtils.renderIntoDocument(<Labels />);
    let renderedDOM = ReactDOM.findDOMNode(this.LabelsComp);
    expect(renderedDOM.tagName).to.equal("DIV");
   
  });
it('Renderes Input tag with "clabelOrg" class', function() {
this.LabelsComp = TestUtils.renderIntoDocument(<Labels />); 
    let renderedDOM = ReactDOM.findDOMNode(this.LabelsComp);
    expect(renderedDOM.tagName).to.equal("DIV");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("clabelOrg");
  });

it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<Labels />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});


});

