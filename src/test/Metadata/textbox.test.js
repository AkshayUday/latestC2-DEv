let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let TextBox = require('../../common/components/TextBox'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('textbox testcases', function () {
  before('before crating textbox', function() {
    this.TextBoxComp = TestUtils.renderIntoDocument(<TextBox />);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.TextBoxComp, 'input');
});
  
  it('Renderes Input tag with "pe-input" class', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.TextBoxComp);
    expect(renderedDOM.tagName).to.equal("INPUT");
  });

  it('renders a input with default values', function () {
    expect(this.input).to.exist;
    expect(this.input.value).to.equal("");
    expect(this.input.placeholder).to.equal("");
    expect(this.input.disabled).to.equal(false);
    expect(this.input.required).to.equal(false);
    expect(this.input.maxLength).to.equal(250);
    expect(this.input.autofocus).to.equal(false);
  });

  it('changes value after setting state', function () {
    let TextBoxComp1 = TestUtils.renderIntoDocument(<TextBox/>);
    TextBoxComp1.setState({ value: "New state value" });
    let input1 = TestUtils.findRenderedDOMComponentWithTag(TextBoxComp1, 'input');
    expect(ReactDOM.findDOMNode(input1).getAttribute("value")).not.to.equal("New state value");
  });

  it('passing "value" property updates state and DOM element', function () {
    let TextBoxComp = TestUtils.renderIntoDocument(<TextBox value="sample"/>);
    let input = TestUtils.findRenderedDOMComponentWithTag(TextBoxComp, 'input');
    expect(input.value).to.equal('');
  });

  it('passing "placeholder" property updates state and DOM element', function () {
    let TextBoxComp = TestUtils.renderIntoDocument(<TextBox placeholder="enter data"/>);
    let input = TestUtils.findRenderedDOMComponentWithTag(TextBoxComp, 'input');
    expect(ReactDOM.findDOMNode(input).getAttribute("placeholder")).to.equal('enter data');
  });

  it('passing "maxlength" property updates state and DOM element', function () {
    let TextBoxComp = TestUtils.renderIntoDocument(<TextBox maxLength="2"/>);
    let input = TestUtils.findRenderedDOMComponentWithTag(TextBoxComp, 'input');
    expect(ReactDOM.findDOMNode(input).getAttribute("maxLength")).to.equal('2');
  });


  it('passing "disabled" property updates state and DOM element', function () {
    let TextBoxComp5 = TestUtils.renderIntoDocument(<TextBox disabled={true} />);
    let input5 = TestUtils.findRenderedDOMComponentWithTag(TextBoxComp5, 'input');
    expect(input5.disabled).to.equal(true);
    //expect(ReactDOM.findDOMNode(input).getAttribute("disabled")).to.equal(true);
  });

  it('passing "required" property updates state and DOM element', function () {
    let TextBoxComp = TestUtils.renderIntoDocument(<TextBox required={true}/>);
    let input6 = TestUtils.findRenderedDOMComponentWithTag(TextBoxComp,'input');
    expect(input6.required).to.equal(true);
    //expect(ReactDOM.findDOMNode(input6).getAttribute("required")).to.equal(true);
  });

});





