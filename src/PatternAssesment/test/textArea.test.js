let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let TextArea = require('../../common/components/TextArea'); 
let chai = require('chai');
let expect = chai.expect;

describe('textarea testcases', function () {
  before('before creating textarea', function() {
    this.TextAreaComp = TestUtils.renderIntoDocument(<TextArea />);
    this.textarea = TestUtils.findRenderedDOMComponentWithTag(this.TextAreaComp, 'textarea');
  });

  it('check rendered tagName', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.TextAreaComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});

  it('renders a textarea and value is empty', function () {
    expect(this.textarea).to.exist;
    expect(this.textarea.value).to.equal("");
    expect(this.textarea.rows).to.equal(4);
    expect(this.textarea.cols).to.equal(50);
    expect(this.textarea.placeholder).to.equal("");
    expect(this.textarea.maxLength).to.equal(300);
    expect(this.textarea.disabled).to.equal(false);
    
  });

  it('set state "value" and property value is still empty as it is a stateless component', function () {
    let TextAreaComp1 = TestUtils.renderIntoDocument(<TextArea/>);
    TextAreaComp1.setState({ value: "New state value" });
    let textarea1 = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp1, 'textarea');
    expect(ReactDOM.findDOMNode(textarea1).getAttribute("value")).not.to.equal("New state value");
    
  });

  it('set property "value" and check state', function () {
    let TextAreaComp = TestUtils.renderIntoDocument(<TextArea value="sample"/>);
    let textarea = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp, 'textarea');
    expect(ReactDOM.findDOMNode(textarea).getAttribute("value")).not.to.equal("sample");
    
  });

  it('set property "placeholder" and check state', function () {
    let TextAreaComp = TestUtils.renderIntoDocument(<TextArea placeholder="enter data"/>);
    let textarea = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp, 'textarea');
    expect(textarea.placeholder).to.equal('enter data');
    expect(ReactDOM.findDOMNode(textarea).getAttribute("placeholder")).to.equal('enter data');
   
  });

  it('set property "maxlength" and set value exceeding maxlength', function () {
    let TextAreaComp = TestUtils.renderIntoDocument(<TextArea maxLength="300"/>);
    let textarea = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp, 'textarea');
    expect(ReactDOM.findDOMNode(textarea).getAttribute("maxLength")).to.equal('300');
    
  });

  
  it('set property "readOnly" and check the attribute "readOnly"', function () {
    let TextAreaComp5 = TestUtils.renderIntoDocument(<TextArea readOnly={true} />);
    let textarea5 = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp5, 'textarea');
    expect(textarea5.readOnly).to.equal(true);
    
  });


  it('set property "disabled" and check the attribute "disabled"', function () {
    let TextAreaComp5 = TestUtils.renderIntoDocument(<TextArea disabled={true} />);
    let textarea5 = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp5, 'textarea');
    expect(textarea5.disabled).to.equal(true);
    
  });

  it('set property "required" and check the attribute "required"', function () {
    let TextAreaComp = TestUtils.renderIntoDocument(<TextArea required={true}/>);
    let textarea = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp, 'textarea');
    expect(textarea.required).to.equal(true);
    
  });

  it('set property "rows" and check the attribute "rows"', function () {
    let TextAreaComp = TestUtils.renderIntoDocument(<TextArea rows={5}/>);
    let textarea = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp, 'textarea');
    expect(textarea.rows).to.equal(5);
    expect(ReactDOM.findDOMNode(textarea).getAttribute("rows")).to.equal("5");
    
  });

  it('set property "cols" and check the attribute "cols"', function () {
    let TextAreaComp = TestUtils.renderIntoDocument(<TextArea cols={50}/>);
    let textarea = TestUtils.findRenderedDOMComponentWithTag(TextAreaComp, 'textarea');
    expect(textarea.cols).to.equal(50);
    expect(ReactDOM.findDOMNode(textarea).getAttribute("cols")).to.equal("50");
   
  });

});





