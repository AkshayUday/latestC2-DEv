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
import {getFilterQueryForAssets, findPlatformOrSmartLink} from '../utils/util';

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
    res.body.tabVisibility = window.tdc.patConfig.tabVisibility;
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
    let mimeType, description, contentURL;
    if(responseData.length>0){
        for(let i=0;i<responseData.length;i++){
            let _resData = '';
            let nodeRefText = res.body.results[i].properties['d.alfcmis:nodeRef'].value;
            let temp = nodeRefText.split('/');
            let nodeRefVal = temp[temp.length -1];
            let thumbnailUrl = window.tdc.patConfig.alfserver+'/alfresco-proxy/s/api/node/workspace/SpacesStore/'+nodeRefVal+'/content/thumbnails/imgpreview';
            mimeType = res.body.results[i].properties['d.cmis:contentStreamMimeType'].value;
            description = res.body.results[i].properties['d.cmis:description'].value;
            if(description !== null && description !== undefined &&
                (description.indexOf('streamingMediaPackageType') !== -1 || description.indexOf('smartLinkType') !== -1)){
                contentURL = findPlatformOrSmartLink(window.tdc.patConfig.alfserver,mimeType, description, nodeRefVal);
            }
            let imgPreviewUrl = window.tdc.patConfig.alfserver+'/alfresco-proxy/s/api/node/workspace/SpacesStore/'+nodeRefVal+'/content/thumbnails/imgpreview';
            _resData = {'nodeRef':nodeRefText,
                'mimetype':res.body.results[i].properties['d.cmis:contentStreamMimeType'].value,
                'url': thumbnailUrl,
                'contentURL' : contentURL,
                'displayName':res.body.results[i].properties['d.cmis:name'].value,
                'name':res.body.results[i].properties['d.cmis:name'].value,
                'fileName':res.body.results[i].properties['t.cmis:name'].value,
                'title':res.body.results[i].properties['t.cm:title'].value,
                'modifiedBy':res.body.results[i].properties['d.cmis:lastModifiedBy'].value,
                'modifiedByUser':res.body.results[i].properties['d.cmis:lastModifiedBy'].value.toUpperCase(),
                'description':description,
                'modifiedOn':res.body.results[i].properties['d.cmis:lastModificationDate'].value,
                'size':res.body.results[i].properties['d.cmis:contentStreamLength'].value,
                'creationDate':res.body.results[i].properties['d.cmis:creationDate'].value,
                'container':'documentLibrary',
                'type':'document',
                'previewUrl': imgPreviewUrl,
                'currTabName': 'search'
            };

            if(JSON.parse(window.tdc.patConfig['cmis'])['wURN'] == true){
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
        let inputData = {};
        inputData.value = value;
        inputData.pageNo = pageNo;
        inputData.maxItems = maxItems;
        inputData.fileTypeIndex = fileTypeIndex;
        inputData.sortIndex = sortIndex;
        inputData.viewName = viewName;
        inputData.backTab = 'search';

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

        let tabVisibility = JSON.parse(window.tdc.patConfig.tabVisibility);
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

         dispatch({
                type: 'SEARCH_INPUT_DATA',
                data : inputData
            });

        //AlfrescoApiService.getAlfToken(window.tdc.libConfig).then(function (success){
        //let token = JSON.parse(success.text).data.ticket;
        // searchLibraryApi.searchAssets(value,fileTypeForSearch[fileTypeIndex],index,limit, sortValues[sortIndex]) .then(function (res) {
        //console.log(res);
        dispatch({
            type: 'ACTIVATE'
            })

        searchLibraryApi.searchAssets(value,getFilterQueryForAssets(fileTypeIndex),index,limit, sortValues[sortIndex]) .then(function (res) {
            let assetData=getAssetData(res,index,limit,pageNo,maxItems,value,fileTypeIndex,viewName,sortIndex);
            dispatch({
                type : SEARCH_DISPLAY_ASSETS,
                data : assetData
            });

             dispatch({
            type: 'DEACTIVATE'
            })
             
            //dispatch(searchLibButtonVisibility(false));
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
            }).catch(function (err) {
                console.log('serach library action', err);
                dispatch({ type: 'CHECK_SELECT', payload: { displayvaluecount: maxItems, sortIndex: indexForSort, viewName: viewName, displayValueCountForList: 25 }});
                saveToLocalForageService(saveObj);
            });
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

// const getDifficultyLevelValues = (dataArray) => {
//     if (dataArray.length > 0) {
//         return dataArray[dataArray.length-1];
//     }

//     return [];
// }

// export function searchLibButtonVisibility(isSavedSearch){
//     return (dispatch) => {
//         dispatch({
//             type: SEARCH_BUTTON_VISIBILITY,
//             isSavedSearch:{'isSavedSearch':isSavedSearch}
//         })
//     }
// }

export function updateDifficultyLevel(difficultyLevelId){
    return {
        type : 'UPDATE_DIFFICULTY_LEVEL',
        data : difficultyLevelId
    }
}


export function sendToQuad(props){
    return (dispatch) => {
        let assetData = props.record;
        let check = JSON.parse(window.tdc.patConfig.tabVisibility);
        let temp1 = assetData.nodeRef.split('/');
        let nodeRef = temp1[ temp1.length - 1 ];
        searchLibraryApi.getWorkUrn(nodeRef).then(function (workUrnData) {
            let workURNObj = JSON.parse(workUrnData.text)
            assetData.workURN = workURNObj.workURN;
            console.log('--workURN-->', workURNObj.workURN)
            if (assetData !== null && assetData !== undefined &&
                assetData.contentURL !== undefined) {
                AlfrescoApiService.getContentFromURL(window.tdc.libConfig, assetData.contentURL)
                    .then(function (response) {
                        response.desc = assetData.description;
                        bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId, response);
                    })
            } else if (check.epsUrl == true) {
                searchLibraryApi.getEpsUrl(nodeRef).then(function (data) {
                    assetData.EpsUrl = data.body.publicationUrl;
                    assetData.desc = 'EpsMeida';
                    console.log('--EpsUrl-->', data.body.publicationUrl)
                    getResultObj(assetData.nodeRef, props.pageDetails, assetData).then(function (resultKey) {
                        console.log('--- resultKey --->', resultKey)
                        searchLibraryApi.getNonEpsUrl(nodeRef, resultKey).then(function (data) {
                            console.log('--Non Eps Url-->', data)
                            getAssetDataProperties(data.body, assetData, resultKey).then(function (resultData) {
                                assetData = resultData;
                                console.log('-- assetData -->', assetData)
                                bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId, assetData);
                            })
                        }, function (error) {
                            console.log('Fetching Non EPS url failed' + error);
                        });
                    });
                }, function (error) {
                    console.log('Fetching EPS url failed' + error);
                });
            } else {
                assetData.desc = 'NormalMedia';
                bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId, assetData);
            }
        });
        props.closePopup();
    }
}

function getResultObj(nodeRef, pageDetails, assetData) {
    return new Promise(function parseNodeRefToGetProductResult(resolve, reject) {
        try {
            const productsLength = pageDetails.results.length;
            for (let productItem = 0; productItem < productsLength; productItem++) {
                if(nodeRef === pageDetails.results[productItem].properties['d.alfcmis:nodeRef'].value){
                    filterSecondaryObjectTypeIds(pageDetails.results[productItem].properties['d.cmis:secondaryObjectTypeIds'].value)
                        .then(function (resultKey) {
                            resolve(resultKey)
                        });
                    break;
                }
            }
        } catch (error) {
            bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId, assetData);
            console.log('Parsing error in product result', error)
            reject('error');
        }
    });
}

function filterSecondaryObjectTypeIds(secondaryObjectTypeIds) {
    return new Promise(function parseFilterObject(resolve, reject) {
        try {
            let length = secondaryObjectTypeIds.length;
            let propertyForNonEpsUrl;
            for (let i = 0; i < length ; i++) {
                if (secondaryObjectTypeIds[i] === 'P:exif:exif' || secondaryObjectTypeIds[i] === 'P:cplg:contentAsset' || secondaryObjectTypeIds[i] === 'P:cm:copiedfrom') {
                    propertyForNonEpsUrl = secondaryObjectTypeIds[i];
                    resolve(propertyForNonEpsUrl);
                    break;
                }
            }
            if (propertyForNonEpsUrl === undefined){
                reject('P:exif:exif or P:cplg:contentAsset or P:cm:copiedfrom is not exist in secondaryObjectTypeIds')
            }
        } catch (error) {
            reject(error)
        }
    });
}

function getAssetDataProperties(propertiesResponseBody, assetData, resultKey) {
    return new Promise(function getProperties(resolve, reject) {
        try {
            switch (resultKey) {
                case 'P:exif:exif':
                    if ('e.exif:pixelXDimension' in propertiesResponseBody.results[ 0 ].properties) {
                        assetData.width = propertiesResponseBody.results[ 0 ].properties[ 'e.exif:pixelXDimension'].value
                    }
                    if ('e.exif:pixelYDimension' in propertiesResponseBody.results[ 0 ].properties) {
                        assetData.height = propertiesResponseBody.results[ 0 ].properties[ 'e.exif:pixelYDimension' ].value
                    }
                    break;
                case 'P:cplg:contentAsset':
                    if ('c.cplg:keywords' in propertiesResponseBody.results[ 0 ].properties) {
                        assetData['iptc:keywords'] = propertiesResponseBody.results[ 0 ].properties[ 'c.cplg:keywords'].value
                    }
                    if ('c.cplg:altText' in propertiesResponseBody.results[ 0 ].properties) {
                        assetData['alt-text'] = propertiesResponseBody.results[ 0 ].properties[ 'c.cplg:altText' ].value
                    }
                    break;
                case 'P:cm:copiedfrom':
                    if ('cmis:description' in propertiesResponseBody.results[ 0 ].relationships[0 ].properties) {
                        assetData['dc: Description'] = propertiesResponseBody.results[ 0 ].relationships[0 ].properties[ 'cmis:description' ].value;
                    }
                    if ('cmis:objectTypeId' in propertiesResponseBody.results[ 0 ].relationships[0 ].properties &&
                        propertiesResponseBody.results[ 0 ].relationships[0].properties['cmis:objectTypeId' ].value === 'R:cm:original') {
                        if ('cmis:targetId' in propertiesResponseBody.results[ 0 ].relationships[0 ].properties) {
                            let wasDerivedFrom = propertiesResponseBody.results[ 0 ].relationships[0 ].properties[ 'cmis:targetId' ].value;
                            assetData.wasDerivedFrom = wasDerivedFrom.split(';')[0];
                        }
                    }
                    break;
            }
            resolve(assetData)
        } catch (error) {
            bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId, assetData);
            reject(error)
        }
    });
}

