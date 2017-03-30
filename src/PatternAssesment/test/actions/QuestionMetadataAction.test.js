import * as actions from '../../js/action/MetadataAction'
import expect from 'expect' //used any testing library
import metadataConstants from '../../js/constants/MVMConstants';
import marklogicMetadataAPI from '../../js/api/MetadataAPI';
import store from '../../js/store';
import Promise from 'bluebird';
import MetaDataService from '../../../common/util/metadataService';
import * as types from '../../js/constants/MVMConstants';
import MetaDataApi from '../../js/api/MetadataApi';
//import {fetchMetaData, saveMetaData} from '../../js/action/MetadataAction';

/***********For fetchMetaData Function ********/

describe('async actions', () => {
  var dispacthSpy;
  var stateSpy;

before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     stateSpy = sinon.spy(store,"getState");
  });

 it('should return a function', () => {
    expect(actions.fetchMetaData()).toBeA('function');
  })

 it('dispatch should be called when fetching data', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch, store.getState);
    setTimeout(function(){
      expect(dispacthSpy.called).toEqual(true);
      expect(stateSpy.called).toEqual(true);
    },1000);
 })

  after(function () {
    dispacthSpy.restore();
    stateSpy.restore();
  });
});

describe('stub getState', () => {
  var apiSpy;

  before(function () {
    apiSpy = sinon.spy(MetaDataService,"send");
     sinon.stub(store, "getState").returns({"Metadatareducers":{}});
  });

 it('api should be called when getState is returning valid uuid', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch, store.getState);
    expect(apiSpy.called).toEqual(true);
 })

  after(function () {
    apiSpy.restore();
    store.getState.restore();
  });
});

describe('stub api and returning sucess should work', () => {
  var dispacthSpy;
  let data;
  before(function () {
    sinon.stub(store, "getState").returns({"Metadatareducers":{}});
    data = {"qmddata":"abcdefg"};
    data = JSON.stringify(data);
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",'name':'question1'}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a QuestionMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data).toEqual({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",'name':'question1','keywords':[]});

    },1000)
  });
  after(function () {
     dispacthSpy.restore();
     MetaDataService.send.restore();
     store.getState.restore();
  });
});


describe('stub api and returning sucess should work with Keywords as array', () => {
  var dispacthSpy;
  let data;
  before(function () {
    sinon.stub(store, "getState").returns({"Metadatareducers":{}});
    data = {"qmddata":"abcdefg"};
    data = JSON.stringify(data);
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",'keywords':['tag1','tag2']}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a QuestionMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.keywords).toEqual([{ 'id': 0, 'name': 'tag1' },{ 'id': 1, 'name': 'tag2' }]);

    },1000)
  });
  after(function () {
     dispacthSpy.restore();
     MetaDataService.send.restore();
     store.getState.restore();
  });
});


describe('stub api and returning sucess should work with Keywords as String', () => {
  var dispacthSpy;
  let data;
  before(function () {
    sinon.stub(store, "getState").returns({"Metadatareducers":{}});
    data = {"qmddata":"abcdefg"};
    data = JSON.stringify(data);
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",'keywords':'tag1'}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a QuestionMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.keywords).toEqual([{ 'id': 0, 'name': 'tag1' }]);

    },1000)
  });
  after(function () {
     dispacthSpy.restore();
     MetaDataService.send.restore();
     store.getState.restore();
  });
});


describe('stub api and returning error should work', () => {
  var dispacthSpy1;
  let data;
  before(function () {
    sinon.stub(store, "getState").returns({"Metadatareducers":{}});
    data = {"qmddata":"abcdefg"};
    data = JSON.stringify(data);
    sinon.stub(MetaDataService, "send").returns(Promise.reject({"error":"error"}));
    dispacthSpy1 = sinon.spy(store,"dispatch");
  });
  it('dispatch a QuestionMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy1.args[0][0];
      expect(dispacthSpy1.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.METADATA_GET);
      expect(dispatchArg.QMD_Data).toEqual({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"});
    },1000)
  });
  after(function () {
    dispacthSpy1.restore();
    MetaDataService.send.restore();
    store.getState.restore();
  });
});

describe('async actions', () => {
  var dispacthSpy;
  var server;

  before(function () {
     sinon.stub(store, "getState").returns({"Metadatareducers":{}});
     dispacthSpy = sinon.spy(store,"dispatch");
     server = sinon.fakeServer.create();
     server.respondWith("GET", "https://uat.pearsonmeta.io/work/6e143c65-6abd-4af4-80fd-e1a657c8132f?db=qa6", [
    200,
    {"Content-Type": "application/json"},
    JSON.stringify({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f","name":"question1"})
    ]);

  });
  it('fetch Question Metadata should work fine when mocking service', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    server.respond();
    //console.log("server respond called");
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.uuid).toEqual("6e143c65-6abd-4af4-80fd-e1a657c8132f");
      expect(dispatchArg.QMD_Data.name).toEqual("question1");
    },100)
  });

  after(function () {
    dispacthSpy.restore();
    server.restore();
    store.getState.restore();
  });
});

/***********For fetchMetaDataTaxonomy Function ********/

describe('async actions for fetchMetaDataTaxonomy', () => {
  var dispacthSpy;
  var apiSpy;

  before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     apiSpy = sinon.spy(MetaDataApi,"get_QMD_Data");
  });

 it('should return a function', () => {
    expect(actions.fetchMetaDataTaxonomy()).toBeA('function');
  })

 it('dispatch should be called when fetching MetaDataTaxonomy data', () => {
    actions.fetchMetaDataTaxonomy()(store.dispatch);
    setTimeout(function(){
      expect(dispacthSpy.called).toEqual(true);
    },100)
 })

 /* it('api should be called when fetching MetaDataTaxonomy data', () => {
    actions.fetchMetaDataTaxonomy()(store.dispatch);
    setTimeout(function(){
      expect(apiSpy.called).toEqual(true);
    },100)
 })*/

  after(function () {
    dispacthSpy.restore();
    apiSpy.restore();
  });
});

/*describe('stub api and returning sucess should work', () => {
  var dispacthSpy;
  before(function () {
     sinon.stub(MetaDataApi,"get_QMD_Data").returns(Promise.resolve({"text":JSON.stringify({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",'name':'question1'})}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a QuestionMetaData action', () => {
    actions.fetchMetaDataTaxonomy()(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      debugger;
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.length).toEqual(2);
     },1000)
  });
  after(function () {
     dispacthSpy.restore();
     MetaDataApi.get_QMD_Data.restore();
  });
});

describe('stub api and returning error should work', () => {
  var dispacthSpy;
  before(function () {
     sinon.stub(MetaDataApi,"get_QMD_Data").returns(Promise.reject({"error":"error"}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a QuestionMetaData action', () => {
    actions.fetchMetaDataTaxonomy()(store.dispatch,store.getState);
    setTimeout(function(){
      //to be updated basd on code change
     },100)
  });
  after(function () {
     dispacthSpy.restore();
     MetaDataApi.get_QMD_Data.restore();
  });
});*/

/*describe('async actions', () => {
  var dispacthSpy;
  var fetchMetaDataSpy;
  var server;
  before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     fetchMetaDataSpy = sinon.spy(fetchMetaData);
     server = sinon.fakeServer.create();
     server.respondWith("GET", "http://localhost:3000/questionMetaData", [
    200,
    {"Content-Type": "application/json"},
    JSON.stringify({"name":"question1"})
    ]);

  });
  it('fetchMetaDataTaxonomy should work fine when mocking service', () => {
   
    actions.fetchMetaDataTaxonomy()(store.dispatch);
    server.respond();
    console.log("server respond called");
    setTimeout(function(){
        let dispatchArg = dispacthSpy.args[0][0];
        expect(dispacthSpy.called).toEqual(true);
        expect(dispatchArg).toBeA('function');
      },100)
  });

  after(function () {
    dispacthSpy.restore();
    server.restore();
  });
});/**/

/***********For saveMetaData Function ********/
describe('async actions', () => {
  var dispacthSpySave;
  var getStateSpySave;
  var apiSpy;

  before(function () {
     dispacthSpySave = sinon.spy(store,"dispatch");
     getStateSpySave = sinon.spy(store,"getState");
     apiSpy = sinon.spy(MetaDataService,"send");
  });

  it('should return a function', () => {
     expect(actions.saveMetaData()).toBeA('function');
   })

 /*it('dispatch should be called when saving MetaDataTaxonomy data', () => {
    actions.saveMetaData({})(store.dispatch);
     // expect(dispacthSpySave.called).toEqual(true);
    //expect(dispacthSpySave.called).toEqual(true);
 })*/

  it('api should be called when saving MetaDataTaxonomy data', () => {
    actions.saveMetaData({})(store.dispatch,store.getState);
    setTimeout(function(){
      expect(apiSpy.called).toEqual(true);
    },300)
 })

  after(function () {
    dispacthSpySave.restore();
    getStateSpySave.restore();
    apiSpy.restore();
  });
});


describe('stub api and returning save sucess should work', () => {
  var dispacthSpy2;
  var getStateSpy2;
  let data;
  before(function () {
    data = {"saveqmddata":"abcdefg"};
    data = JSON.stringify(data);
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({"uuid":"12345"}));
     dispacthSpy2 = sinon.spy(store,"dispatch");
     getStateSpy2 = sinon.spy(store,"getState");
  });
  it('dispatch a Save QuestionMetaData action', () => {
    actions.saveMetaData({"name":""})(store.dispatch, store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy2.args[0][0];
      expect(dispacthSpy2.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.uuid).toEqual("12345");
    },1000)
  });
  after(function () {
     dispacthSpy2.restore();
     getStateSpy2.restore();
     MetaDataService.send.restore();
  });
});


describe('stub api and returning save error should work', () => {
  var dispacthSpy1;
  var getStateSpy1;
  let data;
  before(function () {
     sinon.stub(MetaDataService, "send").returns(Promise.reject(new EvalError({'message':'rejected message'})));
     dispacthSpy1 = sinon.spy(store,"dispatch");
     getStateSpy1 = sinon.spy(store,"getState");
  });
  it('dispatch should not happen a Save QuestionMetaData action', () => {
    actions.saveMetaData({})(store.dispatch,store.getState);
    expect(dispacthSpy1.called).toEqual(false);
  });
  after(function () {
    dispacthSpy1.restore();
    getStateSpy1.restore();
     MetaDataService.send.restore();
  });
});

describe('async actions', () => {
  var dispacthSpy;
  var getStateSpy;
  var server;

  before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     getStateSpy = sinon.spy(store,"getState");
     server = sinon.fakeServer.create();
     server.respondWith("POST", "https://uat.pearsonmeta.io/thing?db=qa6", [
    200,
    {"Content-Type": "application/json"},
    JSON.stringify({"uuid":"123654"})
    ]);

  });

  it('Save Question Metadata should work fine when mocking service', () => {
    actions.saveMetaData({})(store.dispatch, store.getState);
    server.respond();
    //console.log("server respond called");
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.uuid).toEqual("123654");

    },100)
  });

  after(function () {
    dispacthSpy.restore();
    getStateSpy.restore();
    server.restore();
  });
});

/***********For populateAutoComplete Function ********/


describe('async actions', () => {
  var dispacthSpyAutocomplete;
  var apiSpy;

  before(function () {
     dispacthSpyAutocomplete = sinon.spy(store,"dispatch");
     apiSpy = sinon.spy(MetaDataApi,"get_AutoComplete_Data")
    
  });

 it('should return a function', () => {
    expect(actions.populateAutoComplete()).toBeA('function');
  })

 /* it('api should be called when calling autocomplete function', () => {
    actions.populateAutoComplete()(store.dispatch);
    expect(apiSpy.called).toEqual(true);
 })*/

  after(function () {
    dispacthSpyAutocomplete.restore();
    apiSpy.restore();
  });
});

/*describe('stub api and returning sucess should work', () => {
  var autoCompleteSpy;
  let data;
  before(function () {
    data = {"autodata":"abcd"};
    data = JSON.stringify(data);
    sinon.stub(MetaDataApi, "get_AutoComplete_Data").returns(Promise.resolve({"text":JSON.stringify({"data":"abcd"})}));
    autoCompleteSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a Autocomplete action', () => {
    actions.populateAutoComplete("A")(store.dispatch);
    setTimeout(function(){
      let dispatchArg = autoCompleteSpy.args[0][0];
      expect(autoCompleteSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.AUTO_COMPLETE);
      expect(dispatchArg.data).toEqual({"data":"abcd"});
    },1000)
  });
  after(function () {
     autoCompleteSpy.restore();
     MetaDataApi.get_AutoComplete_Data.restore();
  });
});

describe('stub api and returning error should work', () => {
  var dispacthAutoSpy;
  let data;
  before(function () {
    data = {"autodata":"abcdefg"};
    data = JSON.stringify(data);
    sinon.stub(MetaDataApi, "get_AutoComplete_Data").returns(Promise.reject({"message":"error"}));
   //sinon.stub(MetaDataApi, "get_AutoComplete_Data").returns(Promise.resolve({"text":JSON.stringify({"data":"abcd"})}));
   
    dispacthAutoSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a QuestionMetaData action', () => {
    actions.populateAutoComplete()(store.dispatch);
    setTimeout(function(){
      let dispatchArg = dispacthAutoSpy.args[0][0];
      expect(dispacthAutoSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.AUTO_COMPLETE);
      expect(dispatchArg.QMD_Data).toEqual({'errMsg':'error'});
    },1000)
  });
  after(function () {
    dispacthAutoSpy.restore();
    MetaDataApi.get_AutoComplete_Data.restore();
  });
});

describe('zdfsdgrsfdgsd', () => {
  var dispacthSpy;
  var server;

  before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     server = sinon.fakeServer.create();
     server.respondWith("GET", "http://localhost:3000/autoCompleteData", [
    200,
    {"Content-Type": "application/json"},
    JSON.stringify("abcd")
    ]);

  });
  it('fetch Question Metadata should work fine when mocking service', () => {
    actions.populateAutoComplete()(store.dispatch);
    server.respond();
    console.log("server respond called");
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.AUTO_COMPLETE);
    },100)
  });

  after(function () {
    dispacthSpy.restore();
  });
});*/