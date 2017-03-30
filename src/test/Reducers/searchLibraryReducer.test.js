import { SAVED_SEARCH_VALUE, GET_ASSERTS_DATA , SEARCH_BUTTON_VISIBILITY} from '../../PatternAddAnAsset/js/constants/searchLibraryConstants'
import searchLibraryReducer from '../../PatternAddAnAsset/js/reducers/searchLibraryReducer'
import expect from 'expect'

describe('searchLibraryReducer reducer', () => {

	const initilizeValues = {
   savedSearchValue: [],
   enableDelete:false,
   enableSearch:false,
   isSavedSearch: true
};


	before('before creating searchLibraryReducer', function() {
		
    
    });


  it('should handle initial state', () => {
  let ret = searchLibraryReducer(undefined,{});
    expect(ret).toEqual(initilizeValues);
  });

   it('should handle SAVED_SEARCH_VALUE action', () => {

  let nextState = searchLibraryReducer([], {
        type:SAVED_SEARCH_VALUE,
    });

    expect(nextState).toEqual([initilizeValues]);

    });


   });