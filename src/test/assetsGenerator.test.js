let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils'); //I like using the Test Utils, but you can just use the DOM API instead.
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';

let AssetsGenerator = require('../PatternAddAnAsset/js/components/browse/assetsGenerator'); //my root-test lives in components/__tests__/, so this is how I require in my components.
let chai = require('chai');
let expect = chai.expect;

describe('AssetsGenerator testcases', function () {
  this.timeout(0);
  before('before creating AssetsGenerator', function() {
    var emptyFn = function(){};
    const locale = 'en';
    addLocaleData(frLocaleData);
    const translations = {
      'fr' : {
           'Review_Asset_MetaData': 'Métadonnées du produit',
          }
    };
    var mockAssetsData = [{
      name: 'test',
      nodeRef: 1,
      uuid: 1,
      mimetype: 'image'
    }];
    let pageDetails = {
        displayItemCount: {},
        index: 1,
        limit: 5,
        pageNo: 1,
        pageLimit: 10,
        numberFound: 10,
        viewName: 'list-view'
    }

    let propsObj = {
      pageDetails: pageDetails,
      assetsData: mockAssetsData,
      onSelect: emptyFn,
      saveSearch: emptyFn,
      ItemsPerPage: 5,
      cssGridLayout:3,
      itemsPerPageDetails:{},
      onChange: emptyFn,
      onSort: emptyFn,
      changeView: emptyFn,
      setSelectedItem: emptyFn,
      selectedRecord: {},
      isSearchLibrary:false,
      savedSearchLink:emptyFn,
      handleDelete: emptyFn,
      difficultLevelData: {},
      handlePageChange:emptyFn
    }

    this.AssetsGeneratorComp = TestUtils.renderIntoDocument(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <AssetsGenerator {...propsObj} />
      </IntlProvider>);
    });

    it('should rendered sort element', function() {
        let renderedDOM = ReactDOM.findDOMNode(this.AssetsGeneratorComp);
        let sortEle = renderedDOM.querySelector('#sort');
        expect(sortEle.tagName).to.equal('SELECT');
    });


 });
