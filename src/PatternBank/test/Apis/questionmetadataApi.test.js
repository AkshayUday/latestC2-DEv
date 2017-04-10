import expect from 'expect' //used any testing library
import metadataAPI from '../../js/api/MetadataAPI';
import Promise from 'bluebird';


describe('async actions', () => {
  var server;

  before(function () {
     server = sinon.fakeServer.create();
     server.respondWith("GET", "http://localhost:3000/questionMetaData", [
    200, 
    {"Content-Type": "application/json"}, 
    JSON.stringify([{"uuid":"d123654"}])
    ]);
  });

  it('fetch Question Metadata should work fine when mocking service', () => {
    const servicecall = metadataAPI.get_QMD_Data();
    server.respond();
    servicecall.then(function(data){ 
        expect(data.text).toEqual(JSON.stringify([{"uuid":"d123654"}]));
      }, function(error){
        expect(error.text).toEqual(JSON.stringify([{"uuid":"d123654"}]));
      });
  });

  after(function () { 
    server.restore(); 
  });
});


describe('async actions', () => {
  var server;

  before(function () {
     server = sinon.fakeServer.create();
     server.respondWith("GET", "http://localhost:3000/questionMetaData", [
    404, 
    {"Content-Type": "application/json"}, 
    JSON.stringify([{"uuid":"Candidate2"}])
    ]);
  });

  it('fetch Question Metadata should work fine when mocking service with Error ', () => {
    const servicecall = metadataAPI.get_QMD_Data();
    server.respond();
    servicecall.then(function(data){ 
        expect(data.text).toEqual(JSON.stringify([{"uuid":"Candidate2"}]));
      }, function(error){
        expect(error.text).toEqual(JSON.stringify([{"uuid":"Candidate2"}]));
      });
  });

  after(function () { 
    server.restore(); 
  });
});


describe('async actions', () => {
  var server;

  before(function () {
     server = sinon.fakeServer.create();
     server.respondWith("GET", "http://localhost:3000/saveQuestionMetaData", [
    200, 
    {"Content-Type": "application/json"}, 
    JSON.stringify([{"uuid":"d1234"}])
    ]);
  });
 const setValues = [{
        uuid : 'saw12w32 ' , 
        assTitle:'wear',
      quesName:'qwes',
      uri:' ',
      enabObj:'' ,
      contentTypeData: [],
      audienceRolesData: [],
      difficultyLevelData: [],
      knowledgeLevelData: [],
      alignmentTypeData: [],
      timeReq:'' ,
      desc:'',
      tags: []
      }];
  it('Save Question Metadata should work fine when mocking service', () => {
    const servicecall = metadataAPI.save_QMD_Data(setValues);
    server.respond();
    servicecall.then(function(data){ 
         expect(data.text).toEqual(JSON.stringify([{"uuid":"d1234"}]));
      }, function(error){
        expect(error.text).toEqual(JSON.stringify([{"uuid":"d1234"}]));
      });
  });

  after(function () { 
    server.restore(); 
  });
});

describe('async actions', () => {
  var server;

  before(function () {
     server = sinon.fakeServer.create();
     server.respondWith("GET", "http://localhost:3000/saveQuestionMetaData", [
    404, 
    {"Content-Type": "application/json"}, 
    JSON.stringify([{"uuid":"d5554"}])
    ]);
  });

  it('Save Question Metadata should work fine when mocking service with Error ', () => {
    const servicecall = metadataAPI.save_QMD_Data();
    server.respond();
    servicecall.then(function(data){ 
        expect(data.text).toEqual(JSON.stringify([{"uuid":"d5554"}]));
      }, function(error){
        expect(error.text).toEqual(JSON.stringify([{"uuid":"d5554"}]));
      });
  });

  after(function () { 
    server.restore(); 
  });

});




















