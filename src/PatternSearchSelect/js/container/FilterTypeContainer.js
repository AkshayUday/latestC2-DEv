import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FilterTypeComponent from '../components/search/FilterType'
// import {getAssets} from '../actions/SearchAssetsAction'

const getDataValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }

  return [];
}


const mapStateToProps = (state) => { 
	let filterType = getDataValues(state.SearchAssetsReducer);
	
	return {
		     filterTypeData: filterType['filterTypeData'],
		     filterTypeValue: filterType['filterTypeValue']
	     }

}

const mapDispatchToProps = (dispatch) => { 

	return {
		// getAssetsWithManifestation: function (filters){
		// 	dispatch(getAssets(filters));
		// }
		setFilterTypeValue: (filterValue) => {
			console.log(filterValue);
            dispatch({type:'FILTER_TYPE_VALUE' , value:filterValue});           
		}
	}

}

const FilterTypeContainer= connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTypeComponent)

export default FilterTypeContainer;
