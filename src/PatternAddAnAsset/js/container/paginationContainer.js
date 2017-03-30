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
import { Link, browserHistory, hashHistory } from 'react-router'
import bean from 'bean';
import {fetchingAssets} from '../action/assets';
import {getCurrentValues} from '../utils/util';
import Paginate from '../../../common/components/PL_Pagination/paging';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import {getSearchProductItems} from '../action/SearchLibraryAction';

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

const getDataValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }

  return [];
}

function findFileTypeIndex(idValue){
let fileTypeIndex = 0;
  if(document.querySelector(idValue+' [aria-selected="true"]')){
  let tabValue = document.querySelector(idValue+' [aria-selected="true"]').innerText;
  if(tabValue==='Image'){
     fileTypeIndex = 0;
  }else if(tabValue==='Video'){
    fileTypeIndex = 1;
  }else if(tabValue==='Audio'){
    fileTypeIndex = 2;
  }else{
    fileTypeIndex = 3;
  }
}
  return fileTypeIndex;
}
/**@function mapStateToProps -
 * Connects a React component to a Redux store.
 * Whenenver redux store gets updated, this method will get called.
 * This method transform the current application state into the
 * props you want to pass to a presentational component
 * @param {object} state
 * @returns {object} Object
*/

let activeTab;
let currentFolder;
const mapStateToProps = (state) => {
  let data = getCurrentValues(state.assets);
  if(document.querySelector('#parentTabContainer [aria-selected="true"]')){
    if(document.querySelector('#parentTabContainer [aria-selected="true"]').innerText=='Search Library'){
      data = getCurrentValues(state.searchAssets);
    }
  }
    let folderData = getDataValues(state.TreePaneReducers);
    currentFolder = folderData.currentFolder;
    let siteData = getDataValues(state.siteDataReducer);
    return {
      pageDetails: Array.isArray(data)? {}: data,
      currentFolder : currentFolder,
      productName: siteData.productName
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
    handlePageChange: function (page) { 
      // let nodeRef;
      let viewName = 'grid-view';
      let sortIndex;
      if (document.querySelector('#viewDropDownContainer span i')) {
        if(document.querySelector('#viewDropDownContainer span i').className==='fa fa-list'){
        viewName = 'list-view';
        }
      }

      let maxItems= DEFAULT_MAX_RESULTS;
      if (document.querySelector('#itemPerPageSelectBox')) {
        maxItems = parseInt(document.querySelector('#itemPerPageSelectBox').value);
      }
      if(document.querySelector('#sort')){
        sortIndex = parseInt(document.querySelector('#sort').value);
      }

      // if (document.querySelector('.filter-container .tree-node-selected')) {
        // let nodeRef = document.querySelector('.filter-container .tree-node-selected');
        // let id = nodeRef.id;
    if(document.querySelector('#parentTabContainer [aria-selected="true"]')){
      if(document.querySelector('#parentTabContainer [aria-selected="true"]').innerText=='Search Library'){
        let fileTypeIndex = findFileTypeIndex('#searchTabsContainer');
        let searchValue = document.querySelector('#searchAutoSuggest input').value;
        dispatch(getSearchProductItems(searchValue,page,maxItems,fileTypeIndex,sortIndex,viewName));      
      }else{
        let fileTypeIndex = findFileTypeIndex('#browseTabsContainer');
        let nodeRef = currentFolder;
        dispatch(fetchingAssets(nodeRef,page,maxItems,fileTypeIndex,sortIndex,viewName));
      }
    }
  },
}
}

const paginationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Paginate)

export default paginationContainer;
