/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * The metadata action makes the api call and passes the data to reducer component
 *
 * @module AssessmentMetadata
 * @file MetadataAction - LinkMetaDataActions Manages the actions .
 * @author 547305
 *
*/
import MetaDataApi from '../api/MetadataAPI'
import * as types from '../constants/MVMConstants'
import MetaDataService from '../../../common/util/metadataService';
import MDSConstants from '../constants/MDSConstants';
import MetadataUtils from '../util/MetadataUtils';
//import assesmentMetaData from 'json!../data/questionMetaData.json';
//import autoCompleteData from 'json!../data/autoCompleteData.json';
/** @function fetchMetaData -
 * This method is used for fetching metadata on onload of the component.
 * @param {object}  metadata - Value of all the attributes of the component.
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
*/
export function  fetchMetaData(metadata){
    return (dispatch, getState) => {
      if(metadata!==undefined && metadata.uuid!==undefined && metadata.uuid!==''){
      let bufferGet;
      let inputMetadataType; 
      if(metadata.metadataType==='AssesmentMetadata'){
         bufferGet = MDSConstants.BUFFER_GET_ASSESMENT;
      }else if(metadata.metadataType==='BankMetadata'){
         bufferGet = MDSConstants.BUFFER_GET_BANK;
      }else if(metadata.metadataType==='QuestionMetadata'){
         bufferGet = MDSConstants.BUFFER_GET_QUESTION;
      }
          inputMetadataType = bufferGet.type;
          bufferGet.data = {'uuid':metadata.uuid};
          bufferGet.libConfig = metadata.libConfig;
          //making service call
          const promise = MetaDataService.send(bufferGet);
          promise.then(function (replyGet) {
            //success handler
            //convert keyword from api to ui format
            if(replyGet && replyGet.keyword){
             replyGet.keywords = MetadataUtils.convert_to_ObjArray(replyGet.keyword);
            }
            if(replyGet && replyGet.timeRequired){
              replyGet = MetadataUtils.getHoursMinsSecsObj(replyGet, replyGet.timeRequired);
            }
            if(replyGet.origjsonld){
              if(replyGet.origjsonld.name){
                metadata.name = replyGet.origjsonld.name.en;
              }
            }
            metadata.eTag = replyGet.eTag;
            metadata.keywords = '';
            metadata  = MetadataUtils.copy(metadata, replyGet);
          if(inputMetadataType === metadata.type){
              dispatch({
                type: 'SET_ON_LOAD_VALUE',
                data:  replyGet.origjsonld
              })
              dispatch({
                type: types.SET_UUID,
                QMD_Data : metadata
              })
          }else{
            dispatch({
              type: types.METADATA_SET_ERROR,
              QMD_Data: {'errMsg':'UUID not matched with Metadata'}
            })
          }
            
            },function (error) {
                //failure handler
            dispatch({
                type: types.METADATA_SET_ERROR,
                QMD_Data: {'errMsg':error}
              });
          }).catch(e => {
            dispatch({
              type: types.METADATA_SET_ERROR,
              QMD_Data: {'errMsg':e.message}
            })
          });
      }else{
        dispatch({
          type: types.METADATA_GET,
          QMD_Data : metadata
        })
      }
    }
}
/** @function fetchMetaDataTaxonomy -
 * This method is used for fetching metadata on onload of the component.
 * Metadata API is used to fetch the question Metadata.
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
*/
export function fetchMetaDataTaxonomy(metadata){
    return dispatch => {
       let bufferGetTaxonomy;
      if(metadata.metadataType==='AssesmentMetadata'){
         bufferGetTaxonomy = MDSConstants.BUFFER_GET_ASSESMENT_TAXONOMY;
      }else if(metadata.metadataType==='BankMetadata'){
         bufferGetTaxonomy = MDSConstants.BUFFER_GET_BANK_TAXONOMY;
      }else if(metadata.metadataType==='QuestionMetadata'){
         bufferGetTaxonomy = MDSConstants.BUFFER_GET_QUESTION_TAXONOMY;
      }
        bufferGetTaxonomy.data = {'taxonomies': 'audience'};
        bufferGetTaxonomy.libConfig = metadata.libConfig;
         const promise = MetaDataService.send(bufferGetTaxonomy);
          promise.then(function (replyGet) {
            let audienceRolesData = MetadataUtils.convert_to_SelectBoxData(replyGet.audience);
            dispatch({
                type: types.SET_UUID,
                QMD_Data : {'audienceRolesData' : audienceRolesData}
               
            })
            },function (error) {
                //failure handler
                dispatch({
                    type: types.METADATA_SET_ERROR,
                     QMD_Data: {'errMsg':error.message}
                })
          }).catch(e => {
                 dispatch({
                     type: types.METADATA_SET_ERROR,
                      QMD_Data: {'errMsg':e.message}
                 })
          });
        bufferGetTaxonomy.data = {'taxonomies': 'difficultylevel'};
         const promiseDifficult = MetaDataService.send(bufferGetTaxonomy);
          promiseDifficult.then(function (replyGet) {
            let difficultyLevelData = MetadataUtils.convert_to_SelectBoxData(replyGet.difficultylevel);
            dispatch({
                type: types.SET_UUID,
                QMD_Data : {'difficultyLevelData' : difficultyLevelData}
               
            })
            },function (error) {
                //failure handler
                dispatch({
                    type: types.METADATA_SET_ERROR,
                     QMD_Data: {'errMsg':error.message}
                })
          }).catch(e => {
                 dispatch({
                     type: types.METADATA_SET_ERROR,
                      QMD_Data: {'errMsg':e.message}
                 })
          });
        bufferGetTaxonomy.data = {'taxonomies': 'domain'};
         const promiseDomain = MetaDataService.send(bufferGetTaxonomy);
          promiseDomain.then(function (replyGet) {
            let disciplineData = MetadataUtils.convert_to_SelectBoxData(replyGet.domain);
            dispatch({
                type: types.SET_UUID,
                QMD_Data : {'disciplineData' : disciplineData}
               
            })
            },function (error) {
                //failure handler
                dispatch({
                    type: types.METADATA_SET_ERROR,
                     QMD_Data: {'errMsg':error.message}
                })
          }).catch(e => {
                 dispatch({
                     type: types.METADATA_SET_ERROR,
                      QMD_Data: {'errMsg':e.message}
                 })
          });
        dispatch(fetchMetaData(metadata));
  }
}
/** @function saveMetaData -
 * This method is used for saving metadata.
 * Metadata Service is used to send the data. This will return a promise
 * @param {object} values - Value of all the attributes of the component.
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
*/
export function  saveMetaData(values){
/*  let nameVal = values.name;
  if(!nameVal.replace(/\s/g, '').length){
       return (dispatch) => {
        dispatch({
              type: types.METADATA_SET_ERROR,
              QMD_Data: {'errMsg':'Name field should contain atleast one character'}
            })
        }
  }else{*/
    return (dispatch, getState) => {
    let buffer;
    if(values){
    if(values.keywords){
        values.keywords = MetadataUtils.convert_to_StringArray(values.keywords);
    }
    if(values.goalKeywords){
        values.goalKeywords = MetadataUtils.convert_to_StringArray(values.goalKeywords);
    }
      values.timeRequired = MetadataUtils.getTimeObj(values);
      const state = getState().Metadatareducers;
       if(values!==undefined && values.uuid!==undefined && values.uuid!==''){
        if(values.metadataType==='AssesmentMetadata'){
           buffer = MDSConstants.BUFFER_ASSESMENT_UPDATE;
           buffer.assType = 'AssessmentInstrument';
        }else if(values.metadataType==='BankMetadata'){
          buffer = MDSConstants.BUFFER_BANK_UPDATE;
          buffer.assType = 'AssessmentInstrument';
        }else if(values.metadataType==='QuestionMetadata'){
          buffer = MDSConstants.BUFFER_QUESTION_UPDATE;
          buffer.assType = 'AssessmentItem';
        }
       if(state[0].onloadValue && state[0].onloadValue.uuid){
          buffer.origjsonld = state[0].onloadValue;
        }
      buffer.data = values;
      buffer.libConfig = state[0].libConfig;
      const promise = MetaDataService.send(buffer);
      promise.then(function (replyCreate) {
          if(values.keywords){
              values.keywords = MetadataUtils.convert_to_ObjArray(values.keywords);
          }
          values.eTag = replyCreate.eTag;
          values.errMsg ='Save Success';
          dispatch({
                type: 'SET_ON_LOAD_VALUE',
                data:  replyCreate.origjsonld
          })
          dispatch({
            type: types.SET_UUID,
            QMD_Data : values
          })
      },function (error) {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':error}
        })
      }).catch(e => {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':e.message}
        })
      });
       }else{
        let buffer;
        if(values.metadataType==='AssesmentMetadata'){
          buffer = MDSConstants.BUFFER_ASSESMENT;
          buffer.assType = 'AssessmentInstrument';
        }else if(values.metadataType==='BankMetadata'){
          buffer = MDSConstants.BUFFER_BANK;
          buffer.assType = 'AssessmentInstrument';
        }else if(values.metadataType==='QuestionMetadata'){
          buffer = MDSConstants.BUFFER_QUESTION;
          buffer.assType = 'AssessmentItem';
        }
      buffer.data = values;
      buffer.libConfig = state[0].libConfig;
      const promise = MetaDataService.send(buffer);
      promise.then(function (replyCreate) {
            values.uuid = replyCreate.uuid;
            values.urn = replyCreate.uuid;
            values.eTag = replyCreate.eTag;
          if(replyCreate.keyword){
              values.keywords = MetadataUtils.convert_to_ObjArray(replyCreate.keyword);
          }
          values.errMsg ='Save Success';
          dispatch({
                type: 'SET_ON_LOAD_VALUE',
                data:  replyCreate.origjsonld
          })
          dispatch({
            type: types.SET_UUID,
            QMD_Data : values
          })
      },function (error) {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':error}
        })
      }).catch(e => {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':e.message}
        })
      });
    }
  }
  }
}

export function  setErrMsg(errMsg){
  return (dispatch) => {
    dispatch({
        type: types.METADATA_SET_ERROR,
        QMD_Data: {'errMsg':errMsg}
    })
  }
}

export function  updateTags(tags,src){ 
  return (dispatch,getState) => {
    let _formState = getState().form;
    if(tags === 'keywords'){
      _formState.mvm.keywords.value = src;  
    }else if(tags === 'goalKeywords'){
      _formState.mvm.goalKeywords.value = src;  
    }
    

    dispatch({
        type: 'UPDATE_TAG',
        Keyword_Data: _formState
    })
  }
}
