/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * The assets action makes the api call and passes the data to reducer component
 *
 * @module MediaAssets
 * @file assetsAction
 * @author TDC
 *
 */


import assetsApi from '../api/assets';
import fileUploadApi from '../api/fileUploadApi';
import { DISPLAY_ASSETS, SEND_TO_QUAD} from '../constants/fileUploadConstants';
import {getAssetData} from '../../../common/components/browseAssetUtil';
import AlfrescoApiService from '../../../common/util/alfrescoApiService';
import store from '../../js/store';
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';

let i = 1;

function getAssetsData(res,index,limit,pageNo,maxItems,fileTypeIndex,viewName){
  res.body.showTabs = true;
  res.body.index = index;
  res.body.limit = limit;
  res.body.pageNo = pageNo;
  res.body.pageLimit = maxItems;
  res.body.showSaveSearch = true;
  res.body.displayItemCount = maxItems;
  res.body.selectedIndex = parseInt(fileTypeIndex);
  res.body.numberFound = window.tdc.patConfig.assetsTotalCount;
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
  //if(!res.body.numItems){
  // let a = pageNo*maxItems;
  // if(pageNo==1){
  //   res.body.numberFound = a +(5*maxItems);
  // }else{
  //   res.body.numberFound = a +(2*maxItems);
  // }
  // }
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
      }

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
/** @function fetchMetaData -
 * This method is used for fetching relevant assets data on selecting particular folder.
 * @param {*} noderef - Folder Id of selected folder
 * @param {*} pageNo - The current page number
 * @param {*} maxItems - The maximum items to be returned on current page
 * @param {*} filter - What asset types to be returned
 * @param {*} sortValue - Ascending or descending order based on name and date uploaded
 * @param {string} viewName - The type of view to be displayed(List or Grid)
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
 */
export function fetchingAssets(nodeRef,pageNo,maxItems,
                               fileTypeIndex, sortIndex,viewName = 'grid-mode'){
  return dispatch => {
    let index, limit;
    index = (pageNo*maxItems)-maxItems;
    limit = maxItems;

    let fileTypeForSearch = {
      0:'image/*',
      1:'video/*',
      2:'audio/*',
      3:'/*',
    };

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


    let sortValues = {
      0:'ORDER BY cmis:creationDate desc',
      1:'ORDER BY cmis:creationDate',
      2:'ORDER BY cmis:name desc',
      3:'ORDER BY cmis:name'
    };
    if(window.tdc.patConfig.maxItemsFlag){
      assetsApi.get_assets(nodeRef,fileTypeForSearch[fileTypeIndex],sortValues[sortIndex],index,limit)
        .then(function (res){
          let assetData = getAssetsData(res,index,limit,pageNo,maxItems,fileTypeIndex,viewName);
          dispatch({
            type : DISPLAY_ASSETS,
            data : assetData
          });
          persistDisplayCount(dispatch, sortIndex, viewName, maxItems)
        },function (error){
          console.log('fetching assets data:' + error);
        })
    }else{
      assetsApi.get_assets(nodeRef,fileTypeForSearch[fileTypeIndex],sortValues[sortIndex])
        .then(function (res){
          window.tdc.patConfig.maxItemsFlag = true;
          window.tdc.patConfig.assetsTotalCount = res.body.numItems;
          let filteredResults =  res.body.results.slice(0,maxItems);
          res.body.results = filteredResults;
          let assetData = getAssetsData(res,index,limit,pageNo,maxItems,fileTypeIndex,viewName);
          dispatch({
            type : DISPLAY_ASSETS,
            data : assetData
          });
          persistDisplayCount(dispatch, sortIndex, viewName, maxItems)
        },function (error){
          console.log('fetching assets data:' + error);
          })
    }
  }
}

const persistDisplayCount = (dispatch, sortIndex, viewName, maxItems) => {
  const indexForSort = sortIndex ? sortIndex : store.getState().userFilterReducer.sortIndex;
  let inputData = {}
  const userID = window.tdc.libConfig.alfuname;
  inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
  inputData.patternName = window.tdc.patConfig.pattern;
  inputData.type = SearchConstants.LOCAL_INSTANCE;
  let getResPromise = localForageService.getLocalForageData(inputData);
  getResPromise.then(function (replyGet) {
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
      dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: displayCountForGrid, sortIndex: indexForSort, viewName: viewName, displayValueCountForList: displayCountForList } });
      saveToLocalForageService();
    } else {
      dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: maxItems, sortIndex: indexForSort, viewName: 'grid-view', displayValueCountForList: 25 }});
      saveToLocalForageService();
    }
  }).catch(function (err) {
    console.log('assets action on maxItemsFlag not exists', err);
    dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: maxItems, sortIndex: indexForSort, viewName: 'grid-view', displayValueCountForList: 25 }});
    saveToLocalForageService();
  });
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
  inputData.saveValue = displayValueCountForList;
  localForageService.saveLocalForageData(inputData);
}
/** @function selectedRecord -
 * This method is used for sending selected asset data to another page.
 * @param {object} record - Asset data object to be sent to another page
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
 */

export function selectedRecord(record){
  return {
    type : SEND_TO_QUAD,
    data : record
  }
}


