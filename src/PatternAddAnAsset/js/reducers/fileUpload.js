/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file fileUpload - This fileUpload reducer is a function 
   that takes two parameters (state and action)and returns updated state. 
   It is mainy get the status of file uploaded to server.
 * @author TDC
 *
*/

import { FILE_SAVE} from '../constants/fileUploadConstants'
import Immutable from 'immutable'

const initilizeValues = [{
  name: '',
  file: {}
}];

/**@function fileUpload
 * This fileUpload reducer is used to switch between actions FILE_SAVE and UPLOAD_STATUS
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const fileUpload = (state = initilizeValues, action)=>{

  switch(action.type) {

    case 'FILE_SAVE':
     if(!state && !state[0]){
    return[
       Immutable.fromJS(state[0]).merge(Immutable.Map(action.fields)).toJS()
    ]
    }
    else{
      return[
        Immutable.fromJS({
  name: '',
  file: {}
}).merge(Immutable.Map(action.fields)).toJS()
      ]
    }
    case 'UPLOAD_STATUS':
    return[
       ...state,action
    ]
    default:
    return state

  }
}

module.exports= fileUpload;
