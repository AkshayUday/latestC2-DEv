import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai'; 
import Radio from '../common/components/Radio'; 

describe('Radio testcases', function () {
  before('before creating Radio', function() {
  	this.function1=function(){};
    this.function2=function(){};
    this.RadioComp = TestUtils.renderIntoDocument(<Radio parent={this.function1} customFn={this.function2} />);
    this.Radio = TestUtils.findRenderedDOMComponentWithTag(this.RadioComp, 'input');
    
  });

   it('should rendered with input tag', function() { 
   	this.RadioComp = TestUtils.renderIntoDocument(<Radio parent={this.function1} customFn={this.function2} />);
    let renderedDOM = ReactDOM.findDOMNode(this.RadioComp);
    expect(renderedDOM.tagName).to.equal("INPUT");
});

it('renders a radio button  with default attribute values', function () {
    expect(this.Radio).to.exist;
    expect(this.Radio.id).to.equal("");
    expect(this.Radio.value).to.equal('true');
    expect(this.Radio.name).to.equal("");
    expect(this.Radio.disabled).to.equal(false);
    expect(this.Radio.required).to.equal(false);
    expect(this.Radio.maxLength).to.equal(30);
    expect(this.Radio.autofocus).to.equal(false);
    
  });


    it('set property "id" and check the attribute "id"', function () {
    let RadioComp = TestUtils.renderIntoDocument(<Radio customFn = {this.function1} parent = {this.function2} id="sample"/>);
    let radio = TestUtils.findRenderedDOMComponentWithTag(RadioComp, 'input');
    expect(radio.id).to.equal('sample');

  });

    it('set property "value" and check the attribute "value"', function () {
    let RadioComp = TestUtils.renderIntoDocument(<Radio customFn = {this.function1} parent = {this.function2} value={true}/>);
    let radio = TestUtils.findRenderedDOMComponentWithTag(RadioComp, 'input');
    expect(radio.value).to.equal('true');

  });

  it('set property "name" and check state', function () {
    let RadioComp = TestUtils.renderIntoDocument(<Radio customFn = {this.function1} parent = {this.function2} value={true} required={false} name="sample"/>);
    let radio = TestUtils.findRenderedDOMComponentWithTag(RadioComp, 'input');
    expect(radio.name).to.equal('sample');
    expect(ReactDOM.findDOMNode(radio).getAttribute("name")).to.equal('sample');

  });

  it('set property "maxlength" and set value exceeding maxlength', function () {
    let RadioComp = TestUtils.renderIntoDocument(<Radio customFn = {this.function1} parent = {this.function2} value={true} required={false} maxLength='30'/>);
    let radio = TestUtils.findRenderedDOMComponentWithTag(RadioComp, 'input');
    expect(ReactDOM.findDOMNode(radio).getAttribute("maxLength")).to.equal('30');

  });

  it('set property "type" and check state', function () {
    let RadioComp = TestUtils.renderIntoDocument(<Radio type="radio" customFn = {this.function1} parent = {this.function2} value={true} required={false} name="sample"/>);
    let radio = TestUtils.findRenderedDOMComponentWithTag(RadioComp, 'input');
    expect(radio.type).to.equal("radio");
    expect(ReactDOM.findDOMNode(radio).getAttribute("type")).to.equal("radio");

  });

   it('set property "required" and check the attribute "required"', function () {
    let RadioComp = TestUtils.renderIntoDocument(<Radio customFn = {this.function1} parent = {this.function2} required={true}/>);
    let radio = TestUtils.findRenderedDOMComponentWithTag(RadioComp, 'input');
    expect(radio.required).to.equal(true);

  });

 it('set property "disabled" and check the attribute "disabled"', function () {
    let RadioComp = TestUtils.renderIntoDocument(<Radio customFn = {this.function1} parent = {this.function2} disabled={true}/>);
    let radio = TestUtils.findRenderedDOMComponentWithTag(RadioComp, 'input');
    expect(radio.disabled).to.equal(true);

  });

it('Renderes input tag with "sample" class', function() {
this.RadioComp = TestUtils.renderIntoDocument(<Radio customFn = {this.function1} parent = {this.function2} disabled={true} className="sample"/>); 
    let renderedDOM = ReactDOM.findDOMNode(this.RadioComp);
    expect(renderedDOM.tagName).to.equal("INPUT");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("sample");
  });
});
