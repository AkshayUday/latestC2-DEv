import TreePaneApi from '../../PatternAddAnAsset/js/api/TreePaneApi';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
window.tdc = {}
window.tdc.libConfig = {
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
                    'alfserver'      :'https://usppewip.pearsoncms.com',
                    'alfToken'       :'TICKET_c568cd5c076ab32265265bbe81f5715df86066f1'
}

describe('TreePaneApi', () => {
	it('Should check the method without AlfToken', () =>{
		 let callback = sinon.spy();
		 let proxy = TreePaneApi.getRootChildren(callback);
		  sinon.assert.pass(callback);
	})
	it('Should check the method with AlfToken', () =>{
		 let callback = sinon.spy();
		 let proxy = TreePaneApi.getRootChildren(callback);
		  sinon.assert.pass(callback);
	})
	it('Should check subFolders', () => {
		let callback = sinon.spy();
		let child = {};
		child.nodeRef = '/workspace/nodeRef/3ef83864-ad4d-4cbb-a964-64e5a39f059c';
		let proxy = TreePaneApi.getSubFolders('0000000c2test',child);
		sinon.assert.pass(callback);
	})
})