let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let PE_Tab = require('../common/components/pe-tab'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

/*describe('PE_Tab testcases', function () {
  before('before creating PE_Tab', function() {
    this.PE_TabComp = TestUtils.renderIntoDocument(<PE_Tab/>);
  });

  it('renders a composite component', () => {
  let PE_TabComp = TestUtils.renderIntoDocument(<PE_Tab />);
  expect(TestUtils.isCompositeComponent(PE_TabComp)).to.equal(true);
});

it('does not render a react element', () => {
  let PE_TabComp = TestUtils.renderIntoDocument(<PE_Tab />);
  expect(TestUtils.isElement(PE_TabComp)).to.equal(false);
});

it('Renderes component with div tag', function() {
   
     this.PE_TabComp = TestUtils.renderIntoDocument(<PE_Tab />);
    let renderedDOM = ReactDOM.findDOMNode(this.PE_TabComp);
    expect(renderedDOM.tagName).to.equal("DIV");
   
  });

it('should be rendered with several div', () => {
  let PE_TabComp = TestUtils.renderIntoDocument(<PE_Tab />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(PE_TabComp, 'div');
  expect(divs.length).to.equal(1);
});

it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<PE_Tab />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});


});*/