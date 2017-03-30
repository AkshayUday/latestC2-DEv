import ProductLinkReducer from '../../PatternProductLink/js/reducers/ProductLinkReducer';
import  {constant} from '../../PatternProductLink/js/constants/productLinkConstants';

import  expect from 'expect';

describe('ProductLink Reducer', () => {
/*it('function  called',() =>{
var spy = expect.createSpy(ProductLinkReducer);
ProductLinkReducer(undefined, {})
expect(spy).toHaveBeenCalled();
spy.restore();
})*/

it('should return the initial state', () => {
    
    //console.log(ProductLinkReducer);
    //console.log(expect(ProductLinkReducer(undefined, {})));

    expect(ProductLinkReducer(undefined, {})).toEqual({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	})
  });


it('should handle UPDATE_ALL_PRODUCT', () => {
  
    expect(ProductLinkReducer({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.UPDATE_ALL_PRODUCT,        
    allproduct: [1]    
  })).toEqual({
	  value: '',
	  allProduct:[1],
	  suggestions: [1],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	})

  

  });



it('should handle LOAD_ALL_PRODUCT_BEGIN', () => {

    expect(ProductLinkReducer({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.LOAD_ALL_PRODUCT_BEGIN,            
    allisLoading:true,
    isError: false,
    errMessage:''    
  })).toEqual({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:true,
	  isError:false,
	  errMessage:''
	})

  });

it('should handle UPDATE_INPUT_VALUE', () => {

    expect(ProductLinkReducer({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.UPDATE_INPUT_VALUE,            
    value:'test',    
  })).toEqual({
	  value: 'test',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	})

  });
  


it('should handle CLEAR_SUGGESTIONS', () => {

    expect(ProductLinkReducer({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.CLEAR_SUGGESTIONS,                
	suggestions: [],
	allProduct: []    
  })).toEqual({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	})

  });



it('should handle LOAD_SUGGESTIONS_BEGIN', () => {

    expect(ProductLinkReducer({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.LOAD_SUGGESTIONS_BEGIN,                
	isLoading: true,	
  })).toEqual({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: true,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	})

  });


it('should handle MAYBE_UPDATE_SUGGESTIONS', () => {

    expect(ProductLinkReducer({
	  value: 'pearson',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.MAYBE_UPDATE_SUGGESTIONS,  
    value:'test'             	
  })).toEqual({
	  value: 'pearson',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	})

      expect(ProductLinkReducer({
	  value: 'pearson',
	  allProduct:[],
	  suggestions: [],
	  isLoading: true,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.MAYBE_UPDATE_SUGGESTIONS,  
    value:'pearson',
    suggestions:[],
    isLoading:false        	
  })).toEqual({
	  value: 'pearson',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	})


  });




it('should handle ERR_ALL_PRODUCT', () => {

    expect(ProductLinkReducer({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:false,
	  errMessage:''
	},{
    type: constant.ERR_ALL_PRODUCT,                
	isError: true,
    errResult: {message:'ERROR'}
  })).toEqual({
	  value: '',
	  allProduct:[],
	  suggestions: [],
	  isLoading: false,
	  allisLoading:false,
	  isError:true,
	  errMessage:'ERROR'
	})

  });

})

