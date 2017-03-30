/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * @module MediaAssets
 * @file index - Combined Reducers. -
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 * One handy way to obtain
 * It is to use ES6 `import * syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 * @author TDC
 *
 */

import { combineReducers } from 'redux'
import fileUpload from './fileUpload'
import {reducer as formReducer} from 'redux-form';
import CheckJobStatusReducers from './CheckJobStatusReducers';
import assets from './assets';
import searchAssets from './searchAssets';
import quad from './quad';
import { routerReducer } from 'react-router-redux'
import TreePaneReducers from './TreePaneReducer';
import siteDataReducer from './siteDataReducer';
import autoCompleteReducer from './autoCompleteReducer';
import searchLibraryReducer from './searchLibraryReducer';
import savedSearchReducers from './savedSearchReducers';
import SingleFileFolderReducer from './SingleFileFolderReducer';
import difficultyLevelReducer from './difficultyLevelReducer';
import ReviewAssetReducers from '../../../PatternReviewAsset/js/reducers/ReviewAssetReducer';
import SpinnerReducer from '../../../common/components/spinner/SpinnerReducer';
import userFilterReducer  from './userFilterReducer';

const appMetaData = combineReducers({
	form: formReducer,
	routing: routerReducer,
	CheckJobStatusReducers,
    assets,
    searchAssets,
    quad,
	fileUpload,
	TreePaneReducers,
	SingleFileFolderReducer,
	autoComplete:autoCompleteReducer,
	searchLibraryReducer,
	savedSearchReducers,
	difficultyLevelReducer,
	ReviewAssetReducers,
	siteDataReducer,
	SpinnerReducer,
	userFilterReducer
});

/**
* This method is used to assign a initial state to all reducers
* state is not mutate instead we just assign reference to it	
**/
const rootMetaData = (state,action) => {
	if(action.type === 'INIT_APP'){
		state = undefined;
	}
	return appMetaData(state,action);
}


export default rootMetaData
