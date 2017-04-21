import React from 'react';
import FilterType from '../../SearchSCPatterns/js/components/search/FilterType';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';


// describe('SearchSCPtterns AppComponent', () => {
// let result;
// let spyonClick;
// let onClick;
// before(()=> {

// 	const renderer = ReactTestUtils.createRenderer();
// 	renderer.render(<AppComponent  />);
// 	result = renderer.getRenderOutput();
// 	// onClick = result.props.children.props.children.props.children[1].props.children.props.children[1].props.children.props.onClick;
// 	// spyonClick = expect.createSpy(onClick).andReturn(1);


// })

// it('should render IntlProvider',() =>{
// 	expect(result.type.displayName).toBe('IntlProvider');
// })

// it('should render Provider',() =>{
// 	expect(result.props.children.type.name).toEqual('Provider');
// })

// it('should render ProductLinkModal',() =>{
// 	// expect(result.props.children.props.children.props.isOpen).toEqual(true);
// })

// it('should called onClick',() =>{
//     // onClick();
//     // spyonClick();
// 	// expect(spyonClick.calls.length).toEqual(1);
//     // spyonClick.restore();
// })

// })

// describe('SearchSCPtterns FilterType', () => {
//     it('1 + 1 => 2', () => {
//         expect(1 + 1).toBe(2);
//     });
// });




describe('SearchSCPtterns FilterTypeComponent', () => {
  let result;
  let willMount;
  let  renderer;

  before(() => {

    window.tdc = { 'patConfig'  : {
      'patSetup' : { 'filterType' :['Test'] }
    }
    };


    let setFilterTypeValue = sinon.stub();


    renderer = ReactTestUtils.createRenderer();

    renderer.render(<FilterType setFilterTypeValue = {setFilterTypeValue} filterStatus= {sinon.stub()}/>);
    // willMount = sinon.stub(renderer._instance._instance,'onClick');
    result = renderer.getRenderOutput();
    console.log(renderer._instance._instance);

    // let  ev = sinon.spy('ev','preventDefault');


    console.log(renderer._instance._instance);
    renderer._instance._instance.state.filters =[{options:['Test'],multiSelect:true}];
    // renderer._instance._instance.props.filterStatus.


    // renderer._instance._instance.onClick(ev);
    // renderer._instance._instance.componentWillReceiveProps();
    renderer._instance._instance.componentDidUpdate();
    renderer._instance._instance.componentWillUpdate();
    // renderer._instance._instance.handleDocumentClick();


    renderer._instance._instance.componentDidMount();
    renderer._instance._instance.componentWillUnmount();


  });

  it('renders a component', function () {
    // console.log(expect(result.props.children));
    //  expect(result.props.children);

    expect(result.props.children[0].type).toEqual('div');

  });

  it('renders a filterType', function () {

    expect(result.props.children[0].props.id).toEqual('filterType');

  });

  it('handle onClick', function () {

    let ev = {preventDefault:sinon.stub()}
    // sinon.stub(renderer._instance._instance,'onClick').returns('test');
    //expect(renderer._instance._instance.onClick(ev)).to.called
    expect(renderer._instance._instance.onClick(ev)).called;

  });

  it('handle handleDocumentClick', function () {

    // let ev = {target:sinon.stub()}
    // console.log(renderer._instance._instance.refs);
    // expect(renderer._instance._instance.handleDocumentClick(ev)).called;

  });



});



