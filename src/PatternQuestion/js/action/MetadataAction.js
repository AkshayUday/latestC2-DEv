/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * The metadata action makes the api call and passes the data to reducer component
 *
 * @module QuestionMetadata
 * @file MetadataAction- LinkMetaDataActions Manages the actions .
 * @author 547305
 *
*/
import MetaDataApi from '../api/MetadataAPI'
import * as types from '../constants/MVMConstants'
import MetaDataService from '../../../common/util/metadataService';
import MDSConstants from '../constants/MDSConstants';
import MetadataUtils from '../util/MetadataUtils';
import questionMetaData from '../data/questionMetaData.json';
import autoCompleteData from '../data/autoCompleteData.json';

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
      const bufferGet = MDSConstants.BUFFER_GET;
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
            if(replyGet && replyGet.goalKeywords){
             replyGet.goalKeywords = MetadataUtils.convert_to_ObjArray(replyGet.goalKeywords);
            }
            if(replyGet && replyGet.prodKeywords){
             replyGet.prodKeywords = MetadataUtils.convert_to_ObjArray(replyGet.prodKeywords);
            }
            if(replyGet && replyGet.timeRequired){
              replyGet = MetadataUtils.getHoursMinsSecsObj(replyGet, replyGet.timeRequired)
            }
            if(replyGet.origjsonld){
              if(replyGet.origjsonld.name){
                metadata.name = replyGet.origjsonld.name.en;
              }
            }
            metadata.eTag = replyGet.eTag;
            metadata.keywords = '';
            metadata  = MetadataUtils.copy(metadata, replyGet);
            dispatch({
                type: 'SET_ON_LOAD_VALUE',
                data:  replyGet.origjsonld
              })
              dispatch({
                type: types.SET_UUID,
                QMD_Data : metadata
              })
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
/*export function  fetchMetaDataTaxonomy(metadata){
    return dispatch => {
     // MetaDataApi.get_QMD_Data().then( function (data){
      //  let taxonomyValue = JSON.parse(data.text);
      dispatch(fetchMetaData(metadata));

      let taxonomyValue = questionMetaData;
      taxonomyValue = MetadataUtils.copy(metadata, taxonomyValue);
        dispatch({
            type: types.SET_UUID,
            QMD_Data : taxonomyValue
        })

      /*}, function (error) {
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
  }
}*/
export function fetchMetaDataTaxonomy(metadata){
    return dispatch => {
      //MetaDataApi.get_QMD_Data().then( function (data){
        const bufferGetTaxonomy = MDSConstants.BUFFER_GET_TAXONOMY;
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
        //const bufferGetTaxonomy = MDSConstants.BUFFER_GET_TAXONOMY;
        bufferGetTaxonomy.data = {'taxonomies': 'difficultylevel'};
       // bufferGetTaxonomy.libConfig = metadata.libConfig;
         const promiseDifficult = MetaDataService.send(bufferGetTaxonomy);
          promiseDifficult.then(function (replyGet) {
            console.log('replyGet : '+replyGet);
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
        //const bufferGetTaxonomy = MDSConstants.BUFFER_GET_TAXONOMY;
        bufferGetTaxonomy.data = {'taxonomies': 'domain'};
        //bufferGetTaxonomy.libConfig = metadata.libConfig;
         const promiseDomain = MetaDataService.send(bufferGetTaxonomy);
          promiseDomain.then(function (replyGet) {
            console.log('replyGet : '+replyGet);
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
       /* let taxonomyValue = assesmentMetaData;
        taxonomyValue = MetadataUtils.copy(metadata, taxonomyValue);
        dispatch({
            type: types.SET_UUID,
            QMD_Data : taxonomyValue
        })*/

      /*}, function (error) {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':error.message}
        })
      }).catch(e => {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':e.message}
        })
      });*/
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
 /* let nameVal = values.name;
  if(!nameVal.replace(/\s/g, '').length){
       return (dispatch) => {
        dispatch({
              type: types.METADATA_SET_ERROR,
              QMD_Data: {'errMsg':'Name field should contain atleast one character'}
            })
        }
  }else{*/
    return (dispatch, getState) => {
    if(values){
      if(values.keywords){
          values.keywords = MetadataUtils.convert_to_StringArray(values.keywords)
      }
      if(values.goalKeywords){
        values.goalKeywords = MetadataUtils.convert_to_StringArray(values.goalKeywords);
      }
      values.timeRequired = MetadataUtils.getTimeObj(values);
      const state = getState().Metadatareducers;
      if(values!==undefined && values.uuid!==undefined && values.uuid!==''){
      const buffer = MDSConstants.BUFFER_UPDATE;
      if(state[0].onloadValue && state[0].onloadValue.uuid){
        buffer.origjsonld = state[0].onloadValue;
      }
      buffer.data = values;
      buffer.assType = 'AssessmentItem';
      buffer.libConfig = state[0].libConfig;
      const promise = MetaDataService.send(buffer);
      promise.then(function (replyCreate) {
         if(values.keywords){
              values.keywords = MetadataUtils.convert_to_ObjArray(values.keywords);
          }
          if(values.goalKeywords){
            values.goalKeywords = MetadataUtils.convert_to_ObjArray(values.goalKeywords);
          }
            /*values.uuid = replyCreate.uuid;
            values.urn = replyCreate.uuid;

          if(replyCreate.keywords){
              values.keywords = MetadataUtils.convert_to_ObjArray(replyCreate.keywords);
          }
          if(replyCreate.goalKeywords){
            values.goalKeywords = MetadataUtils.convert_to_StringArray(replyCreate.goalKeywords)
          }
          if(replyCreate.prodKeywords){
            values.prodKeywords = MetadataUtils.convert_to_StringArray(replyCreate.prodKeywords)
          }*/
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
      const buffer = MDSConstants.BUFFER;
      buffer.assType = 'AssessmentItem';
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
            if(values.goalKeywords){
              values.goalKeywords = MetadataUtils.convert_to_ObjArray(values.goalKeywords);
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
//}
}
/**  @function populateAutoComplete -
 * This method is used for populating suggestions for autocomplete
 * MetadataApi is used to get autocomplete data.
 * @param {string} text - Whatever user enters.
 * @returns {function}
 * The object mimicking the metadata object, but with every action wrapped into the 'dispatch' call.
 * This action creator returns a function.
*/
export function populateAutoComplete(text) {
    return dispatch => {
    //  MetaDataApi.get_AutoComplete_Data(text).then( function (data){
        dispatch({
          type: types.AUTO_COMPLETE,
          data: autoCompleteData,
          text
        });
     /* },function (error) {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':error.message}
        })
      }).catch(e => {
        dispatch({
          type: types.METADATA_SET_ERROR,
          QMD_Data: {'errMsg':e.message}
        })
      });*/
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
    // let _metaDataState = getState().Metadatareducers;
    let _formState = getState().form;
    /*let metaObj;
    for(let formIndex in _metaDataState){
      metaObj = _metaDataState[formIndex];
      metaObj.keywords = tags;
      _metaDataState[formIndex] = metaObj;
    }*/
    if(tags === 'keywords'){
      _formState.mvm.keywords.value = src;  
    }else if(tags === 'goalKeywords'){
      _formState.mvm.goalKeywords.value = src;  
    }else if(tags === 'adaptiveFlag'){
      _formState.mvm.adaptiveFlag.value = src;
    }
    

    dispatch({
        type: 'UPDATE_TAG',
        Keyword_Data: _formState
    })
  }
}
