import { connect } from 'react-redux';
import { fetchAssetMetaData, populateReviewForm, saveReviewForm, resertAssetMetaData } from '../actions';
import ReviewAssetMetadata from '../components/ReviewAssetMetadata'; 
import MetadataUtils from '../util/MetadataUtils';
import {getCurrentValues} from '../../../PatternAddAnAsset/js/utils/util';
import bean from 'bean';

const getSelectedValues = (dataArray) => {
  if (dataArray !== undefined && dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }

  return [];
}

const mapStateToProps = (state,ownProps) => {
    if(state.form.ReviewAssetMetadata != undefined){
    let _formData = Object.create(Object.prototype);               
	let _props = _.cloneDeep(state.form.ReviewAssetMetadata);
	
	_formData['name'] = _props.name = CKEDITOR.instances['nameCk'].getData();
	_formData['Caption'] = _props.Caption = CKEDITOR.instances['CaptionCk'].getData();
	_formData['altText'] = _props.altText = CKEDITOR.instances['altTextCk'].getData();
	_formData['copyRightInfo'] = _props.copyRightInfo = CKEDITOR.instances['copyRightCk'].getData();

	if(CKEDITOR.instances['TranscriptCk']){ 
	_formData['Transcript'] = _props.Transcript = CKEDITOR.instances['TranscriptCk'].getData();
	}
	if(CKEDITOR.instances['ClosedCaptionCk']){ 
	_formData['ClosedCaption'] = _props.ClosedCaption = CKEDITOR.instances['ClosedCaptionCk'].getData();
	} 
    
	for(let val in _props){ 		
	    if(typeof(_props[val]) == 'object' && val != 'contextSpecificAltText' && val !== 'ContentType'
	    	&& val != 'nameAltText' && val !='pafId' && val!= 'difficultyLevel'){ 	
			_formData[val] = _props[val]['value'];
		}            	
	}
	//bean.fire(ownProps.patConfig, ownProps.patConfig.resultsEventId,_formData);
	
    }
	
  //console.log(state.form.ReviewAssetMetadata);  
  //bean.fire(ownProps.patConfig, ownProps.patConfig.resultsEventId,state.form.ReviewAssetMetadata);
  

  const data = getSelectedValues(state.ReviewAssetReducers); 
  let quadData = getCurrentValues(state.quad)
  return {    
    errMsg: data.errMsg,
    mimetype:data.mimetype,
    url:data.url,
    uuid:data.uuid,
    ContentType:data.ContentType,
    name:data.name,
    filename:data.filename,
    altText:data.altText,
    Caption:data.Caption,
    copyRightInfo:data.copyRightInfo,
    Transcript:data.Transcript,
    ClosedCaption:data.ClosedCaption,
    pafId:ownProps.patConfig.patSetup.pafId,
    difficultyLevel:data.difficultyLevel,
    alignmentObjective:data.alignmentObjective,
    nodeRef:data.nodeRef,
    mimetype:data.format,
    path:data.path,
    assetData : quadData,
    thumbnail:data.thumbnailUrl,
    diffLevel:data.diffLevel,
    contextSpecificAltText:'',
 	nameAltText:'',
 	ticket:data.ticket,
    'initialValues': {    										    				    				    				    				    
				    alignmentObjective: data.alignmentObjective,	
				    nameAltText: data.nameAltText,			
				    contextSpecificAltText:'',				    
				    filename:data.filename,
				    ContentType: (data.format == '' ||  data.format == undefined)?'':
                         _.upperFirst(data.format.split('/')[0]),
				    pafId:ownProps.patConfig.patSetup.pafId,
				    difficultyLevel:'',
				    diffLevel:data.diffLevel
				  }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	let resultObj = {		
			'uuid' : 'd6f77c93-704a-4109-8391-d6e13e290f96',
	}

	let metadata = {};
	
	if(ownProps && ownProps.patConfig){
		metadata.patConfig  = ownProps.patConfig;
		if(ownProps.patConfig.patSetup){ // getting UUID from external input - QUAD
			metadata.uuid = ownProps.patConfig.patSetup.uuid;
			metadata.caption = ownProps.patConfig.patSetup.caption;
			metadata.altText = ownProps.patConfig.patSetup.altText;
			metadata.copyrtInfo = ownProps.patConfig.patSetup.copyrtInfo;

		}
	}

	 if(ownProps && ownProps.libConfig){
      metadata.libConfig = ownProps.libConfig;
     }
    if(metadata.uuid === '')
    	metadata.uuid = this.props.assetData.uuid;
    
    
    if(metadata.uuid == undefined && ownProps.patConfig.pattern != 'ReviewAsset'){ 
       metadata.nodeRefManiFest = dispatch((() => { return (dispatch,getState) => {
     		   return  _.chain(getState().quad.last().nodeRef).split('/').last().value();							
	 			} 
	 		}
 		)());       
    }

    
   
   return {

    componentWillMount() { 
		dispatch(fetchAssetMetaData(metadata,ownProps.patConfig,ownProps.libConfig));
    },

    onSave(values, dispatch, ownProps){ 
     let resultMLData  = values;          
     let resultLocalC3 = {};

     if(values.ContentType == 'Audio' ||  values.ContentType == 'Video'){
       resultMLData.Transcript = CKEDITOR.instances['TranscriptCk'].getData();
       resultMLData.ClosedCaption = CKEDITOR.instances['ClosedCaptionCk'].getData();     	
     }
     resultLocalC3.altTextCk = CKEDITOR.instances['altTextCk'].getData();
     resultLocalC3.CaptionCk = CKEDITOR.instances['CaptionCk'].getData();
     resultLocalC3.copyRightCk = CKEDITOR.instances['copyRightCk'].getData();
     resultMLData.name = CKEDITOR.instances['nameCk'].getData();
     dispatch(saveReviewForm(values,resultMLData,resultLocalC3,ownProps.patConfig,ownProps.libConfig));
    },

    OnCancel(){
      dispatch(resertAssetMetaData());      
    }
  }
}

const ReviewAssetMetaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAssetMetadata);

export default ReviewAssetMetaContainer;
