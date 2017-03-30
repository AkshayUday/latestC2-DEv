import React from 'react';
import AppComponent from '../../PatternProductLink/js/components/App';
import ReactTestUtils from 'react-addons-test-utils';
import  expect from 'expect';


describe('ProductLink AppComponent', () => {
let result;
let spyonClick;
let onClick;
before(()=> {

	const renderer = ReactTestUtils.createRenderer();
	renderer.render(<AppComponent  />);
	result = renderer.getRenderOutput();
	onClick = result.props.children.props.children.props.children[1].props.children.props.children[1].props.children.props.onClick;
	spyonClick = expect.createSpy(onClick).andReturn(1);


})

it('should render IntlProvider',() =>{
	expect(result.type.displayName).toBe('IntlProvider');
})

it('should render Provider',() =>{
	expect(result.props.children.type.name).toEqual('Provider');	
})

it('should render ProductLinkModal',() =>{	
	expect(result.props.children.props.children.props.isOpen).toEqual(true);	
})

it('should called onClick',() =>{	
    onClick();
    spyonClick();				
	expect(spyonClick.calls.length).toEqual(1);
    spyonClick.restore();
})

})
