let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let Accordion = require('../common/components/Accordion'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('Accordion testcases', function () {
  before('before creating Accordion', function() {
    this.AccordionComp = TestUtils.renderIntoDocument(<Accordion />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.AccordionComp, 'div');
  });


  it('check rendered tagName', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.AccordionComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});

  it('renders a composite component', () => {
  let AccordionComp = TestUtils.renderIntoDocument(<Accordion  />);
  expect(TestUtils.isCompositeComponent(AccordionComp)).to.equal(true);
});

it('does not render a react element', () => {
  let AccordionComp = TestUtils.renderIntoDocument(<Accordion />);
  expect(TestUtils.isElement(AccordionComp)).to.equal(false);
});

it('should be rendered with single div', () => {
  let AccordionComp = TestUtils.renderIntoDocument(<Accordion />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(AccordionComp, 'div');
  expect(divs.length).to.equal(1);
});

it('Renderes div tag with "accordion" class', function() {
this.AccordionComp = TestUtils.renderIntoDocument(<Accordion />); 
    let renderedDOM = ReactDOM.findDOMNode(this.AccordionComp);
    expect(renderedDOM.tagName).to.equal("DIV");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("accordion");
  });


  it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<Accordion />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});
});
