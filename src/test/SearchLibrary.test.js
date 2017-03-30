import React from 'react';
import SearchLibrary from '../PatternAddAnAsset/js/container/SearchLibraryContainer';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import store from '../PatternAddAnAsset/js/store/index';
import { Provider } from 'react-redux';
import request from 'superagent';

import searchLibraryApi from '../PatternAddAnAsset/js/api/SearchLibraryApi';


import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../PatternAddAnAsset/js/constants/paginationConstants';


import {getSearchProductItems,
  getDifficultyLevels,
  saveSearchValues,
  deleteSavedSearch,
  runSearch,
  getProductDetails,sendToQuad } from '../PatternAddAnAsset/js/action/SearchLibraryAction';

import {
    IntlProvider,
    FormattedRelative,
} from 'react-intl';

//mocha.suite.timeout(15000);
//const localforage = require('localforage');

import Promise from 'bluebird';

const responseDataStub =  {
    "results": [
        {
            "properties": {
                "d.alfcmis:nodeRef": {
                    "id": "alfcmis:nodeRef",
                    "localName": "nodeRef",
                    "queryName": "d.alfcmis:nodeRef",
                    "type": "id",
                    "cardinality": "single",
                    "value": "workspace://SpacesStore/60cfa5c5-1f53-442c-91a2-138cd4a9a1b1"
                },
                "d.cmis:isImmutable": {
                    "id": "cmis:isImmutable",
                    "localName": "isImmutable",
                    "displayName": "Is Immutable",
                    "queryName": "d.cmis:isImmutable",
                    "type": "boolean",
                    "cardinality": "single",
                    "value": false
                },
                "d.cmis:versionLabel": {
                    "id": "cmis:versionLabel",
                    "localName": "versionLabel",
                    "displayName": "Version Label",
                    "queryName": "d.cmis:versionLabel",
                    "type": "string",
                    "cardinality": "single",
                    "value": "1.0"
                },
                "d.cmis:objectTypeId": {
                    "id": "cmis:objectTypeId",
                    "localName": "objectTypeId",
                    "queryName": "d.cmis:objectTypeId",
                    "type": "id",
                    "cardinality": "single",
                    "value": "cmis:document"
                },
                "d.cmis:description": {
                    "id": "cmis:description",
                    "localName": "description",
                    "queryName": "d.cmis:description",
                    "type": "string",
                    "cardinality": "single",
                    "value": ""
                },
                "d.cmis:createdBy": {
                    "id": "cmis:createdBy",
                    "localName": "createdBy",
                    "queryName": "d.cmis:createdBy",
                    "type": "string",
                    "cardinality": "single",
                    "value": "C2TEST08"
                },
                "d.cmis:checkinComment": {
                    "id": "cmis:checkinComment",
                    "localName": "checkinComment",
                    "displayName": "Checkin Comment",
                    "queryName": "d.cmis:checkinComment",
                    "type": "string",
                    "cardinality": "single",
                    "value": null
                },
                "d.cmis:creationDate": {
                    "id": "cmis:creationDate",
                    "localName": "creationDate",
                    "queryName": "d.cmis:creationDate",
                    "type": "datetime",
                    "cardinality": "single",
                    "value": 1484250506504
                },
                "d.cmis:isMajorVersion": {
                    "id": "cmis:isMajorVersion",
                    "localName": "isMajorVersion",
                    "displayName": "Is Major Version",
                    "queryName": "d.cmis:isMajorVersion",
                    "type": "boolean",
                    "cardinality": "single",
                    "value": true
                },
                "d.cmis:contentStreamFileName": {
                    "id": "cmis:contentStreamFileName",
                    "localName": "contentStreamFileName",
                    "displayName": "Content Stream Filename",
                    "queryName": "d.cmis:contentStreamFileName",
                    "type": "string",
                    "cardinality": "single",
                    "value": "Testdec19"
                },
                "d.cmis:name": {
                    "id": "cmis:name",
                    "localName": "name",
                    "queryName": "d.cmis:name",
                    "type": "string",
                    "cardinality": "single",
                    "value": "Testdec19"
                },
                "d.cmis:isLatestVersion": {
                    "id": "cmis:isLatestVersion",
                    "localName": "isLatestVersion",
                    "displayName": "Is Latest Version",
                    "queryName": "d.cmis:isLatestVersion",
                    "type": "boolean",
                    "cardinality": "single",
                    "value": true
                },
                "d.cmis:lastModificationDate": {
                    "id": "cmis:lastModificationDate",
                    "localName": "lastModificationDate",
                    "queryName": "d.cmis:lastModificationDate",
                    "type": "datetime",
                    "cardinality": "single",
                    "value": 1484333108876
                },
                "d.cmis:contentStreamLength": {
                    "id": "cmis:contentStreamLength",
                    "localName": "contentStreamLength",
                    "displayName": "Content Stream Length",
                    "queryName": "d.cmis:contentStreamLength",
                    "type": "integer",
                    "cardinality": "single",
                    "value": 111738
                },
                "d.cmis:objectId": {
                    "id": "cmis:objectId",
                    "localName": "objectId",
                    "queryName": "d.cmis:objectId",
                    "type": "id",
                    "cardinality": "single",
                    "value": "60cfa5c5-1f53-442c-91a2-138cd4a9a1b1;1.0"
                },
                "d.cmis:lastModifiedBy": {
                    "id": "cmis:lastModifiedBy",
                    "localName": "lastModifiedBy",
                    "queryName": "d.cmis:lastModifiedBy",
                    "type": "string",
                    "cardinality": "single",
                    "value": "C2TEST08"
                },
                "d.cmis:secondaryObjectTypeIds": {
                    "id": "cmis:secondaryObjectTypeIds",
                    "localName": "secondaryObjectTypeIds",
                    "queryName": "d.cmis:secondaryObjectTypeIds",
                    "type": "id",
                    "cardinality": "multi",
                    "value": [
                        "P:rn:renditioned",
                        "P:cm:titled",
                        "P:sys:cascadeUpdate",
                        "P:cm:taggable",
                        "P:sys:localized",
                        "P:cm:author",
                        "P:cm:thumbnailModification",
                        "P:exif:exif"
                    ]
                },
                "d.cmis:contentStreamId": {
                    "id": "cmis:contentStreamId",
                    "localName": "contentStreamId",
                    "displayName": "Content Stream Id",
                    "queryName": "d.cmis:contentStreamId",
                    "type": "id",
                    "cardinality": "single",
                    "value": "store://2017/1/12/19/48/133244c1-0504-4c9a-9866-53db4510cfd9.bin"
                },
                "d.cmis:contentStreamMimeType": {
                    "id": "cmis:contentStreamMimeType",
                    "localName": "contentStreamMimeType",
                    "displayName": "Content Stream MIME Type",
                    "queryName": "d.cmis:contentStreamMimeType",
                    "type": "string",
                    "cardinality": "single",
                    "value": "image/png"
                },
                "d.cmis:baseTypeId": {
                    "id": "cmis:baseTypeId",
                    "localName": "baseTypeId",
                    "queryName": "d.cmis:baseTypeId",
                    "type": "id",
                    "cardinality": "single",
                    "value": "cmis:document"
                },
                "d.cmis:changeToken": {
                    "id": "cmis:changeToken",
                    "localName": "changeToken",
                    "queryName": "d.cmis:changeToken",
                    "type": "string",
                    "cardinality": "single",
                    "value": null
                },
                "d.cmis:isPrivateWorkingCopy": {
                    "id": "cmis:isPrivateWorkingCopy",
                    "localName": "isPrivateWorkingCopy",
                    "displayName": "Is private working copy",
                    "queryName": "d.cmis:isPrivateWorkingCopy",
                    "type": "boolean",
                    "cardinality": "single",
                    "value": false
                },
                "d.cmis:versionSeriesCheckedOutBy": {
                    "id": "cmis:versionSeriesCheckedOutBy",
                    "localName": "versionSeriesCheckedOutBy",
                    "displayName": "Version Series Checked Out By",
                    "queryName": "d.cmis:versionSeriesCheckedOutBy",
                    "type": "string",
                    "cardinality": "single",
                    "value": null
                },
                "d.cmis:isVersionSeriesCheckedOut": {
                    "id": "cmis:isVersionSeriesCheckedOut",
                    "localName": "isVersionSeriesCheckedOut",
                    "displayName": "Is Version Series Checked Out",
                    "queryName": "d.cmis:isVersionSeriesCheckedOut",
                    "type": "boolean",
                    "cardinality": "single",
                    "value": false
                },
                "d.cmis:versionSeriesId": {
                    "id": "cmis:versionSeriesId",
                    "localName": "versionSeriesId",
                    "displayName": "Version series id",
                    "queryName": "d.cmis:versionSeriesId",
                    "type": "id",
                    "cardinality": "single",
                    "value": "60cfa5c5-1f53-442c-91a2-138cd4a9a1b1"
                },
                "d.cmis:isLatestMajorVersion": {
                    "id": "cmis:isLatestMajorVersion",
                    "localName": "isLatestMajorVersion",
                    "displayName": "Is Latest Major Version",
                    "queryName": "d.cmis:isLatestMajorVersion",
                    "type": "boolean",
                    "cardinality": "single",
                    "value": true
                },
                "d.cmis:versionSeriesCheckedOutId": {
                    "id": "cmis:versionSeriesCheckedOutId",
                    "localName": "versionSeriesCheckedOutId",
                    "displayName": "Version Series Checked Out Id",
                    "queryName": "d.cmis:versionSeriesCheckedOutId",
                    "type": "id",
                    "cardinality": "single",
                    "value": null
                },
                "t.cm:title": {
                    "id": "cm:title",
                    "localName": "title",
                    "displayName": "Title",
                    "queryName": "t.cm:title",
                    "type": "string",
                    "cardinality": "single",
                    "value": "Testdec19"
                }
            }
        }
    ],
    "hasMoreItems": true,
    "numItems": 54
}


Promise.config({
    // Enable warnings
    warnings: false,
});

let _component;

let translations = {
  'fr': {
       'Link_to_a_Product': 'Lien vers un produit',          
      }
};

//let getRequestStub;
let libConfigStub;
let wrapedComponent;



describe('SearchLibrary',() => {
  let server;
  let selector;
  let allselector;

  before(() => {
    //console.log('before');
     let libConfigTest = {
      set() {
        window.tdc = {libConfig:{ 
          alfserver:"https://test.pearsoncms.com",
          alfToken:'1234ABCD',
          headers:{
            'X-PearsonSSOSession': 'AQIC5wM2LY4SfcxMF7qZmknuO_TFh2Q5u11dUx-vrAUPSDs.*AAJTSQACMDIAAlNLABM0Mzc4NzQ5NTgxOTIyODM5NjcwAAJTMQACMDE.*'
          },
          nodeRef:'1db76108-983b-49b4-9569-13ad36e2c42d',
          tabVisibility:JSON.stringify({ "audio" : true, "image": true, "other":true, "video": true,"epsUrl":false})
          }
            };
      }
    }
    

      libConfigTest.set();
      libConfigStub = sinon.stub(libConfigTest,'set');
    
      //getRequestStub = sinon.stub(request, 'get');
     const responseDataStub = {
    "results": [{
      "properties": {
        "cmis:objectId": {
          "id": "cmis:objectId",
          "localName": "objectId",
          "queryName": "cmis:objectId",
          "type": "id",
          "cardinality": "single",
          "value": "1db76108-983b-49b4-9569-13ad36e2c42d"
        },
        "alfcmis:nodeRef": {
          "id": "alfcmis:nodeRef",
          "localName": "nodeRef",
          "queryName": "alfcmis:nodeRef",
          "type": "id",
          "cardinality": "single",
          "value": "workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d"
        },
        "cmis:path": {
          "id": "cmis:path",
          "localName": "path",
          "displayName": "Path",
          "queryName": "cmis:path",
          "type": "string",
          "cardinality": "single",
          "value": "/Sites/testshan10"
        },
        "cmis:allowedChildObjectTypeIds": {
          "id": "cmis:allowedChildObjectTypeIds",
          "localName": "allowedChildObjectTypeIds",
          "displayName": "Allowed Child Object Types Ids",
          "queryName": "cmis:allowedChildObjectTypeIds",
          "type": "id",
          "cardinality": "multi",
          "value": null
        },
        "cmis:lastModifiedBy": {
          "id": "cmis:lastModifiedBy",
          "localName": "lastModifiedBy",
          "queryName": "cmis:lastModifiedBy",
          "type": "string",
          "cardinality": "single",
          "value": "C2TEST01"
        },
        "cmis:secondaryObjectTypeIds": {
          "id": "cmis:secondaryObjectTypeIds",
          "localName": "secondaryObjectTypeIds",
          "queryName": "cmis:secondaryObjectTypeIds",
          "type": "id",
          "cardinality": "multi",
          "value": [
            "P:cm:tagscope",
            "P:cm:titled",
            "P:sys:unmovable",
            "P:sys:localized",
            "P:sys:undeletable"
          ]
        },
        "cmis:objectTypeId": {
          "id": "cmis:objectTypeId",
          "localName": "objectTypeId",
          "queryName": "cmis:objectTypeId",
          "type": "id",
          "cardinality": "single",
          "value": "F:st:site"
        },
        "cmis:description": {
          "id": "cmis:description",
          "localName": "description",
          "queryName": "cmis:description",
          "type": "string",
          "cardinality": "single",
          "value": ""
        },
        "cmis:createdBy": {
          "id": "cmis:createdBy",
          "localName": "createdBy",
          "queryName": "cmis:createdBy",
          "type": "string",
          "cardinality": "single",
          "value": "C2TEST01"
        },
        "cmis:baseTypeId": {
          "id": "cmis:baseTypeId",
          "localName": "baseTypeId",
          "queryName": "cmis:baseTypeId",
          "type": "id",
          "cardinality": "single",
          "value": "cmis:folder"
        },
        "cmis:parentId": {
          "id": "cmis:parentId",
          "localName": "parentId",
          "displayName": "Parent Id",
          "queryName": "cmis:parentId",
          "type": "id",
          "cardinality": "single",
          "value": "b2827901-47ab-447e-b808-043bd3ad8ba2"
        },
        "cmis:creationDate": {
          "id": "cmis:creationDate",
          "localName": "creationDate",
          "queryName": "cmis:creationDate",
          "type": "datetime",
          "cardinality": "single",
          "value": 1481871021637
        },
        "cmis:changeToken": {
          "id": "cmis:changeToken",
          "localName": "changeToken",
          "queryName": "cmis:changeToken",
          "type": "string",
          "cardinality": "single",
          "value": null
        },
        "cmis:name": {
          "id": "cmis:name",
          "localName": "name",
          "queryName": "cmis:name",
          "type": "string",
          "cardinality": "single",
          "value": "testshan10"
        },
        "cmis:lastModificationDate": {
          "id": "cmis:lastModificationDate",
          "localName": "lastModificationDate",
          "queryName": "cmis:lastModificationDate",
          "type": "datetime",
          "cardinality": "single",
          "value": 1481871029191
        }
      }
    }
  ],
  "hasMoreItems": false,
  "numItems": 1
  };
   
   //https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT * FROM cmis:folder WHERE cmis:objectId='1db76108-983b-49b4-9569-13ad36e2c42d'
   //https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND d.cmis:contentStreamMimeType LIKE 'image/%25'  ORDER BY cmis:creationDate desc
   let url1 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT * FROM cmis:folder WHERE cmis:objectId='1db76108-983b-49b4-9569-13ad36e2c42d'";
   

    /*sinon.stub(request.Request.prototype, 'end', (callback) => {
    callback(null, { body: responseDataStub });
    });*/

    server = sinon.fakeServer.create();
    var result1;
    var result2;

    server.respondWith('GET', url1,[200, 
    {"Content-Type": "application/json"}, 
    JSON.stringify(responseDataStub)]);
   

   
    /*var s = sinon.stub(request.Request.prototype, 'end');
    s.withArgs(url1).returns((callback) => {
    callback(null, { body: null });
    });

    s.withArgs(url2).returns((callback) => {
    callback(null, { body: null });
    });*/
  

      
    _component = ReactTestUtils.renderIntoDocument(React.createElement(
      IntlProvider,
      { locale: 'en', messages: translations['en'] },

      React.createElement(
        Provider,
        { store: store },
        React.createElement(SearchLibrary, { clearModal: sinon.stub(),
        ref: function ref(c) {
            return wrapedComponent = c;
            }
          })
      )
    ));

    server.respond((err, res) => {
    //console.log(err);
    //console.log(res);
    //done();
   });


   //console.log(_component);
    //console.log(wrapedComponent);
     
  });

 it('should handle OnClick', function() {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
         //this.timeout(10000);
    
         selector = sinon.stub(document, 'querySelector');
         
         selector.withArgs('#addAnAssets .react-autosuggest__input').returns({
            value: ''
           });

          allselector = sinon.stub(document, 'querySelectorAll');
         
          allselector.withArgs('#displayContainerDiv').returns([{
            style: {
              display:'block'
            }
           }]);

          allselector.withArgs('.selectBtn').returns([{
            style: {
              display:'inline-block'
            }
           }]);

      //document.querySelectorAll('#displayContainerDiv')[0].style.display = 'block';
      //document.querySelectorAll('.selectBtn')[0].style.display = 'inline-block'; 
      //console.log(DEFAULT_PAGE_NO);

      //var spy = sinon.spy();
      //spy(DEFAULT_PAGE_NO);
        /*stubRequest  = sinon.stub(request.Request.prototype, 'end', (callback) => {
        callback(null, { body: null });
        });*/

       //console.log(request.Request.prototype);

       ReactTestUtils.Simulate.click(ReactTestUtils.scryRenderedDOMComponentsWithTag(wrapedComponent, 'button')[0]);
       //console.log(_component);
       //done();
       //setTimeout(done, 10000);

    });


    
  it('should Connect Component isCompositeComponent', () => {  

    expect(ReactTestUtils.isCompositeComponent(wrapedComponent)).toBe(true);

  });

  it('should Connect Component isCompositeComponentWithType', () => {

  expect(ReactTestUtils.isCompositeComponent(wrapedComponent,SearchLibrary)).toBe(true);

  });

  it('should Connect Component findAllInRenderedTree', () => {  
  var allDivs  = ReactTestUtils.findAllInRenderedTree(wrapedComponent,(c) => c.tagName === 'DIV');    
  expect(allDivs).toBeAn('array');
  //expect(allDivs.length).toBe(4);
  //console.log(allDivs);
  });




  after(() => {
    //mocha.suite.timeout(15000);
    //console.log('after');
    //getRequestStub.restore();
    libConfigStub.restore();
    //request.Request.prototype.end.restore();
    setTimeout(() => {
    selector.restore(); 
    allselector.restore();
    },6000)
    
    //stubRequest.restore();
    //done();
    //setTimeout(done, 15000);
    server.restore();
  });       
});





describe('SearchLibrary getSearchProductItems',() => {
  var server;

  before(() => {
     server = sinon.fakeServer.create();
  });

  it('should handle API Call Success', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   this.timeout(5000);
   

    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND d.cmis:contentStreamMimeType LIKE 'image/%25'  ORDER BY cmis:creationDate desc";   
    
    
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         
         searchLibraryApi.searchAssets('','image/*','0','9',).then((success) => {                    
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
           //console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        
        //debugger;

        //expect(store.getActions()).toEqual(expectedActions)
        //console.log(store);
        //console.log(store.getState().searchAssets.last());
        
        //var assetData = {"results":[{"properties":{"d.alfcmis:nodeRef":{"id":"alfcmis:nodeRef","localName":"nodeRef","queryName":"d.alfcmis:nodeRef","type":"id","cardinality":"single","value":"workspace://SpacesStore/60cfa5c5-1f53-442c-91a2-138cd4a9a1b1"},"d.cmis:isImmutable":{"id":"cmis:isImmutable","localName":"isImmutable","displayName":"Is Immutable","queryName":"d.cmis:isImmutable","type":"boolean","cardinality":"single","value":false},"d.cmis:versionLabel":{"id":"cmis:versionLabel","localName":"versionLabel","displayName":"Version Label","queryName":"d.cmis:versionLabel","type":"string","cardinality":"single","value":"1.0"},"d.cmis:objectTypeId":{"id":"cmis:objectTypeId","localName":"objectTypeId","queryName":"d.cmis:objectTypeId","type":"id","cardinality":"single","value":"cmis:document"},"d.cmis:description":{"id":"cmis:description","localName":"description","queryName":"d.cmis:description","type":"string","cardinality":"single","value":""},"d.cmis:createdBy":{"id":"cmis:createdBy","localName":"createdBy","queryName":"d.cmis:createdBy","type":"string","cardinality":"single","value":"C2TEST08"},"d.cmis:checkinComment":{"id":"cmis:checkinComment","localName":"checkinComment","displayName":"Checkin Comment","queryName":"d.cmis:checkinComment","type":"string","cardinality":"single","value":null},"d.cmis:creationDate":{"id":"cmis:creationDate","localName":"creationDate","queryName":"d.cmis:creationDate","type":"datetime","cardinality":"single","value":1484250506504},"d.cmis:isMajorVersion":{"id":"cmis:isMajorVersion","localName":"isMajorVersion","displayName":"Is Major Version","queryName":"d.cmis:isMajorVersion","type":"boolean","cardinality":"single","value":true},"d.cmis:contentStreamFileName":{"id":"cmis:contentStreamFileName","localName":"contentStreamFileName","displayName":"Content Stream Filename","queryName":"d.cmis:contentStreamFileName","type":"string","cardinality":"single","value":"Testdec19"},"d.cmis:name":{"id":"cmis:name","localName":"name","queryName":"d.cmis:name","type":"string","cardinality":"single","value":"Testdec19"},"d.cmis:isLatestVersion":{"id":"cmis:isLatestVersion","localName":"isLatestVersion","displayName":"Is Latest Version","queryName":"d.cmis:isLatestVersion","type":"boolean","cardinality":"single","value":true},"d.cmis:lastModificationDate":{"id":"cmis:lastModificationDate","localName":"lastModificationDate","queryName":"d.cmis:lastModificationDate","type":"datetime","cardinality":"single","value":1484333108876},"d.cmis:contentStreamLength":{"id":"cmis:contentStreamLength","localName":"contentStreamLength","displayName":"Content Stream Length","queryName":"d.cmis:contentStreamLength","type":"integer","cardinality":"single","value":111738},"d.cmis:objectId":{"id":"cmis:objectId","localName":"objectId","queryName":"d.cmis:objectId","type":"id","cardinality":"single","value":"60cfa5c5-1f53-442c-91a2-138cd4a9a1b1;1.0"},"d.cmis:lastModifiedBy":{"id":"cmis:lastModifiedBy","localName":"lastModifiedBy","queryName":"d.cmis:lastModifiedBy","type":"string","cardinality":"single","value":"C2TEST08"},"d.cmis:secondaryObjectTypeIds":{"id":"cmis:secondaryObjectTypeIds","localName":"secondaryObjectTypeIds","queryName":"d.cmis:secondaryObjectTypeIds","type":"id","cardinality":"multi","value":["P:rn:renditioned","P:cm:titled","P:sys:cascadeUpdate","P:cm:taggable","P:sys:localized","P:cm:author","P:cm:thumbnailModification","P:exif:exif"]},"d.cmis:contentStreamId":{"id":"cmis:contentStreamId","localName":"contentStreamId","displayName":"Content Stream Id","queryName":"d.cmis:contentStreamId","type":"id","cardinality":"single","value":"store://2017/1/12/19/48/133244c1-0504-4c9a-9866-53db4510cfd9.bin"},"d.cmis:contentStreamMimeType":{"id":"cmis:contentStreamMimeType","localName":"contentStreamMimeType","displayName":"Content Stream MIME Type","queryName":"d.cmis:contentStreamMimeType","type":"string","cardinality":"single","value":"image/png"},"d.cmis:baseTypeId":{"id":"cmis:baseTypeId","localName":"baseTypeId","queryName":"d.cmis:baseTypeId","type":"id","cardinality":"single","value":"cmis:document"},"d.cmis:changeToken":{"id":"cmis:changeToken","localName":"changeToken","queryName":"d.cmis:changeToken","type":"string","cardinality":"single","value":null},"d.cmis:isPrivateWorkingCopy":{"id":"cmis:isPrivateWorkingCopy","localName":"isPrivateWorkingCopy","displayName":"Is private working copy","queryName":"d.cmis:isPrivateWorkingCopy","type":"boolean","cardinality":"single","value":false},"d.cmis:versionSeriesCheckedOutBy":{"id":"cmis:versionSeriesCheckedOutBy","localName":"versionSeriesCheckedOutBy","displayName":"Version Series Checked Out By","queryName":"d.cmis:versionSeriesCheckedOutBy","type":"string","cardinality":"single","value":null},"d.cmis:isVersionSeriesCheckedOut":{"id":"cmis:isVersionSeriesCheckedOut","localName":"isVersionSeriesCheckedOut","displayName":"Is Version Series Checked Out","queryName":"d.cmis:isVersionSeriesCheckedOut","type":"boolean","cardinality":"single","value":false},"d.cmis:versionSeriesId":{"id":"cmis:versionSeriesId","localName":"versionSeriesId","displayName":"Version series id","queryName":"d.cmis:versionSeriesId","type":"id","cardinality":"single","value":"60cfa5c5-1f53-442c-91a2-138cd4a9a1b1"},"d.cmis:isLatestMajorVersion":{"id":"cmis:isLatestMajorVersion","localName":"isLatestMajorVersion","displayName":"Is Latest Major Version","queryName":"d.cmis:isLatestMajorVersion","type":"boolean","cardinality":"single","value":true},"d.cmis:versionSeriesCheckedOutId":{"id":"cmis:versionSeriesCheckedOutId","localName":"versionSeriesCheckedOutId","displayName":"Version Series Checked Out Id","queryName":"d.cmis:versionSeriesCheckedOutId","type":"id","cardinality":"single","value":null},"t.cm:title":{"id":"cm:title","localName":"title","displayName":"Title","queryName":"t.cm:title","type":"string","cardinality":"single","value":"Testdec19"}}}],"hasMoreItems":true,"numItems":54,"index":0,"limit":9,"pageNo":1,"pageLimit":9,"SearchValue":"","showSaveSearch":true,"selectedIndex":0,"displayItemCount":9,"numberFound":54,"totalRecords":1,"tabVisibility":true,"viewName":"grid-view","items":[{"nodeRef":"workspace://SpacesStore/60cfa5c5-1f53-442c-91a2-138cd4a9a1b1","mimetype":"image/png","displayName":"Testdec19","name":"Testdec19","title":"Testdec19","modifiedBy":"C2TEST08","modifiedByUser":"C2TEST08","description":"","modifiedOn":1484333108876,"size":111738,"container":"documentLibrary","type":"document"}]}

         server.respond((err,res) => {
           //console.log(err);
           //console.log(res);
          // console.log(store.getState().searchAssets);
           /* store.dispatch({
            type : 'SEARCH_DISPLAY_ASSETS',
            data : assetData
          });

          console.log(store.getState().searchAssets.last());*/
          
         });     

    });

  after(() => {
    //console.log('after');
    server.restore();
  } );

  });




describe('SearchLibrary getSearchProductItems',() => {
  var server;

  before(() => {

     let libConfigTest = {
      set() {
        window.tdc = {libConfig:{ 
          alfserver:"https://test.pearsoncms.com",
          alfToken:'1234ABCD',
          headers:{
            'X-PearsonSSOSession': 'AQIC5wM2LY4SfcxMF7qZmknuO_TFh2Q5u11dUx-vrAUPSDs.*AAJTSQACMDIAAlNLABM0Mzc4NzQ5NTgxOTIyODM5NjcwAAJTMQACMDE.*'
          },
          nodeRef:'1db76108-983b-49b4-9569-13ad36e2c42d',
          tabVisibility:JSON.stringify({ "audio" : true, "image": false, "other":true, "video": true,"epsUrl":false})
          }
            };
      }
    }
    

      libConfigTest.set();
      libConfigStub = sinon.stub(libConfigTest,'set');
      server = sinon.fakeServer.create();


  });

  it('should handle API Call Success With tabVisibility Image False', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
    this.timeout(5000);
    

    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND d.cmis:contentStreamMimeType LIKE 'image/%25'  ORDER BY cmis:creationDate desc";   

    
    server.respondWith('GET',url2,[200, 
    {"Content-Type": "application/json"}, 
    JSON.stringify(responseDataStub)]);

    searchLibraryApi.searchAssets('','image/*','0','9',).then((success) => {                    
    expect(success.status).toEqual(200);          
    expect(success.statusText).toEqual('OK');    
    done();   
    //store.dispatch();

    },(error) => {
    //console.log(error);
    done();   
    });

    //store.dispatch(getSearchProductItems('',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));

    server.respond((err,res) => {


    });

    });


  after(() => {
    //console.log('after');
    server.restore();
    libConfigStub.restore();
  } );

  });




describe('SearchLibrary getSearchProductItems',() => {
  var server;

  before(() => {
    server = sinon.fakeServer.create();
  });

  it('should handle API Call Failure', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
    this.timeout(5000);
    

    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND d.cmis:contentStreamMimeType LIKE 'image/%25'  ORDER BY cmis:creationDate desc";   
    
   
         server.respondWith('GET',url2,[401, 
         {"Content-Type": "application/json"}, 
         '{"error":"failure"}']);

         
         searchLibraryApi.searchAssets('','image/*','0','9',).then((success) => {                    
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
          //console.log(error.res);
          expect(error.res.status).toEqual(401);          
          expect(error.res.statusText).toEqual('Unauthorized');    
          //debugger;
          done();   
         });

        //store.dispatch(getSearchProductItems('',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
     
         server.respond((err,res) => {
    
         });

        

    });


  after(() => {
    server.restore();
  } );

  });


describe('SearchLibrary getSearchProductItems',() => {
  var server;
  var selector;
  before(() => {
    server = sinon.fakeServer.create();

  });

  it('should handle API Call Success With Value "Text"', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   this.timeout(5000);
   

    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND t.cm:title LIKE '%25test%25'  AND d.cmis:contentStreamMimeType LIKE 'image/%25'  ORDER BY cmis:creationDate desc";   
 
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         //console.log(success);        
         
         searchLibraryApi.searchAssets('test','image/*','0','9',).then((success) => {              
          //console.log(success);                
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
           //console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        server.respond((err,res) => {
         });

        

    });



it('should handle API Call Success For Others Asset', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   
   this.timeout(5000);
   //server = sinon.fakeServer.create();
    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND d.cmis:contentStreamMimeType NOT IN('image/*','audio/*','video/*') ORDER BY cmis:creationDate desc";   
    
    
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         //console.log(success);        
         
         searchLibraryApi.searchAssets('','/*','0','9',).then((success) => {              
          //console.log(success);                
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
          console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        server.respond((err,res) => {
         });

        

    });

  
  it('should handle API Call Success For Video Asset', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   
    this.timeout(5000);
    // server = sinon.fakeServer.create();
     var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND d.cmis:contentStreamMimeType LIKE 'video/%25'  ORDER BY cmis:creationDate desc";   
    
    
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         //console.log(success);        
         
         searchLibraryApi.searchAssets('','video/*','0','9',).then((success) => {              
          //console.log(success);                
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
           console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        server.respond((err,res) => {
          //console.log(err);
         });

        

    });

  it('should handle API Call Success For Audio Asset', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   
   this.timeout(5000);
   //server = sinon.fakeServer.create();
    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND d.cmis:contentStreamMimeType LIKE 'audio/%25'  ORDER BY cmis:creationDate desc";   
    
    
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         //console.log(success);        
         
         searchLibraryApi.searchAssets('','audio/*','0','9',).then((success) => {              
          //console.log(success);                
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
          console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        server.respond((err,res) => {
         });

        

    });


it('should handle API Call Success With "_"', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   
   this.timeout(5000);
   //server = sinon.fakeServer.create();
    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&skipCount=0&maxItems=9&q=SELECT d.*,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where in_tree(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND t.cm:title LIKE '%25%5C_%25'  AND d.cmis:contentStreamMimeType NOT IN('image/*','audio/*','video/*') ORDER BY cmis:creationDate desc";   
  
    
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         //console.log(success);        
         
         searchLibraryApi.searchAssets('_','/*','0','9',).then((success) => {              
          //console.log(success);                
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
          console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        server.respond((err,res) => {
         });

    });


it('should handle autoComplete_Data API Call Success With Value "Null"', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   
   this.timeout(5000);
   //server = sinon.fakeServer.create();
    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT d.cmis:name,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where IN_TREE(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') ORDER BY cm:title";   
  
    
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         //console.log(success);        
         
         searchLibraryApi.autoComplete_Data('').then((success) => {              
          //console.log(success);                
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
          console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        server.respond((err,res) => {
         });

    });



it('should handle autoComplete_Data API Call Success With Value "Test"', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
       //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   
   this.timeout(5000);
   //server = sinon.fakeServer.create();
    var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT d.cmis:name,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where IN_TREE(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND t.cm:title LIKE '%25%Test%25'  ORDER BY cm:title";   
  
    
         server.respondWith('GET',url2,[200, 
         {"Content-Type": "application/json"}, 
         JSON.stringify(responseDataStub)]);

         //console.log(success);        
         
         searchLibraryApi.autoComplete_Data('Test').then((success) => {              
          //console.log(success);                
          expect(success.status).toEqual(200);          
          expect(success.statusText).toEqual('OK');    
          done();   
          //store.dispatch();

         },(error) => {
          console.log(error);
           done();   
         });

        //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
        server.respond((err,res) => {
         });

    });
  
it('should handle autoComplete_Data API Call Success With Value "_"', function(done) {
   //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
   //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
   
   this.timeout(5000);
   //server = sinon.fakeServer.create();
   var url2 = "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=SELECT d.cmis:name,t.cm:title FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId where IN_TREE(d,'workspace://SpacesStore/1db76108-983b-49b4-9569-13ad36e2c42d') AND t.cm:title LIKE '%25%5C____%25'  ORDER BY cm:title";   
     
   server.respondWith('GET',url2,[200, 
   {"Content-Type": "application/json"}, 
   JSON.stringify(responseDataStub)]);

   //console.log(success);        
   
   searchLibraryApi.autoComplete_Data('____').then((success) => {              
    //console.log(success);                
    expect(success.status).toEqual(200);          
    expect(success.statusText).toEqual('OK');    
    done();   
    //store.dispatch();

   },(error) => {
    console.log(error);
     done();   
   });

   //store.dispatch(getSearchProductItems('test',DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS,0));
   server.respond((err,res) => {});
  });

it('should handle saveSearchValue', function() {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
    //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
    //var callback = sinon.stub(searchLibraryApi,'saveSearchValue');
    //callback.withArgs('Test').returns(1);
    //callback('Test');
    store.dispatch(runSearch('test'));

});


/*it('should handle runSearch', function(done) {
    //var onSuggestionSelectedSpy = sinon.stub(wrapedComponent.dispatchProps, 'onSuggestionSelected');
    //ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
    //var callback = sinon.stub(searchLibraryApi,'saveSearchValue');
    //callback.withArgs('Test').returns(1);
    //callback('Test');
      this.timeout(15000);  
      let state = store.getState();
      let savedSearchData = state.savedSearchReducers[0].savedData;
      state.savedSearchReducers[0].savedData = [{checked:true,name:'Test'}]
      console.log(savedSearchData);

      //selector = sinon.stub(document, 'querySelector');
     
      /*selector.withArgs('#addAnAssets .react-autosuggest__input').returns({
        value: ''
       });
     */
/*
      var stub =   sinon.spy(runSearch);
 
    //store.dispatch(stub());
    store.dispatch(stub())
    //console.log(store.dispatch(runSearch()));

    setTimeout(() => { done() },15000);

});*/

after(() => {
    server.restore();
});


});


