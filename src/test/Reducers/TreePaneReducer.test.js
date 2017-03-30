//let TreePaneConstants = require('../js/constants/TreePaneConstant');
import { GET_FOLDER, TOGGLE} from '../../PatternAddAnAsset/js/constants/TreePaneConstant'
import TreePaneReducer from '../../PatternAddAnAsset/js/reducers/TreePaneReducer'
//import marklogicMetadataAPI from '../../js/api/marklogicMetadataAPI'
import * as actions from '../../PatternAddAnAsset/js/action/TreePaneAction'
import expect from 'expect'



describe('TreePane reducer', () => {

  let initilizeValues = [{
  items: '',
  expanded: true
  }];

/*const treeConstants = {

GET_FOLDER : 'GET_FOLDER',
TOGGLE : 'TOGGLE_TEST'
};*/



before('before creating ', function() {});      

 it('should handle initial state', () => {
  let ret = TreePaneReducer(undefined,{});
  //console.log(ret);
  //console.log(initilizeValues);
  expect(ret[0]).toEqual(initilizeValues);
  });


 it('should handle GET_FOLDER action', () => {

  let nextState = TreePaneReducer({}, {
        type: GET_FOLDER,
        data:[
                { "id": "1", "name": "Apples" },
                { "id": "2", "name": "Pears" }
            ] 
          

    });
   
/*
    expect(nextState).toEqual([{
            "items": [
                { "id": "1", "name": "Apples" },
                { "id": "2", "name": "Pears" }
            ],
            "expanded": true
          }]);*/
          
  expect(nextState[0]).toEqual([
                { "id": "1", "name": "Apples" },
                { "id": "2", "name": "Pears" }
            ] );



    });

 
   
  });

