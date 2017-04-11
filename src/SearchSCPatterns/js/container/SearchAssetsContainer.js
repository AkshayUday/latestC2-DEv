import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchComponent from '../components/search/SearchSpec'
import {getAssets,getFilterType,getOnLoadLocalForageData,saveLocalForageData} from '../actions/SearchAssetsAction'
import {last} from 'lodash';
import SearchConstants from '../constants/SavedSearchConstant';

const mapStateToProps = (state) => {
	let searchData = last(state.SearchAssetsReducer);
	console.log('state', state)
	return {
		results: searchData.listResults,
		filterTypeValue: searchData.filterTypeValue,
		filterTypeData: searchData.filterTypeData,
		error:searchData.error,
		recentSearchData: searchData.recentSearchData,
		savedSearchData: searchData.savedSearchData,
		autoSuggestData: searchData.autoSuggestData,
		displayCount: searchData.displayCount
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
			ownProps.libConfig.patternName = ownProps.patConfig.pattern;
			dispatch(getAssets(this.state.actionTypes, this.props.filterTypeValue, _filterTypeData,ownProps.libConfig));
		},
		getFilterType: function (){
			dispatch(getFilterType(ownProps.libConfig));
		},
		savedSearch: function (){		
			let inputData = {};		
			inputData.saveValue = this.state.sugSaveVal;		
			inputData.userId = ownProps.libConfig.userId;
			inputData.patternName = ownProps.patConfig.pattern;
			//inputData.patternName = 'addAnAsset';	
			inputData.type = SearchConstants.LOCAL_INSTANCE;	
			inputData.saveType = SearchConstants.SAVE_SEARCH;
			inputData.gridMode = 9;		
			inputData.listMode = 25;		
			inputData.sortColName = 'title';		
			inputData.order = 'ascending';
			dispatch(saveLocalForageData(inputData));		
		},		
		componentWillMount() {
			let inputData = {};
			inputData.userId = ownProps.libConfig.userId;
			inputData.patternName = ownProps.patConfig.pattern;
			//inputData.patternName = 'addAnAsset';		
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
