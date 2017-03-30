/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file savedSearchContainer - The container does all saved search operations
 * @author TDC
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSavedSearchData, checkBoxHandler,saveCheckedvalue } from '../action/savedSearchAction';
import SavedSearchComponent from '../components/savedSearch/SavedSearchComponent';
import {getSearchProductItems,
         saveSearchValues,
         deleteSavedSearch,
         runSearch } from '../action/SearchLibraryAction';

import {DEFAULT_PAGE_NO,DEFAULT_SAVED_SEARCH_MAX_RESULTS} from '../constants/paginationConstants';

/**@function getSelectedValues -
 * This method is used to get the selected values by user.
 * @param {object} dataArray - Array containing values selected by user
 * @returns {string} - If array length is greater than 0 , it will return last element of that array
 * @returns {object} array - else it will return empty array object
*/
const getSelectedValues = (dataArray) => {
 if (dataArray) {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
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
 let SavedSearchdata = getSelectedValues(state.savedSearchReducers);

  return {
    rows : SavedSearchdata.data.data,
    CheckedValues:SavedSearchdata.savedData,
    isChecked:SavedSearchdata.isChecked,
    enableDelete:SavedSearchdata.enableDelete,
    enableSearch:SavedSearchdata.enableSearch,
    pageDetails:SavedSearchdata.data.pageDetails
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
      dispatch(fetchSavedSearchData(DEFAULT_PAGE_NO,DEFAULT_SAVED_SEARCH_MAX_RESULTS));
    },
     handlePageChange: function handlePageChange(page) {
       dispatch(fetchSavedSearchData(page,DEFAULT_SAVED_SEARCH_MAX_RESULTS));
     },
    handleChange(obj){
      event.preventDefault();
      dispatch(saveCheckedvalue(obj));
      dispatch(checkBoxHandler(obj));
    }
  };
}

const SavedSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedSearchComponent)

export default SavedSearchContainer;
