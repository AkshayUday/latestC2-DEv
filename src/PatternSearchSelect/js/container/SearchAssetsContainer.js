import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchComponent from '../components/search/SearchSpec'
import {getAssets,getFilterType,getOnLoadLocalForageData,saveLocalForageData, 
validateTaxonomicTypes} from '../actions/SearchAssetsAction';
import {last} from 'lodash';
import SearchConstants from '../constants/SavedSearchConstant';

const mapStateToProps = (state) => {
	let searchData = last(state.SearchAssetsReducer);
	return {
		results: searchData.listResults,
		filterTypeValue: searchData.filterTypeValue,
		filterTypeData: searchData.filterTypeData,
		error:searchData.error,
		recentSearchData: searchData.recentSearchData,
		savedSearchData: searchData.savedSearchData,
		autoSuggestData: searchData.autoSuggestData,
		localForData: searchData.localForData,
		productValue: searchData.productValue
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return{
		getAssetsWithManifestation: function (){
		
		let _filterTypeData = dispatch((() => { return (dispatch,getState) => {
     		   return  last(getState().SearchAssetsReducer)['filterTypeData'];							
	 			} 
	 		}
 		)())
		//verify an Array contains TDX/CITE/Journal
 		if(this.props.filterTypeValue.some(validateTaxonomicTypes)){
 			let result = this.props.filterTypeValue.filter(validateTaxonomicTypes);
 			if(result.length >= 2){
 				dispatch({type: 'ERROR', value: 'Select only one from TDX/CITE/Journal'});
 				dispatch({type: 'DEACTIVATE'});
 			}else{
				ownProps.libConfig.patternName = ownProps.patConfig.pattern;
				dispatch(getAssets(this.state.actionTypes, this.props.filterTypeValue, _filterTypeData,ownProps.libConfig,ownProps.patConfig
					,result.join(''),this.props.productValue));
 			}
 		}else{
 			dispatch({type: 'ERROR', value: 'Select atleast one from TDX/CITE/Journal'});
 			dispatch({type: 'DEACTIVATE'});
 		}
		},
		
		getFilterType: function (){
			dispatch(getFilterType(ownProps.libConfig));
		},
		savedSearch: function (){
			let inputData = {};				
			if(ownProps.libConfig.userId.length > 0){
				inputData.userId = ownProps.libConfig.userId;
			}else{
				inputData.userId = SearchConstants.UNKNOWN_ID;
			}
			inputData.patternName = ownProps.patConfig.pattern;
			inputData.type = SearchConstants.LOCAL_INSTANCE;	
			inputData.saveType = SearchConstants.SAVE_SEARCH;
			inputData.gridMode = 9;
			inputData.viewMode = 'listView';
			inputData.isThreeSave = true;
			let searchValue=this.state.sugSaveVal.trim();
	    	if(searchValue.length > 0){
	    		inputData.saveValue=searchValue;
	    	}
			//inputData.saveValue = this.state.sugSaveVal;
			inputData.columnSort = this.state.columnsort;
			if(this.props.filterTypeValue.length>0){
				inputData.filterTypeValue = this.props.filterTypeValue.toString();
			}
			if(this.state.actionTypes !== '' && this.state.actionTypes !== undefined){		
				let uiMaps = this.state.actionTypes;		
				for(let valueObj of uiMaps.values()){	
					if(valueObj.type==='GET_SORT_ASC' || valueObj.type==='GET_SORT_DESC'){		
						inputData.order = valueObj.type;		
						inputData.sortColName = valueObj.value;		
					}		
					if(valueObj.type==='GET_PAGE_MAX'){	
						inputData.listMode = valueObj.value;		
					}		
				}		
			}		
			dispatch(saveLocalForageData(inputData));		
		},		
		componentWillMount() {		
			let inputData = {};		
			if(ownProps.libConfig.userId.length > 0){
				inputData.userId = ownProps.libConfig.userId;
			}else{
				inputData.userId = SearchConstants.UNKNOWN_ID;
			}
			inputData.patternName = ownProps.patConfig.pattern;	
			inputData.type = SearchConstants.LOCAL_INSTANCE;	
      		dispatch(getOnLoadLocalForageData(inputData));		
      	}
	}
}

const SearchModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent)

export default SearchModal;
