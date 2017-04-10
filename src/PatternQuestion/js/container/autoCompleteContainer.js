/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @module QuestionMetadata
 * @file autoCompleteContainer - A container does data fetching and then renders its corresponding sub-component.
 * @author 547305
 */
import { connect } from 'react-redux';
import { populateAutoComplete } from '../action/MetadataAction';
import AutoComplete from '../../../common/components/AutoComplete';
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
  return {
    data: getSelectedValues(state.autoComplete)
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
    onSuggestionsUpdateRequested: ({value}) => {
     dispatch(populateAutoComplete(value));
    }
  }
}

const AutoCompleteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoComplete)

export default AutoCompleteContainer
