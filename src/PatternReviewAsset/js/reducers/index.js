import { combineReducers } from 'redux';
import ReviewAssetReducers from './ReviewAssetReducer';
import { reducer as formReducer } from 'redux-form';

const reviewAssetMetaData = combineReducers({
  ReviewAssetReducers,
  form: formReducer
})

export default reviewAssetMetaData
