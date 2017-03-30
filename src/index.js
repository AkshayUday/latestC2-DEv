/**
 * @module PatternsLib
 */

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import AssesmentMetadata  from './PatternAssesment/js/components/App';
//import Question from './PatternQuestion/js/components/App';
import AddAnAsset from './PatternAddAnAsset/js/components/App';
//import BankMetaData from './PatternBank/js/components/App';
import ReviewAsset from './PatternReviewAsset/js/components/App';
import ProductLink from './PatternProductLink/js/components/App';
import SearchSelect from './SearchSCPatterns/js/components/App'
import bean from 'bean';
import someData from './data/someData.json';

//console.log('FORCE JENKINS BUILD; Dump json data from index.js ' + someData.field);

let libConfig = {};
let token = 1;

const typeList = {
                   ASSESMENT:'AssesmentMetadata',
                   QUESTION:'QuestionMetadata',
                   AddAnAsset: 'AddAnAsset',
                   BANKMETADATA : 'BankMetadata',
                   ReviewAsset:'ReviewAsset',
                   ProductLink:'ProductLink',
                   SEARCH_SELECT : 'interactivePattern'
                 };
const compList = {};
compList[typeList.ASSESMENT] = AssesmentMetadata;
//compList[typeList.QUESTION] = Question;
compList[typeList.QUESTION] = AssesmentMetadata;
compList[typeList.AddAnAsset] = AddAnAsset;
//compList[typeList.BANKMETADATA] = BankMetaData;
compList[typeList.BANKMETADATA] = AssesmentMetadata;
compList[typeList.ReviewAsset] = ReviewAsset;
compList[typeList.ProductLink] = ProductLink;
compList[typeList.SEARCH_SELECT] = SearchSelect;

let patternComp = null;
let hotPatternComp = null;

/**
 * Create a component
 * This is a private function.
 * @function createComp
 * @param {string} pattern - a pattern component name
 * @param {object} patConfig - a configuration for pattern component
 * @return {object} component - a react component
 */
function _createComp(pattern, patConfig) {
    const component = compList[pattern];

    // need to create <AppContainer> component </AppContainer>
   // patConfig.renderedComponent = null;
   // patConfig.component = null;
    return React.createElement(component, {
        libConfig: libConfig,
        patConfig: patConfig
    });
};

/**
 * Factory to create an instance of pattern component.
 * This is a private function.
 * @param {string} pattern - a pattern component name
 * @returns {object} and instance of pattern component
 */
function _factory(pattern) {

    let resultsCB;
    const instance = {
        patSetup : null,                                      // user supplied setup config
        pattern : pattern,                                    // pattern name
        uqid : token,                                         // unique id to distinguish each instance
        resultsEventId : pattern + '-' + token,               // unique results event id for receiving response
        eventId : pattern + '-channel-' + token,              // unique event channel for communicating with instance
        component : null,
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
            this.patSetup = Object.assign(patSetup);

            /**
            *  Validate mandatory properties.  Note that this is a common method and so do the validation by Pattern.
             */
           if ( (this.pattern==='AddAnAsset')  && (patSetup.nodeRef === '') )
                throw new Error('Product is not linked.  Please provide a valid Product Id.');


            token++;
		        bean.on(this,
                    this.resultsEventId,
                    function (data) {
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
        run : function () {

          patternComp = _createComp(pattern, this);
          hotPatternComp = React.createElement(AppContainer, {}, patternComp);

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
    type : typeList,
    setup : function (config) {
        libConfig = config;
    },
    create : function (pattern) {
        return _factory(pattern);
    }
}
