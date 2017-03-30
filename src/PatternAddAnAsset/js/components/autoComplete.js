import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import {debounce} from 'lodash';
//var _ = require('lodash');

function getSuggestions(value, languages) {
  if(value){
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.term.toLowerCase().slice(0, inputLength) === inputValue
  );
}
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.term;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.term}</span>
  );
}

class autoComplete extends Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      suggestions: (props.data && props.data.data && props.data.data.suggestions)?props.data.data.suggestions:[]
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = debounce(props.onSuggestionsUpdateRequested.bind(this),2000);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.text){
    this.setState({
      suggestions: getSuggestions(nextProps.data.text, nextProps.data.data.suggestions)
    });
  }else{
      suggestions: []
  }
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} />
    );
  }
}

export default autoComplete;