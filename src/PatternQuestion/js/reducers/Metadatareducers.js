/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module QuestionMetadata
 * @file Metadatareducer -  The metadata reducer is a function that takes two parameters 
 (state and action)and return updated state.
 * @author 547305
 *
*/
import { METADATA_GET, SAVE_METADATA } from '../constants/MVMConstants'
import Immutable from 'immutable'

const initilizeValues = [{
  uuid : '' ,
  filename:'',
  name:'',
  urn:'',
  objAlign:'' ,
  publisher:'',
  planId: '',
  modNo:'',
  chapNo:'',
  author:'',
  hours: '',
  mins: '',
  secs: '',
  copyrightInfo: '',
  contentTypeData: [],
  audienceRolesData: [],
  difficultyLevelData: [],
  knowledgeLevelData: [],
  alignmentTypeData: [],
  disciplineData: [],
  goalAlignmentData: [],
  languages: [],
  timeReq:'' ,
  isbn: '',
  desc:'',
  keywords: [],
  prodKeywords: [],
  goalKeywords: [],
  adaptiveFlag: false,
  //product:'',
  eTag:'',
  errMsg:'',
  metadataType: '',
  onloadValue:{}
}]
/**@function Metadatareducers
 * This metadata reducers is used to switch between actions METADATA_GET,SAVE_METADATA & SET_UUID
 * Whenever dispatch call is made with action as an argument, reducer will catch 
 this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge 
 current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const Metadatareducers = (state = initilizeValues, action)=>{
  switch(action.type) {
    case 'METADATA_SET_ERROR':
    case 'METADATA_GET':
    if(state!==undefined && state[0]!==undefined){
      return[
         Immutable.fromJS(state[0]).merge(Immutable.Map(action.QMD_Data)).toJS()
       ]
    }else{
      return[
        Immutable.fromJS(initilizeValues).merge(Immutable.Map(action.QMD_Data)).toJS()
      ]
    }
    case 'SAVE_METADATA':
    if(state!==undefined && state[0]!==undefined){
      return[
        Immutable.fromJS(state[0]).merge(Immutable.Map(action.values)).toJS()
      ]
    }else{
      return[
        Immutable.fromJS(initilizeValues).merge(Immutable.Map(action.values)).toJS()
      ]
    }
    case 'SET_ON_LOAD_VALUE':
        let onloadValue = Immutable.fromJS(state[0].onloadValue).merge(action.data).toJS();
        return[
          Immutable.fromJS(state[0]).merge({'onloadValue':onloadValue}).toJS()
      ]
    case 'SET_UUID':
      return[
        Immutable.fromJS(state[0]).merge(action.QMD_Data).toJS()
      ]
    case 'UPDATE_TAG':
      return[
        Immutable.fromJS(state[0]).merge(action.Keyword_Data).toJS()
      ]
    default:
    return state
    }
  }
  export default Metadatareducers;



