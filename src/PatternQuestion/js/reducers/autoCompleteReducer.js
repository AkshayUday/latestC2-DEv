/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module QuestionMetadata
 * @file autoCompleteReducer - The autocomplete reducer is a function that 
 takes two parameters (state and action) and return updated state.
 * @author 547305
 *
*/
import * as CONST from '../constants/MVMConstants'

const initilizeData = [{

  }]
/**@function autoComplete -
 * This autoComplete reducer is used to switch to action AUTO_COMPLETE
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - It represents the state of the component.
 * @param {object} action - It describes properties of action .
 * @returns {object} updatedState -
 * it will return updated state of component.
*/
const autoComplete = (state = initilizeData, action) => {
  if(action.type === CONST.AUTO_COMPLETE){
      return[
        ...state, {
            data:action.data,
            text: action.text
        }
      ]
  }else{
      return state
  }
}

export default autoComplete
