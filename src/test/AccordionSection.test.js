let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let AccordionSection = require('../common/components/AccordionSection'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('AccordionSection testcases', function () {
  before('before creating AccordionSection', function() {
    this.AccordionSectionComp = TestUtils.renderIntoDocument(<AccordionSection />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.AccordionSectionComp, 'a');
  });


  it('check rendered tagName', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.AccordionSectionComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});

  it('renders a composite component', () => {
  let AccordionSectionComp = TestUtils.renderIntoDocument(<AccordionSection  />);
  expect(TestUtils.isCompositeComponent(AccordionSectionComp)).to.equal(true);
});

it('does not render a react element', () => {
  let AccordionSectionComp = TestUtils.renderIntoDocument(<AccordionSection />);
  expect(TestUtils.isElement(AccordionSectionComp)).to.equal(false);
});

it('should be rendered with several divs', () => {
  let AccordionSectionComp = TestUtils.renderIntoDocument(<AccordionSection />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(AccordionSectionComp, 'div');
  expect(divs.length).to.equal(3);
});

it('should be rendered with single anchor tag', () => {
  let AccordionSectionComp = TestUtils.renderIntoDocument(<AccordionSection />);
  var anchor = TestUtils.scryRenderedDOMComponentsWithTag(AccordionSectionComp, 'a');
  expect(anchor.length).to.equal(1);
});

it('Renderes div tag with "accordion-section" class', function() {
this.AccordionSectionComp = TestUtils.renderIntoDocument(<AccordionSection id="1" _selected={true}/>); 
    let renderedDOM = ReactDOM.findDOMNode(this.AccordionSectionComp);
    expect(renderedDOM.tagName).to.equal("DIV");
    expect(renderedDOM.classList.length).to.equal(2);
    expect(renderedDOM.classList[0]).to.equal("accordion-section");
    expect(renderedDOM.classList[1]).to.equal("selected");
  });

  it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<AccordionSection />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});
});