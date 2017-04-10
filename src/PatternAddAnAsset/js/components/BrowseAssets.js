/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Items display per page component.
 * This component operates as a "Controller-View".
 *
 * @module MediaAssets
 * @file BrowseAssets
 * @author TDC
 *
*/
import React, { Component, PropTypes } from 'react';
import AddAnAsset from './AddAnAsset';
import AssetFiltersContainer from '../container/AssetFiltersContainer';
import FolderTree from '../container/TreePaneContainer';
import Pagination from '../container/paginationContainer';
import PL_Scroll from '../../../common/components/PL_ScrollBar';
import BrowseAsset from './Styles/BrowseStyles.css';
import PL_SiteDetail from '../../../common/components/PL_SiteDetail';

class BrowseAssets extends Component {
    /**
  * @constructor defines states of the Browse Assets Component
  */
    constructor(props) {
        super(props);
        this.state = {
            record: this.props.record,
            toggleFolder: true
        };
        this.sendToQuad = props.sendToQuad.bind(this);
        this.closeBrowseAssets = props.closeBrowseAssets.bind(this);
        this.componentWillMount = props.componentWillMount;
        this.toggleFolderTree = this.toggleFolderTree.bind(this);
    }
    /** @function componentWillReceiveProps -
 * It sets the next props value to the component
*/
    componentWillReceiveProps(nextProps) {
        this.state.record = nextProps.record;
    }

    componentDidMount(){
        let selectBtn = document.getElementById('assetSelectBtn');
        if(selectBtn != undefined){
             selectBtn.setAttribute('disabled',true);
        }
    }
    toggleFolderTree() {
        this.setState({toggleFolder: !this.state.toggleFolder});
    }
/**
 * @function render -
 * When called, it will render the Browse Asset component
 * @return {string}
 * HTML markup of the component
*/
    render() {
        const sliderRes = this.state.toggleFolder? {width: '25%'}: {width: '4%'};
        const assetsRes = this.state.toggleFolder? {width: '75%'}: {width: '93%'};
        let SearchValue =  this.props.productName;
        let leftPanel;
        let pageDetails = this.props.pageDetails;
        let paginationCont;
        let isBoolean = true;
  if(this.props.showTabs){
  if(pageDetails.numberFound!==undefined){
    paginationCont = (<div className={BrowseAsset.paginationContainer}><Pagination handlePageChange={this.props.handlePageChange}/></div>)
  } 
}
                 if(this.state.toggleFolder){
                    if(this.props.folder[0].fileName === undefined){
                    leftPanel = (<div className={BrowseAsset.filtersContent}>
                                <div className={BrowseAsset.filtersLabel}>Documents</div>
                                <PL_Scroll classname={BrowseAsset.area} contentName={BrowseAsset.scroll}>
                                    <FolderTree clearModal={this.props.clearModal}/>
                                </PL_Scroll>
                                </div>);
                    }else{
                      leftPanel = (<div className={BrowseAsset.filtersContent}>
                                <div className={BrowseAsset.filtersLabel}>Documents</div>
                                <PL_Scroll classname={BrowseAsset.area} contentName={BrowseAsset.scroll}>
                                   <FolderTree clearModal={this.props.clearModal}
                                          browsestate={isBoolean} folder={this.props.folder}/>
                                </PL_Scroll>
                                </div>);
                    }
                  }

      return (
        <div className={BrowseAsset.browsePanelWrapper}>
        <PL_Scroll classname={BrowseAsset.browsePanelScroll}>
            <div className={BrowseAsset.browseAssetTitle}>
                <PL_SiteDetail siteLabel='Browsing in : ' siteTitle={SearchValue}/>
            </div>
            <div className={BrowseAsset.browseAssetBody}>
                <div className={BrowseAsset.filterContainer} style={sliderRes}>
                  {leftPanel}
                </div>
             
                <div style={assetsRes} className={BrowseAsset.peSearchResultsContainer+' '+ BrowseAsset.browseTabResults}>
                    <AssetFiltersContainer toggleFolder={this.toggleFolderTree} collapse={this.state.toggleFolder} products={this.props.productName}/>
                </div>
               {paginationCont}
            </div>
        </PL_Scroll>
        <div className={BrowseAsset.btnBar}>
                    <button className={BrowseAsset.btnCancel} onClick={this.closeBrowseAssets} type="button">Cancel</button>
                    <button className={BrowseAsset.btnSelect} onClick={this.sendToQuad} id='assetSelectBtn' type="button">Select</button>
        </div>

    </div>
         
      )
    }
}

BrowseAssets.propTypes = {
    record: PropTypes.object,
    sendToQuad: PropTypes.func,
    closeBrowseAssets: PropTypes.func,
    productName:PropTypes.string,
    clearModal : PropTypes.func,
    componentWillMount: PropTypes.func,
    handlePageChange: PropTypes.func,
    folder : PropTypes.any,
    pageDetails: PropTypes.object,
    showTabs: PropTypes.bool
}

module.exports = BrowseAssets;
