/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file assets - This assets reducer is a function that takes 
   two parameters (state and action)and returns updated state. 
   It also adds thumbnail to the media assets based on their type.
 * @author TDC
 *
*/
import { DISPLAY_ASSETS,UPDATE_ASSET_TAB_INDEX} from '../constants/fileUploadConstants'
import { SEARCH_DISPLAY_ASSETS} from '../constants/searchLibraryConstants'
import Immutable from 'immutable';
import {format} from '../utils/stringManipulation';

let initilizeValues = Immutable.List.of([{}]);

/**@function assets
 * This assets reducer contains a action called DISPLAY_ASSETS
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const assets = (state = initilizeValues, action)=>{

  switch(action.type) {
    case DISPLAY_ASSETS:
    let temp = action.data.items;
    for (let i in temp) {
      //   if(temp[i].mimetype.indexOf('audio') >= 0){
      // //if(temp[i].mimetype.includes('audio')){
      //   //temp[i].url = 'https://'+location.host+'/images/defaultAudio.png';
      //   temp[i].url = window.tdc.libConfig.imagesPath+'/defaultAudio.png'
      // }else{
        let temp1 = temp[i].nodeRef.split('/');
        let refId = temp1[temp1.length -1];
        //let imageUrl = format(serviceUrls.thumbnail+'?alf_ticket={1}', [refId, action.data.token]);
        let imageUrl = window.tdc.libConfig.alfserver+'/alfresco-proxy/s/api/node/workspace/SpacesStore/'+refId+'/content/thumbnails/doclib';
        temp[i].url = imageUrl;
      //}
    }
    return state.push(action.data);
    break;
    case 'RESET_BROWSE_TABS':
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

  module.exports= assets;
