let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let Label = require('../../common/components/Label'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('label testcases', function () {
  before('before creating label', function() {
    this.LabelComp = TestUtils.renderIntoDocument(<Label />);
    this.label = TestUtils.findRenderedDOMComponentWithTag(this.LabelComp, 'label');
  });

  it('Renderes component with label tag', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.LabelComp);
    expect(renderedDOM.tagName).to.equal("LABEL");
  });

  
});