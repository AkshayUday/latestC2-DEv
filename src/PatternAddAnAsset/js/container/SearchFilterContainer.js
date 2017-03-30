import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchFilter from '../components/SearchFilter';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import {getSearchProductItems,updateDifficultyLevel} from '../action/SearchLibraryAction';
const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }

  return [];
}

const mapStateToProps = (state) => {
   let data = getSelectedValues(state.difficultyLevelReducer);
   let difficultyLevelData = data.difficultylevel;
   let Filters = [];
   for(let i=1;i<difficultyLevelData.length;i++){
    Filters.push(difficultyLevelData[i]);
   }
   return {
    Filters:Filters,
    triggerVal: data.triggerVal
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterSearch:function (event){
       event.preventDefault();
       dispatch(updateDifficultyLevel(parseInt(event.target.id)));
    }
  }
}

const SearchFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilter)

export default SearchFilterContainer;
