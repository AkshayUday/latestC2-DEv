/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * @module AssessmentMetadata
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

 * @author 547305
 *
*/
import { combineReducers } from 'redux'
import Metadatareducers from './Metadatareducers'
import {reducer as formReducer} from 'redux-form';
import autoComplete from './autoCompleteReducer'

const rootMetaData = combineReducers({
	Metadatareducers,
	autoComplete,
	form: formReducer
});

export default rootMetaData
