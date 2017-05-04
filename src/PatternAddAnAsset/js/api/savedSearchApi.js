/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * This layer used for connecting to different external servers.
 *
 * @module MediaAssets
 * @file savedSearchApi - This layer is used for retrieving saved search data
 	from local forage.
 * @author TDC
 *
*/
//const localforage = require('localforage');
import localForageService from '../../../common/util/localForageService';

export default {
/** @function get_Saved_Search_Data -
 * request.get service call is used to get the saved search data.
 * @returns {function}
 * This function returns object.
*/
  // get_Saved_Search_Data: function (){
  //   return  localforage.getItem('savedSearch', function (err, readValue){
  //           console.log('Read value is ', readValue);
  //         });
  // },
  getSavedSearchData: function (inputData){
  	  return localForageService.getLocalForageData(inputData);
  },

  saveSearchValue: function (inputData){
  	return localForageService.saveLocalForageData(inputData);
  },

  deleteSavedSearchData:function (inputData){
    return localForageService.updateLocalForageData(inputData);
  }

}
