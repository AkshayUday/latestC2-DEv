import * as types from '../constants/ReviewConstants';
import Immutable from 'immutable';
const initilizeValues = [{	
	altText: '',   // Local(C3) 
	Caption: '',   // Local(C3)
	copyRightInfo: '', // Local(C3)
	Transcript: '',  // MDS = Transcript
	ClosedCaption: '',	 // MDS = ClosedCaption 	
	ContentType: '', // type - MDS = ContentType
	name:'', 		//  name - MDS = name 
	filename: '', 	// filename - MDS = filename	
	pafId: '', 		// pafId - MDS = pafId //
	difficultyLevel: '', 	// difficultyLevel - MDS = difficultyLevel
	alignmentObjective : '', // enableObj - MDS = alignmentObjective
	uuid: '',  
	errMsg: '',
	nodeRef: '',
	mimetype: '',
	path: '',
	url: '',
	eTag: '',
	urn: '',
	thumbnail:'',
	diffLevel:'',
	/*imageurl:'',
	videourl:'',
	audiourl:'',*/
	id:'',
	format:'',
	ticket:'',
}]




const ReviewAssetReducer = (state = initilizeValues, action) => { 
let newState = {};
let retRevData = {};
let retSavedata = {};
/*try {*/
  switch (action.type) {
    case types.REVIEW_METADATA:
    if (!state && !state[0]) {
      newState = [
          Immutable.fromJS(state[0]).merge(Immutable.Map(action.RMD_Data)).toJS()
      ]
    }else{
    newState = [Immutable.fromJS(state[0]).merge(Immutable.Map(action.RMD_Data)).toJS()]
  }
  return newState;
  //break;
  case types.SAVE_METADATA:
  if (!state && !state[0]) {
      newState = [
        Immutable.fromJS(state[0]).merge(Immutable.Map(action.RMD_Data)).toJS()
      ]
    }else{
  newState = [
    Immutable.fromJS({}).merge(Immutable.Map(action.RMD_Data)).toJS()
    ]
   }
  return newState;
  //break;

  case types.RESET_METADATA:

  if (!state && !state[0]) {
      newState = [
        Immutable.fromJS(state[0]).merge(Immutable.Map(initilizeValues[0])).toJS()
      ]     

    }else{      

  newState = [
    Immutable.fromJS({}).merge(Immutable.Map(initilizeValues[0])).toJS()
    ]
   
   //console.log('newState');
   //console.log(newState);

   }
  return newState;
  //break;

  case types.REVIEW_METADATA_ERROR:
    retRevData = Object.assign({}, state[0], {
            errMsg: action.RMD_Data_Err
          });
    newState = [retRevData];
    return newState;
    //break;
  case types.SAVE_METADATA_ERROR:
      retSavedata = Object.assign({}, state[0], {
            errMsg: action.RMD_Data_Err
          });
    newState = [retSavedata];
    return newState;
    //break;
  default:
      newState = state;
      return newState;
    //break;
  }

/*}catch (e){
  console.error('error',e);
}*/


}

export default ReviewAssetReducer;
