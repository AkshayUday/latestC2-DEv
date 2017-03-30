import {last} from 'lodash'
const initilizeData = [{
	listResults : [],
	filterTypeData:[],
    filterTypeValue:[]
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

    default:
    return state
    }
}

export default searchAssetsReducer;
