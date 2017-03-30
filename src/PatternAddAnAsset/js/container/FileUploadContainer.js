import React from 'react';
 import SingleFileUpload from '../components/SingleFileUpload';
 import {fileUploadToServer} from '../action/fileUploadAction';
 import {getJobStatus} from '../action/CheckJobStatusAction';
 import Upload from '../components/uploadInProgress';
 import { connect } from 'react-redux'
import { Link, browserHistory, hashHistory } from 'react-router';

const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
  return [];
}

const mapStateToProps = (state) => { 
    const fileUpload = getSelectedValues(state.fileUpload);
    let singleFileFolder = getSelectedValues(state.SingleFileFolderReducer);
    let siteData = getSelectedValues(state.siteDataReducer);
    return {
      name: fileUpload.Name,
      file: fileUpload.file,
      isParent : singleFileFolder.FolderID.isParent,
      productName: siteData.productName
    }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    componentWillMount(){
      this.props.clearModal();
    },
    onSave(values){ 
      values.fileObj = values.file;
      values.title = values.name;
      values.fileName = values.file[0].name;
      dispatch(fileUploadToServer(values));
      this.mJobStatus();
    }
  }
}

const FileUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
  )(SingleFileUpload)

  export default FileUploadContainer;
