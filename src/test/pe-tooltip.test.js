let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let Tooltip = require('../common/components/pe-tooltip'); 
let chai = require('chai');
let expect = chai.expect;

/*describe('tooltip testcases', function () {
    before('before creating tooltip', function() {
    this.TooltipComp = TestUtils.renderIntoDocument(<Tooltip />);
    this.Tooltip = TestUtils.findRenderedDOMComponentWithTag(this.TooltipComp, 'div');
    
  });

    it('renders a composite component', () => {
  let TooltipComp = TestUtils.renderIntoDocument(<Tooltip  />);
  expect(TestUtils.isCompositeComponent(TooltipComp)).to.equal(true);
});

     it('renders a DOM component', () => {
  let TooltipComp = TestUtils.renderIntoDocument(<Tooltip  />);
  expect(TestUtils.isDOMComponent(TooltipComp)).to.equal(false);
});

it('does not render a react element', () => {
  let TooltipComp = TestUtils.renderIntoDocument(<Tooltip />);
  expect(TestUtils.isElement(TooltipComp)).to.equal(false);
});

    it('should rendered with span tag', function() { 
   	this.TooltipComp = TestUtils.renderIntoDocument(<Tooltip />);
    let renderedDOM = ReactDOM.findDOMNode(this.TooltipComp);
    expect(renderedDOM.tagName).to.equal("SPAN");
});

 it('should be rendered with single div', () => {
  let TooltipComp = TestUtils.renderIntoDocument(<Tooltip />);
  var div = TestUtils.scryRenderedDOMComponentsWithTag(TooltipComp, 'div');
  expect(div.length).to.equal(1);
});

 it('should be rendered with single p tag', () => {
  let TooltipComp = TestUtils.renderIntoDocument(<Tooltip />);
  var p = TestUtils.scryRenderedDOMComponentsWithTag(TooltipComp, 'p');
  expect(p.length).to.equal(1);
});

 it('Renderes div tag with "pe-tooltip--wrapper" class', function() {
    this.TooltipComp = TestUtils.renderIntoDocument(<Tooltip />);
    var divs = TestUtils.scryRenderedDOMComponentsWithTag(this.TooltipComp, 'span');  
    let renderedDOM = ReactDOM.findDOMNode(this.TooltipComp);
    expect(renderedDOM.tagName).to.equal("SPAN");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("pe-tooltip--wrapper");
    
});

  it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<Tooltip />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('span');
});
    });*/
