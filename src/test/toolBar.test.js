import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import toolBar from '../PatternAddAnAsset/js/components/browse/toolBar'; 
const toolBarComp = TestUtils.renderIntoDocument(<toolBar />);
describe('toolBar testcases', function () {
  
  it('renders a composite component', () => {
    expect(TestUtils.isCompositeComponent(toolBarComp)).to.equal(false);  
  });

  it('does not render a react element', () => {
    expect(TestUtils.isElement(toolBarComp)).to.equal(false);
  });

  it('does render a DOM Component', () => {
    expect(TestUtils.isDOMComponent(toolBarComp)).to.equal(true);
  });
});