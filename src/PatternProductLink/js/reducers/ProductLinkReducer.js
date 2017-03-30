/* ------------------- */
/*    Redux reducer    */
/* ------------------- */
import {constant} from '../constants/productLinkConstants';

/*const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';
*/
const initialState = {
  value: '',
  allProduct:[],
  suggestions: [],
  isLoading: false,
  allisLoading:false,
  isError:false,
  errMessage:''
};

const  ProductLinkReducer = (state = initialState, action = {}) => {
  

  switch (action.type) {
   case constant.UPDATE_ALL_PRODUCT:    
    return {
      ...state,
      allProduct: action.allproduct,
      suggestions: action.allproduct,
      allisLoading: false
    };

    case constant.LOAD_ALL_PRODUCT_BEGIN:
    return {
      ...state,
      allisLoading: true,
      isError:false,
      errMessage:''
    };


    case constant.UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value
      };

    case constant.CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
        //allProduct:[],
      };

    case constant.LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case constant.MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false
      };
     case constant.ERR_ALL_PRODUCT:
      return {
        ...state,
        isError: true,
        errMessage:action.errResult.message,
      };

    default:
      return state;
  }
}

export default ProductLinkReducer;
