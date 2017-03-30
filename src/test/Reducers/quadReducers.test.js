import { SEND_TO_QUAD} from '../../PatternAddAnAsset/js/constants/fileUploadConstants'
import quadReducer from '../../PatternAddAnAsset/js/reducers/quad'
import expect from 'expect'

describe('quad reducer', () => {


before('before creating quadReducer', function() {
		
    
    });  

 it('should handle initial state', () => {
    let ret = quadReducer(undefined,{});

    expect(ret.last()).toEqual([]);
  });       

 /*it('should handle SEND_TO_QUAD action', () => {

  let nextState = quadReducer([], {
        type:SEND_TO_QUAD,
        data:{
            "rows": [
                { "id": "1", "name": "Apples" },
                { "id": "2", "name": "Pears" }
            ],
            "columns": [
                { "id": "3", "name": "Bananas" },
                { "id": "4", "name": "Mangos" },
                { "id": "5", "name": "Lemons" },
                { "id": "6", "name": "Apricots" }
            ]
          }

    });
  
    //console.log(nextState);

    expect(nextState).toEqual([{
            "rows": [
                { "id": "1", "name": "Apples" },
                { "id": "2", "name": "Pears" }
            ],
            "columns": [
                { "id": "3", "name": "Bananas" },
                { "id": "4", "name": "Mangos" },
                { "id": "5", "name": "Lemons" },
                { "id": "6", "name": "Apricots" }
            ]
          }]);

    });*/


});
