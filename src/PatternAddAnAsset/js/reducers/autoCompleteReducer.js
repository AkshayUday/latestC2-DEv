/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file autoCompleteReducer - This autoComplete reducer is a function
   that takes two parameters (state and action)and returns updated state.
   It is mainy used to get saved search values from server.
 * @author TDC
 *
*/

import {AUTO_COMPLETE,UPDATE_SEARCH_VALUE} from '../constants/searchLibraryConstants'
let initilizeData = [{

  }]

/**@function autoCompleteReducer
 * This autoComplete reducer contains a action called AUTO_COMPLETE
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const autoCompleteReducer = (state = initilizeData, action) => {
  let _lastValue =  _.last(state);    

  switch (action.type) {
    case 'UPDATE_ALL_ASSET':

    return[
          ...state, {
              ..._lastValue, 
              data:action.data,
              allAsset:action.data,              
              savedSearch:action.savedSearch,
              lastThreeSearch:action.lastThreeSearch
          }
        ]

    case AUTO_COMPLETE:
      
      if(action.text == undefined){
        
        //console.log(_lastValue.allAsset);
        //console.log(_lastValue.data);
        //console.log(_.isEqual(_lastValue.allAsset, _lastValue.data));

        if(_lastValue.text == ''){

          return[
          ...state, {
              ..._lastValue,            
              savedSearch:action.savedSearch,
              lastThreeSearch:action.lastThreeSearch
          }
        ]

        }else{
          return[
          ...state, {
              ..._lastValue, 
              data:action.data,              
              savedSearch:action.savedSearch,
              lastThreeSearch:action.lastThreeSearch
          }
        ]

        }        
      }

      return[
        ...state, {
            ..._lastValue, 
            data:action.data,
            text: action.text,
            savedSearch:action.savedSearch,
            lastThreeSearch:action.lastThreeSearch
        }
      ]
   case UPDATE_SEARCH_VALUE:
    
    return[
        ...state, {
          ..._lastValue,   
            text: action.text,           
        }
      ]

    default:
      return state
  }
}

module.exports= autoCompleteReducer;
