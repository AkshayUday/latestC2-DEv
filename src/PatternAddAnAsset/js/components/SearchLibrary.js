/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Items display per page component.
 * This component operates as a "Controller-View".
 *
 * @module MediaAssets
 * @file searchLibrary
 * @author TDC
 *
*/
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import {reduxForm} from 'redux-form';
import AddAnAsset from './AddAnAsset'
import Label from '../../../common/components/Label';
import PL_SiteDetail from '../../../common/components/PL_SiteDetail';
//import AutoCompleteContainer from '../container/autoCompleteContainer';
import SearchCompleteContainer from '../container/SearchCompleteContainer';
import SearchAssetFiltersContainer from '../container/SearchAssetFiltersContainer';
import SearchFilterContainer from '../container/SearchFilterContainer';
import Pagination from '../container/paginationContainer';
import Scroll from 'react-scrollbar';
import {horizontalScrollBarStyle, horizontalContainer, verticalScrollStyle,
        verticalContainerStyle} from '../utils/styles';
import PL_Scroll from '../../../common/components/PL_ScrollBar';




import styles from './Styles/SearchLibraryStyles.css';

class SearchLibrary extends Component {
/**
  * @constructor defines states of the search library Component
  */
  constructor(props) {
    super(props);
    this.state = {
       showAssert: true,
       isSavedSearch: props.isSavedSearch,
       record: this.props.record,
       showCancel: false
    }
       this.componentWillMount = props.componentWillMount;
       this.getSearchProduct = this.getSearchProduct.bind(this);
       this.saveSearchValue = props.saveSearchValue;
       this.deleteSavedSearch = props.deleteSavedSearch;
       this.runSearch = props.runSearch;
       this.ShowAsserts =  this.ShowAsserts.bind(this);
       this.sendToQuad = props.sendToQuad.bind(this);
       this.closeSearchLibrary = props.closeSearchLibrary.bind(this);
}

    componentDidMount(){
        let selectBtn = document.getElementById('assetSelectBtn');
        if(selectBtn != undefined){
             selectBtn.setAttribute('disabled',true);
        }
    }

/** @function componentWillReceiveProps -
 * It sets the next props value to the existing component
*/
componentWillReceiveProps(nextProps) {
  this.setState({isSavedSearch: nextProps.isSavedSearch});
  this.setState({record: nextProps.record});
}
/** @function ShowAsserts -
 * This function is used to show and hide left content(Difficulty levels)
*/
ShowAsserts(e){
  this.setState({showAssert: !this.state.showAssert})
}
getSearchProduct(value){ 
  this.setState({showCancel:false});
  this.props.getSearchProduct(value);
}
/**
 * @function render -
 * When called, it will render the search library component
 * @return {string}
 * HTML markup of the component
*/
   render() {
    const {
        fields: {productName}, handleSubmit
      } = this.props;
      const sliderRes = this.state.showAssert? {width: '16%'}: {width: '1%'};
      const assetsRes = this.state.showAssert? {width: '83%'}: {width: '99%'};
      const saveSearchDiv = {float: 'right',marginTop:5};
      const displayContainerDiv = {display:'none'};
      let SearchValue = this.props.productName;
      let isBoolean = true;
      // if(this.props.SearchValue!==undefined){
      //   SearchValue = this.props.SearchValue;
      // }

let canSelBtn;
  canSelBtn = (<div className={this.state.isSavedSearch ? styles.searchLibHideClass : styles.btnBar}>            
            <button className={styles.btnCancel} onClick={this.closeSearchLibrary}>Cancel</button>                        
            <button id='selectBtn' className={styles.btnSelect} id='assetSelectBtn' onClick={this.sendToQuad}>Select</button>
        </div>)

let pageDetails = this.props.pageDetails


let paginationCont;
let savedSearchActions;
if(!this.state.isSavedSearch){
  if(this.props.showTabs){
    if(pageDetails.numberFound!==undefined){
      paginationCont = (<div className={styles.paginationContainer}><Pagination/></div>)
    } 
  }
}else{
let deleteBtn = (<button className={styles.btnDelete} disabled={!this.props.enableDelete}
onClick={this.props.deleteSavedSearch}>Delete Search</button>)
let runBtn = (<button className={styles.btnRun} disabled={!this.props.enableSearch}
onClick={this.props.runSavedSearch}>Run Search Again</button>)
if(this.props.enableDelete==true){
deleteBtn = (<button className={styles.btnDelete} 
onClick={this.props.deleteSavedSearch}>Delete Search</button>)
}
if(this.props.enableSearch==true){
  runBtn = (<button className={styles.btnRun}
onClick={this.props.runSavedSearch}>Run Search Again</button>)
}
savedSearchActions=(<div className= {styles.btnBar}>
{runBtn}
{deleteBtn}
</div>)
}

return(
  <div>
  <div className={styles.searchPanelWrapper}>
  <form>
    <div className={styles.searchHeadDiv}>
      <PL_SiteDetail siteLabel='Searching in : ' siteTitle={SearchValue}/>
    </div>
    <div className={styles.searchAutoSuggestContainer}>
      <div id='searchAutoSuggest' className={styles.searchAutoSuggestDiv}>
        <SearchCompleteContainer value={productName} />
      </div>
      <div className={styles.searchBtnDiv}>
        <button id='searchButton' onClick={handleSubmit(this.getSearchProduct)}>
        </button>
      </div>
    </div>
     <PL_Scroll classname={styles.searchPanelScroll}>
      <div id='displayContainerDiv' style={displayContainerDiv}>
        <div className='row'>
            <SearchAssetFiltersContainer products={this.props.productName}/>
        </div>
    </div>
   {paginationCont}
    </PL_Scroll>
  </form>
  </div>
  {canSelBtn}
  {savedSearchActions}
  </div>
)
}
}

SearchLibrary.propTypes = {
  isSavedSearch: PropTypes.bool,
  record:PropTypes.object,
  componentWillMount: PropTypes.func,
  getSearchProduct:PropTypes.func,
  saveSearchValue: PropTypes.func,
  deleteSavedSearch: PropTypes.func,
  runSearch: PropTypes.func,
  ShowAsserts: PropTypes.func,
  sendToQuad: PropTypes.func,
  closeSearchLibrary:PropTypes.func,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
  SearchValue: PropTypes.string,
  productName:PropTypes.string,
  handlePageChange:PropTypes.string,
  enableSearch:PropTypes.bool,
  enableDelete:PropTypes.bool,
  runSavedSearch:PropTypes.func,
  deleteSavedSearch:PropTypes.func,
  pageDetails: PropTypes.object,
  showTabs: PropTypes.bool
}

SearchLibrary = reduxForm({
  form: 'SearchLibrary',
  fields: ['productName']
})(SearchLibrary);

SearchLibrary.PropTypes = {

}

module.exports= SearchLibrary;
