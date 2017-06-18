/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePaneAction
 * It will be used to create a action object / middleware object will be return
 * to called function and then reducers will be called
 * @author TDC
 **/
import assetsApi from '../../../PatternAddAnAsset/js/api/TreePaneApi'
import { GET_FOLDER } from '../../../PatternAddAnAsset/js/constants/TreePaneConstant'
import JsonData from '../../../PatternAddAnAsset/js/components/folderpane/TreeNodeUtil';

/**
 * @function getFolders method is used for get the all the folder from
 * alfresco and dispatch to the reducers
 */
export function  getFolders(nodeRef){
    return dispatch => {
        assetsApi.getSubFolders(nodeRef).then(function (res){
            if(res.body !== undefined && res.body.results.length > 0){
                let treeFolder = JsonData.getCustomFolder(res.body);
                if(treeFolder !== undefined && treeFolder.length > 0){
                    treeFolder.show = false;
                    treeFolder = flagRootFolders(treeFolder);
                    dispatch({
                        type : GET_FOLDER,
                        data : treeFolder
                    });
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
    }
}

/**
 * @function getSubFolders method is used for get the all the folder from
 * alfresco and dispatch to the reducers
 */
export function  getSubFolders(arg='browseasset',folderName,child, nodeRef){
    return (dispatch,getState) => {

        let _getState = getState().TreePaneReducers;
        assetsApi.getSubFolders(nodeRef).then(function (res){
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
                        data : model
                    })
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
