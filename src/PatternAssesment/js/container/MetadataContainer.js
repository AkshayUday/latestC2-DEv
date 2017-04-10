/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @module AssessmentMetadata
 * @file MetaDataContainer - A container does data fetching and then renders its corresponding sub-component.
 * @author 547305
 */
 import React from 'react';
 import browser from 'detect-browser';
 import os from 'os';
 import osName from 'os-name';
// import Heading from '../../../common/components/Heading';
 import MVMComponent from '../components/MVM/MVM';
 import {fetchMetaDataTaxonomy, saveMetaData, setErrMsg, updateTags} from '../action/MetadataAction';
 import { connect } from 'react-redux'
 import * as types from '../constants/MVMConstants';
 import MetadataUtils from '../util/MetadataUtils';
 import bean from 'bean';


/**@function getSelectedValues -
 * This method is used to get the selected values by user.
 * @param {object} dataArray - Array containing values selected by user
 * @returns {string} - If array length is greater than 0 , it will return last element of that array
 * @returns {object} array - else it will return empty array object
*/
const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
  return [];
}
/**@function mapStateToProps -
 * Connects a React component to a Redux store.
 * Whenenver redux store gets updated, this method will get called.
 * This method transform the current application state into the
 * props you want to pass to a presentational component
 * @param {object} state
 * @returns {object} Object
*/
const mapStateToProps = (state, ownProps) => {

bean.fire(ownProps.patConfig, ownProps.patConfig.resultsEventId,state.form.mvm);

    const metadata = getSelectedValues(state.Metadatareducers);
    let patConfig = {};
    if(ownProps && ownProps.patConfig && ownProps.patConfig.patSetup){
      patConfig = ownProps.patConfig;
    }

  /*  let  product;
         if(state.autoComplete.length > 1){
        product = state.autoComplete[state.autoComplete.length-1].text;
     }
     else{
      product = metadata.product;
     }*/

     let errMsg;
     if(metadata.errMsg){
      errMsg = metadata.errMsg;
     }


      const initialValue = {
        uuid : metadata.uuid,
        filename : metadata.filename,
        metadataType: metadata.metadataType,
        name : metadata.name,
        urn : metadata.urn,
        planId: metadata.planId,
        isbn: metadata.isbn,
        modNo: metadata.modNo,
        chapNo: metadata.chapNo,
        author: metadata.author,
        contentType : metadata.contentType,
        audience :  metadata.audience,
        difficultyLevel :metadata.difficultyLevel,
        knowledgeLevel : metadata.knowledgeLevel,
        publisher : metadata.publisher,
        discipline : metadata.discipline,
        goalAlignment : metadata.goalAlignment,
        objAlign : metadata.objAlign,
        timeReq : metadata.timeReq,
        desc : metadata.desc,
        keywords: metadata.keywords,
        prodKeywords: metadata.prodKeywords,
        goalKeywords: metadata.goalKeywords,
         hours: metadata.hours,
         mins: metadata.mins,
         secs: metadata.secs,
          patConfig:patConfig,
         copyrightInfo: metadata.copyrightInfo,
          errMsg: errMsg,
          eTag: metadata.eTag
      }
      return {
          prodSuggestions: metadata.prodSuggestions,
          contentTypeData : metadata.contentTypeData,
          audienceRolesData : metadata.audienceRolesData,
          difficultyLevelData : metadata.difficultyLevelData,
          knowledgeLevelData : metadata.knowledgeLevelData,
          alignmentTypeData : metadata.alignmentTypeData,
          disciplineData : metadata.disciplineData,
          goalAlignmentData : metadata.goalAlignmentData,
          languages : metadata.languages,
          errMsg: errMsg,
          eTag: metadata.eTag,
          uuid : metadata.uuid,
          filename : metadata.filename,
          name : metadata.name,
          urn : metadata.urn,
          metadataType: metadata.metadataType,
          planId: metadata.planId,
          isbn: metadata.isbn,
          modNo: metadata.modNo,
          chapNo: metadata.chapNo,
          author: metadata.author,
          contentType : metadata.contentType,
          audience :  metadata.audience,
          difficultyLevel :metadata.difficultyLevel,
          knowledgeLevel : metadata.knowledgeLevel,
          publisher : metadata.publisher,
          discipline : metadata.discipline,
          goalAlignment : metadata.goalAlignment,
          objAlign : metadata.objAlign,
          timeReq : metadata.timeReq,
          desc : metadata.desc,
          keywords: metadata.keywords,
          prodKeywords: metadata.prodKeywords,
          goalKeywords: metadata.goalKeywords,
          hours: metadata.hours,
          mins: metadata.mins,
          secs: metadata.secs,
          patConfig:patConfig,
          copyrightInfo: metadata.copyrightInfo,
          'initialValues': initialValue
    }
  //}
}
/**@function mapDispatchToProps
 * Connects a React component to a Redux store.
 * This method receives the dispatch() method and returns callback props that needs to be
 * injected into the presentational component
 * @param {function} dispatch
 * @returns {object} callback props
*/
const mapDispatchToProps = (dispatch, ownProps) => {
  let metadata = {};

  if(ownProps && ownProps.patConfig && ownProps.patConfig.patSetup){
     metadata  = MetadataUtils.copy(ownProps.patConfig.patSetup, metadata);
  }

  if(ownProps && ownProps.libConfig){
    if(ownProps.patConfig.patSetup.env==='production'){
      delete ownProps.libConfig.headers['X-Roles-Test']; 
    }
    metadata.libConfig = ownProps.libConfig;
  }

  return {
    componentWillMount(){
      dispatch(fetchMetaDataTaxonomy(metadata))
    },
    onSave(values, dispatch){
      const data = values;
          if(data.audience == 'Choose audience role'){
        data.audience =undefined;
      }
      if(data.difficultyLevel == 'Choose difficulty level'){
        data.difficultyLevel =undefined;
      }
      if(data.discipline == 'Choose one or more disciplines'){
        data.discipline =undefined;
      }
      dispatch(saveMetaData(data));
    },
    onSubmit(data){
      if(data.audience == 'Choose audience role'){
        data.audience =undefined;
      }
      if(data.difficultyLevel == 'Choose difficulty level'){
        data.difficultyLevel =undefined;
      }
      if(data.discipline == 'Choose one or more disciplines'){
        data.discipline =undefined;
      }
      dispatch(saveMetaData(data));
    },
    setErrMsg(errMsg){
      dispatch(setErrMsg(errMsg));
    },
     handleChange(tags,src){ 
      dispatch(updateTags(tags,src));
    }
  }
}

const MetadataContainerConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
  )(MVMComponent)

  export default MetadataContainerConnect;
