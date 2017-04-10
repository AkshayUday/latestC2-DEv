/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module QuestionMetadata
 * @file index - Store uses Thunk middleware which is used when your
  actions need to have a side effect other than updating the application state.
 * @author 547305
 *
*/
import { createStore, applyMiddleware, compose  } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reducer from '../reducers'


const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

export default store;


