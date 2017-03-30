import { FILE_SAVE, UPLOAD_STATUS} from '../../PatternAddAnAsset/js/constants/fileUploadConstants'
import fileUploadReducer from '../../PatternAddAnAsset/js/reducers/fileUpload'
import expect from 'expect'

describe('fileUpload reducer', () => {

	let initilizeValues = [{

               name: '',
               file: {}

               }];



	before('before creating ', function() {
		
    
    });


  it('should handle initial state', () => {
  let ret = fileUploadReducer(undefined,{});
    expect(ret).toEqual(initilizeValues);
  });

   it('should handle FILE_SAVE action', () => {
    let nextState = fileUploadReducer({}, {
        type:FILE_SAVE,
        data:[{
            "name": "",
            "file": {}
          }]
          

    });

  expect(nextState).toEqual([{
            "name": "",
            "file": {}
          }]);

    });

    it('should handle UPLOAD_STATUS action', () => {
    let nextState = fileUploadReducer(initilizeValues, {
        type:UPLOAD_STATUS

    });

  expect(nextState[0]).toEqual({
            "name": "",
            "file": {}
          });

    });


});