import { connect } from 'react-redux';
import { populateAutoComplete } from '../action';
import { getSearchProductItems } from '../action/SearchLibraryAction';
import SearchComplete from '../components/SearchComplete';
import {isEmpty, forEach, takeRight, chain, find, uniqBy} from 'lodash';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../constants/paginationConstants';

const localforage = require('localforage');

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

                localforage.getItem('savedSearch').then(function (searchvalue) {
                    // This code runs once the value has been loaded
                    // from the offline store.
                    let sarr = [];
                    if(searchvalue != null){
                        (searchvalue).forEach(function (data) {
                            // if(data.nodeRef==window.tdc.libConfig.nodeRef &&
                            // 	data.uName==window.tdc.libConfig.alfuname){
                            sarr.push({term:data.searchterm});
                            //}

                        });
                    }

                    localforage.getItem('last_three_search').then(function (lastthree){
                        let searchdata = [];
                        let allAsset = [];
                        searchdata =  takeRight(uniqBy(lastthree,'term'),3);

                        allAsset = dispatch((() => { return (dispatch,getState) => {
                                //console.log(getState().autoComplete);
                                return chain(getState().autoComplete).last().pick('data').value();

                    }
                    }
                        )())

                        dispatch(updateAllAsset(allAsset['data'],sarr,searchdata));

                    });

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

                localforage.getItem('savedSearch').then(function (searchvalue) {
                    // This code runs once the value has been loaded
                    // from the offline store.
                    let sarr = [];
                    if(searchvalue != null){
                        (searchvalue).forEach(function (data) {
                            // if(data.nodeRef==window.tdc.libConfig.nodeRef &&
                            // 	data.uName==window.tdc.libConfig.alfuname){
                            sarr.push({term:data.searchterm});
                            //}

                        });
                    }

                    localforage.getItem('last_three_search').then(function (lastthree){
                        let searchdata = [];
                        searchdata =  takeRight(uniqBy(lastthree,'term'),3);

                        //dispatch(populateAutoComplete('',sarr,searchdata));
                        dispatch(updateAllAsset([],sarr,searchdata));



                    });

                }).catch(function (err) {
                    // This code runs if there were any errors
                    console.log(err);
                });
            },
            onSuggestionSelected: (event, { suggestion, suggestionValue, sectionIndex, method }) => {
            console.log('onSuggestionSelected');
    console.log(suggestionValue);

    localforage.getItem('last_three_search').then(function (lastvalue){
        //	console.log(lastvalue);
        //	console.log(suggestionValue);
        if(suggestionValue.trim() != undefined && suggestionValue.trim() != ''){
            let chkVal = find(lastvalue, { 'term': suggestionValue.trim()});
            if(chkVal == undefined){
                let sval = {term:suggestionValue.trim()};
                console.log(sval);
                if(lastvalue.length >= 3){
                    lastvalue.pop(lastvalue.unshift(sval));
                }else{
                    lastvalue.unshift(sval);
                }
            }

        }
        let viewName = '';
        if(document.querySelector('.dropdown-display span i')){
            if(document.querySelector('.dropdown-display span i').className=='fa fa-list'){
                viewName = 'list-view';
            }else{
                viewName = 'grid-view';
            }
        }

        localforage.setItem('last_three_search', lastvalue, function (err, val) {
            //console.log(val);

            dispatch({
                type : 'RESET_SEARCH_TABS',
                data : false
            });

            dispatch(getSearchProductItems(suggestionValue.trim(),DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0,'',viewName));
            dispatch({
                type : 'SEND_TO_QUAD',
                data : {}
            });

            document.querySelectorAll('#displayContainerDiv')[0].style.display = 'block';
            document.querySelectorAll('.selectBtn')[0].style.display = 'inline-block';

            let selectedTab = document.querySelector('#searchfilterAssets .ReactTabs__Tab--selected').textContent;
            if(selectedTab == 'Saved Search'){
                document.querySelectorAll('#searchfilterAssets .ReactTabs__Tab')[0].click();
            }

        });

    })


},

    onSuggestionsUpdateRequested: ({value}) => {

        //console.log(value);

        localforage.getItem('savedSearch').then(function (searchvalue) {
            // This code runs once the value has been loaded
            // from the offline store.
            let sarr = [];
            if(searchvalue != null){
                (searchvalue).forEach(function (data) {
                    // if(data.nodeRef==window.tdc.libConfig.nodeRef &&
                    // 	data.uName==window.tdc.libConfig.alfuname){
                    sarr.push({term:data.searchterm});
                    //}

                });
            }

            localforage.getItem('last_three_search').then(function (lastthree){
                let searchdata = [];
                //let allAsset = [];
				/*if(lastthree.length >=3){
				 searchdata =  _.takeRight(lastthree,3);
				 }*/

                searchdata =  takeRight(uniqBy(lastthree,'term'),3);
                if(value != ''){
                    dispatch(populateAutoComplete(value,sarr,searchdata));
                }else{
                    //dispatch(updateAllAsset(allAsset['allAsset'],sarr,searchdata));
                    dispatch(updateAllAsset([],sarr,searchdata));

                }

            });

        }).catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
        });



        //console.log(value);
    }

}
}

const SearchCompleteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchComplete)

export default SearchCompleteContainer
