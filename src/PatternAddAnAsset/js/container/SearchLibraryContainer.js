/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file SearchLibraryContainer - This container does data fetching
  and then renders its corresponding sub-component.
 * @author TDC
 */
import {connect} from 'react-redux';
import SearchLibrary from '../components/SearchLibrary';
import {getSearchProductItems,
  getDifficultyLevels,
  saveSearchValues,
  deleteSavedSearch,
  runSearch,
  getProductDetails,sendToQuad } from '../action/SearchLibraryAction';
import { Link, browserHistory, hashHistory } from 'react-router'
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import {find} from 'lodash';
import {getCurrentValues} from '../utils/util';

import bean from 'bean';

const localforage = require('localforage');

/**@function getSelectedValues -
 * This method is used to get the selected values by user.
 * @param {object} dataArray - Array containing values selected by user
 * @returns {string} - If array length is greater than 0 , it will return last element of that array
 * @returns {object} array - else it will return empty array object
*/
const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }

  return [];
}

/**@function mapStateToProps -
 * Connects a React component to a Redux store.
 * Whenenver redux store gets updated, this method will get called.
 * This method transform the current application state into the
 * props you want to pass to a presentational component
 * @param {object} state
 * @returns {object} Object
*/
const mapStateToProps = (state) => {
    let productName = '';
    let showTabs = false;
    let assetsData = getCurrentValues(state.searchAssets);
    let data = getSelectedValues(state.searchLibraryReducer);
    let selectedData = getCurrentValues(state.quad);
    let siteData = getSelectedValues(state.siteDataReducer);
    let SavedSearchdata = getSelectedValues(state.savedSearchReducers);
    if(state.autoComplete.length > 0){
        productName = state.autoComplete[state.autoComplete.length-1].text;
     }
     if(assetsData.showTabs){
    showTabs = true;
    }
     return {
    pageDetails: Array.isArray(assetsData)? {}: assetsData,
    isSavedSearch: data.isSavedSearch,
    record: Array.isArray(selectedData)? {}: selectedData,
    showAssets:false,
    showTabs: showTabs,
    productName: siteData.productName,
    CheckedValues:SavedSearchdata.savedData,
    isChecked:SavedSearchdata.isChecked,
    enableDelete:SavedSearchdata.enableDelete,
    enableSearch:SavedSearchdata.enableSearch,
    'initialValues': {
            productName:productName
          }
        }

}

/**@function mapDispatchToProps
 * Connects a React component to a Redux store.
 * This method receives the dispatch() method and returns callback props that needs to be
 * injected into the presentational component
 * @param {function} dispatch
 * @returns {object} callback props
*/
const mapDispatchToProps = (dispatch) => {
  return {
  		componentWillMount() {
        this.props.clearModal();
         dispatch(getProductDetails());
  		},
      componentWillReceiveProps(){

      },
      getSearchProduct(value){

        //dispatch(getDifficultyLevels());
      //dispatch(getSearchProductItems(value.productName,1));
      	//let searchValue = value;

          dispatch({
           type : 'RESET_SEARCH_TABS',
           data : false
        });
        
        let searchValue = document.querySelector('#searchAutoSuggest input').value.trim();        
        // debugger;
        localforage.getItem('last_three_search').then(function (lastvalue){
      //  console.log(lastvalue);
      //  console.log(searchValue);

        if(searchValue !== undefined && searchValue !== ''){
        	//let chkVal = _.find(lastvalue, { 'term': searchValue.productName});
         let chkVal = find(lastvalue, { 'term': searchValue});
         if(chkVal === undefined){
            	let sval = {term:searchValue};
	            if(lastvalue.length >= 3){
				   lastvalue.pop(lastvalue.unshift(sval));
	            }else{
	               lastvalue.unshift(sval);
	            }
            }

        }

			localforage.setItem('last_three_search', lastvalue, function (err, val) {
          let searchString = document.querySelector('#searchAutoSuggest input').value.trim();
          localforage.getItem('persistFilterSettings')
            .then((filterSettings) => {
              let displayCount;
              if (filterSettings.viewName === 'list-view') {
                displayCount = filterSettings.displayValueCountForList ? filterSettings.displayValueCountForList: 25;
              } else {
                displayCount = filterSettings.displayvaluecount ? filterSettings.displayvaluecount: 9;
              }
              dispatch(getSearchProductItems(searchString,DEFAULT_PAGE_NO,displayCount,0,filterSettings.sortIndex, filterSettings.viewName));
              dispatch({
                type : 'SEND_TO_QUAD',
                data : {}
              });

              document.querySelectorAll('#displayContainerDiv')[0].style.display = 'block';
              document.querySelectorAll('#assetSelectBtn')[0].style.display = 'inline-block';

              //let selectedTabEle = document.querySelector('#searchfilterAssets .ReactTabs__Tab--selected');
              //    if(selectedTabEle !== undefined){
              //      let selectedTab = selectedTabEle.textContent;
              // if(selectedTab === 'Saved Search'){
              // 	//document.querySelectorAll('#searchfilterAssets .ReactTabs__Tab')[0].click();
              // }
              //    }
            })
			});

      })
   },

    closeSearchLibrary: function (){
      this.props.closePopup();
      dispatch({
        type : 'INIT_APP'
      })
    },

    sendToQuad: function (record) {
      let temp = JSON.stringify(this.props.record);
      dispatch(sendToQuad(this.props));
       //alert(temp);
       //hashHistory.push('/ReviewAsset');
       // bean.fire(window.tdc.patConfig, window.tdc.patConfig.eventId,this.props.record);
       // this.props.closePopup();
    },

    runSavedSearch(event){
    event.preventDefault();
    dispatch(runSearch());
    },
    deleteSavedSearch(event){
      event.preventDefault();
      dispatch(deleteSavedSearch());
   }

  }
	}

const SearchLibraryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchLibrary)

export default SearchLibraryContainer;
