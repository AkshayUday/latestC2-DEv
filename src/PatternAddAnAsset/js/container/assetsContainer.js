/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file assetsContainer -  The container fetches media assets and
 then renders the dynamic media data in corresponding sub-component.
 * @author TDC
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchingAssets, selectedRecord} from '../action/assets';
import {getSearchProductItems,saveSearchValues} from '../action/SearchLibraryAction';
import assetsGenerator from '../components/browse/assetsGenerator';
import {getCurrentValues} from '../utils/util';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import store from './../store'
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';

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
const mapStateToProps = (state) => {
  let data = getCurrentValues(state.assets);
  let selectedRecord = getSelectedValues(state.quad);
  let folderData = getDataValues(state.TreePaneReducers);
  let temp = null;
  let siteData = getDataValues(state.siteDataReducer);
  if (data.length !== 0) {
    temp = JSON.parse(JSON.stringify(data.items));
  }
  const { sortIndex } = state.userFilterReducer;
  const { viewName } = state.userFilterReducer;
  return {
    assetsData: temp,
    pageDetails: Array.isArray(data)? {}: data,
    selectedRecord: Array.isArray(selectedRecord)? {}: selectedRecord,
    isSearchLibrary: false,
    // productName: siteData.productName,
    difficultLevelData: [],
    searchValue:'',
    currentFolder : folderData.currentFolder,
    sortIndex,
    viewName
  }
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
    /* componentWillMount() {
     console.log('Called assetConatiner componentwillMount');
     dispatch(getProductDetails());
     },*/
    // handlePageChange: function (page, event, sortIndex) {
    //    event.preventDefault();
    //    // let nodeRef;
    //    let viewName = 'grid-view';
    //    let fileTypeIndex = findFileTypeIndex();
    //    if (document.querySelector('.dropdown-display span i')) {
    //      if(document.querySelector('.dropdown-display span i').className==='fa fa-list'){
    //      viewName = 'list-view';
    //      }
    //    }

    //    let maxItems= DEFAULT_MAX_RESULTS;
    //    if (document.querySelector('#itemPerPageSelectBox')) {
    //      maxItems = parseInt(document.querySelector('#itemPerPageSelectBox').value);
    //    }

    //    // if (document.querySelector('.filter-container .tree-node-selected')) {
    //      // let nodeRef = document.querySelector('.filter-container .tree-node-selected');
    //      let nodeRef = this.currentFolder;
    //      // let id = nodeRef.id;
    //      dispatch(fetchingAssets(nodeRef, page,maxItems,fileTypeIndex,sortIndex,viewName));
    //    // }
    //  },

    onChange:function (event,sortIndex){
      event.preventDefault();
      let fileTypeIndex = findFileTypeIndex('#browseTabsContainer');
      let nodeRef = this.currentFolder;
      dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO,parseInt(event.target.value),fileTypeIndex,sortIndex,store.getState().userFilterReducer.viewName));
    },

    setSelectedItem: function (record) {
      dispatch(selectedRecord(record));
    },

    // saveSearch:function (event){
    //   event.preventDefault();
    //   if(document.querySelector('#searchAutoSuggest input')){
    //     if(document.querySelector('#searchAutoSuggest input').value){
    //       let SearchValue = document.querySelector('#searchAutoSuggest input').value;
    //       dispatch(saveSearchValues(SearchValue));
    //     }
    //   }
    // },

    onSort: function (sortIndex, viewName){
      let maxItems = parseInt(document.querySelector('#itemPerPageSelectBox').value);
      let fileTypeIndex = findFileTypeIndex('#browseTabsContainer');
      if (document.querySelector('#itemPerPageSelectBox')) {
        maxItems = parseInt(document.querySelector('#itemPerPageSelectBox').value);
      }
      let nodeRef = this.currentFolder;
      dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO,maxItems,fileTypeIndex,sortIndex,store.getState().userFilterReducer.viewName));
    },

    changeView:function (viewName,sortIndex){
      let maxItems;
      let fileTypeIndex = findFileTypeIndex('#browseTabsContainer');
      let nodeRef = this.currentFolder;
      let inputData = {};
      inputData.userId = window.tdc.libConfig.alfuname;
      inputData.patternName = window.tdc.patConfig.pattern;
      inputData.type = SearchConstants.LOCAL_INSTANCE;
      if(viewName === 'list-view'){
        let getResPromise = localForageService.getLocalForageData(inputData);
        getResPromise.then(function (replyGet) {
          const {listMode } =  replyGet[ inputData.patternName ].displayCount;
          maxItems = listMode > 25 ? listMode : store.getState().userFilterReducer.displayValueCountForList;
          dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO,maxItems,fileTypeIndex,sortIndex,viewName));
        })
      }else{
        let getResPromise = localForageService.getLocalForageData(inputData);
        getResPromise.then(function (replyGet) {
          const {gridMode } =  replyGet[ inputData.patternName ].displayCount;
          maxItems = gridMode > 9 ? gridMode : store.getState().userFilterReducer.displayvaluecount;
          dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO,maxItems,fileTypeIndex,sortIndex,viewName));
        })
      }
    }
  }
}

const assetsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(assetsGenerator)

export default assetsContainer;
