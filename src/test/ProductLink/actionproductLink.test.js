import  {constant} from '../../PatternProductLink/js/constants/productLinkConstants';
import * as actions  from '../../PatternProductLink/js/actions/actionproductLink';

import  expect from 'expect';

describe('ProductLink Actions', () => {
  it('should create an action updateInputValue', () => {
    const value = 'Test'
    const expectedAction = {
      type: constant.UPDATE_INPUT_VALUE,
      value
    }
    expect(actions.updateInputValue(value)).toEqual(expectedAction);
  })

  it('should create an action clearSuggestions', () => {
    const expectedAction = {
      type: constant.CLEAR_SUGGESTIONS,
    }
    expect(actions.clearSuggestions()).toEqual(expectedAction);
  })

  it('should create an action loadSuggestionsBegin', () => {
    
    const expectedAction = {
      type: constant.LOAD_SUGGESTIONS_BEGIN,
    }
    expect(actions.loadSuggestionsBegin()).toEqual(expectedAction);
  })

	it('should create an action maybeUpdateSuggestions', () => {
      const suggestions = [];
       const value = 'Test';
	   const expectedAction = {
		  type: constant.MAYBE_UPDATE_SUGGESTIONS,
		   suggestions,
	       value
		}
	expect(actions.maybeUpdateSuggestions(suggestions,{value})).toEqual(expectedAction);
	})

	it('should create an action updateAllProduct', () => {
       const allproduct = [];      
	   const expectedAction = {
		  type: constant.UPDATE_ALL_PRODUCT,
		  allproduct	       
		}
	expect(actions.updateAllProduct(allproduct)).toEqual(expectedAction);
	})
  

  it('should create an action loadAllProductBegin', () => {
       
	   const expectedAction = {
		  type: constant.LOAD_ALL_PRODUCT_BEGIN,		 
		}
	expect(actions.loadAllProductBegin()).toEqual(expectedAction);
	})


  it('should create an action errorAllProduct', () => {
     const errResult = {message:'failure'};  
     const expectedAction = {
      type: constant.ERR_ALL_PRODUCT,   
       errResult  
    }
    expect(actions.errorAllProduct(errResult)).toEqual(expectedAction);
  })


})