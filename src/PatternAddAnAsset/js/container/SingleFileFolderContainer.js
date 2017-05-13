import React from 'react';
import { connect } from 'react-redux';
import {fetchingAssets} from '../action/assets';
import {getFolders,getSubFolders,toggle, setReference, updateCurrentFolder} from '../action/TreePaneAction';
//import {fileUploadToServer} from '../action/fileUploadAction';
import {getProductDetails} from '../action/SearchLibraryAction';
import FolderPane from '../components/folderpane/FolderPane';
import {highlightChildren, getFirstName} from '../../../common/components/browseAssetUtil';
import TreeNodeUtil from '../components/folderpane/TreeNodeUtil';
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';
import {GET_FOLDER} from '../constants/TreePaneConstant'


const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
  return [];
}

const mapStateToProps = (state) => {
  let data = getSelectedValues(state.TreePaneReducers);
  let siteData = getSelectedValues(state.siteDataReducer);
  return {
   model: data,
   show : data.show,
   productName: siteData.productName,
   //targetFolder:data1,
   //FolderID: data1.FolderID
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        componentWillMount: function () {
            this.props.clearModal();
            dispatch(getProductDetails());
            let inputData = {};
            const userID = window.tdc.libConfig.alfuname;
            inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
            inputData.patternName = SearchConstants.FOLDER_STRUCTURE;
            inputData.type = SearchConstants.LOCAL_INSTANCE;
            let self = this;
            let getResPromise = localForageService.getLocalForageData(inputData);
            getResPromise.then(function (replyGet) {
                if (Object.keys(replyGet[ inputData.patternName ]).includes(window.tdc.patConfig.nodeRef)) {
                    const model = replyGet[ inputData.patternName ][window.tdc.patConfig.nodeRef];
                    dispatch({
                        type: GET_FOLDER,
                        data: model
                    });
                    self.props.toggle(model, model[ 0 ].fileName, model.currentFolder)
                }
                else {
                    console.log('Parent NodeRef is not exists');
                    dispatch(getFolders('upload'));
                }
            }).catch(function (err) {
                console.log(`Localforage not exist in TreePaneContainer for ${inputData.patternName}`, err)
                dispatch(getFolders('upload'));
            });
        },
        componentDidUpdate : function (){
            //highlightChildren(getFirstName(this.props.model))
        },
        toggle:function (model,folderName,nodeRef){
            console.log('Folder Name : '+ folderName +' ... '+' Node Ref : '+nodeRef);
            //dispatch(fetchingAssets(nodeRef, 1, 'term=*'));
            dispatch(updateCurrentFolder(nodeRef));
            dispatch(setReference(model,nodeRef));
        },
        getSubFolders:function (foldername,child,nodeRef) {
            dispatch(getSubFolders('upload',foldername,child,nodeRef));
        }

    }
}

const SingleFileFolderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FolderPane)

export default SingleFileFolderContainer;
