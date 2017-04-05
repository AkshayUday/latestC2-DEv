/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file AssetFilterContainer - This container fetches media assets based on
 selected folder and then renders the dynamic media data based on media type
 in corresponding sub-component.
 * @author TDC
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchingAssets} from '../action/assets';
import {getSearchProductItems} from '../action/SearchLibraryAction';
import {fetchSavedSearchData} from '../action/savedSearchAction';
import assetFilter from '../components/browse/assetFilters';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import store from './../store'

/**@function getSelectedValues -
 * This method is used to get the selected values by user.
 * @param {object} dataArray - Array containing values selected by user
 * @returns {string} - If array length is greater than 0 , it will return last element of that array
 * @returns {object} array - else it will return empty array object
 */
const getSelectedValues = (dataArray) => {
  if (dataArray.size > 1) {
    let latestItem = dataArray.size-1;
    return dataArray.get(latestItem);
  }

  return [];
}

const getLastItem = (dataArray) => {
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
  let tabVisibility = {};
  let selectedIndex = null;
  let showTabs = false;
  let data = getSelectedValues(state.assets);
  let folderData = getLastItem(state.TreePaneReducers);
  if(data.selectedIndex){
    selectedIndex = data.selectedIndex;
  }
  if(data.tabVisibility){
    tabVisibility = JSON.parse(data.tabVisibility);
  }
  if(data.showTabs){
    showTabs = true;
  }
  return {
    selectedIndex:selectedIndex,
    tabVisibility:tabVisibility,
    currentFolder : folderData.currentFolder,
    showTabs: showTabs
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
    tabHandleSelect: function (index, last) {
      sessionStorage.AssetTabIndex = index;
      // if(document.querySelector('.filter-container .tree-node-selected')){
      // let nodeRef = document.querySelector('.filter-container .tree-node-selected');
      let nodeRef = this.currentFolder;
      window.tdc.patConfig.maxItemsFlag = false;
      window.tdc.patConfig.assetsTotalCount = 0;
      if (nodeRef) {
        // let id = nodeRef.id;
        const displayCount = store.getState().userFilterReducer.viewName === 'list-view' ? store.getState().userFilterReducer.displayValueCountForList : store.getState().userFilterReducer.displayvaluecount;
        dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO,displayCount, index, store.getState().userFilterReducer.sortIndex,store.getState().userFilterReducer.viewName));
      }
      // }
    }
  };
}

const AssetfilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(assetFilter)

export default AssetfilterContainer;
