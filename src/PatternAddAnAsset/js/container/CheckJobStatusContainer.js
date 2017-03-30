/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class CheckJobStatusContainer
 * React bindings for Redux embrace the idea of separating presentational 
 * and container component How things work (data fetching, state updates)
 * Subscribe to Redux state
 * Dispatch Redux actions
 * @author Udhayakumar Gururaj
 **/
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import CheckJobStatus from '../components/checkJobStatus/checkJobStatusPopup';
import * as JobStatusActions from '../action/CheckJobStatusAction';
import {getJobStatus} from '../action/CheckJobStatusAction';

const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
  return [];
}

/**
* @function mapStateToProps If specified, the component will subscribe to 
* Redux store updates. Any time it updates, mapStateToProps will be called. 
* Its result must be a plain object*, and it will be merged into the component’s props. 
* If you omit it, the component will not be subscribed to the Redux store
* @param {object} rows
* @param {object} columns
* @param {string} status
*/
const mapStateToProps = (state) => {
  const data = getSelectedValues(state.CheckJobStatusReducers)

  const rowsData = state.CheckJobStatusReducers.map(function (data){ return data.rows[0]})
  rowsData.shift();
  rowsData.reverse();

  return {
    rows : rowsData,
    columns : data.columns,
    status : data.status
  }
}

/**
* @function mapDispatchToProps If an object is passed, each function inside
*  it will be assumed to be a Redux action creator. An object with the same function names,
*  but with every action creator wrapped into a dispatch call so they may be invoked directly, 
*  will be merged into the component’s props
*/
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(JobStatusActions, dispatch),
     componentWillMount: function () {
   }
  }
}

const CheckJobStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckJobStatus)

export default CheckJobStatusContainer;
