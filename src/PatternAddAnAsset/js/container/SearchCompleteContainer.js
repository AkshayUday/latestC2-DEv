import { connect } from 'react-redux';
import { populateAutoComplete } from '../action';
import { getSearchProductItems } from '../action/SearchLibraryAction';
import SearchComplete from '../components/SearchComplete';
import {isEmpty, forEach, takeRight, chain, find, uniqBy} from 'lodash';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';
import localForageService from '../../../common/util/localForageService';
import SearchConstants from '../constants/SavedSearchConstant';

const identifyUserId = () => {
    let inputData = {};
    let userID = window.tdc.libConfig.alfuname;
    inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
    inputData.patternName = window.tdc.patConfig.pattern;
    return inputData;
}


// const localforage = require('localforage');

const getSelectedValues = (dataArray) => {
    let currentData = '';
    if(dataArray){
        if (dataArray.length > 0) {
            currentData = dataArray[dataArray.length-1];
            if(!isEmpty(currentData) && currentData['data'] != undefined){
                // let temp = []

                // currentData.data.forEach(function (obj) {
                //     temp.push(({term:obj.name['en']}));
                // });

                let  autosectionArray = [{
                    title: '',
                    suggestions: currentData.data
                }
                ];

                if(currentData.lastThreeSearch.length >= 1){
                    autosectionArray.push({
                        title: 'Recent Search Terms',
                        suggestions: currentData.lastThreeSearch
                    })
                }

                if(currentData.savedSearch.length >= 1){
                    autosectionArray.push({
                        title: 'Saved searches',
                        suggestions: currentData.savedSearch
                    })
                }

                let data = autosectionArray;
                return data;
            }else{
                return [];
            }
        }
    }

    return [];


}


const mapStateToProps = (state) => {

    let searchRes = getSelectedValues(state.autoComplete);
    let searchText = state.autoComplete[state.autoComplete.length-1].text;

    return {
        data:{
            data:searchRes,
            text:searchText
        },
        allAsset:state.autoComplete[state.autoComplete.length-1].allAsset
    }
}

const updateSearchValueAction = (value) => {
    return {
        type: 'UPDATE_SEARCH_VALUE',
        text : value
    }
}

const updateAllAsset = (allAsset,sarr,savedSearch) => {
    return {
        type: 'UPDATE_ALL_ASSET',
        data : allAsset,
        savedSearch:sarr,
        lastThreeSearch:savedSearch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
            onFocus(event){
                //console.log(event);
                //console.log('onFocus');

                let inputData = identifyUserId();
                inputData.type = SearchConstants.LOCAL_INSTANCE;
                let getResPromise = localForageService.getLocalForageData(inputData);
                getResPromise.then(function (responseData){
                    //localforage.getItem('savedSearch').then(function (searchvalue) {
                    // This code runs once the value has been loaded
                    // from the offline store.
                    let savedSearchValues = [];
                    let recentSearchValues = [];
                    if(responseData.AddAnAsset){

                        savedSearchValues = responseData.AddAnAsset.saveSearch.reverse().slice(0,3);
                        recentSearchValues = responseData.AddAnAsset.recentSearch.reverse();
                        //let sarr = [];
                        // if(searchvalue != null){
                        //     (searchvalue).forEach(function (data) {
                        //         // if(data.nodeRef==window.tdc.libConfig.nodeRef &&
                        //         // 	data.uName==window.tdc.libConfig.alfuname){
                        //         sarr.push({term:data.searchterm});
                        //         //}

                        //     });
                        // }

                    }
                    //localforage.getItem('last_three_search').then(function (lastthree){
                    //let searchdata = [];
                    let allAsset = [];
                    // searchdata =  takeRight(uniqBy(lastthree,'term'),3);

                    allAsset = dispatch((() => { return (dispatch,getState) => {
                            //console.log(getState().autoComplete);
                            return chain(getState().autoComplete).last().pick('data').value();

                }
                }
                    )())

                    dispatch(updateAllAsset(allAsset['data'],savedSearchValues,recentSearchValues));

                    // });

                }).catch(function (err) {
                    // This code runs if there were any errors
                    console.log(err);
                });


            },
            onChange(event, { newValue }) {
                this.setState({
                    value: newValue
                });

                dispatch(updateSearchValueAction(newValue));


            },
            componentDidUpdate(){

                /*dispatch((() => { return (dispatch,getState) => {
                 //console.log(getState().autoComplete);
                 }
                 }
                 )());*/


            },
            componentWillMount(){
                let inputData = identifyUserId();
                inputData.type = SearchConstants.LOCAL_INSTANCE;
                let getResPromise = localForageService.getLocalForageData(inputData);
                getResPromise.then(function (responseData){
                    //localforage.getItem('savedSearch').then(function (searchvalue) {
                    // This code runs once the value has been loaded
                    // from the offline store.
                    let savedSearchValues = [];
                    let recentSearchValues = [];
                    if(responseData.AddAnAsset){
                        savedSearchValues = responseData.AddAnAsset.saveSearch.reverse().slice(0,3);
                        recentSearchValues = responseData.AddAnAsset.recentSearch.reverse();

                        //let sarr = [];
                        // if(searchvalue != null){
                        //     (searchvalue).forEach(function (data) {
                        //         // if(data.nodeRef==window.tdc.libConfig.nodeRef &&
                        //         // 	data.uName==window.tdc.libConfig.alfuname){
                        //         sarr.push({term:data.searchterm});
                        //         //}

                        //     });
                        // }
                    }


                    // localforage.getItem('last_three_search').then(function (lastthree){
                    // let searchdata = [];
                    // searchdata =  takeRight(uniqBy(lastthree,'term'),3);

                    //dispatch(populateAutoComplete('',sarr,searchdata));
                    dispatch(updateAllAsset([],savedSearchValues,recentSearchValues));



                    //});

                }).catch(function (err) {
                    // This code runs if there were any errors
                    console.log(err);
                });
            },
            onSuggestionSelected: (event, { suggestion, suggestionValue, sectionIndex, method }) => {
            let inputData = {};
    const userID = window.tdc.libConfig.alfuname;
    inputData.userId = (userID !== undefined && userID.length > 0) ? userID : SearchConstants.UNKNOWN_ID;
    inputData.patternName = window.tdc.patConfig.pattern;
    inputData.type = SearchConstants.LOCAL_INSTANCE;
    let getResPromise = localForageService.getLocalForageData(inputData);
    getResPromise.then(function (replyGet) {
        if (replyGet[ inputData.patternName ].displayCount !== undefined) {
            const {viewMode, gridMode, listMode, sortIndex } =  replyGet[ inputData.patternName ].displayCount;
            let displayCount;
            if (replyGet[ inputData.patternName ].displayCount.viewMode === 'list-view') {
                displayCount = listMode ? listMode : 25;
            } else {
                displayCount = gridMode ? gridMode : 9;
            }
            patternExistence(dispatch, suggestionValue.trim(), displayCount, sortIndex, viewMode)
        } else {
            patternExistence(dispatch, suggestionValue.trim())
        }
    }).catch(function (err) {
        console.log('Localforage not exist in SearchCompleteContainer', err)
        patternExistence(dispatch, searchString)
    })

},

    onSuggestionsUpdateRequested: ({value}) => {

        //console.log(value);

        let inputData = identifyUserId();
        inputData.type = SearchConstants.LOCAL_INSTANCE;
        let getResPromise = localForageService.getLocalForageData(inputData);
        getResPromise.then(function (responseData){

            let savedSearchValues = [];
            let recentSearchValues = [];
            if(responseData.AddAnAsset){
                savedSearchValues = responseData.AddAnAsset.saveSearch.reverse().slice(0,3);
                recentSearchValues = responseData.AddAnAsset.recentSearch.reverse();
            }

            //localforage.getItem('savedSearch').then(function (searchvalue) {
            // This code runs once the value has been loaded
            // from the offline store.
            // let sarr = [];
            // if(searchvalue != null){
            //     (searchvalue).forEach(function (data) {
            //         // if(data.nodeRef==window.tdc.libConfig.nodeRef &&
            //         // 	data.uName==window.tdc.libConfig.alfuname){
            //         sarr.push({term:data.searchterm});
            //         //}

            //     });
            // }

            //localforage.getItem('last_three_search').then(function (lastthree){
            //let searchdata = [];
            //let allAsset = [];
            /*if(lastthree.length >=3){
             searchdata =  _.takeRight(lastthree,3);
             }*/

            //searchdata =  takeRight(uniqBy(lastthree,'term'),3);
            if(value != ''){
                dispatch(populateAutoComplete(value,savedSearchValues,recentSearchValues));
            }else{
                //dispatch(updateAllAsset(allAsset['allAsset'],sarr,searchdata));
                dispatch(updateAllAsset([],savedSearchValues,recentSearchValues));
            }

            //});

        }).catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
        });



        //console.log(value);
    }

}
}

const patternExistence = (dispatch, searchString, displayCount, sortIndex, viewMode) => {
    dispatch({
        type: 'RESET_SEARCH_TABS',
        data: false
    });

    if (sortIndex !== undefined && viewMode !== undefined) {
        dispatch(getSearchProductItems(searchString, DEFAULT_PAGE_NO, displayCount, 0, sortIndex, viewMode));
    } else {
        dispatch(getSearchProductItems(searchString, DEFAULT_PAGE_NO, DEFAULT_MAX_RESULTS, 0));
    }

    dispatch({
        type: 'SEND_TO_QUAD',
        data: {}
    });

    document.querySelectorAll('#displayContainerDiv')[ 0 ].style.display = 'block';
    //document.querySelectorAll('.selectBtn')[0].style.display = 'inline-block';
    //
    //let selectedTab = document.querySelector('#searchfilterAssets .ReactTabs__Tab--selected').textContent;
    //if(selectedTab == 'Saved Search'){
    //    document.querySelectorAll('#searchfilterAssets .ReactTabs__Tab')[0].click();
    //};
}

const SearchCompleteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchComplete)

export default SearchCompleteContainer
