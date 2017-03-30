let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let Checkbox = require('../common/components/checkbox'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

/*describe('checkbox testcases', function () {
  before('before creating checkbox', function() {
    this.function1=function(){};
    this.parent=function(){};
    this.checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent}/>);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.checkboxComp, 'input');
});

  it('Renderes Input tag with "pe-input" class', function() {
    this.checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent} />);
    let renderedDOM = ReactDOM.findDOMNode(this.checkboxComp);
    expect(renderedDOM.tagName).to.equal("INPUT");
  });

  it('renders a input with default values', function () {
    this.checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent}/>);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.checkboxComp, 'input');
    expect(this.input).to.exist;
    expect(this.input.id).to.equal("");
    expect(this.input.value).to.equal('true');
    expect(this.input.name).to.equal("");
    expect(this.input.disabled).to.equal(false);
    expect(this.input.required).to.equal(false);
    expect(this.input.maxLength).to.equal(30);
    expect(this.input.autofocus).to.equal(false);
    //expect(this.input.parent).to.equal(this.parent);
  });

  it('set property "value" and check the attribute "value"', function () {
    let checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent} value={true}/>);
    let checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComp, 'input');
    expect(checkbox.value).to.equal('true');

  });

  it('set property "disabled" and check the attribute "disabled"', function () {
    let checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent} value={true} disabled={false}/>);
    let checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComp, 'input');
    expect(checkbox.disabled).to.equal(false);

  });

  it('set property "required" and check the attribute "required"', function () {
    let checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent} value={true} required={false}/>);
    let checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComp, 'input');
    expect(checkbox.required).to.equal(false);

  });

  it('set property "name" and check state', function () {
    let checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent} value={true} required={false} name="sample"/>);
    let checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComp, 'input');
    expect(checkbox.name).to.equal('sample');
    expect(ReactDOM.findDOMNode(checkbox).getAttribute("name")).to.equal('sample');

  });

  it('set property "maxlength" and set value exceeding maxlength', function () {
    let checkboxComp = TestUtils.renderIntoDocument(<Checkbox customFn = {this.function1} parent = {this.parent} value={true} required={false} maxLength='30'/>);
    let checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComp, 'input');
    expect(ReactDOM.findDOMNode(checkbox).getAttribute("maxLength")).to.equal('30');

  });

  it('set property "type" and check state', function () {
    let checkboxComp = TestUtils.renderIntoDocument(<Checkbox type="checkbox" customFn = {this.function1} parent = {this.parent} value={true} required={false} name="sample"/>);
    let checkbox = TestUtils.findRenderedDOMComponentWithTag(checkboxComp, 'input');
    expect(checkbox.type).to.equal("checkbox");
    expect(ReactDOM.findDOMNode(checkbox).getAttribute("type")).to.equal("checkbox");

  });


});*/