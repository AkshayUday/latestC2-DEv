/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Items display per page component.
 * This component operates as a "Controller-View".
 *
 * @module MediaAssets
 * @file App
 * @author TDC
 *
*/
import React, {Component, PropTypes} from 'react';
import Entry from '../container/EntryContainer'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import store from '../store'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import FileUploadContainer from '../container/FileUploadContainer'
import CheckJobStatus from '../container/CheckJobStatusContainer';
import UploadInProgressContainer from '../container/UploadProgressContainer';
import AssetsContainer from '../container/assetsContainer';
import {addLocaleData, IntlProvider} from 'react-intl';
import SearchLibraryContainer from '../container/SearchLibraryContainer';
import frLocaleData from 'react-intl/locale-data/fr';
import { syncHistoryWithStore} from 'react-router-redux'
import SingleFileFolderContainer from '../container/SingleFileFolderContainer';
import ReviewAssetMetadata from 
       '../../../PatternReviewAsset/js/containers/ReviewAssetMetadataContainer'

const localforage = require('localforage');

addLocaleData(frLocaleData);
const translations = {
  'fr' : {
       'Review_Asset_MetaData': 'Métadonnées du produit',
      }
};
//const locale =  document.documentElement.getAttribute('lang');
const locale = 'en';

const history = syncHistoryWithStore(browserHistory, store);



localforage.getItem('last_three_search').then(function (data){
  //console.log('last_three_search');
 // console.log(data);
  if(data == null){
      localforage.setItem('last_three_search',[]).then(function (data){
       console.log(data);
      })
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';

    if (props.patConfig) {
      window.tdc = {
        patConfig: props.patConfig,
        libConfig: props.libConfig
      };
    }
  }

static propTypes= {
    patConfig:React.PropTypes.object,
    libConfig:React.PropTypes.object
}
  render() {
    return (
      <IntlProvider locale={locale} messages={translations[locale]}>
         <Provider store={store}>
           <div>
           <Entry/>
          </div>
        </Provider></IntlProvider>
      );
  }
}

export default App;
