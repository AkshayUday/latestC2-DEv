let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let SingleFileUpload = require('../PatternAddAnAsset/js/components/SingleFileUpload'); 
let chai = require('chai');
let expect = chai.expect;
let Store = require('../PatternAddAnAsset/js/store/index');
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';



//const initialState = {key: 'value'};
//const store = createStore(initialState);




/*describe('SingleFileUpload testcases', function () {
  before('before creating SingleFileUpload Component', function() {
    //this.SingleFileUploadComp = TestUtils.renderIntoDocument(<SingleFileUpload />);
    //this.SingleFileUpload = TestUtils.findRenderedDOMComponentWithTag(this.SingleFileUploadComp, 'input');
    SingleFileUploadComp = TestUtils.renderIntoDocument(
  <Provider store={Store()}>
    {() => <SingleFileUpload />}
  </Provider>
);
    
  });


  it('renders a composite component', () => {
  let SingleFileUploadComp = TestUtils.renderIntoDocument(<SingleFileUpload  />);
  expect(TestUtils.isCompositeComponent(SingleFileUploadComp)).to.equal(true);
});

it('does not render a react element', () => {
  let SingleFileUploadComp = TestUtils.renderIntoDocument(<SingleFileUpload />);
  expect(TestUtils.isElement(SingleFileUploadComp)).to.equal(false);
});

   });*/