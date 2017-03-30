/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file SingleFileFolderReducer - This SingleFileFolder reducer is a function that takes 
   two parameters (state and action)and returns updated state. 
 * @author TDC
 *
*/
import {SET_REF} from '../constants/TreePaneConstant'

let initilizeValues = [
   { 
      FolderID:{
      nodeRef: '',
      isParent: true
    }
}
];


/**@function singleFileFolderTree
 * This singleFileFolderTree reducer contains a action called SET_REF
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const singleFileFolderTree = (state = initilizeValues, action)=>{

  switch(action.type) {

    case 'SET_REF':
    return [
            ...state, {
              FolderID:action.data
              }
          ]
    break;
    default:
    return state
    }
  }

  module.exports= singleFileFolderTree;
