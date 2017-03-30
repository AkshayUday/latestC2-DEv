import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchComponent from '../components/search/SearchSpec'
import {getAssets,getFilterType} from '../actions/SearchAssetsAction'
import {last} from 'lodash';

const mapStateToProps = (state) => { 
	let searchData = last(state.SearchAssetsReducer);
	return {
		results: searchData.listResults,
		filterTypeValue: searchData.filterTypeValue,
		filterTypeData: searchData.filterTypeData
	}
}

const mapDispatchToProps = (dispatch, ownProps) => { 
	return{
		getAssetsWithManifestation: function (){ 
			dispatch(getAssets(this.state.actionTypes, this.props.filterTypeValue, this.props.filterTypeData));
		},
		getFilterType: function (){
			dispatch(getFilterType());
		}
	}
}

const SearchModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent)

export default SearchModal;
