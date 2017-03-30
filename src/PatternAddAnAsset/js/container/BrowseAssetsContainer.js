/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file BrowseAssetsContainer - A container does data fetching and then renders its corresponding sub-component.
 * @author TDC
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchingAssets} from '../action/assets';
import BrowseAssets from '../components/BrowseAssets';
import {getCurrentValues} from '../utils/util';
import { Link, browserHistory, hashHistory } from 'react-router'
import {getProductDetails,sendToQuad} from '../action/SearchLibraryAction';
import bean from 'bean';

/**@function getSelectedValues -
 * This method is used to get the selected values by user.
 * @param {object} dataArray - Array containing values selected by user
 * @returns {string} - If array length is greater than 0 , it will return last element of that array
 * @returns {object} array - else it will return empty array object
*/
const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }

  return [];
}
/**@function mapStateToProps -
 * Connects a React component to a Redux store.
 * Whenenver redux store gets updated, this method will get called.
 * This method transform the current application state into the
 * props you want to pass to a presentational component
 * @param {object} state
 * @returns {object} Object
*/
const mapStateToProps = (state) => {
  let showTabs = false;
 let assetsData = getCurrentValues(state.assets);
 let data = getCurrentValues(state.quad)
 let siteData = getSelectedValues(state.siteDataReducer);
 let folderTree = getSelectedValues(state.TreePaneReducers);
   if(assetsData.showTabs){
    showTabs = true;
    }
  return {
    showTabs: showTabs,
    pageDetails: Array.isArray(assetsData)? {}: assetsData,
    record: Array.isArray(data)? {}: data,
    productName: siteData.productName,
    folder : folderTree
  };
}

/**@function mapDispatchToProps
 * Connects a React component to a Redux store.
 * This method receives the dispatch() method and returns callback props that needs to be
 * injected into the presentational component
 * @param {function} dispatch
 * @returns {object} callback props
*/
const mapDispatchToProps = (dispatch) => {
  return {
     componentWillMount() {
      this.props.clearModal();
        dispatch(getProductDetails());
      },
    sendToQuad: function (record) {
      let temp = JSON.stringify(this.props.record);
      dispatch(sendToQuad(this.props));
      //alert(temp);
       //hashHistory.push('/ReviewAsset');
       // bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId,this.props.record);
       // this.props.closePopup();
    },
    closeBrowseAssets: function (){
      this.props.closePopup();
      dispatch({
        type : 'USER_LOGOUT'
      })
    }
  };
}

const BrowseAssetsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseAssets)

export default BrowseAssetsContainer;
