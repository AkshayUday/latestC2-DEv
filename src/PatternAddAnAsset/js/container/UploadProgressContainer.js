/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePaneContainer
 * React bindings for Redux embrace the idea of separating presentational 
 * and container component How things work (data fetching, state updates)
 * Subscribe to Redux state
 * Dispatch Redux actions
 * @author TDC
 **/
 import React from 'react';
 import Upload from '../components/uploadInProgress';
 import { connect } from 'react-redux'

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
* @param {object} name
* @param {object} file
*/
const mapStateToProps = (state) => {
    const fileUpload = getSelectedValues(state.CheckJobStatusReducers);

    return {
      name: fileUpload.rows[0]?fileUpload.rows[0].Name:'',
      file: fileUpload.file,
    }
}

const UploadProgressContainer = connect(
  mapStateToProps,
  null
  )(Upload)

  export default UploadProgressContainer;
