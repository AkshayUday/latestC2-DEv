import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import SortAssets from '../common/components/SortAssets'; 

let sortOptions = ['Date Uploaded (Descending)',
                    'Date Uploaded (Ascending)',
                    'Name Ascending A-Z',
                    'Name Descending Z-A']

const SortAssetsComp = TestUtils.renderIntoDocument(<SortAssets  sortOptions={sortOptions}/>);
describe('SortAssets testcases', function () {

   it('renders a composite component', () => {
    expect(TestUtils.isCompositeComponent(SortAssetsComp)).to.equal(true);
  });

   it('does not render a react element', () => {
    expect(TestUtils.isElement(SortAssetsComp)).to.equal(false);
  });

  it('does render a DOM Component', () => {
    expect(TestUtils.isDOMComponent(SortAssetsComp)).to.equal(false);
  });

  it('should be rendered with single div', () => {
    let div = TestUtils.scryRenderedDOMComponentsWithTag(SortAssetsComp, 'div');
    expect(div.length).to.equal(1);
  });

  it('Renderes Input tag with "sort-asset" class', function() {
    let renderedDOM = ReactDOM.findDOMNode(SortAssetsComp);
    expect(renderedDOM.tagName).to.equal("DIV");
    expect(renderedDOM.classList.length).to.equal(1);
    expect(renderedDOM.classList[0]).to.equal("sort-asset");
  });

it('should renders a div using shallow render', () => {
  let renderer = TestUtils.createRenderer();
  renderer.render(<SortAssets  sortOptions={sortOptions}/>);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
});

});