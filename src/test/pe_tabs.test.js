let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let PE_Tabs = require('../common/components/pe-tabs'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

/*describe('PE_Tabs testcases', function () {
  before('before creating PE_Tabs', function() {
    this.PE_TabsComp = TestUtils.renderIntoDocument(<PE_Tabs children={['sample1','sample2']}  selected={true} title="demo"/>);
  });

  it('renders a composite component', () => {
  let PE_TabsComp = TestUtils.renderIntoDocument(<PE_Tabs />);
  expect(TestUtils.isCompositeComponent(PE_TabsComp)).to.equal(true);
});

it('does not render a react element', () => {
  let PE_TabsComp = TestUtils.renderIntoDocument(<PE_Tabs />);
  expect(TestUtils.isElement(PE_TabsComp)).to.equal(false);
});

it('Renderes component with div tag', function() {
   
     this.PE_TabsComp = TestUtils.renderIntoDocument(<PE_Tabs />);
    let renderedDOM = ReactDOM.findDOMNode(this.PE_TabsComp);
    expect(renderedDOM.tagName).to.equal("DIV");
   
  });

it('should be rendered with several div', () => {
  let PE_TabsComp = TestUtils.renderIntoDocument(<PE_Tabs />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(PE_TabsComp, 'div');
  expect(divs.length).to.equal(1);
});

it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<PE_Tabs />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});

});*/