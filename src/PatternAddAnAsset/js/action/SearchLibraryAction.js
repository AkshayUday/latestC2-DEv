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
import AlfrescoApiService from '../../../common/util/alfrescoApiService';
import bean from 'bean';
import store from '../../js/store';
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';

function getAssetData(res,index,limit,pageNo,maxItems,value,fileTypeIndex,viewName,sortIndex){
    res.body.showTabs = true;
    res.body.index = index;
    res.body.limit = limit;
    res.body.pageNo = pageNo;
    res.body.pageLimit = maxItems;
    res.body.SearchValue = value;
    res.body.selectedIndex = parseInt(fileTypeIndex);
    res.body.displayItemCount = maxItems;
    res.body.numberFound = res.body.numItems;
    res.body.totalRecords = res.body.results.length;
    res.body.tabVisibility = window.tdc.libConfig.tabVisibility;
    res.body.sortIndex = sortIndex;
    res.body.lastPage = res.body.hasMoreItems;
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
            let nodeRefText = res.body.results[i].properties['d.alfcmis:nodeRef'].value;
            let temp = nodeRefText.split('/');
            let nodeRefVal = temp[temp.length -1];
            let thumbnailUrl = window.tdc.libConfig.alfserver+'/alfresco-proxy/s/api/node/workspace/SpacesStore/'+nodeRefVal+'/content/thumbnails/doclib';

            _resData = {'nodeRef':nodeRefText,
                'mimetype':res.body.results[i].properties['d.cmis:contentStreamMimeType'].value,
                'url': thumbnailUrl,
                'displayName':res.body.results[i].properties['d.cmis:name'].value,
                'name':res.body.results[i].properties['d.cmis:name'].value,
                'fileName':res.body.results[i].properties['t.cmis:name'].value,
                'title':res.body.results[i].properties['t.cm:title'].value,
                'modifiedBy':res.body.results[i].properties['d.cmis:lastModifiedBy'].value,
                'modifiedByUser':res.body.results[i].properties['d.cmis:lastModifiedBy'].value.toUpperCase(),
                'description':res.body.results[i].properties['d.cmis:description'].value,
                'modifiedOn':res.body.results[i].properties['d.cmis:lastModificationDate'].value,
                'size':res.body.results[i].properties['d.cmis:contentStreamLength'].value,
                'creationDate':res.body.results[i].properties['d.cmis:creationDate'].value,
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
        if(!sortIndex){
            sortIndex = 0;
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

            let saveObj;
            if(value!==''&&value!==undefined){
                saveObj = {'term': value};
            }

        //AlfrescoApiService.getAlfToken(window.tdc.libConfig).then(function (success){
        //let token = JSON.parse(success.text).data.ticket;
         dispatch({
            type: 'ACTIVATE'
            })

        searchLibraryApi.searchAssets(value,fileTypeForSearch[fileTypeIndex],index,limit, sortValues[sortIndex]) .then(function (res) {
            //console.log(res);
            let assetData=getAssetData(res,index,limit,pageNo,maxItems,value,fileTypeIndex,viewName,sortIndex);
            dispatch({
                type : SEARCH_DISPLAY_ASSETS,
                data : assetData
            });


             dispatch({
            type: 'DEACTIVATE'
            })


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
                        saveToLocalForageService(saveObj);
                    } else {
                        dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: maxItems, sortIndex: indexForSort, viewName: viewName, displayValueCountForList: 25 }});
                        saveToLocalForageService(saveObj);
                    }
                }).catch(function (err,saveObj) {
                    console.log('serach library action', err);
                    dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: maxItems, sortIndex: indexForSort, viewName: viewName, displayValueCountForList: 25 }});
                    saveToLocalForageService(saveObj);
        });
            },(error) => {
                         dispatch({
            type: 'DEACTIVATE'
            })
            });
    }
}

const saveToLocalForageService = (saveObj) => {
    let inputData = {};
    const {displayvaluecount, sortIndex, viewName, displayValueCountForList} = store.getState().userFilterReducer;
    const userID = window.tdc.libConfig.alfuname;
    inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
    inputData.patternName = window.tdc.patConfig.pattern;
    inputData.type = SearchConstants.LOCAL_INSTANCE;
    inputData.saveType = SearchConstants.RECENT_SEARCH;
    inputData.gridMode = displayvaluecount;
    inputData.viewMode = viewName;
    inputData.listMode = displayValueCountForList;
    //inputData.saveValue = displayValueCountForList;
    inputData.sortIndex = sortIndex;
    if(typeof saveObj == 'object'){
        inputData.saveValue = saveObj;
        inputData.isThreeSave = true;
    }
    localForageService.saveLocalForageData(inputData);
}

export function getProductDetails(){

    return dispatch => {


            dispatch({
            type: 'ACTIVATE'
            })

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
                dispatch({
            type: 'DEACTIVATE'
            })

        },(error) => {     dispatch({
            type: 'DEACTIVATE'
            })})
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

const getDifficultyLevelValues = (dataArray) => {
    if (dataArray.length > 0) {
        return dataArray[dataArray.length-1];
    }

    return [];
}

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
