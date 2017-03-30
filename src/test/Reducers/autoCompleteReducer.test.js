
import autoCompleteReducer from '../../PatternAddAnAsset/js/reducers/autoCompleteReducer'
import {AUTO_COMPLETE} from '../../PatternAddAnAsset/js/constants/searchLibraryConstants'
import expect from 'expect'

describe('autoComplete reducer', () => {

 const initilizeData = [{
     
      
}];

before('before creating ', function() {
    
          });    

 it('should handle initial state', () => {
   
  let ret = autoCompleteReducer(undefined,{});
    expect(ret).toEqual(initilizeData);
  });

 it('should handle AUTO_COMPLETE action', () => {

  let nextState = autoCompleteReducer({}, {
        type:AUTO_COMPLETE,
        data:"abc",
        text:"def",
        savedSearch:true,
        lastThreeSearch:false
    });

    expect(nextState).toEqual([{
        data:"abc",
        text:"def",
        savedSearch:true,
        lastThreeSearch:false
    }]);    

      });

 });