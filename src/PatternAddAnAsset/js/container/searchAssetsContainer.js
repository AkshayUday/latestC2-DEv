/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file SearchAssetsContainer - This container does data fetching
 and then renders its corresponding sub-component.
 * @author TDC
 */

import React from 'react';
import { connect } from 'react-redux';
import {selectedRecord} from '../action/assets';
import { bindActionCreators } from 'redux';
import {getSearchProductItems,saveSearchValues,updateDifficultyLevel} from '../action/SearchLibraryAction';
import assetsGenerator from '../components/browse/assetsGenerator';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import store from './../store';
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
  let data = getSelectedValues(state.searchAssets);
  let userSelectedRecord = getSelectedValues(state.quad);
  let temp = null;
  let siteData = getDataValues(state.siteDataReducer);
  let difficultLevelData = getDataValues(state.difficultyLevelReducer);
  if (data.length !== 0) {
    temp = JSON.parse(JSON.stringify(data.items));
  }
  let searchValue = '';
  if(state.autoComplete.length > 0){
    searchValue = state.autoComplete[state.autoComplete.length-1].text;
  }
  const { sortIndex } = state.userFilterReducer;
  const { viewName } = state.userFilterReducer;
  return {
    assetsData: temp,
    pageDetails: Array.isArray(data)? {}: data,
    selectedRecord: Array.isArray(userSelectedRecord)? {}: userSelectedRecord,
    productName: siteData.productName,
    isSearchLibrary: true,
    difficultLevelData: [],
    searchValue:searchValue,
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
    // handlePageChange: function (page, event,sortIndex) {
    //  event.preventDefault();
    //  let fileTypeIndex = findFileTypeIndex();
    //  let viewName;
    //  if(document.querySelector('.dropdown-display span i').className==='fa fa-list'){
    //    viewName = 'list-view';
    //  }else{
    //    viewName = 'grid-view';
    //  }
    //  let searchValue = document.querySelector('#searchAutoSuggest input').value;
    //  let maxItems = parseInt(document.querySelector('#itemPerPageSelectBox').value);
    //  dispatch(getSearchProductItems(searchValue,page,maxItems,fileTypeIndex,sortIndex,viewName));
    //  },

    onChange:function (event,sortIndex){
      event.preventDefault();
      let fileTypeIndex = findFileTypeIndex('#searchTabsContainer');
      let searchValue = document.querySelector('#searchAutoSuggest input').value;
      dispatch(getSearchProductItems(searchValue,DEFAULT_PAGE_NO,parseInt(event.target.value),fileTypeIndex,sortIndex,store.getState().userFilterReducer.viewName));
    },

    setSelectedItem: function (record) {
      dispatch(selectedRecord(record));
    },

    // handleDelete:function (deleteData){
    // let deleteTagId = deleteData.id;
    // dispatch(updateDifficultyLevel(parseInt(deleteTagId)));
    // },

    saveSearch:function (event){
      event.preventDefault();
      if(document.querySelector('#searchAutoSuggest input').value){
        let SearchValue = document.querySelector('#searchAutoSuggest input').value;
        dispatch(saveSearchValues(SearchValue));
      }
    },

    onSort: function (sortIndex, viewName){
      let fileTypeIndex = findFileTypeIndex('#searchTabsContainer');
      let searchValue = document.querySelector('#searchAutoSuggest input').value;
      let maxItems = parseInt(document.querySelector('#itemPerPageSelectBox').value);
      dispatch(getSearchProductItems(searchValue,DEFAULT_PAGE_NO,maxItems,fileTypeIndex,sortIndex,store.getState().userFilterReducer.viewName));
    },

    changeView:function (viewName,sortIndex){
      let fileTypeIndex = findFileTypeIndex('#searchTabsContainer');
      let searchValue = document.querySelector('#searchAutoSuggest input').value;
      let maxItems;
      let inputData = {};
      inputData.userId = window.tdc.libConfig.alfuname;
      inputData.patternName = window.tdc.patConfig.pattern;
      inputData.type = SearchConstants.LOCAL_INSTANCE;
      if (viewName === 'list-view') {
        let getResPromise = localForageService.getLocalForageData(inputData);
        getResPromise.then(function (replyGet) {
          const {listMode } =  replyGet[ inputData.patternName ].displayCount;
          maxItems = listMode > 25 ? listMode : store.getState().userFilterReducer.displayValueCountForList;
          dispatch(getSearchProductItems(searchValue, DEFAULT_PAGE_NO, maxItems, fileTypeIndex, sortIndex, viewName));
        })
      } else {
        let getResPromise = localForageService.getLocalForageData(inputData);
        getResPromise.then(function (replyGet) {
          const {gridMode } =  replyGet[ inputData.patternName ].displayCount;
          maxItems = gridMode > 9 ? gridMode : store.getState().userFilterReducer.displayvaluecount;
          dispatch(getSearchProductItems(searchValue, DEFAULT_PAGE_NO, maxItems, fileTypeIndex, sortIndex, viewName));
        })
      }
    }
  }
}

const searchAssetsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(assetsGenerator)

export default searchAssetsContainer;
