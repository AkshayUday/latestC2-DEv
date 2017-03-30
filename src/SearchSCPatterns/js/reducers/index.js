import { combineReducers } from 'redux';
import SearchAssetsReducer from './SearchAssetsReducer';
import SpinnerReducer from '../../../common/components/spinner/SpinnerReducer';


const interactivePatterns = combineReducers({
  SearchAssetsReducer,
  SpinnerReducer
})

// export default interactivePatterns

const rootMetaData = (state,action) => {
	if(action.type === 'INIT_APP'){
		state = undefined;
	}
	return interactivePatterns(state,action);
}


export default rootMetaData;
