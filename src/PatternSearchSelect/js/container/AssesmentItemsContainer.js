import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AssesmentItemsComponent from '../components/search/AssessmentItems';
import {getAssessmentItems} from '../actions/SearchAssetsAction';

const getDataValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }

  return [];
}


const mapStateToProps = (state) => { 
	 let _assessment = getDataValues(state.SearchAssetsReducer);

	return {
		     error:_assessment.error,
		     assessmentItems: _assessment['assessmentItems'],
		     hasPartItems: _assessment['hasPartItems']
	     }

}

const mapDispatchToProps = (dispatch, ownProps) => { 

	return {
		// getAssetsWithManifestation: function (filters){
		// 	dispatch(getAssets(filters));
		// }
		// setFilterTypeValue: (filterValue) => {
		// 	console.log(filterValue);
  		//  dispatch({type:'FILTER_TYPE_VALUE' , value:filterValue});           
		// },
		// getAssessmentItem: () => {

		// }
		componentWillMount(){
			console.log('componentWillMount container');
			dispatch(getAssessmentItems(ownProps.assessmentData, ownProps.libConfig));
		},
		componentDidMount(){
			console.log('componentDidMount container');
		}
	}

}

const AssesmentItemsContainer= connect(
  mapStateToProps,
  mapDispatchToProps
)(AssesmentItemsComponent)

export default AssesmentItemsContainer;
