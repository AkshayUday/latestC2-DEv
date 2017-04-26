
import Immutable from 'immutable';

let initilizeValues = Immutable.List.of([{}]);


const imgPreviewReducer = (state = initilizeValues, action)=>{

  switch(action.type) {
    case 'IMAGE_PREVIEW_LAUNCH':
      return [
        ...state, action.data
      ];
    break;
    default:
      return state
    }
  }

  module.exports = imgPreviewReducer;
