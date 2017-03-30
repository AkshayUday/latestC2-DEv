let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let SelectBox = require('../../common/components/SelectBox'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('SelectBox testcases', function () {
  before('before creating selectbox', function() {
    this.SelectBoxComp = TestUtils.renderIntoDocument(<SelectBox />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.SelectBoxComp, 'select');
  });
  
  it('renders a input with default value as empty', function () {
    this.SelectBoxComp = TestUtils.renderIntoDocument(<SelectBox />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.SelectBoxComp, 'select');
    expect(this.input).to.exist;
    expect(this.input.value).to.equal("");
  });

  it('passing "required" property updates state and DOM element', function () {
    let SelectBoxComp = TestUtils.renderIntoDocument(<SelectBox required={true}/>);
    let selectbox = TestUtils.findRenderedDOMComponentWithTag(SelectBoxComp, 'select');
    expect(selectbox.required).to.equal(true);
  });

   it('passing "disabled" property updates state and DOM element', function () {
    let SelectBoxComp = TestUtils.renderIntoDocument(<SelectBox disabled={true}/>);
    let selectbox = TestUtils.findRenderedDOMComponentWithTag(SelectBoxComp, 'select');
    expect(selectbox.disabled).to.equal(true);
  });


 it('renders a input with default values', function () {
    this.SelectBoxComp = TestUtils.renderIntoDocument(<SelectBox />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.SelectBoxComp, 'select');
    expect(this.input).to.exist;
    expect(this.input.id).to.equal("");
    expect(this.input.multiple).to.equal(false);
    expect(this.input.disabled).to.equal(false);
    expect(this.input.required).to.equal(false);
  });


});





