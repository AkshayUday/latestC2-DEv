/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class EntryPopup component used to create a Pop Up to the
 * Add Asset page
 * @author Udhayakumar Gururaj
 **/
import React from 'react';
import AddAnAsset from './AddAnAsset'
import { Link, browserHistory, hashHistory } from 'react-router';
import PL_Layout from '../../../PatternLayouts/PL_Layout'
import PopupStyles from './Styles/EntryPopupStyles.css'
import store from './../store'
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';
import ImagePreview from './ImagePreviewEntry'

class EntryPopup extends React.Component{
    constructor(props){
        super(props);
        this.clearModal = props.clearModal;
        this.closeOnSelect = this.closeOnSelect.bind(this);
        this.sendPreviewSelectedToQuad = props.sendPreviewSelectedToQuad.bind(this);
        this.preserveFolderTree = props.preserveFolderTree.bind(this);
        this.getLastSearchData = props.getLastSearchData.bind(this);
        this.selectPreviewAsset = this.selectPreviewAsset.bind(this);
        this.state = {
            open : true,
            showImgPreview: true,
            record: (this.props.preview) ? this.props.preview : {},
            prevSrData:{},
            currTab : '',
            selAsstName : '',
            calBackIndex : 0
        }
        document.querySelector('body').style.overflow='hidden'; // Prevent background scroll
        this.backFromPreview = this.backFromPreview.bind(this);
        this.selectedAssetIndex = this.selectedAssetIndex.bind(this);
        this.callbackAssetIndex = this.callbackAssetIndex.bind(this);
    }

    closeOnSelect() {
        this.setState({open:false});
        document.querySelector('body').style.overflow='auto';
        this.props.clearModal();
    }

    backFromPreview(){
        console.log('handled');
        this.props.preview.showImgPreview = false;
        this.setState({showImgPreview: false});
        this.preserveFolderTree();
        if(this.state.currTab === 'search'){
            this.getLastSearchData(this.state.prevSrData.value,this.state.prevSrData.pageNo,
            this.state.prevSrData.maxItems,this.state.prevSrData.fileTypeIndex,
            this.state.prevSrData.sortIndex,this.state.prevSrData.viewName);
        }
        // this.setState({imgPreview: false});
    }

    selectPreviewAsset(){
       // let selIndx = document.getElementById('prvwImgRadio').getAttribute('data-index');
       // let selIndx = this.props.preview.findIndex(selectedAssetIndex);
       this.state.selAsstName = document.getElementById('imageNameSpan').innerHTML;
       let selIndx = this.props.preview.findIndex(this.callbackAssetIndex);
        this.sendPreviewSelectedToQuad(this.state.calBackIndex, this.closeOnSelect);
    }

    callbackAssetIndex(value){
        let selIndex = 0;
        if(value.name === this.state.selAsstName){
            selIndex = this.props.preview.indexOf(value);
            this.state.calBackIndex = selIndex;
        }
    }

    selectedAssetIndex(value){
        let selIndex = 0;
        if(value.name === this.props.selPreview.name){
            selIndex = this.props.preview.indexOf(value);
            this.state.selIndex = selIndex;
        }
    }
   componentDidUpdate(){  
   	if(this.props.preview.pageNo && this.props.preview.maxItems){ 
            this.state.prevSrData.pageNo = this.props.preview.pageNo;
            this.state.prevSrData.maxItems = this.props.preview.maxItems;
        }
        //if(Object.keys(this.props.preview).length > 0){
        if(this.props.preview.length == 0){
          if(document.querySelectorAll('#displayContainerDiv').length > 0){
            document.querySelectorAll('#displayContainerDiv')[ 0 ].style.display = 'block';
          }
        }
    }

    render(){
        if(this.props.previewBackInputData !== undefined){
            this.state.prevSrData = this.props.previewBackInputData;
        }
        if(this.props.selPreview !== undefined && this.props.selPreview.length === undefined){
            let selIndx = this.props.preview.findIndex(this.selectedAssetIndex);
        }
        const { open } = this.state;
        let componentToDisplay;
        let dispHeader = true;
        if(this.props.preview.showImgPreview !== undefined){
            if(this.props.preview.showImgPreview){
                this.state.currTab = this.props.preview[0].currTabName;
                componentToDisplay = (<ImagePreview backhandle={this.backFromPreview} assetObjList = {this.props.preview} children={this.props.children} clearModal={this.clearModal}
                closeModal={this.closeOnSelect} selectAsset = {this.selectPreviewAsset} selIndex = {this.state.selIndex}/>);
                dispHeader = false;
            }else{
                let currActiveTab = this.props.preview[0].currTabName;
                this.state.currTab = currActiveTab;
                componentToDisplay = (<AddAnAsset children={this.props.children} clearModal={this.clearModal}
                closeModal={this.closeOnSelect} currActiveTab={currActiveTab}/>);
            }
        }else{
             let currActiveTab = 'search';
             this.state.currTab = currActiveTab;
             componentToDisplay = (<AddAnAsset children={this.props.children} clearModal={this.clearModal}
             closeModal={this.closeOnSelect} currActiveTab={currActiveTab}/>);
        }
        return(
            <PL_Layout containerId='ext_AddAnAsset'
        containerClassName='ext_AddAnAsset'
        open={open} modalTitle='Add An Asset'
        modalClass={PopupStyles.addAnAssetLayout}
        modalClose={this.closeOnSelect}
        showheader = {dispHeader}>

            <div className={PopupStyles.modalBodyDiv}>
        {componentToDisplay}
    </div>
        </PL_Layout>

    )
    }
}

EntryPopup.propTypes = {
    children : React.PropTypes.object,
    clearModal : React.PropTypes.func,
    location : React.PropTypes.string,
    preview : React.PropTypes.array,
    sendPreviewSelectedToQuad: React.PropTypes.func,
    record: React.PropTypes.array,
    currentFolder: React.PropTypes.string,
    preserveFolderTree: React.PropTypes.func,
    previewBackInputData: React.PropTypes.object,
    getLastSearchData: React.PropTypes.func,
    loadedAssetData : React.PropTypes.object,
    selPreview: React.PropTypes.object
}
export default EntryPopup;
