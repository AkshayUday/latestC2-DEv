/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Items display per page component.
 * This component operates as a "Controller-View".
 *
 * @module MediaAssets
 * @file AddAnAsset
 * @author TDC
 *
*/
import React, { Component, PropTypes } from 'react';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PL_Tabs from '../../../common/components/PL_Tabs';
//import C2Tabs from 'react-responsive-tabs';
import FileUploadContainer from '../container/FileUploadContainer';
import CheckJobStatusContainer from '../container/CheckJobStatusContainer';
import UploadProgressContainer from '../container/UploadProgressContainer';
import SearchLibrary from './SearchLibrary';
import BrowseAssetsContainer from '../container/BrowseAssetsContainer';
import SearchLibraryContainer from '../container/SearchLibraryContainer';
import ReviewAssetContainer from 
       '../../../PatternReviewAsset/js/containers/ReviewAssetMetadataContainer'
import { Link, browserHistory, hashHistory } from 'react-router';


class AddAnAsset extends Component {
   /**
  * @constructor defines states of the Add an asset Component
  */
  constructor(props) {
    super(props);
    this.onSave = props.onSave;
    this.setJobStatus = this.setJobStatus.bind(this);
    this.setFileUploadPage = this.setFileUploadPage.bind(this);
    this.state = {
      jobStatus : false,
      fileUpload : false
    }
  }

   /** @function handleSelect -
 * This function is called on tab selection
  */
  handleSelect(index, last) { 
    sessionStorage.currentTab= index;
    this.setState({jobStatus : false});
    this.props.clearModal();
    // browserHistory.push('/');
  }

  setJobStatus(){
    this.setState({jobStatus : true});

  }

  setFileUploadPage(){
    this.setState({fileUpload : true});
    this.setState({jobStatus : false});
  }
  
  /**
 * @function render -
 * When called, it will render the Add an asset component with its tabs
 * @return {string}
 * HTML markup of the component
*/
  render() { 
  let isError = true;
  let indexVal;
  let viewController;
  if(!sessionStorage.currentTab){
    indexVal=0;
    sessionStorage.currentTab=indexVal;
  }else{
    indexVal = parseInt(sessionStorage.currentTab);
  }

  let fileuploadContainer = <FileUploadContainer mJobStatus={this.setJobStatus} clearModal={this.props.clearModal}/>;
  let checkJobStatus = <CheckJobStatusContainer fileUploadPage={this.setFileUploadPage}/>;
  let uploadProgress = <UploadProgressContainer />;
  let initviewController = <ReviewAssetContainer/>;
  if(this.props.children != null){
    fileuploadContainer = '';
      if(this.props.children.props.location.pathname === '/UploadInProgress'){
      checkJobStatus = '';
      }
      if(this.props.children.props.location.pathname === '/CheckJobStatus'){
        uploadProgress = '';
      }

      if(this.props.children.props.location.pathname === '/errorUploading'){
          checkJobStatus = '';
          uploadProgress = <UploadProgressContainer error={isError} />;
        }
        if(this.props.children.props.location.pathname === '/ReviewAsset'){
          viewController = <ReviewAssetContainer  ref="ReviewAssetsContainer" patConfig={this.props.children.props.route.patConfig} libConfig={this.props.children.props.route.libConfig} closeModal={this.props.closeModal}/>;
        }
  }else if(this.state.jobStatus){
     uploadProgress = '';
     fileuploadContainer = '';
  }else{
    checkJobStatus = '';
    uploadProgress = '';
  }

  let tabVisibility = JSON.parse(tdc.patConfig.tabVisibility);
  let tabToVisible =2;
  let defaultTabName = tabVisibility.defaulttab;
  if(defaultTabName !== undefined && defaultTabName !== null && defaultTabName !== ''){
    if(defaultTabName == 'search')
      tabToVisible = 1;
    else if(defaultTabName == 'browse')
      tabToVisible = 2
    else if(defaultTabName == 'upload')
      tabToVisible = 3;
    else
      tabToVisible = 2
    // this.props.clearModal();
  }else{
    tabToVisible = 2;
    // this.props.clearModal();
  }


  let SearchLibContent = (<SearchLibraryContainer tabName='searchLibrary' clearModal={this.props.clearModal} closePopup={this.props.closeModal}/>);
  let BrowseAssetsContent = (<BrowseAssetsContainer tabName='browseAssets' clearModal={this.props.clearModal} closePopup={this.props.closeModal}/>);
  let UploadFilesContent = (<div><div>{fileuploadContainer}</div><div>{checkJobStatus}</div><div>{uploadProgress}</div></div>)
const tabContent = [
    {index:1, name: 'Search Library', content: SearchLibContent},
    {index:2, name: 'Browse Assets', content: BrowseAssetsContent},
    {index:3, name: 'Upload Files', content: UploadFilesContent}
  ];
  function getTabs() {
  return tabContent.map(tabContent => ({
    key: tabContent.index, // Optional. Equals to tab index if this property is omitted
    tabClassName: 'TabClass', // Optional
    panelClassName: 'TabPanel', // Optional
    title: tabContent.name,
    getContent: () => tabContent.content,
  }));
  }
    return (
      <div id='parentTabContainer' className='mainContainer'>
        <PL_Tabs items={getTabs()} selectedTabKey={tabToVisible} />
      </div>
    )


  }
}

AddAnAsset.propTypes = {
  children: PropTypes.object,
  onSave: PropTypes.func,
  closeModal:PropTypes.func,
  clearModal : PropTypes.func,
  pathname:PropTypes.string
}

module.exports = AddAnAsset;
