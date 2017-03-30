let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let CheckboxComponent = require('../PatternAddAnAsset/js/components/searchLibrary/CheckboxComponent'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

/*describe('CheckboxComponent testcases', function () {
  before('before creating CheckboxComponent', function() {
    this.CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.CheckboxComponentComp, 'input');
});

 it('check rendered tagName', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.CheckboxComponentComp);
    expect(renderedDOM.tagName).to.equal("INPUT");
});

  it('renders a composite component', () => {
  let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent  />);
  expect(TestUtils.isCompositeComponent(CheckboxComponentComp)).to.equal(true);
});

it('does not render a react element', () => {
  let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent />);
  expect(TestUtils.isElement(CheckboxComponentComp)).to.equal(false);
});

it('does not render a DOMComponent', () => {
  let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent />);
  expect(TestUtils.isDOMComponent(CheckboxComponentComp)).to.equal(false);
});

it('renders a CheckboxComponent  with default attribute values', function () {
    expect(this.input).to.exist;
    expect(this.input.id).to.equal("");
    expect(this.input.name).to.equal("");
    expect(this.input.checked).to.equal(false);
  });


 it('set property "id" and check the attribute "id"', function () {
    let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent id="sample"/>);
    let input = TestUtils.findRenderedDOMComponentWithTag(CheckboxComponentComp, 'input');
    expect(input.id).to.equal('sample');

  });

 it('set property "name" and check state', function () {
    let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent id="sample" name="abc"/>);
    let input = TestUtils.findRenderedDOMComponentWithTag(CheckboxComponentComp, 'input');
    expect(input.name).to.equal('abc');
    expect(ReactDOM.findDOMNode(input).getAttribute("name")).to.equal('abc');

  });

 it('set property "checked" and check the attribute "checked"', function () {
    let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent id="sample" name="abc" checked={true}/>);
    let input = TestUtils.findRenderedDOMComponentWithTag(CheckboxComponentComp, 'input');
    expect(input.checked).to.equal(true);

  });

   it('set property "type" and check state', function () {
    let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent id="sample" name="abc" checked={true} type="checkbox"/>);
    let input = TestUtils.findRenderedDOMComponentWithTag(CheckboxComponentComp, 'input');
    expect(input.type).to.equal("checkbox");
    expect(ReactDOM.findDOMNode(input).getAttribute("type")).to.equal("checkbox");

  });

  it('should be rendered with single input', () => {
	  let CheckboxComponentComp = TestUtils.renderIntoDocument(<CheckboxComponent id="sample" name="abc" checked={true} type="checkbox"/>);
	  var input = TestUtils.scryRenderedDOMComponentsWithTag(CheckboxComponentComp, 'input');
	  expect(input.length).to.equal(1);
	});
  });*/