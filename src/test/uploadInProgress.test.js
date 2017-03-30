let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let UploadInProgress = require('../PatternAddAnAsset/js/components/uploadInProgress'); 
let chai = require('chai');
let expect = chai.expect;

// describe('UploadInProgress testcases', function () {
//   before('before creating UploadInProgress', function() {
//     this.UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
//    /* this.UploadInProgress = TestUtils.findRenderedDOMComponentWithTag(this.UploadInProgressComp, 'b');
//     */
//   });

  /*it('should rendered with div tag', function() { 
   	this.UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
    let renderedDOM = ReactDOM.findDOMNode(this.UploadInProgressComp);
    expect(renderedDOM.tagName).to.equal("DIV");
});


  it('renders a composite component', () => {
  let UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress  />);
  expect(TestUtils.isCompositeComponent(UploadInProgressComp)).to.equal(true);
});

it('does not render a react element', () => {
  let UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
  expect(TestUtils.isElement(UploadInProgressComp)).to.equal(false);
});

it('should be rendered with several divs', () => {
  let UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(UploadInProgressComp, 'div');
  expect(divs.length).to.equal(3);
});


it('should be rendered with single b tag', () => {
  let UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
  var b = TestUtils.scryRenderedDOMComponentsWithTag(UploadInProgressComp, 'b');
  expect(b.length).to.equal(1);
});

it('should be rendered with single h2 tag', () => {
  let UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
  var h2 = TestUtils.scryRenderedDOMComponentsWithTag(UploadInProgressComp, 'h2');
  expect(h2.length).to.equal(1);
});

it('Renderes div tag with "pe-status" class', function() {
    this.UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
    var divs = TestUtils.scryRenderedDOMComponentsWithTag(this.UploadInProgressComp, 'div');  
    let renderedDOM = ReactDOM.findDOMNode(this.UploadInProgressComp);
    expect(renderedDOM.tagName).to.equal("DIV");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("pe-status");
    
});

  it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<UploadInProgress />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});

it('should be rendered with single span tag', () => {
  let UploadInProgressComp = TestUtils.renderIntoDocument(<UploadInProgress />);
  var span = TestUtils.scryRenderedDOMComponentsWithTag(UploadInProgressComp, 'span');
  expect(span.length).to.equal(1);
});



});*/
