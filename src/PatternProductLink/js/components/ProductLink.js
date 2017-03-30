import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';
import bean from 'bean';

// Import Component Style
import styles from './productlink.css';
import theme from './autosuggestTheme.css';

import {messages} from './ProductLinkDefaultMessages';

import { updateInputValue,
         clearSuggestions,
         loadSuggestionsBegin,
         maybeUpdateSuggestions,
         updateAllProduct,
         loadAllProductBegin,
         errorAllProduct
        } from '../actions/actionproductLink';

import ProductLinkApi from '../api/ProductLinkApi';

import Promise from 'bluebird';

import {upperFirst, toLower, map, chain, sortBy,values, pick, flatten, filter, includes} from 'lodash';

//let allProducts=[];


const getSearchProduct =  ({value},allProducts) => {  
  //let allProducts = allProducts;
  //debugger;
  const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  if (escapedValue === '') {
    //return [];
    return allProducts;
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return allProducts.filter(product => regex.test(product.name));
}



/* ----------------- */
/*    ProductLinkComponent */
/* ----------------- */


const  getSuggestionValue = (suggestion) => {
  return suggestion.name + ' (' + upperFirst(toLower((suggestion.siteVisibility).substring(0,3))) + ')';
}

const renderSuggestion = (suggestion) => {
 return React.createElement(
    'span',
    null,
    suggestion.name + ' (' + upperFirst(toLower((suggestion.siteVisibility).substring(0,3))) + ')'
   );
}



const  mapStateToProps = (state) => {
  const { value, suggestions, isLoading, allProduct, allisLoading, isError,errMessage  } = state.ProductLinkReducer;

  return {
    value,
    suggestions,
    isLoading,
    allProduct,
    allisLoading,
    isError,
    errMessage  
  };
}

function loadSuggestions(value,allProducts) {
  return dispatch => {
    dispatch(loadSuggestionsBegin());
    dispatch(maybeUpdateSuggestions(getSearchProduct(value,allProducts), value));    
  };
}

const  mapDispatchToProps = (dispatch) => {
  
  return {
    onChange(event, { newValue }) {
      //console.log(newValue);
      this.setState({
        value: newValue
      });

      dispatch(updateInputValue(newValue));
    },
    onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
	  //dispatch(loadSuggestions(value));
	  /*console.log(suggestion);
	  console.log(suggestionValue);
	  console.log(sectionIndex);
	  console.log(method);*/
	  
	  this.setState({selectedVal:suggestion});

    },
    onSuggestionsUpdateRequested({value,reason}){
        /*console.log(value)*/
    	if(reason != 'click'){
    		dispatch(loadSuggestions({value},this.props.allProduct));	
        //dispatch(loadSuggestionsBegin());
        //dispatch(maybeUpdateSuggestions(getSearchProduct({value}), value));

    	}else{
    		 dispatch(clearSuggestions());
    	}   	
    },

    onSuggestionsFetchRequested({ value }) {
      //dispatch(loadSuggestions(value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearSuggestions());
    },
    componentWillMount(){
     dispatch(loadAllProductBegin());
          if (this.props.libConfig.allProducts && this.props.libConfig.allProducts.length > 0 ) {
      // Check cached results to bypass refetching all products
       dispatch(updateAllProduct(this.props.libConfig.allProducts));
      } else{
        // dispatch({type:'ACTIVATE'});
        let repoPList = [];
        let repos = [];
        for (let i = 0; i < this.props.patConfig.patSetup.repoList.length; ++i) {
            repos.push( ProductLinkApi.getProduct(this.props.patConfig.patSetup.repoList[i].repo,this.props.patConfig.patSetup.repoList[i].repoName,this.props.libConfig) );
        }
        let allProducts = [];

        let reflect = (promise) => {           
         return promise.then((res) => { 
              return {res:res, status: 'resolved' }}
              ,(e) => { 
             return { e:e, status: 'rejected' }});
            // return promise.catch((e) => e);
        }

        Promise.all(repos.map(reflect)).then(function (results) {
          let repo;
          let allProduct = '';
          let success = results.filter(data => data.status === 'resolved');
          
          // console.log(success);

          if(success.length == 0) {
            return Promise.reject('Error');
          }

            let repoResults = map(success,
                                  function (value, key, list) {
                                      return list[key].res;
                                  });
          for (let repo = 0; repo < repoResults.length; repo++) {
                //for(repo in repoResults){
          // console.log(repoResults[repo]['xhr']['responseText']);

          allProduct = chain(JSON.parse(repoResults[repo]['xhr']['responseText']).list).pick('entries').values().flatten().map((data) => { 
          return {
                 name   : data['entry']['site']['title'],
                 nodeRef: data['entry']['site']['guid'],
                 siteVisibility: data['entry']['site']['visibility'],
                 repoInstance: repoResults[repo].req.alfServer,
                 repoName: repoResults[repo].req.repoName
              } 
           }).sortBy(['name']).value();
          allProducts.push(allProduct);
          allProduct ='';
          }
         allProducts = flatten(allProducts);
            let dupSite =  filter(
                map(allProducts, function (value, index, iteratee) {
                    iteratee[index].name;
                }),
                function (value, index, iteratee) {
                    return includes(iteratee, value, index + 1);
                });
            
          let res = map(allProducts,(data) => {                
          if(includes(dupSite, data.name)) {
              data.name = data.name + ' - ' + data.repoName + ' ';
            }   
            return data;
          })
          allProducts = res;
          this.props.libConfig.allProducts = allProducts;
          dispatch(updateAllProduct(allProducts));
          // dispatch({type:'DEACTIVATE'});

        }.bind(this),function (error) {
           dispatch({
                type: 'ERR_ALL_PRODUCT',
                errResult: {'message':error.message}
              });
            // dispatch({type:'DEACTIVATE'});

          }).catch(e => {
             dispatch({
                type: 'ERR_ALL_PRODUCT',
                errResult: {'message':'Exception occured'}
              });
              // dispatch({type:'DEACTIVATE'});

          });
      } 
  }

  };
}

class ProductLinkComponent extends React.Component {
   constructor(props) {
    super(props);
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    this.onChange = this.props.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.props.onSuggestionsFetchRequested.bind();
    this.onSuggestionsClearRequested = this.props.onSuggestionsClearRequested.bind();
    this.onSuggestionSelected = this.props.onSuggestionSelected.bind(this);
    this.onSuggestionsUpdateRequested = this.props.onSuggestionsUpdateRequested.bind(this);
  	this.onLinkClick = this.onLinkClick.bind(this);
    this.componentWillMount = this.props.componentWillMount.bind(this);
  	this.state = {
  		selectedVal:'',
      value:''
  	}
    
  }

  shouldRenderSuggestions(value){
	  return true;
  }

  shouldComponentUpdate(nextProps, nextState){
    // return a boolean value
    //console.log(nextProps);
    //console.log(nextState);
    return true;
  }
  /*componentWillMount(){
    //debugger;
    //this.render();
      let that = this;
     ProductLinkApi.getProduct(this.props.libConfig).then((sucess) => {
         //console.log(sucess);
         //JSON.parse(sucess.text)
         allProducts = _.chain(JSON.parse(sucess.text)).pick('results').values().flatten().map(data => {
           return {
              name   : data.properties['cmis:name']['value'],
              nodeRef:data.properties['cmis:objectId']['value']
           }  
        }).value();
         debugger;
        that.render();

     },(error) => {
         console.log(error);
    });

    //console.log(ProductLinkApi);

	  console.log('componentWillMount');
  }*/
  
  componentDidUpdate(){
	  //console.log('componentDidUpdate');
  }

  componentWillUpdate(){
	  //console.log('componentWillUpdate');
  }

  componentDidMount(){

    //console.log('componentDidMount');
  }
  
  onLinkClick(){
	  //console.log('onLinkClick');
	  //console.log(this.props);
    if(this.state.selectedVal !=''){
    bean.fire(this.props.patConfig, this.props.patConfig.eventId,this.state.selectedVal);      
    this.setState({selectedVal:''});
    this.props.closeModal();
    }	  
  }

  componentWillUnmount(){
    //console.log('componentWillUnmount');
  }

  render() {

	  const {formatMessage} = this.props.intl;	
    const { suggestions, isLoading, onChange, allisLoading, isError, errMessage } = this.props;
    
    //console.log(isError);
    //console.log(errMessage);

    const { value } = this.state;    
    const inputProps = {
      placeholder: '',
      value,
      onChange:this.onChange
    };
    const status = (isLoading ? 'Loading...' : 'Type to load suggestions');
     const plStyle = {
		        border:'0px solid red'
	    }

    if(isError){
      return (React.createElement(
      'div',
      { className: 'producLinkclsErrMsg', id: 'productLinkErrMsg' },
      errMessage
      ));
    }

    let loaderClass = styles.productLinkclsLoader;

    if(allisLoading){
     return (React.createElement(
      'div',
      { className: loaderClass, id: 'productLinkloader' },
      ' '
      ));  
    }    

    return (      
      <div style={{plStyle}} id='productLinkAutoSuggest'>
       <div className={styles.plBodyHead}>
          Link to an existing product&apos;s assets:
        </div>
        <div className={styles.plAutoSuggestDiv}>
        <Autosuggest id="productLink"
          theme={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested} />
      </div>
		  <div className={styles.plAutoSuggestBtnDiv}>
          <button className={styles.plLinkButton} onClick={() => { this.onLinkClick()}} type="button">{formatMessage(messages.LINK)}</button>
		  </div>
      </div>

    );
  }
}

ProductLinkComponent.propTypes = {
	value : PropTypes.string,
	suggestions :PropTypes.array.isRequired,
    isLoading :PropTypes.bool,
    onChange :PropTypes.func,
    onSuggestionsFetchRequested :PropTypes.func,
    onSuggestionsClearRequested :PropTypes.func,
    onSuggestionSelected: PropTypes.func,
    onSuggestionsUpdateRequested : PropTypes.func,
    intl: intlShape.isRequired,
	  patConfig:PropTypes.object,
    libConfig:PropTypes.object,
    allisLoading:PropTypes.bool,
    componentWillMount:PropTypes.func,
    isError:PropTypes.bool,
    errMessage:PropTypes.string,
    closeModal:PropTypes.func
}

const ProductLinkConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProductLinkComponent));

export default ProductLinkConnectedComponent;
