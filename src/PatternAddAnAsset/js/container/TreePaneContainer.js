/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePaneContainer
 * React bindings for Redux embrace the idea of separating presentational 
 * and container component How things work (data fetching, state updates)
 * Subscribe to Redux state
 * Dispatch Redux actions
 * @author TDC
 **/
import React from 'react';
import { connect } from 'react-redux';
import {getFolders, getSubFolders, toggle,
        updateCurrentFolder} from '../action/TreePaneAction';
import {fetchingAssets} from '../action/assets';
import TreePaneRenderer from '../components/folderpane/FolderPane';
import {highlightChildren, getFirstName, recentlySelectedChild} 
from '../../../common/components/browseAssetUtil';
import TreeNodeUtil from '../components/folderpane/TreeNodeUtil';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import {GET_FOLDER} from '../constants/TreePaneConstant'
const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
  return [];
}
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';
/**
* @function mapStateToProps If specified, the component will subscribe to 
* Redux store updates. Any time it updates, mapStateToProps will be called. 
* Its result must be a plain object*, and it will be merged into the component’s props. 
* If you omit it, the component will not be subscribed to the Redux store
* @param {object} model
*/
const mapStateToProps = (state) => { 
  let data = getSelectedValues(state.TreePaneReducers);
  return {
   model: data,
   show : data.show
  }
}
/**
* @function mapDispatchToProps If an object is passed, each function inside
*  it will be assumed to be a Redux action creator. An object with the same function names,
*  but with every action creator wrapped into a dispatch call so they may be invoked directly, 
*  will be merged into the component’s props
* @param {function} toggle
*/
const mapDispatchToProps = (dispatch) => {
  return {
     componentWillMount: function () {
      // this.props.clearModal();
      if(!this.props.browsestate && this.props.folder === undefined){
        dispatch(getFolders());
      }else{
        dispatch({
               type : GET_FOLDER,
               data : this.props.folder,
             })
      }
      },
     toggle:function (model,foldername, nodeRef){ 
      console.log(' Folder Name : '+ foldername +' ... '+' Node Ref : '+nodeRef);
      // recentlySelectedChild(nodeRef);      
      dispatch(updateCurrentFolder(nodeRef));
      
      let selectedAsset = dispatch((() => { return (dispatch,getState) => {
           return _.chain(getState().quad.last()).value();             
        }     }
      )());

      if(selectedAsset.nodeRef != undefined){
           dispatch({
             type : 'SEND_TO_QUAD',
             data : {}
           })
      }
      window.tdc.patConfig.maxItemsFlag = false;
      window.tdc.patConfig.assetsTotalCount = 0;
       dispatch({
           type : 'RESET_BROWSE_TABS',
           data : false
        });
       let inputData = {};
       inputData.userId = window.tdc.libConfig.alfuname;
       inputData.patternName = window.tdc.patConfig.pattern;
       inputData.type = SearchConstants.LOCAL_INSTANCE;
       let getResPromise = localForageService.getLocalForageData(inputData);
       getResPromise.then(function (replyGet) {
         const {gridMode, listMode, sortIndex, viewMode} =  replyGet[ inputData.patternName ].displayCount;
           let displayCount;
           if (viewMode === 'list-view') {
             displayCount = listMode ? listMode: 25;
           } else {
             displayCount = gridMode ? gridMode: 9;
           }
           dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO, displayCount, 0, sortIndex, viewMode));
         }).catch(function (err) {
             console.log('Localforage not exist in TreePaneContainer', err)
             let viewName;
             if(document.querySelectorAll('.dropdown-display').length > 0){
               let getviewName = document.querySelectorAll('.dropdown-display')[0]['children'][0]['children'][0].getAttribute('CLASS');

               if(getviewName == 'fa fa-th'){
                 viewName = 'grid-view';
               }else{
                 viewName = 'list-view';
               }
             }
             dispatch(fetchingAssets(nodeRef, DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0,undefined,viewName));
       });
      }, 
      getSubFolders:function (foldername,child, nodeRef) { 
      	dispatch(getSubFolders('browseasset',foldername,child, nodeRef));
      }
  }
}

const treePaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreePaneRenderer)

export default treePaneContainer;
