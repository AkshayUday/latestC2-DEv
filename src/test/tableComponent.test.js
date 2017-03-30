import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import tableComponent from '../PatternAddAnAsset/js/components/searchLibrary/tableComponent'; 

const tableComponentComp = TestUtils.renderIntoDocument(<tableComponent />);
describe('tableComponent testcases', function () {
  
   it('renders a composite component', () => {
    expect(TestUtils.isCompositeComponent(tableComponentComp)).to.equal(false);
  });
   it('does not render a react element', () => {
    expect(TestUtils.isElement(tableComponentComp)).to.equal(false);
  });

  it('does render a DOM Component', () => {
    expect(TestUtils.isDOMComponent(tableComponentComp)).to.equal(true);
  });


  it('Renderes component with TABLECOMPONENT tag', function() {
      let renderedDOM = ReactDOM.findDOMNode(tableComponentComp);
      expect(renderedDOM.tagName).to.equal("TABLECOMPONENT");
  });

});