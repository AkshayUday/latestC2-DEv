/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file EntryContainer - It is an entry point for AddanAsset component
 * @author TDC
 */


import React, { Component, PropTypes } from 'react';
import Popup from '../components/EntryPopup';
import { connect } from 'react-redux';
import {sendToQuad} from '../action/SearchLibraryAction';
import {fetchingAssets} from '../action/assets';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import {getCurrentValues} from '../utils/util';
import { DISPLAY_ASSETS} from '../constants/fileUploadConstants';

const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
  return [];
}

const getDataValues = (dataArray) => {
    if (dataArray.length > 0) {
        return dataArray[dataArray.length-1];
    }

    return [];
}

const mapStateToProps = (state) => {
   let data = getSelectedValues(state.imgPreviewReducer);
   let folderData = getDataValues(state.TreePaneReducers);
   let assetsData = getCurrentValues(state.assets);
    return {
        preview : data,
        currentFolder : folderData.currentFolder,
        loadedAssetData: assetsData,
    }
}

const mapDispatchToProps = (dispatch) => {
	return{
		clearModal(){ 
			dispatch({
        		type : 'INIT_APP'
      		})
		},

		sendPreviewSelectedToQuad(selIndx, closeFn){
		  let mockProps = {};
		  mockProps.record = this.props.preview[selIndx];
		  mockProps.closePopup = closeFn;
	      dispatch(sendToQuad(mockProps));
		},

		preserveFolderTree(){
			let nodeRef = this.props.currentFolder;
			let assetData = this.props.loadedAssetData;
/*			dispatch({
				type : DISPLAY_ASSETS,
				data : assetData
			});*/
			dispatch(fetchingAssets(nodeRef, assetData.pageNo, assetData.displayItemCount, 0, undefined, assetData.viewName));
			console.log('called for preserving');
		}
	}
}

const EntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup)

export default EntryContainer;
