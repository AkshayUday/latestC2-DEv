/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file SearchAssetFiltersContainer - This container fetches media assets based on
 search value and then renders the dynamic media data based on media type
 in corresponding sub-component.
 @author TDC
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getSearchProductItems, searchLibButtonVisibility} from '../action/SearchLibraryAction';
import {fetchSavedSearchData} from '../action/savedSearchAction';
import searchAssetsFilter from '../components/browse/searchAssetsFilter';
import SearchFilter from '../components/SearchFilter';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,DEFAULT_SAVED_SEARCH_MAX_RESULTS} from '../constants/paginationConstants';
import { DISPLAY_ASSETS,UPDATE_ASSET_TAB_INDEX} from '../constants/fileUploadConstants'
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
  let tabVisibility = {};
  let selectedIndex = 0;
  let showTabs = false;
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
      let state = dispatch((() => { return (dispatch,getState) => {
          return  getState();
        }
        }
      )());


      let savedSearchData = state.savedSearchReducers[0].savedData;
      savedSearchData.map(function (item){
        if(item.checked===true){
          dispatch ({
            type : 'UPDATE_SAVED_SEARCH_CHECKBOX_VALUE',
            data : item
          });
        }
      });

      if(index===4){
        dispatch({
          type : UPDATE_ASSET_TAB_INDEX,
          data : index
        });
      }
      if(index!==4){
        if(document.querySelector('#searchAutoSuggest input')){
          const searchValue = document.querySelector('#searchAutoSuggest input').value;
          const displayCount = store.getState().userFilterReducer.viewName === 'list-view' ? store.getState().userFilterReducer.displayValueCountForList : store.getState().userFilterReducer.displayvaluecount
          dispatch(getSearchProductItems(searchValue,DEFAULT_PAGE_NO,displayCount,index, store.getState().userFilterReducer.sortIndex, store.getState().userFilterReducer.viewName));
        }
      }else{
        dispatch(fetchSavedSearchData(DEFAULT_PAGE_NO,DEFAULT_SAVED_SEARCH_MAX_RESULTS));
      }
      if(index === 4){
        dispatch(searchLibButtonVisibility(true));
      }else{
        dispatch(searchLibButtonVisibility(false));
      }
    }
  }
}

const SearchAssetFiltersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(searchAssetsFilter)

export default SearchAssetFiltersContainer;
