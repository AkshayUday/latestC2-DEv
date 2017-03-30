import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import {debounce} from 'lodash';
import AutosuggestHighlight from 'autosuggest-highlight';

import theme from './Styles/SearchLibAutoSuggest.css';


function getSuggestions(value, searchArray) {
  if(searchArray.length > 0){
  //const inputValue = value.trim().toLowerCase();
  //const inputLength = inputValue.length;

 return searchArray
    .map(section => {
      return {
        title: section.title,
        suggestions: section.suggestions.filter(suggestion => suggestion)
      };
    })
  }
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.term;                 // what should be the value of the input
  //return suggestion;
}

function renderSuggestion(suggestion, { value, valueBeforeUpDown }) {
  const suggestionText = suggestion.term;
  //const suggestionText = suggestion;
  let query = '';
  if(value != undefined){
   query = (valueBeforeUpDown || value).trim();  
  }   
  
  
  const matches = AutosuggestHighlight.match(suggestionText, query);
  const parts = AutosuggestHighlight.parse(suggestionText, matches);
 
  if(query !=''){
    return (
    <span className={'suggestion-content'}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? null : 'highlight';
            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
  }else{
    return (
    <span className={'suggestion-content'}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
  }
}


function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.suggestions;
}

/*function shouldRenderSuggestions(value) {
  console.log('shouldRenderSuggestions');
  console.log(value);
  console.log(this);
  return true;
}

  let shouldRenderSuggestions = (value) => {
  console.log('shouldRenderSuggestions');
  console.log(value);
  console.log(this);
  return true;
}*/


class SearchComplete extends Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      suggestions: (props.data && props.data.data && props.data.data)?props.data.data:[]
    };

    this.onChange = props.onChange.bind(this);
    this.onFocus = props.onFocus.bind(this);

    this.onSuggestionsUpdateRequested = debounce(props.onSuggestionsUpdateRequested.bind(this),200);
    //this.onSuggestionsUpdateRequested = props.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = props.onSuggestionSelected.bind(this);
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    this.componentWillMount = props.componentWillMount.bind(this);
    this.componentDidUpdate = props.componentDidUpdate.bind(this);

  }

  /*onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });   
    
    //console.log(event);
    //this.onSuggestionsUpdateRequested({value:this.state.value});
    //_.debounce(this.onSuggestionsUpdateRequested(this.state.value),200);
  }*/



  shouldRenderSuggestions(value){
	  //console.log('shouldRenderSuggestions');
	  //console.log(value);
	  //console.log(this);
	  //this.onSuggestionsUpdateRequested(this.state.value);
	  //return true;

    return (value)?value.trim().length > 3:true;

  }

  componentWillReceiveProps(nextProps) {
    //if(nextProps.data.text || nextProps.data.text == undefined){
    if(nextProps.allAsset != undefined){
    this.setState({
      suggestions: getSuggestions(nextProps.data.text, nextProps.data.data),
      value: nextProps.data.text
    });
  }else{
      suggestions: []
  }
  }

  render() {
    const { value, suggestions } = this.state;
    const isMultiSection = true;
    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange,
      onFocus: this.onFocus
    };

    return (
      <Autosuggest  multiSection={isMultiSection}
                    theme={theme}
                    suggestions={suggestions}
                    onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    renderSectionTitle={renderSectionTitle}
                    getSectionSuggestions={getSectionSuggestions}
                    inputProps={inputProps}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    onSuggestionSelected={this.onSuggestionSelected} />

    );
  }
}

SearchComplete.propTypes = {
  data: PropTypes.object,
  onSuggestionsUpdateRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onChange:PropTypes.func,
  componentWillMount:PropTypes.func,
  componentDidUpdate:PropTypes.func,
  onFocus:PropTypes.func
}

module.exports= SearchComplete;
