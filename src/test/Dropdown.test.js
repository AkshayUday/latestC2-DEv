let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); 
let Dropdown = require('../common/components/Dropdown'); 
let chai = require('chai');
let expect = chai.expect;

/*describe('Dropdown testcases', function () {
  before('before creating Dropdown', function() {
  	var list=[{name:{}}];
    this.SearchFilterComp = TestUtils.renderIntoDocument(<Dropdown list={list}/>);
 });

   it('renders a composite component', () => {
   var list=[{name:{}}];
   let DropdownComp = TestUtils.renderIntoDocument(<Dropdown list={list} />);
   expect(TestUtils.isCompositeComponent(DropdownComp)).to.equal(true);
});


   it('does not render a react element', () => {
   var list=[{name:{}}];
   let DropdownComp = TestUtils.renderIntoDocument(<Dropdown list={list} />);
   expect(TestUtils.isElement(DropdownComp)).to.equal(false);
});

   });*/