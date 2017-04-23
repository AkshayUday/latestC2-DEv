/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * The Search library action makes api calls for retrieving assets based
 on search value and for saved search operations and passes data
 to relevant reducers
 *
 * @module MediaAssets
 * @file Saved Search Action Manages the actions.
 * @author TDC
 *
 */


import searchLibraryApi from '../api/SearchLibraryApi';
import fileUploadApi from '../api/fileUploadApi';
import { SAVED_SEARCH_VALUE,SEARCH_DISPLAY_ASSETS,UPDATE_CHECKBOX_VALUE,SEARCH_BUTTON_VISIBILITY }
  from '../constants/searchLibraryConstants';
import { fetchSavedSearchData, checkBoxHandler } from '../action/savedSearchAction';
// const localforage = require('localforage');
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,DEFAULT_SAVED_SEARCH_MAX_RESULTS} from '../constants/paginationConstants';
import {AUTO_COMPLETE} from '../constants/searchLibraryConstants';
import AlfrescoApiService from '../../../common/util/alfrescoApiService';
import bean from 'bean';
import store from '../../js/store'
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';

function getAssetData(res,index,limit,pageNo,maxItems,value,fileTypeIndex,viewName){
  res.body.showTabs = true;
  res.body.index = index;
  res.body.limit = limit;
  res.body.pageNo = pageNo;
  res.body.pageLimit = maxItems;
  res.body.SearchValue = value;
  res.body.showSaveSearch = true;
  res.body.selectedIndex = parseInt(fileTypeIndex);
  res.body.displayItemCount = maxItems;
  res.body.numberFound = res.body.numItems;
  res.body.totalRecords = res.body.results.length;
  res.body.tabVisibility = window.tdc.libConfig.tabVisibility;
  if(viewName){
    res.body.viewName = viewName;
  }else{
    res.body.viewName = 'grid-view';
  }
  //res.body.token = token;
  let items=[];
  let responseData = res.body.results;
  if(responseData.length>0){
    for(let i=0;i<responseData.length;i++){

      let _resData = '';

      _resData = {'nodeRef':res.body.results[i].properties['d.alfcmis:nodeRef'].value,
        'mimetype':res.body.results[i].properties['d.cmis:contentStreamMimeType'].value,
        'displayName':res.body.results[i].properties['d.cmis:name'].value,
        'name':res.body.results[i].properties['d.cmis:name'].value,
        'fileName':res.body.results[i].properties['t.cmis:name'].value,
        'title':res.body.results[i].properties['t.cm:title'].value,
        'modifiedBy':res.body.results[i].properties['d.cmis:lastModifiedBy'].value,
        'modifiedByUser':res.body.results[i].properties['d.cmis:lastModifiedBy'].value.toUpperCase(),
        'description':res.body.results[i].properties['d.cmis:description'].value,
        'modifiedOn':res.body.results[i].properties['d.cmis:lastModificationDate'].value,
        'size':res.body.results[i].properties['d.cmis:contentStreamLength'].value,
        'container':'documentLibrary',
        'type':'document'
      };

      if(JSON.parse(window.tdc.libConfig['cmis'])['wURN'] == true){
        _resData = Object.assign(_resData, {'wURN': res.body.results[i].properties['r.cp:workURN']['value'],
          'mURN': res.body.results[i].properties['d.cmis:objectId']['value']});
      }

      items.push(_resData);

    }
  }
  res.body.items = items;
  return res.body;
}


/** @function getSearchProductItems -
 * This method is used for fetching relevant assets data on searching a value.
 * @param {string} value - Value to be searched
 * @param {*} pageNo - The current page number
 * @param {*} maxItems - The maximum items to be returned on current page
 * @param {*} filter - What asset types to be returned
 * @param {*} sortValue - Ascending or descending order based on name and date uploaded
 * @param {string} viewName - The type of view to be displayed(List or Grid)
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
 */
export function getSearchProductItems(value,pageNo,maxItems, fileTypeIndex, sortIndex,viewName = 'grid-mode'){
  return dispatch => {
    let index, limit;
    index = (pageNo*maxItems)-maxItems;
    limit = maxItems;
    let selIndex;
    if(sessionStorage.AssetTabIndex){
      if(parseInt(sessionStorage.AssetTabIndex)===4){
        selIndex = 0;
      }else{
        selIndex = parseInt(sessionStorage.AssetTabIndex);
      }
    }else{
      selIndex = 0;
    }

    let tabVisibility = JSON.parse(window.tdc.libConfig.tabVisibility);
    if(tabVisibility.image==false){
      if(fileTypeIndex==0){
        fileTypeIndex=1;
        if(tabVisibility.video==false){
          fileTypeIndex = 2;
          if(tabVisibility.audio==false){
            fileTypeIndex = 3;
          }
        }
      }
    }
    let fileTypeForSearch = {
      0:'image/*',
      1:'video/*',
      2:'audio/*',
      3:'/*',
    };

    let sortValues = {
      0:'ORDER BY cmis:creationDate desc',
      1:'ORDER BY cmis:creationDate',
      2:'ORDER BY cmis:name desc',
      3:'ORDER BY cmis:name'
    };

    searchLibraryApi.searchAssets(value,fileTypeForSearch[fileTypeIndex],index,limit, sortValues[sortIndex])
      .then(function (res) {
        let assetData = getAssetData(res, index, limit, pageNo, maxItems, value, fileTypeIndex, viewName);
        dispatch({
          type: SEARCH_DISPLAY_ASSETS,
          data: assetData
        });
        dispatch(searchLibButtonVisibility(false));
        const indexForSort = sortIndex ? sortIndex : store.getState().userFilterReducer.sortIndex;
        let inputData = {}
        const userID = window.tdc.libConfig.alfuname;
        inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
        inputData.patternName = window.tdc.patConfig.pattern;
        inputData.type = SearchConstants.LOCAL_INSTANCE;
        let getResPromise = localForageService.getLocalForageData(inputData);
        getResPromise.then(function (replyGet){
          if (replyGet[ inputData.patternName ].displayCount !== undefined) {
            const {gridMode, listMode } =  replyGet[ inputData.patternName ].displayCount;
            let displayCountForGrid, displayCountForList;
            if (viewName !== 'list-view') {
              displayCountForGrid = maxItems;
              displayCountForList = listMode;
            } else {
              displayCountForGrid = gridMode;
              displayCountForList = maxItems;
            }
            dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: displayCountForGrid, sortIndex: indexForSort, viewName: viewName, displayValueCountForList: displayCountForList }});
            saveToLocalForageService();
          } else {
            dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: maxItems, sortIndex: indexForSort, viewName: viewName, displayValueCountForList: 25 }});
            saveToLocalForageService();
          }
        }).catch(function (err) {
          console.log('serach library action', err);
          dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: maxItems, sortIndex: indexForSort, viewName: viewName, displayValueCountForList: 25 }});
          saveToLocalForageService();
        });
    });
  }
}

const saveToLocalForageService = () => {
  let inputData = {};
  const {displayvaluecount, sortIndex, viewName, displayValueCountForList} = store.getState().userFilterReducer;
  const userID = window.tdc.libConfig.alfuname;
  inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
  inputData.patternName = window.tdc.patConfig.pattern;
  inputData.type = SearchConstants.LOCAL_INSTANCE;
  inputData.saveType = SearchConstants.SAVE_SEARCH;
  inputData.gridMode = displayvaluecount;
  inputData.viewMode = viewName;
  inputData.listMode = displayValueCountForList;
  inputData.sortIndex = sortIndex;
  inputData.saveValue = displayValueCountForList;
  localForageService.saveLocalForageData(inputData);
}

export function getProductDetails(){
  return dispatch => {
    searchLibraryApi.getProductData().then(function (res) {
      let productData = {};
      let responseData = res.body.results;
      if(responseData.length>0){
        productData.nodeRef = res.body.results[0].properties['cmis:objectId'].value;
        productData.productName = res.body.results[0].properties['cmis:name'].value;
      }
      dispatch({
        type: 'SITE_DATA',
        data: productData
      })
    })
  }
}


export function getDifficultyLevels(){
  return dispatch => {
    searchLibraryApi.difficultyLevelData().then(function (data) {
      dispatch({
        type: 'DIFFICULTY_LEVELS',
        data: data
      })
    })
  }
}

/** @function saveSearchValues -
 * This method is for saving a search value
 * @param {string} value - The search value to be saved
 */
export function saveSearchValues(value){

  return (dispatch, getState) => {
    // searchLibraryApi.fetch_savedSearch_data().then(function (data) {
    let state = getState();
    // let difficultLevelData = getDifficultyLevelValues(state.difficultyLevelReducer);
    // console.log(difficultLevelData.difficultylevel);
    searchLibraryApi.saveSearchValue(value).then(function (data) {
      /*dispatch({
       type: DISPLAY_ASSETS,
       data: JSON.parse(data.text)
       })*/
    })
  }
}

/** @function saveSearchValues -
 * This method is to determine whether to show select and cancel buttons
 under search library tab
 * @param {*} isSavedSearch - Boolean value to determine whether to show
 select and cancel buttons under search library tab
 */
export function searchLibButtonVisibility(isSavedSearch){
  return (dispatch) => {
    dispatch({
      type: SEARCH_BUTTON_VISIBILITY,
      isSavedSearch:{'isSavedSearch':isSavedSearch}
    })
  }
}

export function updateDifficultyLevel(difficultyLevelId){
  return {
    type : 'UPDATE_DIFFICULTY_LEVEL',
    data : difficultyLevelId
  }
}
/** @function deleteSavedSearch -
 * This method is to delete a saved search value
 */
export function deleteSavedSearch(){
  return (dispatch, getState) => {
    localforage.getItem('savedSearch', function (err, res) {
      let state = getState();
      let savedSearchData = state.savedSearchReducers[0].savedData
      let filteredData = [],deletedData=[];
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
      dispatch({
        type: 'DELETE_CHECKED_SAVED_SEARCH_VALUE',
        data: deletedData
      })
      if(localforage.setItem('savedSearch',filteredData)){
        localforage.getItem('savedSearch', function (err, res) {
          dispatch(fetchSavedSearchData(DEFAULT_PAGE_NO,DEFAULT_SAVED_SEARCH_MAX_RESULTS));
        });
      }
    });
  }
}



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

export function sendToQuad(props){
  return (dispatch) => {
    let assetData = props.record;
    let check = JSON.parse(window.tdc.libConfig.tabVisibility);

    /*if(check.wURN != true){
     delete assetData['wURN'];
     delete assetData['mURN'];
     }*/

    if(check.epsUrl==true){
      let temp1 = assetData.nodeRef.split('/');
      let nodeRef = temp1[temp1.length -1];
      //AlfrescoApiService.getSSOToken().then(function (res) {
      //let SSOToken = res.body.tokenId;
      // searchLibraryApi.getAssetRoutePath(window.tdc.libConfig,nodeRef).then(function (data){
      //   let siteName,splitIndex;
      //   let splitArr = data.body.qnamePath.prefixedName.split('/');
      //   for(let i=0;i<splitArr.length;i++){
      //    if(splitArr[i].indexOf('st:sites') >= 0){
      //     //if(splitArr[i].includes('st:sites')){
      //       let siteSplitArr = splitArr[i+1].split(':');
      //       siteName = siteSplitArr[1];
      //     }
      //     if(splitArr[i].indexOf('documentLibrary') >= 0){
      //     //if(splitArr[i].includes('documentLibrary')){
      //          splitIndex = i+1;
      //     }
      //   }
      //   let imagePath='';
      //   for(let i=splitIndex;i<splitArr.length;i++){
      //     let splitPathArr = splitArr[i].split(':');
      //     imagePath+=splitPathArr[1]+'/';
      //   }
      // searchLibraryApi.getGuid(window.tdc.libConfig,siteName).then(function (responsedata){
      //   let Guid = responsedata.body.entry.guid;
      //   assetData.EpsUrl = window.tdc.libConfig.epsserver+'/'+Guid+'/'+imagePath;
      //   bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId,assetData);
      //   props.closePopup();
      // });
      // });
      //});
      searchLibraryApi.getEpsUrl(nodeRef).then(function (data){
        assetData.EpsUrl = data.body.publicationUrl;
        bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId,assetData);
      },function (error){
        console.log('Fetching EPS url failed' + error);
      });
    }
    else{
      bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId,assetData);
    }
    props.closePopup();
  }
}
