// ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+==

/* Example of using Broker

// Reference Broker library and ProductLink pattern
var patternBroker = this.PatternBroker.default;
var patternProductLink = this.PatternProductLink.default;

// Create Library Configuration
var libConfig = {'headers' : {
                     'Content-Type'   : 'application/json',
                     'Accept'         : 'application/ld+json',
                     // Required for C1 MDS UAT environment only; APIGee provides it for PPE/PROD
                     'X-Roles-Test'        : 'ContentMetadataEditor',
                     // Required for C1 MDS UAT environment only; Not needed for PPE/PROD environment
                     'Authorization'  : 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
                     // Required for C1 MDS
                     'x-apikey' :  '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
                     // Required for C1 MDS & Alfresco
                     'X-PearsonSSOSession' : 'QIC5wM2LY4SfcwsY4wYxOyrjkV-IsqY7nz6GOy1KtdBZek.*AAJTSQACMDIAAlNLABM3NzUzMjIzMzcyNzgwNzc4ODgyAAJTMQACMDE.*',
                     'Prefer' : 'annotation=true'
                 },
                 // This may not be required - need to check (Mar 2017)
                 'database'       : '?db=qa12',
                 // C1 MDS UAT
                 'server'         : 'https://uat.pearsonmeta.io',
                 // C1 MDS PPE
                 'server'         : 'https://staging.data.pearson.com',
                 // C1 MDS PPE
                 'taxonomyserver' : 'https://uat.pearsonmeta.io',
                 // Required only for AddAnAsset (NEEDS TO BE SWITCHED TO Pattern Config
                 'nodeRef' : 'UUID VALUE'
                 // AddAnAsset : tabVisibility (in libconfig), 
                 // alfserver =    document.getElementById('repoInst').value;
                 // repoName = document.getElementById('repoName').value;

                };

// Create Pattern Configuration
var _productLinkConfig = {'selector' : '#productLink'};
_productLinkConfig.repoList = [{"repo":"https://staging.api.pearson.com/content/cmis/ukwip","repoName":"UK"},
                               {"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US East"}
                              ];

// Callback for pattern lifecycle completion
// AddAnAsset : nodeRef : UUID

var callBack = function(data) { 
    console.log(data);
    
    document.getElementById('repoInst').value = data.repoInstance;
    document.getElementById('repoName').value = data.repoName;
    document.getElementById('nodeRef').value = data.nodeRef;
};

// Callback to receive pattern completion data
var onEventCallBack = function(data) { 
    console.log(data);
    
    document.getElementById('repoInst').value = data.repoInstance;
    document.getElementById('repoName').value = data.repoName;
    document.getElementById('nodeRef').value = data.nodeRef;
};

// Set library configuration
patternBroker.setup(libConfig);

// Create an instance of pattern
var _productLink = patternBroker.create('ProductLink', patternProductLink);

// Set pattern configuration
_productLink.setup(_productLinkConfig, callBack);   // NOTE: callBack could be null;

// Register pattern completion callback to receive data
_productLink.on(onEventCallBack);

// Run the pattern component - render it
_productLink.run();
*/

// ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+==

/**
 * @module Pattern Broker
 */

import bean from 'bean';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import {render, unmountComponentAtNode} from 'react-dom';


let libConfig = {};
let token = 1;

function _factory(pattern, component) {
    let resultsCB;
    const instance = {
        patSetup : null,                                      // user supplied setup config
        pattern : pattern,                                    // pattern name
        uqid : token,                                         // unique id to distinguish each instance
        resultsEventId : pattern + '-' + token,               // unique results event id for receiving response
        eventId : pattern + '-channel-' + token,              // unique event channel for communicating with instance
        component : component,
        renderedComponent:null,

        /**
         * Setup pattern component using supplied configuration options,
         * and register for an event which will return results
         *
         * @function setup
         * @param {object} patSetup - a config object for the pattern setup
         * @param {function cb - a callback function which will receive the results
         */
        setup : function (patSetup, cb) {
            
            
            resultsCB = cb;
            // this.patSetup = Object.assign(patSetup);
            this.patSetup = patSetup;
            this.patSetup.resultsEventId = instance.resultsEventId;
            this.patSetup.eventId = instance.eventId;
            this.patSetup.pattern = instance.pattern;

          
            token++;
		        bean.on(this, this.resultsEventId, function (data) {
			          if (resultsCB) {
                    resultsCB(data);
                }
		        });
        },

        /**
         * Run the component.
         * The component may render a GUI at prespecified selector
         * or it may just be used to offload some computing.
         * @function run
         */
        run : function (patConfig) {
           
            let patternComp = React.createElement(this.component, {libConfig: libConfig, patConfig: patConfig});
            let hotPatternComp = React.createElement(AppContainer, {}, patternComp);
		        this.renderedComponent = render(hotPatternComp, document.querySelector(this.patSetup.selector));
        },

        on : function (cb) {
            bean.on(this, this.eventId, cb);
        },

        off : function () {
            bean.off(this, this.eventId);
        },

        fire : function (...msgs) {
            let msgFromComp = msgs;
            if(this.renderedComponent._reactInternalInstance._renderedComponent._instance.refs.mvmContainer){
               //msgFromComp = this.renderedComponent.refs.mvmContainer.context.store.getState().form.mvm.uuid ;
                if(msgFromComp[0].name!==undefined && msgFromComp[0].name!==''){
                    this.renderedComponent._reactInternalInstance._renderedComponent._instance.refs.mvmContainer.state.storeState.form.mvm.name.value = msgFromComp[0].name;
               }
               this.renderedComponent._reactInternalInstance._renderedComponent._instance.refs.mvmContainer.getWrappedInstance().getWrappedInstance().submit();
            }else{
               bean.fire(this, this.eventId, msgFromComp);
            }

        },

        unmount : function () {
            unmountComponentAtNode(document.querySelector(this.patSetup.selector));
        }
    };
    return instance;
};

export default {
    setup : function (config) { 
        libConfig = config;
    },
    create : function (pattern, component) {
        return _factory(pattern, component);
    }
}
