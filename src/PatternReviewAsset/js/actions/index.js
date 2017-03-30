import ReviewAssetMetadataApi from '../api/ReviewAssetMetadataApi';
import * as types from '../constants/ReviewConstants';
import MetaDataService from '../../../common/util/metadataService';

import fileUploadApi from '../../../PatternAddAnAsset/js/api/fileUploadApi';

 
export function  resertAssetMetaData(){
 return (dispatch, getState) => {
	dispatch({
		type: types.RESET_METADATA,
		RMD_Data : []
	})
 }
}

export function  fetchAssetMetaData(metadata,patConfig,libConfig){
    return (dispatch, getState) => {
      if(metadata!==undefined && metadata.uuid!==undefined && metadata.uuid!==''){

           fileUploadApi.get_token().then(function (success){
           	//console.log('Ticket success');           	
           	
		           const ticket = JSON.parse(success.text).data.ticket;

		           const bufferGet = types.BUFFER_GET;
		           //const bufferPatch = types.BUFFER_PATCH;
		           bufferGet.data = {'uuid':metadata.uuid};
		           bufferGet.orig = '';
		           bufferGet.libConfig = metadata.libConfig;
		           
		           //MetaDataService.send(bufferGet);
                    //debugger;

		            const promise = MetaDataService._sendGETJSLD(bufferGet);
		            promise.then(function (replyGet) {  
		             let resMetaData = {};
					 
					 resMetaData.ticket = ticket;
		             resMetaData.orig = replyGet;
		             resMetaData.pafId = replyGet['https://schema.pearson.com/ns/system/pafId'] || patConfig.patSetup.pafId || '';
		             resMetaData.Caption = metadata.caption || '';
		             resMetaData.altText = metadata.altText || '';
		             resMetaData.copyRightInfo = metadata.copyrtInfo || '';
		             resMetaData.filename = replyGet.filename || '';
		             //resMetaData.name = replyGet.name?replyGet.name['en']['value']:replyGet['http://schema.org/name'] || '';
		             resMetaData.name = replyGet.name?replyGet.name['en']:replyGet['http://schema.org/name'] || '';

		             resMetaData.urn = replyGet.urn || '';
		      			 resMetaData.eTag = replyGet.eTag || '';
		      			 resMetaData.id = replyGet.id || '';
		      			 resMetaData.uuid = replyGet.uuid || '';
		             resMetaData.url = replyGet.thumbnail || replyGet['thumbnailUrl'] || '';
		             resMetaData.workExample = replyGet.workExample || '';
		            //resMetaData.diffLevel = replyGet.difficultyLevel || '';
		            resMetaData.diffLevel = replyGet['http://schema.pearson.com/ns/learn/difficultylevel'] || '';
		            resMetaData.alignmentObjective = replyGet['http://schema.pearson.com/ns/learn/alignmentObjective'] || '';
		            resMetaData.ClosedCaption = replyGet['https://schema.pearson.com/ns/content/ClosedCaption'] || '';
		            resMetaData.Transcript = replyGet['https://schema.pearson.com/ns/content/Transcript'] || '';

		             getDiffLevelData(metadata).then(function (data){ 
		                //resMetaData.difficultyLevel = data.difficultylevel;    
		                resMetaData.difficultyLevel = _.chain(data).pick('topConcept').map().flattenDeep().map('prefLabel.en').sortBy().value() || '';             
		                
		                let promise = getManifestation(resMetaData.workExample, metadata);
		                if(promise !== ''){
		                      promise.then(function (manifestRes) { 
		                      resMetaData.format = manifestRes.format; //Manifestation format
		                      resMetaData.filename = manifestRes.filename; // Manifestation filename                      
		                      resMetaData.orig.format = manifestRes.format;
							  resMetaData.orig.filename = manifestRes.filename;
							  resMetaData.url = manifestRes['sameAs'][0] || '';
							  resMetaData.errMsg = '';
							  
							  document.getElementById('loader').style.display = 'none';		
		                      dispatch({
		                        type: types.REVIEW_METADATA,
		                        RMD_Data : resMetaData
		                        })
		                      });
		                  }
		             });
		             },function (error) {
		            			let resMetaData = {};
		            			//resMetaData.filename = 'ERROR_FILENAME';
		            			//resMetaData.name = 'ERROR_NAME';
		            			resMetaData.errMsg = error;
		            			document.getElementById('loader').style.display = 'none';	
		            			dispatch({
		            			type: types.REVIEW_METADATA,
		            			RMD_Data : resMetaData
		            			})
		          }).catch(e => {
		            /*dispatch({
		              type: types.METADATA_SET_ERROR,
		              QMD_Data: {'errMsg':e.message}
		            })*/
		          });


           },function (error){
           	console.log('Ticket error');
			console.log(error);


           })


           


      }else{
       

        /*dispatch({
          type: types.METADATA_GET,
          QMD_Data : metadata
        })*/
		if(metadata!==undefined && metadata.nodeRefManiFest !==undefined){

			fileUploadApi.get_token().then(function (success){
           	//console.log('Ticket success');           	
           	//console.log(success);                                
		           const ticket = JSON.parse(success.text).data.ticket;

		           const bufferGet = types.BUFFER_MANIFEST_GET;
		           //const bufferPatch = types.BUFFER_PATCH;
		           //bufferGet.data = {'uuid':metadata.uuid};
		           bufferGet.data = {'manifestId': metadata.nodeRefManiFest};

		           //bufferGet.orig = '';
		           bufferGet.libConfig = metadata.libConfig;
		           const promise = MetaDataService._sendGETJSLD(bufferGet);

		            promise.then(function (replyManiFestGet) {  
		            	  
		            	    //console.log(replyManiFestGet);

		            	    let resMetaData = {};							 
							resMetaData.ticket = ticket;

							resMetaData.format = replyManiFestGet.format || ''; //Manifestation format
							resMetaData.filename = replyManiFestGet.filename || ''; // Manifestation filename                      
							
							getDiffLevelData(metadata).then((replyDiffLevelGet) => { 
								//console.log(replyDiffLevelGet);
								//resMetaData.difficultyLevel = replyDiffLevelGet.difficultylevel || ''; 
                               resMetaData.difficultyLevel = _.chain(replyDiffLevelGet).pick('topConcept').map().flattenDeep().map('prefLabel.en').sortBy().value() || '';

                                             
                                

                                const bufferGETWork = types.BUFFER_GET;
                                //bufferGETWork.data = {'uuid': _.chain(replyManiFestGet.workurn).split(':').last().value()};
                                bufferGETWork.data = {'uuid': _.chain(replyManiFestGet.exampleOfWork).split(':').last().value()};

                                
                                bufferGETWork.libConfig = metadata.libConfig;
                                
                                MetaDataService._sendGETJSLD(bufferGETWork).then((replyAssetWorktGet) =>{
                                	//console.log(replyAssetWorktGet);
                                    
                                    resMetaData.pafId = replyAssetWorktGet['https://schema.pearson.com/ns/system/pafId'] || patConfig.patSetup.pafId || '';

                                	resMetaData.orig = replyAssetWorktGet || '';
                                	resMetaData.orig.format = resMetaData.format || '';
									resMetaData.orig.filename = resMetaData.filename || '';
				            		
				            		
				            		resMetaData.Caption = metadata.caption || '';
				             		resMetaData.altText = metadata.altText || '';
				                    resMetaData.copyRightInfo = metadata.copyrtInfo || '';
									
									//resMetaData.name = replyAssetWorktGet.name?replyAssetWorktGet.name['en']['value']:replyAssetWorktGet['http://schema.org/name']  || '';
									resMetaData.name = replyAssetWorktGet.name?replyAssetWorktGet.name['en']:replyAssetWorktGet['http://schema.org/name']  || '';

									resMetaData.urn = replyAssetWorktGet.urn || '';
									resMetaData.eTag = replyAssetWorktGet.eTag || '';
									resMetaData.id = replyAssetWorktGet.id || '';
									resMetaData.uuid = replyAssetWorktGet.uuid || '';
									resMetaData.url = replyManiFestGet.sameAs[1] || '';
									resMetaData.workExample = replyAssetWorktGet.workExample || '';
									resMetaData.diffLevel = replyAssetWorktGet['http://schema.pearson.com/ns/learn/difficultylevel'] || '';
									resMetaData.alignmentObjective = replyAssetWorktGet['http://schema.pearson.com/ns/learn/alignmentObjective'] || '';
									resMetaData.ClosedCaption = replyAssetWorktGet['https://schema.pearson.com/ns/content/ClosedCaption'] || '';
		                            resMetaData.Transcript = replyAssetWorktGet['https://schema.pearson.com/ns/content/Transcript'] || '';
                                    resMetaData.errMsg = '';
									document.getElementById('loader').style.display = 'none';									  
									  dispatch({
				                        type: types.REVIEW_METADATA,
				                        RMD_Data : resMetaData
				                        })
				                      });

                                })

							}, function (error) {
		            			let resMetaData = {};
		            			//resMetaData.filename = 'ERROR_FILENAME';
		            			//resMetaData.name = 'ERROR_NAME';		            			
		            			resMetaData.errMsg = error;
		            			document.getElementById('loader').style.display = 'none';	
		            			dispatch({
		            			type: types.REVIEW_METADATA,
		            			RMD_Data : resMetaData
		            			})
		          }).catch(e => {
					  
				  });													


           },function (error){
           	console.log('Ticket error');
			console.log(error);

           })
		}

      }
    }
}

export function getManifestation(workExample, metadata){ 
  let manifestId = '';
  let promise = '';
  if(workExample !== 'undefined'){
    
    /*manifestId = workExample.map(function (workStr){
      let workList = workStr.split(':');
      manifestId = workList[workList.length-1];
      return manifestId;  
   });*/
    if(_.isArray(workExample)){
    	manifestId = _.chain(workExample).first().split(':').last().value(); 	
    }else{
    	manifestId = _.chain(workExample).split(':').last().value(); 	
    }
    
    
    const bufferGet = types.BUFFER_MANIFEST_GET;
    bufferGet.libConfig = metadata.libConfig;
    bufferGet.data = {'manifestId': manifestId};
    bufferGet.orig = '';
    promise = MetaDataService._sendGETJSLD(bufferGet);

  }
  return promise;
}

export function getDiffLevelData(metadata){ 
    const bufferGet = types.BUFFER_TAX_GET;
    bufferGet.libConfig = metadata.libConfig;
    bufferGet.orig = '';
    //debugger;
    return MetaDataService._sendGETJSLD(bufferGet);
}

export function populateReviewForm() {
  return dispatch => {
  
  ReviewAssetMetadataApi.get_RMD_Data().then(function (data){
  	//console.log(data);
  	//console.log(types.REVIEW_METADATA);
  	
    dispatch({
        type: types.REVIEW_METADATA,
        RMD_Data: JSON.parse(data.text),
        success: true
      })
      }, function (error) {
        dispatch({
          type: types.REVIEW_METADATA_ERROR,
          RMD_Data_Err: error.message,
          success: false
        })
      }).catch(e => {
        dispatch({
          type: types.REVIEW_METADATA_ERROR,
          RMD_Data_Err: e.message,
          success: false
        })
      })


}
}

export function saveReviewForm(values,resultMLData,resultLocalC3,patConfig,libConfig) { //debugger;
  return (dispatch,getState) => { //debugger;
    
    document.getElementById('loader').style.display = 'block';

    let _getState = getState().ReviewAssetReducers;
    let _tempState = _getState;
      let _resultMLData   = resultMLData;
      let _values   = values;
       //resultMLData.difficultylevel = 'Easy';
       resultMLData.difficultylevel = _values.diffLevel;
       let bufferUpdate = types.BUFFER_UPDATE;
        bufferUpdate.libConfig = libConfig; 
        bufferUpdate.patConfig = patConfig;
        bufferUpdate.orig = _getState[0].orig;

        bufferUpdate.data = {
            url : _getState[0].url !== '' ? _getState[0].url : '',
            uuid    : _getState[0].uuid !== '' ? _getState[0].uuid : '',
            name : _resultMLData.name !== '' ? _resultMLData.name : '',
            alignmentObjective : _resultMLData.alignmentObjective !== '' ? _resultMLData.alignmentObjective : '',
            difficultyLevel : _resultMLData.difficultylevel !== '' ? _resultMLData.difficultylevel : '',
            alternateName : _resultMLData.nameAltText !== '' ? _resultMLData.nameAltText : '',
            pafId :  _getState[0].pafId !== '' ? _getState[0].pafId : '',
        }

		if(_resultMLData.Transcript != undefined){
			bufferUpdate.data.Transcript = _resultMLData.Transcript;
			_getState[0].Transcript   =   bufferUpdate.data.Transcript;
		}

		if(_resultMLData.ClosedCaption != undefined){
			bufferUpdate.data.ClosedCaption = _resultMLData.ClosedCaption;
			_getState[0].ClosedCaption   =   bufferUpdate.data.ClosedCaption;
		}

		_getState[0].name  = bufferUpdate.data.name;
        _getState[0].altText =   resultLocalC3.altTextCk || '';
        _getState[0].Caption =   resultLocalC3.CaptionCk || '';
        _getState[0].copyRightInfo =   resultLocalC3.copyRightCk || '';        
        _getState[0].alignmentObjective =   bufferUpdate.data.alignmentObjective;
        _getState[0].diffLevel   =   bufferUpdate.data.difficultyLevel;                    	
       
		console.log(bufferUpdate);
        
        let MDResult = MetaDataService._sendJSONLD(bufferUpdate);        
        console.log(JSON.stringify(MDResult));
        
        	

        //_getState[0].errMsg = 'Save Success';
			
			/*debugger;
			dispatch({
			type: types.SAVE_METADATA,
			RMD_Data : _getState[0]
			})*/

          /*dispatch({
              type: types.RESET_METADATA,
              RMD_Data : []
          })*/

       /*
        MetaDataService.send(bufferUpdate).then(function (replyUpdate) { 
            //debugger; 
            //console.log(replyUpdate);
            document.getElementById('loader').style.display = 'none';	
            _getState[0].errMsg = 'Save Success';                      
            //console.log(replyUpdate);
            dispatch({
              type: types.SAVE_METADATA,
              RMD_Data : _getState[0]
            })

          },function (error) { 
            //console.log('inside function error in save');
			document.getElementById('loader').style.display = 'none';	
			_getState[0].errMsg = error;                     	       
	        dispatch({
	          type: types.METADATA_SET_ERROR,
	          QMD_Data:_getState[0]
	        })

          });*/


        //debugger;

	    /*
	    const promise = MetaDataService.send(bufferUpdate);
        promise.then(function (replyUpdate) { 
            //debugger; 
            _getState.errMsg = 'Save Success';                      
            //console.log(replyUpdate);
            dispatch({
              type: types.SAVE_METADATA,
              RMD_Data : _getState
            })

          },function (error) { 
            console.log('inside function error in save');
	        dispatch({
	          type: types.METADATA_SET_ERROR,
	          QMD_Data: {'errMsg':error}
	        })
          }).catch(e => {
	        /*dispatch({
	          type: types.METADATA_SET_ERROR,
	          QMD_Data: {'errMsg':e.message}
	        })*/
        /* });*/

}

}
