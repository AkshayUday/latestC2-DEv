import {last} from 'lodash'
const initilizeData = [{
	listResults : [],
	filterTypeData:[],
  filterTypeValue:[],
  error : '',
  recentSearchData:[],
  savedSearchData:[],
  autoSuggestData: [],
  errorMsg:'',
  localForData: {}
}
]

const searchAssetsReducer = (state = initilizeData, action) => {
	let _last = last(state);
 
  switch(action.type) {
    case 'GET_SEARCH_RESULT':
      return  [
          ...state, {..._last, listResults: action.value}
      ]
    break;

    case 'FILTER_TYPE_DATA':   
    	return  [...state, {..._last, filterTypeData : action.value}];
    
    case 'FILTER_TYPE_VALUE':
    return [...state, {..._last, filterTypeValue : action.value}];

    case 'ERROR':
    return [...state, {..._last, error : action.value}];

    case 'GET_RECENT_SR_RESULT':
    return [...state, {..._last, recentSearchData : action.value}];

    case 'GET_SUG_DATA':
    return [...state, {..._last, autoSuggestData : action.value}];

    case 'GET_SAVED_SR_RESULT':
    return [...state, {..._last, savedSearchData : action.value}];

    case 'GET_LOCAL_FORAGE_DATA':   
    return [...state, {..._last, localForData : action.value}];

    case 'EXCEPTION_OCCURED':
    return [...state, {..._last, errorMsg: action.value}];

    default:
    return state
    }
}

export default searchAssetsReducer;
