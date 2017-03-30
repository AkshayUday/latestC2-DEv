let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
let SavedSearchComponent = require('../PatternAddAnAsset/js/components/searchLibrary/SavedSearchComponent'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

/*describe('Saved Search testcases', function () {
  this.timeout(0);
  before('before creating SavedSearch', function() {
    var emptyFn = function(){};
     const locale = 'en';
    addLocaleData(frLocaleData);
    const translations = {
      'fr' : {
           'Review_Asset_MetaData': 'Métadonnées du produit',
          }
    };
    let columns = ['Search Term', 'Filters'];
    var rows = [{
      searchterm: 'test',
      id: 1,
      filter: 'Easy',
      isChecked: false
    }];
    let pageDetails = {
        displayItemCount: {},
        index: 1,
        limit: 5,
        pageNo: 1,
        pageLimit: 10,
        numberFound: 100
    }
    let checkedValues = [{
      searchterm: 'test',
      id: 2,
      filter: 'Moderate',
      isChecked: true
    }]
    let propsObj = {
     handleChange: emptyFn,
      componentWillMount: emptyFn,
      handlePageChange: emptyFn,
      deleteSavedSearch: emptyFn,
      runSavedSearch: emptyFn,
      enableDelete: emptyFn,
      enableSearch: emptyFn,
      pageDetails: pageDetails,
      CheckedValues: checkedValues,
      rows: rows,
      columns: columns
    }
    //debugger;
    this.SavedSearchComp = TestUtils.renderIntoDocument(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <SavedSearchComponent {...propsObj} />
      </IntlProvider>);
    });

    it('renders a composite component', () => {
    let SavedSearchComponentComp = ReactDOM.findDOMNode(this.SavedSearchComp);
    expect(TestUtils.isCompositeComponent(SavedSearchComponentComp)).to.equal(false);
    });

    it('does not render a react element', () => {
    let SavedSearchComponentComp = ReactDOM.findDOMNode(this.SavedSearchComp);
    expect(TestUtils.isElement(SavedSearchComponentComp)).to.equal(false);
    });

    it('does not render a DOMComponent', () => {
    let SavedSearchComponentComp = ReactDOM.findDOMNode(this.SavedSearchComp);
    expect(TestUtils.isDOMComponent(SavedSearchComponentComp)).to.equal(false);
    });

    it('should render table component', function() {
        let renderedDOM = ReactDOM.findDOMNode(this.SavedSearchComp);
        let tableElem = renderedDOM.querySelector('.table');
        //debugger;
        expect(tableElem.tagName).to.equal('DIV');
    });

     it('should render table component', function() {
        let renderedDOM = ReactDOM.findDOMNode(this.SavedSearchComp);
        let tableElem = renderedDOM.querySelector('.pagination');
        //debugger;
        expect(tableElem.tagName).to.equal('UL');
    });

 });
*/