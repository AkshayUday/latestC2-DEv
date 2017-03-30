import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TreePane from '../PatternAddAnAsset/js/components/folderpane/FolderPane.js'
import {expect} from 'chai';

let model = {};
let items = [];
model.fileName='test1';
items.push(model);

const treePane = TestUtils.renderIntoDocument(<TreePane model={items}/>);

describe('TreePane testcases ', () => {
  it('before creating TreePane ', () => {
      expect(TestUtils.isCompositeComponent(treePane)).to.equal(true);
  });
  it('should have the class name as folderTree', () =>{
    let folderTreeClass = TestUtils.scryRenderedDOMComponentsWithClass(treePane,'folderTree');
    expect(folderTreeClass.length).to.equal(1);
  });
  it('renders a DOMComponent component', () => {
    expect(TestUtils.isDOMComponent(treePane)).to.equal(false);
  });
  it('should renders div tag', function() {
      var divs = TestUtils.scryRenderedDOMComponentsWithTag(treePane, 'div');
      expect(divs.length).to.equal(1);
  });
});
