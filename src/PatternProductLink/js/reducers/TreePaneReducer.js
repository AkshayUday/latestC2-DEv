/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePanetReducers
 * Actions describe the fact that something happened, 
 * but don’t specify how the application’s state changes in response. 
 * This is the job of a reducer
 * @author TDC
 **/
import { GET_FOLDER } from '../../../PatternAddAnAsset/js/constants/TreePaneConstant'

let initilizeValues = [[{
        items: '',
        expanded: true
}]];

/**
* @function folderTree is used for define state of the 
* folder pane and based on the case values it returns the 
* new state
*/
const folderTree = (state = initilizeValues, action)=>{

  switch(action.type) {
    case GET_FOLDER:
    let data = action.data;
    data.show = action.data.show;
    return  [
          ...state, data
    ]
    break;

    default:
    return state
    }
  }

  module.exports= folderTree;
