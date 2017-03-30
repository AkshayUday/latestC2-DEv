/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * The savedSearch action makes api calls for saved search operations and passes data to relevant reducers
 *
 * @module MediaAssets
 * @file savedSearchAction
 * @author TDC
 *
*/
import SavedSearchApi from '../api/savedSearchApi'
import { CHECKED_SAVED_SEARCH_VALUE} from '../constants/searchLibraryConstants';

 /** @function fetchSavedSearchData -
 * This method is used for fetching relevant assets data on selecting particular folder.
 * @param {*} pageNo - The current page number
 * @param {*} maxItems - The maximum items to be returned on current page
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
*/
  export function  fetchSavedSearchData(pageNo,maxItems){
      let index = (pageNo*maxItems)-maxItems;
     let limit = index+maxItems;
    return dispatch => {
      SavedSearchApi.get_Saved_Search_Data(index,limit).then(function (data){
        let FilteredData = data;
        let paginationData = [];
        // for(let i=0;i<data.length;i++){
        //   if(data[i].uName==window.tdc.libConfig.alfuname&&data[i].nodeRef==window.tdc.libConfig.nodeRef){
        //       FilteredData.push(data[i]);
        //     }
        // }
        for(let i=index;i<limit;i++){
          if(FilteredData[i]){
          paginationData.push(FilteredData[i]);
          }
        }
       // if(FilteredData.length>0){
        paginationData.numberFound = FilteredData.length;
        let savedSearchData = {
          'data':paginationData,
          'pageDetails':{
            'pageNo':pageNo,
            'index':index,
            'limit':limit,
            'pageLimit':maxItems,
            'numberFound':FilteredData.length,
            'totalRecords':paginationData.length,
            'isSavedSearch':true
          }
        }
        dispatch({
          type: 'SAVED_SEARCH_GET',
          Search_Data : savedSearchData,
          success: true,
          isSavedSearch:true
        })
      //}
      }).catch(e => {

        console.log('error: '+ e) ;
        dispatch({
          type: 'METADATA_GET_ERROR',
          QMD_Data_Err : e.message,
          success: false
        })
    })
  }

}

 /** @function checkBoxHandler -
 * This method is used for handling checkboxes and on disabling and enabling buttons in saved seach page.
 * @param {object} obj - The currently checked checkbox object value
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
*/

export function checkBoxHandler(obj){
 /* console.log('In checkBoxHandler action');
   return dispatch({
          type: 'CHECKBOX_HANDLER',
          checkTest: checked
  })*/

   return (dispatch, getState) => {
    obj.callback = function (enableDelete, enableSearch){
    //      console.log('The call back function');
        let state = getState();
        state.searchLibraryReducer.enableDelete = enableDelete;
        state.searchLibraryReducer.enableSearch = enableSearch;
    }
   //   console.log('In checkBoxHandler action: '+obj);
        dispatch({
         type: 'CHECKBOX_HANDLER',
         checkTest:obj
        })

  }
}

 /** @function saveCheckedvalue -
 * This method is used of maintaining the checked and unchecked checkbox values in saved search.
 * @param {object} obj - The currently checked checkbox object value
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
*/
export function saveCheckedvalue(obj){
  return {
        type : 'CHECKED_SAVED_SEARCH_VALUE',
        data : obj
    }
}
