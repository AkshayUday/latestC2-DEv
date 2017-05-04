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
import SearchConstants from '../constants/SavedSearchConstant';
import {AUTO_COMPLETE} from '../constants/searchLibraryConstants';
import {getSearchProductItems } from '../action/SearchLibraryAction';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,DEFAULT_SAVED_SEARCH_MAX_RESULTS} from '../constants/paginationConstants';

/** @function saveSearchValues -
 * This method is for saving a search value
 * @param {string} value - The search value to be saved
 */
export function saveSearchValues(value){
    return (dispatch, getState) => {
        let inputData = {};
          const userID = window.tdc.libConfig.alfuname;
            inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
            inputData.patternName = window.tdc.patConfig.pattern;
                inputData.type = SearchConstants.LOCAL_INSTANCE;
                let getResPromise = SavedSearchApi.getSavedSearchData(inputData);
                getResPromise.then(function (responseData){
                    if(responseData.AddAnAsset){
                        let randomId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                        let saveObj = {'term': value,'id':randomId,'isChecked':false};
                        let savedData = responseData.AddAnAsset;
                        let inputData = {
                            'userId': responseData.userId,
                            'patternName': window.tdc.patConfig.pattern,
                            'type' : responseData.type,
                            'isThreeSave': false,
                            'saveType' : SearchConstants.SAVE_SEARCH,
                            'gridMode' : savedData.displayCount.gridMode,
                            'viewMode' : savedData.displayCount.viewMode,
                            'listMode' : savedData.displayCount.listMode,
                            'saveValue' : saveObj,
                            'sortIndex' : savedData.displayCount.sortIndex
                        }
                    SavedSearchApi.saveSearchValue(inputData).then(function (res){
                      alert('Search value saved successfully')
                    });
                }

                });
    }
}

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
     let paginationData = [];
    return dispatch => {
      let inputData = {};
       const userID = window.tdc.libConfig.alfuname;
            inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
            inputData.patternName = window.tdc.patConfig.pattern;
                inputData.type = SearchConstants.LOCAL_INSTANCE;
                let getResPromise = SavedSearchApi.getSavedSearchData(inputData);
                getResPromise.then(function (responseData){
        let FilteredData = responseData.AddAnAsset.saveSearch.reverse();

        for(let i=index;i<limit;i++){
          if(FilteredData[i]){
            paginationData.push(FilteredData[i]);
          }
        }
        let lastPage = false;
        if(paginationData.length==0 || paginationData.length<maxItems || FilteredData.length==limit){
          lastPage = true;
        }
       // if(FilteredData.length>0){
        let savedSearchData = {
          'data':paginationData,
          'pageDetails':{
            'pageNo':pageNo,
            'lastPage': lastPage
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
         let savedSearchData = {
          'data':paginationData,
          'pageDetails':{
            'pageNo':pageNo,
            'lastPage': false
          }
        }
        dispatch({
          type: 'SAVED_SEARCH_GET',
          Search_Data : savedSearchData,
          success: true,
          isSavedSearch:true
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

/* Run Search again */
export function runSearch(){
    return (dispatch, getState) => {
        let state = getState();
        let savedSearchData = state.savedSearchReducers[0].savedData;
        savedSearchData.map(function (item){
            if(item.checked===true){
                document.querySelector('#searchAutoSuggest input').value = item.name;
                let prevValue = state.autoComplete[state.autoComplete.length-1];
                dispatch({
                    type: AUTO_COMPLETE,
                    data: prevValue.data,
                    text: item.name,
                    savedSearch: prevValue.savedSearch,
                    lastThreeSearch: prevValue.lastThreeSearch
                });

                dispatch({
                    type : 'RESET_SEARCH_TABS',
                    data : false
                });

                dispatch(getSearchProductItems(item.name,DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
                dispatch ({
                    type : 'UPDATE_SAVED_SEARCH_CHECKBOX_VALUE',
                    data : item
                });

                dispatch ({
                    type : 'SEND_TO_QUAD',
                    data : {}
                });

            }
        });
    }
}

/** @function deleteSavedSearch -
 * This method is to delete a saved search value
 */
export function deleteSavedSearch(){
    return (dispatch, getState) => {
        let filteredData = [];
        let deletedData = [];
        let state = getState();
        let savedSearchData = state.savedSearchReducers[0].savedData;
        let inputData = {};
        const userID = window.tdc.libConfig.alfuname;
            inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
            inputData.patternName = window.tdc.patConfig.pattern;
            inputData.type = SearchConstants.LOCAL_INSTANCE;
            let getResPromise = SavedSearchApi.getSavedSearchData(inputData);
            getResPromise.then(function (responseData){
                let res = responseData.AddAnAsset.saveSearch;
              for(let i=0;i<res.length;i++){
                for(let j=0;j<savedSearchData.length;j++){
                    if(res[i].id === savedSearchData[j].id){
                        if(savedSearchData[j].checked===true){
                            res[i].isChecked = true;
                        }
                    }
                }
            }
            for(let i=0;i<res.length;i++){
                if(res[i].isChecked===false){
                    filteredData.push(res[i]);
                }else{
                    deletedData.push(res[i]);
                }
            }
          responseData.AddAnAsset.saveSearch = filteredData;
          SavedSearchApi.deleteSavedSearchData(responseData).then(function (resData){
            dispatch({
                type: 'DELETE_CHECKED_SAVED_SEARCH_VALUE',
                data: deletedData
            })
             dispatch(fetchSavedSearchData(DEFAULT_PAGE_NO,DEFAULT_SAVED_SEARCH_MAX_RESULTS));
          });
        });
    }
}
