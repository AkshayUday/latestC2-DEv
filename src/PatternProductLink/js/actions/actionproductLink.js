
import {constant} from '../constants/productLinkConstants';

export function updateInputValue(value) {
  return {
    type: constant.UPDATE_INPUT_VALUE,
    value
  };
}

export function clearSuggestions() {
  return {
    type: constant.CLEAR_SUGGESTIONS
  };
}

export function loadSuggestionsBegin() {
  return {
    type: constant.LOAD_SUGGESTIONS_BEGIN
  };
}

export function maybeUpdateSuggestions(suggestions, {value}) {
  return {
    type: constant.MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value
  };
}

export function updateAllProduct(allproduct) {
  return {
    type: constant.UPDATE_ALL_PRODUCT,
    allproduct,
  };
}


export function loadAllProductBegin() {
  return {
    type: constant.LOAD_ALL_PRODUCT_BEGIN    
  };
}

export function errorAllProduct(errResult) {  
  return {
    type: constant.ERR_ALL_PRODUCT,
    errResult    
  };
}



