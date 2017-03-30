import React from 'react';
import ProductLinkComponent from '../../PatternProductLink/js/components/ProductLink';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';

import { Provider } from 'react-redux';

import bean from 'bean';

import ProductLinkApi from '../../PatternProductLink/js/api/ProductLinkApi';

import _ from 'lodash';

import store from '../../PatternProductLink/js/store';

import {
    IntlProvider,
    FormattedRelative,
} from 'react-intl';

import request from 'superagent';
import Promise from 'bluebird';

import AlfrescoApiService from '../../common/util/alfrescoApiService';

import Autosuggest from 'react-autosuggest';


import { updateInputValue,
         clearSuggestions,
         loadSuggestionsBegin,
         maybeUpdateSuggestions,
         updateAllProduct,
         loadAllProductBegin,
         errorAllProduct
        } from '../../PatternProductLink/js/actions/actionproductLink';



let _suggestion = [
   {
      "name": "qatestingsite",
      "nodeRef": "09464033-818c-4bc3-afdf-a1f166a55798",
      "siteVisibility": "MODERATED"
   }
]

function createMockStore(state) {
	
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {...state};
    }
  };
}

function setup(storeState) {
  let renderer = ReactTestUtils.createRenderer();
  
  const intlProvider = new IntlProvider({locale: 'en'}, {});
  const {intl} = intlProvider.getChildContext();
  
  const dispatchSpy = sinon.spy();
  const onChange  = dispatchSpy;
  const onSuggestionsFetchRequested = dispatchSpy;
  const onSuggestionSelected = dispatchSpy;
  
  const onSuggestionsUpdateRequested = dispatchSpy;
  const onLinkClick = dispatchSpy;
  const componentWillMount = dispatchSpy;
  const onSuggestionsClearRequested = dispatchSpy;
  const closeModal = dispatchSpy;
   
 


let testResult = '{"results": [{"properties":{"cmis:name":{"id":"cmis:name","localName":"name","queryName":"cmis:name","type":"string","cardinality":"single","value":"firstsite"},"cmis:objectId":{"id":"cmis:objectId","localName":"objectId","queryName":"cmis:objectId","type":"id","cardinality":"single","value":"4cea12aa-8288-4b28-9415-5163ff3aea34"}}}]}';


expect.spyOn(bean,'fire');

renderer.render(React.cloneElement(ProductLinkComponent, {
  intl: intl,
  patConfig: {eventId:1234},
  closeModal:closeModal,
  store: createMockStore(storeState),
  libConfig:{alfserver:'',
      headers:{
            'X-PearsonSSOSession': 'AQIC5wM2LY4SfcxMF7qZmknuO_TFh2Q5u11dUx-vrAUPSDs.*AAJTSQACMDIAAlNLABM0Mzc4NzQ5NTgxOTIyODM5NjcwAAJTMQACMDE.*'
           }
           }, 
  })
);

   	 
  var output = renderer.getRenderOutput();

  return output;
}


/*describe('ProductLink Component', () => {

var connectedApp;
var element;
var translations = {
	'fr': {
			 'Link_to_a_Product': 'Lien vers un produit',			 		 
		  }
};
const closeModal = sinon.spy();
const patConfig = {eventId:1234};
const libConfig = {alfserver:"https://test.pearsoncms.com",
				   alfToken:'1234ABCD',
           headers:{
            'X-PearsonSSOSession': 'AQIC5wM2LY4SfcxMF7qZmknuO_TFh2Q5u11dUx-vrAUPSDs.*AAJTSQACMDIAAlNLABM0Mzc4NzQ5NTgxOTIyODM5NjcwAAJTMQACMDE.*'
           }
         };

var requestSpy = sinon.spy(request);
var PromiseSpy = sinon.spy(Promise);


var apitest;

var server;

before( (done) => {



server = sinon.fakeServer.create();



connectedApp = ReactTestUtils.renderIntoDocument(
    	React.createElement(
  IntlProvider,
  { locale: 'en', messages: translations['en'] },
  React.createElement(
    Provider,
    { store: store },
    React.createElement(ProductLinkComponent, {
      ref: function ref(c) {
        return element = c;
      },
      patConfig: patConfig,
      libConfig: libConfig,

      closeModal: closeModal })
  )
)
    	);
    

done();

});

after(() => {
 
    server.restore(); 
    
  });


it('should call API Success', (done) => {
    mocha.suite.timeout(15000);
    const libConfig = {alfserver:"https://test.pearsoncms.com",
    alfToken:'1234ABCD',
    headers:{
    'X-PearsonSSOSession': 'AQIC5wM2LY4SfcxMF7qZmknuO_TFh2Q5u11dUx-vrAUPSDs.*AAJTSQACMDIAAlNLABM0Mzc4NzQ5NTgxOTIyODM5NjcwAAJTMQACMDE.*'
    }
    };

    server.respondWith("GET", "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=select cmis:name,cmis:objectId,st:siteVisibility from st:site where st:siteVisibility IN ('PRIVATE', 'PUBLIC', 'MODERATED')", [
    200, 
    {"Content-Type": "application/json"}, 
    '{"results":[{"properties":{"cmis:name":{"id":"cmis:name","localName":"name","queryName":"cmis:name","type":"string","cardinality":"single","value":"qatestingsite"},"cmis:objectId":{"id":"cmis:objectId","localName":"objectId","queryName":"cmis:objectId","type":"id","cardinality":"single","value":"09464033-818c-4bc3-afdf-a1f166a55798"},"st:siteVisibility":{"id":"st:siteVisibility","localName":"siteVisibility","displayName":"Site Visibility","queryName":"st:siteVisibility","type":"string","cardinality":"single","value":"MODERATED"}}}],"hasMoreItems":true,"numItems":1}', 
    ]);


  ProductLinkApi.getProduct(libConfig).then((success) => {    
    done();  	
  },(error) => {    
     done();     
     
  })  
  server.respond((err, res) => {
    
   });
});



it('should call Component Loading', function() {
  ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(element, 'button'));  
});


it('should Connect Component isCompositeComponent', () => {  

 expect(ReactTestUtils.isCompositeComponent(element)).toBe(true);

});

it('should Connect Component isCompositeComponentWithType', () => {
  
 expect(ReactTestUtils.isCompositeComponent(element,ProductLinkComponent)).toBe(true);

});

it('should Connect Component isCompositeComponent', () => {  
 
 expect(ReactTestUtils.isCompositeComponent(element)).toBe(true);

});

it('should Connect Component findAllInRenderedTree', () => {  
   var allDivs  = ReactTestUtils.findAllInRenderedTree(element,(c) => c.tagName === 'DIV');    
   expect(allDivs).toBeAn('array');
   expect(allDivs.length).toBe(4);
});


it('should Connect Component scryRenderedDOMComponentsWithClass', () => {  
   var allDivs  = ReactTestUtils.findAllInRenderedTree(element,(c) => c.tagName === 'DIV');    
  
   var allDOMComponentsWithMatchingClass = ReactTestUtils.scryRenderedDOMComponentsWithClass(
  element,
  'react-autosuggest__container'
);
  
  expect(allDOMComponentsWithMatchingClass).toBeAn('array');
  expect(allDOMComponentsWithMatchingClass.length).toBe(1);

});


	it('should Connect Component findRenderedDOMComponentWithClass', () => {  
	var singleComponentWithMatchedClass = ReactTestUtils.findRenderedDOMComponentWithClass(
	element,
	'react-autosuggest__container'
	);

	
	expect(singleComponentWithMatchedClass).toBeAn('object');
	expect(singleComponentWithMatchedClass).toNotBeAn('array');
	expect(singleComponentWithMatchedClass.className).toBe('react-autosuggest__container');

	});

  it('should handle findRenderedComponentWithType', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );

    //AutoSuggestComponent.input.value ="test";

    //ReactTestUtils.Simulate.change(AutoSuggestComponent.input);

    expect(AutoSuggestComponent).toBeAn('object');
    expect(AutoSuggestComponent).toNotBeAn('array');   
    expect(ReactTestUtils.isCompositeComponentWithType(
    AutoSuggestComponent,
    Autosuggest
    )).toBe(true);

  })

    it('should handle Input Change', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );

    AutoSuggestComponent.input.value ="test";
  
    ReactTestUtils.Simulate.change(AutoSuggestComponent.input);    
   })

    it('should handle Input Focus', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );

    //var onSuggestionSelectedSpy = sinon.spy(AutoSuggestComponent,'props');
    
    console.log(AutoSuggestComponent.props.onSuggestionSelected(event, {suggestion:[]}));
    console.log(AutoSuggestComponent.props.onSuggestionsUpdateRequested({value:'test',reason:'click'}));
    console.log(AutoSuggestComponent.props.onSuggestionsClearRequested());
    console.log(AutoSuggestComponent.props.getSuggestionValue(_suggestion[0])); 
    AutoSuggestComponent.props.renderSuggestion(_suggestion[0]);
    
         
    ReactTestUtils.Simulate.focus(AutoSuggestComponent.input);    

    //ReactTestUtils.Simulate.change(AutoSuggestComponent.input);    
    })

    it('should handle onSuggestionSelected', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );

     //var _component = setup(store);
      
    //var addTodoSpy = expect.spyOn(output.props, 'closeModal');

    //console.log(expect(addTodoSpy.calls.length));
    //console.log(element);

    //var onSuggestionSelecteSpy = expect.spyOn(element.dispatchProps, 'onSuggestionSelected');
    var onSuggestionSelectedSpy = sinon.stub(element.dispatchProps, 'onSuggestionSelected');
    
    element.dispatchProps.onSuggestionSelected(event, {suggestion:_suggestion});    
    AutoSuggestComponent.props.onSuggestionSelected(event, {suggestion:_suggestion});       
    expect(onSuggestionSelectedSpy.called).toEqual(true);
    //console.log(expect(onSuggestionSelectedSpy));
    expect(onSuggestionSelectedSpy.args[0][1]['suggestion']).toEqual(_suggestion);
    expect(onSuggestionSelectedSpy.args[0][1]['suggestion']).toBeAn('array');     

    //expect(onSuggestionSelectedSpy.calls.length).toBe(1);
    
    //expect(onSuggestionSelectedSpy.calls).toBeFalsy();
     /*setTimeout(function(){
      console.log(expect(onSuggestionSelectedSpy.called).toEqual(true));
    },1000);

    onSuggestionSelectedSpy.restore();
    });

   it('should handle onSuggestionsUpdateRequested', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );

    AutoSuggestComponent.props.onSuggestionsUpdateRequested({value:'test',reason:'click'});

     var onSuggestionsUpdateRequestedSpy = sinon.stub(element.dispatchProps, 'onSuggestionsUpdateRequested');
    
     element.dispatchProps.onSuggestionsUpdateRequested({value:'test',reason:'click'});        
     expect(onSuggestionsUpdateRequestedSpy.called).toEqual(true);
    //console.log(expect(onSuggestionsUpdateRequestedSpy));
     //console.log(expect(store.dispatch));
     expect(store.getState()['ProductLinkReducer']['allProduct']).toEqual(_suggestion);
     expect(store.getState()['ProductLinkReducer']['suggestions']).toEqual([]);

    //expect(onSuggestionsUpdateRequestedSpy.args[0][1]['suggestion']).toEqual(_suggestion);
    //expect(onSuggestionsUpdateRequestedSpy.args[0][1]['suggestion']).toBeAn('array');     
    
    onSuggestionsUpdateRequestedSpy.restore();


    })

   it('should handle onSuggestionsClearRequested', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );

    AutoSuggestComponent.props.onSuggestionsClearRequested()
    
    })

   it('should handle getSuggestionValue', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );  
    AutoSuggestComponent.props.getSuggestionValue(_suggestion[0]);
    })

  it('should handle renderSuggestion', () => {

    var AutoSuggestComponent = ReactTestUtils.findRenderedComponentWithType(
    element,
    Autosuggest
    );  
    AutoSuggestComponent.props.renderSuggestion(_suggestion[0]);
  })   

 
 it('should handle errorAllProduct Actions', () => {
    store.dispatch(errorAllProduct({message:'failure'}));
    expect(store.getState()['ProductLinkReducer']['errMessage']).toEqual('failure');   
  })
 
});


describe('ProductLink Component API',() => {
let server;
let component;
let element;

let translations = {
  'fr': {
       'Link_to_a_Product': 'Lien vers un produit',          
      }
};
const closeModal = sinon.spy();
const patConfig = {eventId:1234};
const libConfig = {alfserver:"https://test.pearsoncms.com",
           alfToken:'1234ABCD',
           headers:{
            'X-PearsonSSOSession': 'AQIC5wM2LY4SfcxMF7qZmknuO_TFh2Q5u11dUx-vrAUPSDs.*AAJTSQACMDIAAlNLABM0Mzc4NzQ5NTgxOTIyODM5NjcwAAJTMQACMDE.*'
           }
         };


before(() => {
server = sinon.fakeServer.create();

component = ReactTestUtils.renderIntoDocument(React.createElement(
    IntlProvider,
    { locale: 'en', messages: translations['en'] },
    React.createElement(
        Provider,
        { store: store },
        React.createElement(ProductLinkComponent, {
            ref: function ref(c) {
                return element = c;
            },
            patConfig: patConfig,
            libConfig: libConfig,

            closeModal: closeModal })
    )
));


});

it('should hanlde API Failure', (done) => {
  mocha.suite.timeout(15000);
  const libConfig = {
           alfserver:"https://test.pearsoncms.com",
           alfToken:'1234ABCD',
           headers:{
            'X-PearsonSSOSession': 'AQIC5wM2LY4SfcxMF7qZmknuO_TFh2Q5u11dUx-vrAUPSDs.*AAJTSQACMDIAAlNLABM0Mzc4NzQ5NTgxOTIyODM5NjcwAAJTMQACMDE.*'
           }
         }; 

  server.respondWith("GET", "https://test.pearsoncms.com/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=select cmis:name,cmis:objectId,st:siteVisibility from st:site where st:siteVisibility IN ('PRIVATE', 'PUBLIC', 'MODERATED')",
   [
  401, 
  {"Content-Type": "application/json"}, 
  '{"error":"failure"}', 
  ]);
      

 
  ProductLinkApi.getProduct(libConfig).then((success) => {
    done();    
  },(error) => {
     done();     
  })
   
   server.respond((err, res) => {

   });
});



after(() => {
 server.restore(); 
})

})
*/