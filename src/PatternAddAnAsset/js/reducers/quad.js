/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file quad - This quad reducer is a function 
   that takes two parameters (state and action)and returns updated state. 
   It stores the media asset oject value selected from the list of media assets.
 * @author TDC
 *
*/
import { SEND_TO_QUAD} from '../constants/fileUploadConstants'
import Immutable from 'immutable'

let initilizeValues = Immutable.List.of([]);

/**@function sendToQuad
 * This sendToQuad reducer contains a action called SEND_TO_QUAD
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const sendToQuad = (state = initilizeValues, action)=>{

  switch(action.type) {
    case SEND_TO_QUAD:
      return state.push(action.data);
    break;

    default:
     return state

    }
  }

  module.exports= sendToQuad;
