import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import IconComponent from '../PatternAddAnAsset/js/components/checkJobStatus/IconComponent'
import {expect} from 'chai';
let src = '../../images/accept.png';

const component = TestUtils.renderIntoDocument(<IconComponent src={src}/>);

describe('IconComponent testcases', () => {
  it('should be a Composite Component', () => {
      expect(TestUtils.isCompositeComponent(component)).to.equal(true);
    });
    it('does not render a react element', () => {
      expect(TestUtils.isElement(component)).to.equal(false);
    });
    it('should be rendered with single div', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
      expect(div.length).to.equal(1);
    });
    it('should be rendered with single img tag', () => {
      let img = TestUtils.scryRenderedDOMComponentsWithTag(component, 'img');
      expect(img.length).to.equal(1);
    });
});

