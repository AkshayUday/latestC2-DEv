/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file searchLibraryReducer - This searchLibrary reducer is a function that takes 
   two parameters (state and action)and returns updated state. 
 * @author TDC
 *
*/
import { SAVED_SEARCH_VALUE,GET_ASSERTS_DATA,
         UPDATE_CHECKBOX_VALUE,
         SEARCH_BUTTON_VISIBILITY} from '../constants/searchLibraryConstants'
import Immutable from 'immutable'

const initilizeValues = {
   savedSearchValue: [],
   enableDelete:false,
   enableSearch:false,
   isSavedSearch: true
}


/**@function searchLibraryReducer
 * This searchLibrary reducer will switch between actions SAVED_SEARCH_VALUE,GET_ASSERTS_DATA and SEARCH_BUTTON_VISIBILITY
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const searchLibraryReducer = (state = initilizeValues, action)=>{
  switch(action.type) {
    case SAVED_SEARCH_VALUE:
    if(!state && !state[0]){
    return[
       Immutable.fromJS(state[0]).merge(Immutable.Map(action.fields)).toJS()
    ]}
    else{
      return[
        Immutable.fromJS({
          savedSearchValue: [],
          enableDelete:false,
          enableSearch:false,
          isSavedSearch: true
        }).merge(Immutable.Map(action.fields)).toJS()
      ]
    }

    case GET_ASSERTS_DATA:
    return [
      ...state,action
    ]
    // case SEARCH_BUTTON_VISIBILITY:
    // return[
    //   ...state,action.isSavedSearch
    // ]

    default:
    return state

  }
}

module.exports= searchLibraryReducer;
