import {getSearchResults} from '../api/SearchAssetsApi';
import SearchAssetsConstants from '../constants/SearchActionTypes'
import Util from '../util/SearchAssetsUtil';
import {map,last,includes}  from 'lodash';
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';
import SavedSearchUtil from '../util/SavedSearchUtil';

/**
* This method is used to invoke the API and get back the search data for 
* particular search and post it in state.
**/
export function getAssets(filterObj, filterTypeValue, filterTypeData,libConfig){ 
	return (dispatch, getState) => { 
		let srValue = '';
		let sortObj = {}
		let queryObject = {
			action: 'Search',
			data:{
				searchterms : 'type=AssessmentInstrument'
			}
		};
		// filterObj = new Map([...filterObj.entries()].sort());
		if(filterObj !== '' && filterObj !== undefined){
			let valueObj, queryparams='',pagingParams='', searchterms = queryObject.data.searchterms;
			let uiMaps = filterObj;

			for( valueObj of uiMaps.values()){
				queryparams = getActionObject(valueObj);
				queryparams = setSearchTextValue(queryparams, valueObj);
				searchterms = searchterms.concat(queryparams);
				if(valueObj.type==='GET_GENERIC_ALL'){
					srValue = valueObj.value;
				}
				if(valueObj.type==='GET_SORT_ASC' || valueObj.type==='GET_SORT_DESC'){
					sortObj.sortType = valueObj.type;
					sortObj.sortColumn = valueObj.value;
				}
				if(valueObj.type==='GET_PAGE_MAX'){
					sortObj.displayCount = valueObj.value;
				}
				/*pagingParams = setPagingParams(valueObj);
				searchterms = searchterms.concat(pagingParams);*/
			}
			queryObject.data.searchterms = searchterms;
		}

        /* checking filter type */

        let _getfilterType = filterTypeValue;
        let _getfilterTypeData = filterTypeData;
       
		

       // _getfilterTypeData.filter(e => { console.log(e); return _getfilterType.includes(e.display);} )
   
      
	    let _filterTypeParam = '';
	    let _getFilterProperty = '';

        if(_getfilterType.length > 0){	
            _getFilterProperty = _getfilterTypeData.filter(data => { return includes(_getfilterType,data.display);} )
    
        	if(_getFilterProperty.length > 0){
        		for(let i=0; i<_getfilterType.length;i++){
                _filterTypeParam = _filterTypeParam.concat('&taxonomicType='+_getFilterProperty[i]['property']);
        	  }
        	}
        }
        
        if(_filterTypeParam != ''){
        	queryObject.data.searchterms = queryObject.data.searchterms.concat(_filterTypeParam)
        }


        dispatch({
				type: 'ERROR',
				value: ''
				});

        dispatch({
          type: 'ACTIVATE'
        })
        if(srValue){
        	let saveSrData = {};
	    	saveSrData.userId=libConfig.userId;
	    	saveSrData.patternName=libConfig.patternName;
	    	//saveSrData.patternName='addAnAsset';
	    	saveSrData.type=SearchConstants.LOCAL_INSTANCE;		
	    	saveSrData.saveType=SearchConstants.RECENT_SEARCH;
	    	saveSrData.saveValue=srValue;
	    	saveSrData.filterTypeValue=_getfilterType.toString();
	    	saveSrData.gridMode = 9;		
			saveSrData.listMode = sortObj.displayCount;		
			saveSrData.sortColName = sortObj.sortColumn;;		
			saveSrData.order = sortObj.sortType;
			saveSrData.viewMode = 'listView';		
			saveSrData.isThreeSave = true;
	    	dispatch(saveLocalForageData(saveSrData));
        }

		const promise = getSearchResults(queryObject,libConfig);
		promise.then(function (replyGet){
    	let results = Util.getRequiredParameter(replyGet);
    	// let searchResults = {'listResults' : results};
    		dispatch({
    			type: 'GET_SEARCH_RESULT',
    			value: results
    		});
    	 
    	 dispatch({
          type: 'DEACTIVATE'
        })


        }.bind(this), function (error){
            console.log(error);
             if(error.message == 'timeout'){
				dispatch({
				type: 'ERROR',
				value: 'Network issue please try again.'
				})
			}

          dispatch({
          type: 'DEACTIVATE'
        })


        }).catch(e => {
            console.log(e);
            dispatch({
          type: 'DEACTIVATE'
        })

        });

	}
}

export function saveLocalForageData(inputData){
	return (dispatch, getState) => {
		let saveResPromise = localForageService.saveLocalForageData(inputData);
    	saveResPromise.then(function (replyGet){
    		dispatch(getOnLoadLocalForageData(inputData));
    	},function (error){
    		dispatch({
	    		type: 'EXCEPTION_OCCURED',
	    		value: {errMsg: 'Exception occured'}
    		});
    	}).catch(e => {
    		dispatch({
	    		type: 'EXCEPTION_OCCURED',
	    		value: {errMsg: e.message}
    		});
    	});
	}
}

export function getOnLoadLocalForageData(inputData){
	return (dispatch, getState) => {
		if(inputData.userId.length > 0){
			let recentArr = [];
			let savedSrArr = [];
			let saveArr = [];
			let getResPromise = localForageService.getLocalForageData(inputData);
			getResPromise.then(function (replyGet){
				if(replyGet !== undefined){
					if(replyGet[inputData.patternName].recentSearch !== undefined){
						recentArr = replyGet[inputData.patternName].recentSearch.slice();
						dispatch({
			    			type: 'GET_RECENT_SR_RESULT',
					    	value: recentArr
		    			});
					}
					if(replyGet[inputData.patternName].saveSearch !== undefined){
						savedSrArr = replyGet[inputData.patternName].saveSearch.slice();
						dispatch({
			    			type: 'GET_SAVED_SR_RESULT',
					    	value: savedSrArr
		    			});
					}
					let autoSuggest = {};
					if(recentArr.length>0 || recentArr !== undefined){
						autoSuggest.recentArr = recentArr.slice();
					}
					if(savedSrArr.length>0 || savedSrArr !== undefined){
						autoSuggest.savedSrArr = savedSrArr.slice();
					}
					if(autoSuggest.recentArr.length > 0 || autoSuggest.savedSrArr.length > 0){
						saveArr = SavedSearchUtil.formatAutoSuggestionData(autoSuggest);
		    			console.log('saveArr');
		    			console.log(saveArr);
		    			dispatch({
		    				type: 'GET_SUG_DATA',
				    		value: saveArr
		    			});
					}else{
						dispatch({
				    		type: 'EXCEPTION_OCCURED',
				    		value: {errMsg: 'No Suggestion to display'}
	    				});
					}
					dispatch({		
						type: 'GET_LOCAL_FORAGE_DATA',		
						value: replyGet		
					});
				}else{
					dispatch({
		    			type: 'EXCEPTION_OCCURED',
				    	value: {errMsg: 'Recent Search is empty'}
		    		});
				}
			});
		}else{
			dispatch({
		    	type: 'EXCEPTION_OCCURED',
		    	value: {errMsg: 'UserId not passed'}
    		});
		}
	}
}

export function getFilterType(libConfig){ 
	return (dispatch, getState) => { 
		let actionObj = getActionObject({type:'GET_FILTER_TYPE'});
		
		let obj = setSearchTextValue(actionObj, {type:'GET_FILTER_TYPE'});
           dispatch({
				type: 'ERROR',
				value: ''
				});
		dispatch({
          type: 'ACTIVATE'
        })
		const promise = getSearchResults(obj,libConfig);
		promise.then(function (replyGet){
    	


    	let results = map(replyGet.origjsonld.narrower,(data, key, list) => { 
    		
    		if(list[key]['prefLabel'] != undefined) {
                return {
                  display: list[key]['prefLabel']['en'],
                  property : list[key]['id']
              }
            }
              else {
                return {
                        display: list[key].split('/')[5], 
                        property: list[key]
                      }
                }
    		    });
    		


		dispatch({
			type: 'FILTER_TYPE_DATA',
			value: results
		});
		 dispatch({
          type: 'DEACTIVATE'
        })

        }.bind(this), function (error){
            console.log(error);
           if(error.message == 'timeout'){
				dispatch({
				type: 'ERROR',
				value: 'Network issue please try again.'
				})

           }
    	dispatch({
          type: 'DEACTIVATE'
        })

        }).catch(e => {
        console.log(e);
		dispatch({
			type: 'DEACTIVATE'
		})
        });

	}
}

/**
* This method is used to set the pagination parameters
**/

export function setPagingParams(filterObj){
	let pageParams = '';
	if(filterObj.pageNo && filterObj.pageLimit){
		pageParams = '&page='+filterObj.pageNo+'&max-member-count='+filterObj.pageLimit;
	}
	return pageParams;
}

/**
* This method is used to set the value to query param
**/
export function setSearchTextValue(queryparams, filterObj){ 
	if(queryparams !== undefined && queryparams !== ''){
		if(filterObj.value !== undefined && filterObj.value !== ''){
			queryparams = queryparams.replace(/value/g,filterObj.value);
		}
	}
	return queryparams;
}
/**
* This method is used to identify the action types and object 
* which we use it for invoking the MDS Service
**/
export function getActionObject(filterObj){

	let searchItems;
	switch(filterObj.type){
		case 'GET_ALL':
		searchItems = SearchAssetsConstants.GET_ALL;
		break;
		
		case 'GET_GENERIC_ALL':
		searchItems = SearchAssetsConstants.GET_GENERIC_SEARCH;
		break;

		case 'GET_SORT_ASC':
		searchItems = SearchAssetsConstants.GET_SORT_ASC;
		break;

		case 'GET_SORT_DESC':
		searchItems = SearchAssetsConstants.GET_SORT_DESC;
		break;
		
		case 'GET_FILTER_TYPE':
		searchItems = SearchAssetsConstants.GET_FILTER_TYPE;
		break;

		case 'GET_INTIAL_PAGE':
		searchItems = SearchAssetsConstants.GET_PAGE_INITAL;
		break;

		case 'GET_PAGE_MAX':
		searchItems = SearchAssetsConstants.GET_PAGE_MAX;
		break;

		default:
		searchItems = SearchAssetsConstants.GET_ALL;
		break;
	}
	return searchItems;
}
