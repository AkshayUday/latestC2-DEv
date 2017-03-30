//import metadataConstants from '../../js/constants/MetadataConstants';
import CheckJobStatusReducer from '../../PatternAddAnAsset/js/reducers/CheckJobStatusReducers'
//import marklogicMetadataAPI from '../../js/api/marklogicMetadataAPI'
import * as actions from '../../PatternAddAnAsset/js/action/CheckJobStatusAction'
import expect from 'expect'

describe('CheckJobStatus reducer', () => {

 const initilizeData = [{
      rows : [],
      columns : []
      
}];

before('before creating ', function() {
    
});    

  it('should handle initial state', () => {
   
  let ret = CheckJobStatusReducer(undefined,{});
    expect(ret).toEqual(initilizeData);
  });

  it('should handle JOB_STATUS action', () => {

  let nextState = CheckJobStatusReducer({}, {
        type:'JOB_STATUS',
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

    //debugger;
    //console.log(expect(nextState[0]));

    expect(nextState[0]).toEqual({
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
          });

    });


});
