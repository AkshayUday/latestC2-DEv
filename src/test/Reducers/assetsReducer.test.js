//let TreePaneConstants = require('../js/constants/TreePaneConstant');
//import { GET_FOLDER, TOGGLE} from '../../constants/TreePaneConstant'
import assetReducer from '../../PatternAddAnAsset/js/reducers/assets'
import { DISPLAY_ASSETS} from '../../PatternAddAnAsset/js/constants/fileUploadConstants'
//import marklogicMetadataAPI from '../../js/api/marklogicMetadataAPI'
//import * as actions from '../../js/action/assets'
import expect from 'expect'



describe('assets reducer', () => {

let initilizeValues = [{}];

before('before creating ', function() {});

it('should handle initial state', () => {
  let ret = assetReducer(undefined,{});
    expect(ret.last()).toEqual(initilizeValues);
  });

/*it('should handle DISPLAY_ASSETS action', () => {

  let nextState = assetReducer([{}], {
        type:DISPLAY_ASSETS,
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