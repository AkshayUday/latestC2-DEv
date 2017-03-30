import savedSearchReducers from '../../PatternAddAnAsset/js/reducers/savedSearchReducers'
import * as actions from '../../PatternAddAnAsset/js/action/CheckJobStatusAction'
import expect from 'expect'

describe('savedSearch reducer', () => {

 const initilizeData = [{
       data:{
    "data":[]
  },
  "savedData":[],
  isChecked:false,
  enableDelete:false,
  isSavedSearch: false
      
}];

before('before creating ', function() {
    
          });    

  it('should handle initial state', () => {
   
  let ret = savedSearchReducers(undefined,{});
    expect(ret).toEqual(initilizeData);
  });

   });