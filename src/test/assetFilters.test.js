let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let AssetFilters = require('../PatternAddAnAsset/js/components/browse/assetFilters'); //my root-test lives in components/__tests__/, so this is how I require in my components.
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Provider, connect } from 'react-redux';
let chai = require('chai');
let expect = chai.expect; 
let Store = require('../PatternAddAnAsset/js/store/index');

//import store from './store';
//import { createStore } from 'redux';
//var initialState={};
//const store = createStore(initialState);

describe('AssetFilters testcases', function () {
  
  before('before creating AssetFilters', function() {
  	var tabHandleSelectDemo=function(){

    };
  
  /*this.AssetFiltersComp = TestUtils.renderIntoDocument(
   <Provider>
     {() => <AssetFilters  store={Store} />}
    </Provider>
  )*/
  	//this.AssetFiltersComp = TestUtils.renderIntoDocument(<AssetFilters tabHandleSelect={tabHandleSelectDemo} store={Store} />);  
    //this.input = TestUtils.findRenderedDOMComponentWithTag(this.AssetFiltersComp, 'div');
  });

  it('check rendered tagName', function() { 
    //let renderedDOM = ReactDOM.findDOMNode(this.AssetFiltersComp);
   // expect(renderedDOM.tagName).to.equal("DIV");
  });

});
