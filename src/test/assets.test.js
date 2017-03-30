let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let Assets = require('../PatternAddAnAsset/js/components/browse/assets'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;
let Radio = require('../common/components/Radio'); 

/*describe('assets testcases', function () {
  before('before creating assets', function() {
  	var setSelectedItem1=function(){};
    this.assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
    this.input = TestUtils.findRenderedDOMComponentWithTag(this.assetsComp, 'footer');
  });

  it('check rendered tagName', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.assetsComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});

 it('renders a composite component', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  expect(TestUtils.isCompositeComponent(assetsComp)).to.equal(true);
});

it('does not render a react element', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  expect(TestUtils.isElement(assetsComp)).to.equal(false);
});

it('should be rendered with single div', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(assetsComp, 'div');
  expect(divs.length).to.equal(4);
});

it('renders a  Assets component', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  expect(TestUtils.isCompositeComponentWithType (assetsComp,Assets)).to.equal(true);
});

it('should be rendered with single p', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  var p = TestUtils.scryRenderedDOMComponentsWithTag(assetsComp,'p');
  expect(p.length).to.equal(1);
});

it('should be rendered with single footer', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  var footer = TestUtils.scryRenderedDOMComponentsWithTag(assetsComp,'footer');
  expect(footer.length).to.equal(1);
});

it('should be rendered with single i', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  var i = TestUtils.scryRenderedDOMComponentsWithTag(assetsComp,'i');
  expect(i.length).to.equal(1);
});

it('should be rendered with single image', () => {
  var setSelectedItem1=function(){};
  let assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>);
  var img = TestUtils.scryRenderedDOMComponentsWithTag(assetsComp,'img');
  expect(img.length).to.equal(1);
});

it('Renderes div tag with "card-item" class', function() {
	var setSelectedItem1=function(){};
    this.assetsComp = TestUtils.renderIntoDocument(<Assets setSelectedItem={setSelectedItem1} productTemp={{mimetype:["image"], name:"abc.fgh"}}/>); 
    let renderedDOM = ReactDOM.findDOMNode(this.assetsComp);
    expect(renderedDOM.tagName).to.equal("DIV");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("card-item");
  });

});*/
