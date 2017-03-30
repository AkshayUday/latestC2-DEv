/* let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
let MVM = require('../../PatternAssesment/js/components/MVM/MVM').default; //my root-test lives in components/__tests__/, so this is how I require in my components.
//import {MVM} from '../../PatternAssesment/js/components/MVM/MVM';
import {IntlProvider,FormattedRelative} from 'react-intl';
import store from '../../PatternAssesment/js/store/index';
import { Provider } from 'react-redux';
let TextBox = require('../../common/components/TextBox');
let Label = require('../../common/components/Label');
//let Heading = require('../../common/components/Heading');
let SelectBox = require('../../common/components/SelectBox');
let TextArea = require('../../common/components/TextArea');

let chai = require('chai');
let expect = chai.expect;

describe('MVM testcases', function () {
  before('before creating mvm', function() {
    //this.MVM = TestUtils.renderIntoDocument(<MVM />);
  let translations = {
  'fr': {
  'Link_to_a_Product': 'Lien vers un produit',  
  }
};
    this.MVM = TestUtils.renderIntoDocument(React.createElement(
  IntlProvider,
  { locale: 'en', messages: translations['en'] },

  React.createElement(
  Provider,
  { store: store },
  React.createElement(MVM)
  )
  ));
});
  
it('Component Renders with the Correct DOM', function() { 
    let renderedDOM = ReactDOM.findDOMNode(this.MVM);
    expect(renderedDOM.tagName).to.equal("DIV");
    expect(renderedDOM.classList.length).to.equal(0);
    var children = renderedDOM.querySelectorAll('div');
    expect(children.length).to.equal(11);
});

it('should be rendered with several child TextBox', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var divs = TestUtils.scryRenderedDOMComponentsWithTag(MVMComp, 'div');
  expect(divs.length).to.equal(12);
});

it('renders a composite component', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  expect(TestUtils.isCompositeComponent(MVMComp)).to.equal(true);
});

it('renders a  MVM component', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  expect(TestUtils.isCompositeComponentWithType (MVMComp,MVM)).to.equal(true);
});

it('does not render a react element', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  expect(TestUtils.isElement(MVMComp)).to.equal(false);
});

it('should be rendered with several child TextBox', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var children = TestUtils.scryRenderedComponentsWithType(MVMComp, TextBox);
  expect(children.length).to.equal(4);
});

it('should be rendered with several child TextArea', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var children = TestUtils.scryRenderedComponentsWithType(MVMComp, TextArea);
  expect(children.length).to.equal(1);
});

it('should be rendered with several child Heading', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var children = TestUtils.scryRenderedComponentsWithType(MVMComp, Heading);
  expect(children.length).to.equal(1);
});

it('should be rendered with several child Label', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var children = TestUtils.scryRenderedComponentsWithType(MVMComp, Label);
  expect(children.length).to.equal(10);
});

it('should be rendered with several child SelectBox', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var children = TestUtils.scryRenderedComponentsWithType(MVMComp, SelectBox);
  expect(children.length).to.equal(5);
});

/*it('should render heading value as "Minimum Viable MetaData"', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var children = TestUtils.scryRenderedComponentsWithType(MVMComp, Heading);
  expect(children[0].props.value).to.equal("Minimum Viable MetaData");
});*/


/* it('should renders a div using shallow render', () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<MVM />);
  let result = renderer.getRenderOutput();
  expect(result.type).to.equal('div');
  const child = result.props.children[0];
  expect(child.type).to.equal('div');
});


it('checking state after sequence of events', () => {
  let MVMComp = TestUtils.renderIntoDocument(<MVM />);
  var children = TestUtils.scryRenderedComponentsWithType(MVMComp, TextBox);
  expect(children[0].props.id).to.equal('UUID');
  let input = TestUtils.findRenderedDOMComponentWithTag(children[0], 'input');
  TestUtils.Simulate.change(input, {target: {value: 'Hello, world',"id":"UUID"}});
  expect(MVMComp.state.UUID).to.equal("Hello, world");
  let input1 = TestUtils.findRenderedDOMComponentWithTag(children[1], 'input');
  TestUtils.Simulate.change(input1, {target: {value: 'value1',"id":"AssignmentTitle"}});
  expect(MVMComp.state.AssignmentTitle).to.equal("value1");
  let input2 = TestUtils.findRenderedDOMComponentWithTag(children[2], 'input');
  TestUtils.Simulate.change(input2, {target: {value: 'value2',"id":"QuestionName"}});
  expect(MVMComp.state.QuestionName).to.equal("value2");
  let input3 = TestUtils.findRenderedDOMComponentWithTag(children[3], 'input');
  TestUtils.Simulate.change(input3, {target: {value: 'value3',"id":"EnablingObejctive"}});
  expect(MVMComp.state.EnablingObejctive).to.equal("value3");
});
 
});

*/




