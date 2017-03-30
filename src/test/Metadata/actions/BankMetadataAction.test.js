import * as actions from '../../../PatternBank/js/action/MetadataAction'
import expect from 'expect' //used any testing library
import metadataConstants from '../../../PatternBank/js/constants/MVMConstants';
import marklogicMetadataAPI from '../../../PatternBank/js/api/MetadataAPI';
import store from '../../../PatternBank/js/store';
import Promise from 'bluebird';
import MetaDataService from '../../../common/util/metadataService';
import * as types from '../../../PatternBank/js/constants/MVMConstants';
//import MetaDataApi from '../../js/api/MetadataApi';
//import {fetchMetaData, saveMetaData} from '../../js/action/MetadataAction';

/***********For fetchMetaData Function ********/

/*describe('async actions', () => {
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
      //expect(stateSpy.called).toEqual(true);
      expect(stateSpy.called).toEqual(false);
    },1000);
 })

  after(function () {
    dispacthSpy.restore();
    stateSpy.restore();
  });
});*/

describe('stub getState', () => {
  var apiSpy;

  before(function () {
    apiSpy = sinon.spy(MetaDataService,"send");
     sinon.stub(store, "getState").returns({"Metadatareducers":{}});
  });

  it('should return a function in Bank Metadata', () => {
    expect(actions.fetchMetaData()).toBeA('function');
  })

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
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",
      "name" : { "en" :  "assessment1" },
      "origjsonld":
          { "name": {
              "en": "assessment1"
              },
            "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"
          }
     }));
     dispacthSpy = sinon.spy(store,"dispatch");
  });

 it('dispatch original BankMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual('SET_ON_LOAD_VALUE');
      expect(dispacthSpy.args[0][0].data.uuid).toEqual("6e143c65-6abd-4af4-80fd-e1a657c8132f");
      expect(dispacthSpy.args[0][0].data.name).toEqual({"en": "assessment1"});
    },1000)
  });

 it('dispatch a BankMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[1][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data).toEqual({
        "name" : "assessment1",
        "origjsonld":
          { "name": {
              "en": "assessment1"
          },
            "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"
          },
        "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",
});

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
    sinon.stub(MetaDataService, "send").returns(Promise.resolve(
        { "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",
          "keyword": 
            {"en": ['tag1','tag2']}
        }));
     //sinon.stub(MetaDataService, "send").returns(Promise.resolve({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",'keywords':[{ 'id': 0, 'name': 'tag1' },{ 'id': 1, 'name': 'tag2' }]}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });

  it('dispatch a BankMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[1][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      //expect(dispatchArg.QMD_Data.keywords).toEqual([{ 'id': 0, 'name': 'tag1' },{ 'id': 1, 'name': 'tag2' }]);
      expect(dispatchArg.QMD_Data.keywords).toEqual([{ 'id': '0', 'name': 'tag1' },{ 'id': '1', 'name': 'tag2' }]);

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
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",
      'keyword':{"en": "tag1"},
      'origjsonld':
          { "keyword": 
              {"en": "tag1"},
            "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"}}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });

  it('dispatch a BankMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual('SET_ON_LOAD_VALUE');
      expect(dispatchArg.data.keyword).toEqual({"en": "tag1"});

    },1000)
  });

  it('dispatch a BankMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[1][0];
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

describe('stub api and returning sucess should work with Time Required field', () => {
  var dispacthSpy;
  let data;
  before(function () {
    sinon.stub(store, "getState").returns({"Metadatareducers":{}});
    data = {"qmddata":"abcdefg"};
    data = JSON.stringify(data);
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"204151d8-11d7-4a5d-931f-cd5e19afaeef",
      'timeRequired':"PT3H5M6S",
      'origjsonld':
          { "timeRequired": "PT3H5M6S",
            "uuid":"204151d8-11d7-4a5d-931f-cd5e19afaeef"}}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });

  it('dispatch a BankMetaData action', () => {
    actions.fetchMetaData({"uuid":"204151d8-11d7-4a5d-931f-cd5e19afaeef"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual('SET_ON_LOAD_VALUE');
      expect(dispatchArg.data.timeRequired).toEqual("PT3H5M6S");

    },1000)
  });

  it('dispatch a BankMetaData action', () => {
    actions.fetchMetaData({"uuid":"204151d8-11d7-4a5d-931f-cd5e19afaeef"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[1][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.hours).toEqual(3);
      expect(dispatchArg.QMD_Data.mins).toEqual(5);
      expect(dispatchArg.QMD_Data.secs).toEqual(6);
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

  it('dispatch a BanktMetaData action', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f"})(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy1.args[0][0];
      expect(dispacthSpy1.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.METADATA_SET_ERROR);
      expect(dispatchArg.QMD_Data).toEqual({ errMsg: { error: 'error' } });
    },1000)
  });

  after(function () {
    dispacthSpy1.restore();
    MetaDataService.send.restore();
    store.getState.restore();
  });

}); 

 /* describe('async actions', () => {
  var dispacthSpy;
  var server;
  var libConfig = {
    'locale': 'en_US',
    'environment': 'dev',
    'link': 'google.com1',
    'headers' : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/ld+json',
        'X-Roles-Test' : 'ContentMetadataEditor',
        'Authorization': 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
        'Prefer' : 'annotation=true'
      },
    'database' : '?db=qa12',
    'server' : 'https://uat.pearsonmeta.io',
    'port' : '80'
  };

  before(function () {
     sinon.stub(store, "getState").returns({"Metadatareducers":{}});
     dispacthSpy = sinon.spy(store,"dispatch");
     server = sinon.fakeServer.create();
     server.respondWith("GET", "https://uat.pearsonmeta.io/work/6e143c65-6abd-4af4-80fd-e1a657c8132f?db=qa6", [
    200,
    {"Content-Type": "application/json"},
    JSON.stringify({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f","name":  "bank1"})
    ]);

  });
  it('fetch Question Metadata should work fine when mocking service', () => {
    actions.fetchMetaData({"uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f","libConfig":libConfig})(store.dispatch,store.getState);
    server.respond();
    //console.log("server respond called");
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.uuid).toEqual("6e143c65-6abd-4af4-80fd-e1a657c8132f");
      expect(dispatchArg.QMD_Data.name).toEqual("bank1");
    },100)
  });

  after(function () {
    dispacthSpy.restore();
    server.restore();
    store.getState.restore();
  });
}); */

/***********For fetchMetaDataTaxonomy Function ********/

/* describe('async actions for fetchMetaDataTaxonomy', () => {
  var dispacthSpy;
  var apiSpy;
  var metadata = {};
  metadata.libConfig = {
    'locale': 'en_US',
    'headers' : {
          'Content-Type'   : 'application/json',
          'Accept'         : 'application/ld+json',
          'X-Roles-Test'        : 'ContentMetadataEditor',
          'Prefer' : 'annotation=true'
        },
    'database'       : '?db=qa2',
    'server'         : 'https://staging.data.pearson.com',
    'taxonomyserver' : 'https://staging.schema.pearson.com',
    'port'           : '80',
    'alfserver'      :'https://usppewip.pearsoncms.com'
  };

  before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     //apiSpy = sinon.spy(MetaDataApi,"get_QMD_Data");
  });

 it('should return a function', () => {
    expect(actions.fetchMetaDataTaxonomy()).toBeA('function');
  })

 it('dispatch should be called when fetching MetaDataTaxonomy data', () => {
    actions.fetchMetaDataTaxonomy(metadata)(store.dispatch);
    setTimeout(function(){
      expect(dispacthSpy.called).toEqual(true);
    },100)
 })*/

 /*it('api should be called when fetching MetaDataTaxonomy data', () => {
    actions.fetchMetaDataTaxonomy(metadata)(store.dispatch);
    setTimeout(function(){
      expect(apiSpy.called).toEqual(true);
    },100)
 })*/

 /* after(function () {
    dispacthSpy.restore();
    //apiSpy.restore();
  });
}); */

describe('stub api and returning sucess should work for Audience Taxonomydata', () => {
  var dispacthSpy;
  var metadata = {};
  metadata.libConfig = {
    'locale': 'en_US',
    'headers' : {
          'Content-Type'   : 'application/json',
          'Accept'         : 'application/ld+json',
          'X-Roles-Test'        : 'ContentMetadataEditor',
          'Prefer' : 'annotation=true'
        },
    'database'       : '?db=qa2',
    'server'         : 'https://staging.data.pearson.com',
    'taxonomyserver' : 'https://staging.schema.pearson.com',
    'port'           : '80',
    'alfserver'      :'https://usppewip.pearsoncms.com'
  };
  before(function () {
      sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",
      "audience" : [
      {
        checked: false,
        id: 1,
        name: "Choose audience role",
        schemaUrl: "https://schema.pearson.com/ns/audience/default"
      },
      {
        checked: false,
        id: 2,
        name: "Student",
        schemaUrl: "https://schema.pearson.com/ns/audience/student"
      }
      ]
     }));
     dispacthSpy = sinon.spy(store,"dispatch");
  });

  it('should return a function in Bank Metadata', () => {
    expect(actions.fetchMetaDataTaxonomy()).toBeA('function');
  })

  it('dispatch a BankMetaData Audience Taxonomydata action', () => {
    actions.fetchMetaDataTaxonomy(metadata)(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.length).toEqual(2);
      expect(dispacthSpy.args[1][0].QMD_Data.audienceRolesData[0].text).toEqual('Choose audience role');
      expect(dispacthSpy.args[1][0].QMD_Data.audienceRolesData[0].value).toEqual('https://schema.pearson.com/ns/audience/default');
      expect(dispacthSpy.args[1][0].QMD_Data.audienceRolesData[1].text).toEqual('Student');
      expect(dispacthSpy.args[1][0].QMD_Data.audienceRolesData[1].value).toEqual('https://schema.pearson.com/ns/audience/student');
     },1000)
  });

  after(function () {
     dispacthSpy.restore();
     MetaDataService.send.restore();
     //MetaDataApi.get_QMD_Data.restore();
  });
});

  describe('stub api and returning sucess should work for DifficultyLevel Taxonomydata', () => {
  var dispacthSpy;
  var metadata = {};
  metadata.libConfig = {
    'locale': 'en_US',
    'headers' : {
          'Content-Type'   : 'application/json',
          'Accept'         : 'application/ld+json',
          'X-Roles-Test'        : 'ContentMetadataEditor',
          'Prefer' : 'annotation=true'
        },
    'database'       : '?db=qa2',
    'server'         : 'https://staging.data.pearson.com',
    'taxonomyserver' : 'https://staging.schema.pearson.com',
    'port'           : '80',
    'alfserver'      :'https://usppewip.pearsoncms.com'
  };
  before(function () {
      sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",
      "difficultylevel" : [
      {
        checked: false,
        id: 1,
        name: "Choose difficultylevel level",
        schemaUrl: "https://schema.pearson.com/ns/difficultylevel/default"
      },
      {
        checked: false,
        id: 2,
        name: "easy",
        schemaUrl: "https://schema.pearson.com/ns/difficultylevel/easy"
      }
      ]
     }));
     dispacthSpy = sinon.spy(store,"dispatch");
  });

  it('dispatch a BanktMetaData DifficultyLevel Taxonomydata action', () => {
    actions.fetchMetaDataTaxonomy(metadata)(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.length).toEqual(2);
      expect(dispacthSpy.args[1][0].QMD_Data.difficultyLevelData[0].text).toEqual('Choose difficultylevel level');
      expect(dispacthSpy.args[1][0].QMD_Data.difficultyLevelData[0].value).toEqual('https://schema.pearson.com/ns/difficultylevel/default');
      expect(dispacthSpy.args[1][0].QMD_Data.difficultyLevelData[1].text).toEqual('easy');
      expect(dispacthSpy.args[1][0].QMD_Data.difficultyLevelData[1].value).toEqual('https://schema.pearson.com/ns/difficultylevel/easy');
     },1000)
  });

  after(function () {
     dispacthSpy.restore();
     MetaDataService.send.restore();
     //MetaDataApi.get_QMD_Data.restore();
  });
});

  describe('stub api and returning sucess should work for Domain Taxonomydata', () => {
  var dispacthSpy;
  var metadata = {};
  metadata.libConfig = {
    'locale': 'en_US',
    'headers' : {
          'Content-Type'   : 'application/json',
          'Accept'         : 'application/ld+json',
          'X-Roles-Test'        : 'ContentMetadataEditor',
          'Prefer' : 'annotation=true'
        },
    'database'       : '?db=qa2',
    'server'         : 'https://staging.data.pearson.com',
    'taxonomyserver' : 'https://staging.schema.pearson.com',
    'port'           : '80',
    'alfserver'      :'https://usppewip.pearsoncms.com'
  };
  before(function () {
      sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"6e143c65-6abd-4af4-80fd-e1a657c8132f",
      "domain" : [
      {
        checked: false,
        id: 1,
        name: "Choose domain",
        schemaUrl: "https://schema.pearson.com/ns/domain/default"
      },
      {
        checked: false,
        id: 2,
        name: "education",
        schemaUrl: "https://schema.pearson.com/ns/domain/education"
      }
      ]
     }));
     dispacthSpy = sinon.spy(store,"dispatch");
  });

  it('dispatch a BankMetaData Domain Taxonomydata action', () => {
    actions.fetchMetaDataTaxonomy(metadata)(store.dispatch,store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.length).toEqual(2);
      expect(dispacthSpy.args[1][0].QMD_Data.disciplineData[0].text).toEqual('Choose domain');
      expect(dispacthSpy.args[1][0].QMD_Data.disciplineData[0].value).toEqual('https://schema.pearson.com/ns/domain/default');
      expect(dispacthSpy.args[1][0].QMD_Data.disciplineData[1].text).toEqual('education');
      expect(dispacthSpy.args[1][0].QMD_Data.disciplineData[1].value).toEqual('https://schema.pearson.com/ns/domain/education');
     },1000)
  });

  after(function () {
     dispacthSpy.restore();
     MetaDataService.send.restore();
  });
});

 describe('stub api and returning error should work', () => {
  var dispacthSpy;
  var metadata = {};
  metadata.libConfig = {
    'locale': 'en_US',
    'headers' : {
          'Content-Type'   : 'application/json',
          'Accept'         : 'application/ld+json',
          'X-Roles-Test'        : 'ContentMetadataEditor',
          'Prefer' : 'annotation=true'
        },
    'database'       : '?db=qa2',
    'server'         : 'https://stagging.data.pearson.com',
    'taxonomyserver' : 'https://stagging.schema.pearson.com',
    'port'           : '80',
    'alfserver'      :'https://stagging.pearsoncms.com'
  };
  before(function () {
     //sinon.stub(MetaDataApi,"get_QMD_Data").returns(Promise.reject({"error":"error"}));
     sinon.stub(MetaDataService, "send").returns(Promise.reject({"errMsg":"error"}));
     dispacthSpy = sinon.spy(store,"dispatch");
  });
  it('dispatch a BankMetaData action', () => {
    actions.fetchMetaDataTaxonomy(metadata)(store.dispatch,store.getState);
    setTimeout(function(){
      //to be updated basd on code change
      let dispatchArg = dispacthSpy.args[0][0];
      expect(dispacthSpy.called).toEqual(true);
      expect(dispatchArg.length).toEqual(2);
     },100)
  });
  after(function () {
     dispacthSpy.restore();
     MetaDataService.send.restore();
  });
});

/*describe('async actions', () => {
  var dispacthSpy;
  var fetchMetaDataSpy;
  var server;
  before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     fetchMetaDataSpy = sinon.spy(fetchMetaData);
     server = sinon.fakeServer.create();
     server.respondWith("GET", "http://localhost:3000/BankMetaData", [
    200,
    {"Content-Type": "application/json"},
    JSON.stringify({"name":"bank1"})
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
 /*describe('async actions', () => {
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

 it('dispatch should be called when saving MetaDataTaxonomy data', () => {
    actions.saveMetaData({"name":"aaaa"})(store.dispatch,store.getState);
    expect(dispacthSpySave.called).toEqual(false);
    expect(getStateSpySave.called).toEqual(true);
 })

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
});*/

 describe('stub api and returning save sucess should work', () => {
  var dispacthSpy2;
  var getStateSpy2;
  let data;
  before(function () {
    data = {"saveqmddata":"abcdefg"};
    data = JSON.stringify(data);
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"12345",
      "desc":"aaa",
      'origjsonld':
          {  
            "description": {"en" : "aaa"},
            "uuid":"12345"}}));
     dispacthSpy2 = sinon.spy(store,"dispatch");
     getStateSpy2 = sinon.spy(store,"getState");
  });

  it('dispatch a Save BankMetaData action for SET_ON_LOAD_VALUE', () => {
    actions.saveMetaData({"name":"","desc":"aaa"})(store.dispatch, store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy2.args[0][0];
      expect(dispacthSpy2.called).toEqual(true);
      expect(dispatchArg.type).toEqual('SET_ON_LOAD_VALUE');
      expect(dispatchArg.data.uuid).toEqual("12345");
      expect(dispatchArg.data.description).toEqual({ en: 'aaa' });
    },1000)
  });

  it('dispatch a Save BankMetaData action for SET_UUID', () => {
    actions.saveMetaData({"name":"","desc":"aaa"})(store.dispatch, store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy2.args[1][0];
      expect(dispacthSpy2.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.uuid).toEqual("12345");
      expect(dispatchArg.QMD_Data.desc).toEqual("aaa");
    },1000)
  });

  after(function () {
     dispacthSpy2.restore();
     getStateSpy2.restore();
     MetaDataService.send.restore();
  });
});

describe('stub api and returning save update sucess should work', () => {
  var dispacthSpy2;
  var getStateSpy2;
  let data;
  before(function () {
    data = {"saveqmddata":"abcdefg"};
    data = JSON.stringify(data);
     sinon.stub(MetaDataService, "send").returns(Promise.resolve({
      "uuid":"12345",
      "desc":"aaa",
    "name":"bbbb",
      'origjsonld':
          {  
            "description": {"en" : "aaa"},
            "uuid":"12345",
      "name":"bbbb"}}));
     dispacthSpy2 = sinon.spy(store,"dispatch");
     getStateSpy2 = sinon.spy(store,"getState");
  });

  it('dispatch a Save Update BankMetaData action for SET_ON_LOAD_VALUE', () => {
    actions.saveMetaData({"name":"bbbb","desc":"aaa","uuid":"12345"})(store.dispatch, store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy2.args[0][0];
      expect(dispacthSpy2.called).toEqual(true);
      expect(dispatchArg.type).toEqual('SET_ON_LOAD_VALUE');
      expect(dispatchArg.data.uuid).toEqual("12345");
      expect(dispatchArg.data.description).toEqual({ en: 'aaa' });
    expect(dispatchArg.data.name).toEqual("bbbb");
    },1000)
  });

  it('dispatch a Save Update BankMetaData action for SET_UUID', () => {
    actions.saveMetaData({"name":"bbbb","desc":"aaa"})(store.dispatch, store.getState);
    setTimeout(function(){
      let dispatchArg = dispacthSpy2.args[1][0];
      expect(dispacthSpy2.called).toEqual(true);
      expect(dispatchArg.type).toEqual(types.SET_UUID);
      expect(dispatchArg.QMD_Data.uuid).toEqual("12345");
      expect(dispatchArg.QMD_Data.desc).toEqual("aaa");
    expect(dispatchArg.QMD_Data.name).toEqual("bbbb");
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
  it('dispatch should not happen a Save BankMetaData action', () => {
    actions.saveMetaData({"name":"","desc":"aaa"})(store.dispatch,store.getState);
    expect(dispacthSpy1.called).toEqual(false);
  });
  after(function () {
    dispacthSpy1.restore();
    getStateSpy1.restore();
    MetaDataService.send.restore();
  });
});

/*describe('async actions', () => {
  var dispacthSpy;
  var getStateSpy;
  var server;
  var libConfig = {
    'locale': 'en_US',
    'environment': 'dev',
    'link': 'google.com1',
    'headers' : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/ld+json',
        'X-Roles-Test' : 'ContentMetadataEditor',
        'Authorization': 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
        'Prefer' : 'annotation=true'
      },
    'database' : '?db=qa12',
    'server' : 'https://uat.pearsonmeta.io',
    'port' : '80'
  };

  before(function () {
     dispacthSpy = sinon.spy(store,"dispatch");
     getStateSpy = sinon.spy(store,"getState");
     server = sinon.fakeServer.create();
     console.log('server : '+server);
     server.respondWith("POST", "https://uat.pearsonmeta.io/thing?db=qa6", [
    200,
    {"Content-Type": "application/json"},
    JSON.stringify({"uuid":"123654"})
    ]);

  });

  it('Save Question Metadata should work fine when mocking service', () => {
    actions.saveMetaData({'libConfig':libConfig})(store.dispatch, store.getState);
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
});*/

/***********For populateAutoComplete Function ********/


/*describe('async actions', () => {
  var dispacthSpyAutocomplete;
  var apiSpy;

  before(function () {
     dispacthSpyAutocomplete = sinon.spy(store,"dispatch");
     apiSpy = sinon.spy(MetaDataApi,"get_AutoComplete_Data")
    
  });

 it('should return a function', () => {
    expect(actions.populateAutoComplete()).toBeA('function');
  })*/

 /* it('api should be called when calling autocomplete function', () => {
    actions.populateAutoComplete()(store.dispatch);
    expect(apiSpy.called).toEqual(true);
 })*/

  /*after(function () {
    dispacthSpyAutocomplete.restore();
    apiSpy.restore();
  });
});*/

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
  it('dispatch a BankMetaData action', () => {
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