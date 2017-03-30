/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePanetReducers
 * Actions describe the fact that something happened, 
 * but don’t specify how the application’s state changes in response. 
 * This is the job of a reducer
 * @author TDC
 **/
const initilizeData = [{
      rows : [],
      columns : []

}];

/**
@function CheckJobStatusReducers is used to define the state of the 
* check job status and it has various state and return the new state
*/
const CheckJobStatusReducers = (state = initilizeData, action) => {

  switch (action.type) {
    case 'JOB_STATUS':
      return[
        ...state, action.data
      ]
    case 'JOB_STATUS_UPDATE':
    case 'JOB_STATUS_END':

    return [
        ...initilizeData, action.data
      ];

    default:
      return state
  }
}

module.exports= CheckJobStatusReducers;
