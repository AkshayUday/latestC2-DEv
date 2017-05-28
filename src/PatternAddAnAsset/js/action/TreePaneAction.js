/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePaneAction
 * It will be used to create a action object / middleware object will be return
 * to called function and then reducers will be called
 * @author TDC
 **/
import assetsApi from '../api/TreePaneApi'
import fileUploadApi from '../api/fileUploadApi'
import { GET_FOLDER, TOGGLE,SET_REF} from '../constants/TreePaneConstant'
import {fetchingAssets} from '../action/assets';
import {getNodeRef,
        getFirstObj,
        highlightChildren,
        getFirstName,
        getNodeRefValue} from '../../../common/components/browseAssetUtil';
import JsonData from '../components/folderpane/TreeNodeUtil';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import AlfrescoApiService from '../../../common/util/alfrescoApiService';
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';

let nodeRef;
/**
* @function getFolders method is used for get the all the folder from
* alfresco and dispatch to the reducers
*/
  export function  getFolders(arg='browseasset'){
    return dispatch => {

      assetsApi.getSubFolders(window.tdc.patConfig.nodeRef).then(function (res){ 

        if(res.body !== undefined && res.body.results.length > 0){
           let treeFolder = JsonData.getCustomFolder(res.body);
           if(treeFolder !== undefined && treeFolder.length > 0){
              treeFolder.show = false;
             treeFolder = flagRootFolders(treeFolder);
             console.log(treeFolder);

             // highlightChildren(treeFolder, getFirstName(treeFolder));
             dispatch({
               type : GET_FOLDER,
               data : treeFolder,
             })
             nodeRef = getNodeRef(getNodeRefValue(getFirstObj(treeFolder)));
             if(arg == 'browseasset'){
              //dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS, 0));  
             }else{
               // let curFolder = _.filter(treeFolder)[0]['nodeRef'].split('/')[3];
               let FolderID = {};
               FolderID.isParent = true;
               FolderID.nodeRef = nodeRef;
                 dispatch({
                 type: SET_REF,
                 data: FolderID
               });
             }

           }else{
              console.log('No Folders found in this search');
           }
           
        }else{
          console.log('No Folders found in this search');
        }
      },function (error){
       console.log('fetching child folders data:' + error);
      })
  }
  }

  export function flagRootFolders(treeFolders){
    let folderObj;
    //for(let folderItem in treeFolders){
      for(let folderItem=0;folderItem<treeFolders.length;folderItem++){
        folderObj = treeFolders[folderItem];
      if(folderObj.fileName){
        folderObj.isParent = true;
        treeFolders[folderItem] = folderObj;
      }
    }
    return treeFolders;
  }

/**
* @function getSubFolders method is used for get the all the folder from
* alfresco and dispatch to the reducers
*/
  export function  getSubFolders(arg='browseasset',folderName,child, nodeRef){ 
    return (dispatch,getState) => { 


      let _getState = getState().TreePaneReducers;
           assetsApi.getSubFolders(nodeRef).then(function (res){ 
		         console.log(res);
             if(res !== undefined && res.body !== undefined){

                let resultLen = res.body.results.length;
                if(resultLen > 0){
                 child.items = JsonData.treeNodeUtil(res.body);
                 child.items = JsonData.sortFolderTree(child.items);
                 let model = _getState[_getState.length-1];
                 model = removeCSSSelector(model, nodeRef);
                 if(child.items !== undefined && child.items.length > 0){
                    model = getTreeFolder(model, child);
                  }else{
                    console.log('Folder does not have children');
                  }
                 model.show = !model.show;
                 // model.isParent = isParent !== undefined ? isParent : false;
                 dispatch({
                  type : GET_FOLDER,
                  data : model,
              })
                  const userID = window.tdc.libConfig.alfuname;
                  model.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
                  model.patternName = SearchConstants.FOLDER_STRUCTURE;
                  model.type = SearchConstants.LOCAL_INSTANCE;
                  model.parentNodeRef = window.tdc.patConfig.nodeRef;
                  localForageService.saveFolderStructure(model);
                }else{
                  console.log('Folder does not have children');
                }

             }
             
		
      },function (error){
       console.log('fetching child folders data:' + error);
      })
 }
  }

export function removeCSSSelector(model, nodeRef){ 

  let child;
  // for(let obj in model){
  for(let obj=0;obj<model.length;obj++){
    child = model[obj];
    if(child.style !== undefined 
       // && child.style.includes('tree-node-selected')
       && child.style.indexOf('tree-node-selected') >= 0
       && child.path !== nodeRef){
           child.style = child.style.replace('tree-node-selected', '');
           model[obj] = child;
      }else{
        if(child.items){
           child.items = removeCSSSelector(child.items, nodeRef);
      }
    }
  }
  return model;
}

export function getTreeFolder(model, child){ 
  let obj;
  //for(let treeItem in model){
  for(let treeItem=0;treeItem<model.length;treeItem++){
      obj = model[treeItem];
      if(obj.path === child.path){
        model[treeItem] = child;
        break;
      }else{
        if(obj.items){
          getTreeFolder(obj.items, child);
        }
      }
  }

  return model;
}

/**
* @function toggle method is used for change the state of the 
* component and update it in reducers
* @param {boolean} booValue
* @param {string} folderName
*/
export function toggle(booValue, folderName){

return dispatch => {
      assetsApi.getFoldersService(folderName).then(function (res){
        dispatch({
          type : 'TOGGLE_TEST',
          data : res.body,
          toggle : booValue
        })
      },function (error){
       console.log('fetching child folders data:' + error);
      })
  }
}
/**
* This method is used to set the current folder name to the state,
* the current folder will be used when navigate to Image, Audio, Video tab and
* when do pagination.
**/
export function updateCurrentFolder(nodeRef){
  return (dispatch,getState) => {
    let _getState = getState().TreePaneReducers;
    let model = _getState[_getState.length-1];
    model.currentFolder = nodeRef;
    dispatch({
      type : GET_FOLDER,
      data : model
    });
        const userID = window.tdc.libConfig.alfuname;
        model.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
        model.patternName = SearchConstants.FOLDER_STRUCTURE;
        model.type = SearchConstants.LOCAL_INSTANCE;
        model.parentNodeRef = window.tdc.patConfig.nodeRef;
        localForageService.saveFolderStructure(model);
    }
}
/**
* @function setReference method is used for settting reference to the component
* Set reference type will change the state of the component through 
* reducers
* @param {string} nodeRef
*/
export function setReference(model, nodeRef){ 
let nodeRefHolder = {};
let isParent = identifyOnToggle(model, nodeRef);
nodeRefHolder.nodeRef = nodeRef;
nodeRefHolder.isParent = isParent;
return dispatch => {
      dispatch({
          type : SET_REF,
          data : nodeRefHolder

        }),
      console.log('folder id:' + nodeRef);
  }
}

export function identifyOnToggle(model, nodeRef){

  let folderObj;
  let isParent = false;
  //for(let folderItem in model){
  for(let folderItem=0;folderItem<model.length;folderItem++){
    folderObj = model[folderItem];
    if(folderObj.isParent){
        if(folderObj.path === nodeRef){
            isParent = folderObj.isParent;
            break;
        }
      }else{
        break;
      }
  }
  return isParent;
}
