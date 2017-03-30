let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let BrowseAssets = require('../PatternAddAnAsset/js/components/BrowseAssets'); 
let chai = require('chai');
let expect = chai.expect;

/*describe('BrowseAssets testcases', function () {
  before('before creating BrowseAssets', function() {
  	var sendToQuad=sinon.stub();

    this.BrowseAssetsComp = TestUtils.renderIntoDocument(<BrowseAssets sendToQuad={sendToQuad}/>);
    this.BrowseAssets = TestUtils.findRenderedDOMComponentWithTag(this.BrowseAssetsComp, 'div');
  
  });

  it('should rendered with div tag', function() { 
   	this.BrowseAssetsComp = TestUtils.renderIntoDocument(<BrowseAssets />);
    let renderedDOM = ReactDOM.findDOMNode(this.BrowseAssetsComp);
    expect(renderedDOM.tagName).to.equal("DIV");
  });


  it('renders a composite component', () => {
  let BrowseAssetsComp = TestUtils.renderIntoDocument(<BrowseAssets  />);
  expect(TestUtils.isCompositeComponent(BrowseAssetsComp)).to.equal(true);
  });

  it('does not render a react element', () => {
  let BrowseAssetsComp = TestUtils.renderIntoDocument(<BrowseAssets />);
  expect(TestUtils.isElement(BrowseAssetsComp)).to.equal(false);
  });

  it('should be rendered with several divs', () => {
  let BrowseAssetsComp = TestUtils.renderIntoDocument(<BrowseAssets />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(BrowseAssetsComp, 'div');
  expect(divs.length).to.equal(3);
  });

});*/