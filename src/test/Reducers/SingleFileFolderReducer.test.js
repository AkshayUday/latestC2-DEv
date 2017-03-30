import SingleFileFolderReducer from '../../PatternAddAnAsset/js/reducers/SingleFileFolderReducer'
import * as actions from '../../PatternAddAnAsset/js/action/TreePaneAction'
import {SET_REF} from '../../PatternAddAnAsset/js/constants/TreePaneConstant'
import expect from 'expect'

describe('SingleFileFolder reducer', () => {
  let initilizeValues = [{
    FolderID: {
    isParent:true,
    nodeRef:""
    }    
  }];

  before('before creating ', function() {
  });      

  it('should handle initial state', () => {
  let ret = SingleFileFolderReducer(undefined,{});
  //console.log(ret);
  expect(ret).toEqual(initilizeValues);
  });

  it('should handle SET_REF action', () => {

  let nextState = SingleFileFolderReducer({}, {
  type:SET_REF,
  data:"123"
  });  
  expect(nextState[0]).toEqual({FolderID:"123"});

  });

  });