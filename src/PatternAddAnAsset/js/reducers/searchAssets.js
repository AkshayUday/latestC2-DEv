/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file searchAssets - This searchAssets reducer is a function that takes
   two parameters (state and action)and returns updated state.
   It also adds thumbnail to the media asset based on their type.
 * @author TDC
 *
*/

import { DISPLAY_ASSETS,UPDATE_ASSET_TAB_INDEX} from '../constants/fileUploadConstants'
import { SEARCH_DISPLAY_ASSETS} from '../constants/searchLibraryConstants'
import Immutable from 'immutable';
import {format} from '../utils/stringManipulation';

let initilizeValues = Immutable.List.of([]);

/**@function searchAssets
 * This searchAssets reducer will switch between actions SEARCH_DISPLAY_ASSETS and UPDATE_ASSET_TAB_INDEX
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const searchAssets = (state = initilizeValues, action)=>{
  switch(action.type) {
    case SEARCH_DISPLAY_ASSETS:
    let temp = action.data.items;
    for (let i in temp) {
      // if(temp[i].mimetype.indexOf('audio') >= 0){
      //  // if(temp[i].mimetype.includes('audio')){
      //   temp[i].url = window.tdc.libConfig.imagesPath+'/defaultAudio.png'
      //   //temp[i].url = '../../images/defaultAudio.png'
      //   //temp[i].url = 'https://'+location.host+'/images/defaultAudio.png';
      // }else{
        let temp1 = temp[i].nodeRef.split('/');
        let refId = temp1[temp1.length -1];
        let imageUrl = window.tdc.libConfig.alfserver+'/alfresco-proxy/s/api/node/workspace/SpacesStore/'+refId+'/content/thumbnails/doclib';
        //let imageUrl = format(serviceUrls.thumbnail+'?alf_ticket={1}', [refId, action.data.token]);
        temp[i].url = imageUrl;
    //}
  }
    return state.push(action.data);

    case UPDATE_ASSET_TAB_INDEX:
      let data = state.get(state.size-1);
      data.selectedIndex = action.data;
      state.set(state.size-1,data);
      return state;
      break;

    case 'RESET_SEARCH_TABS':
      let assetdata = state.get(state.size-1);
      if(assetdata.showTabs){
      assetdata.showTabs = action.data;
      state.set(state.size-1,assetdata);
      }
      return state;
      break;

    default:
      return state

    }
  }

 module.exports= searchAssets;
