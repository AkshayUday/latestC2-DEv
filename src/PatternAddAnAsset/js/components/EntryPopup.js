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
        this.selectPreviewAsset = this.selectPreviewAsset.bind(this);
        this.state = {
            open : true,
            showImgPreview: true,
            record: (this.props.preview) ? this.props.preview : {}
        }
        document.querySelector('body').style.overflow='hidden'; // Prevent background scroll
        this.backFromPreview = this.backFromPreview.bind(this);
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
     // this.setState({imgPreview: false});
    }

    selectPreviewAsset(){
        let selIndx = document.getElementById('prvwImgRadio').getAttribute('data-index');
        this.sendPreviewSelectedToQuad(selIndx, this.closeOnSelect);
    }

    render(){
        const { open } = this.state;
        let componentToDisplay;
        let dispHeader = true;
        if(this.props.preview.showImgPreview){
            componentToDisplay = (<ImagePreview backhandle={this.backFromPreview} assetObjList = {this.props.preview} children={this.props.children} clearModal={this.clearModal}
        closeModal={this.closeOnSelect} selectAsset = {this.selectPreviewAsset} />);
                dispHeader = false;
        }else{
            componentToDisplay = (<AddAnAsset children={this.props.children} clearModal={this.clearModal}
        closeModal={this.closeOnSelect} />);
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
    preserveFolderTree: React.PropTypes.func
}
export default EntryPopup;
