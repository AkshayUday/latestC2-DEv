import React from 'react';
import { connect } from 'react-redux';
import {fetchingAssets} from '../action/assets';
import {getFolders,getSubFolders,toggle, setReference} from '../action/TreePaneAction';
//import {fileUploadToServer} from '../action/fileUploadAction';
import {getProductDetails} from '../action/SearchLibraryAction';
import FolderPane from '../components/folderpane/FolderPane';
import {highlightChildren, getFirstName} from '../../../common/components/browseAssetUtil';
import TreeNodeUtil from '../components/folderpane/TreeNodeUtil';


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
       dispatch(getFolders('upload'));
      },
      componentDidUpdate : function (){
       //highlightChildren(getFirstName(this.props.model))
      },
     toggle:function (model,folderName,nodeRef){
        console.log('Folder Name : '+ folderName +' ... '+' Node Ref : '+nodeRef);
        //dispatch(fetchingAssets(nodeRef, 1, 'term=*'));
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
