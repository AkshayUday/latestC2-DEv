/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * This component operates as a "Controller-View".
 *
 * @module AssessmentMetadata
 * @file AutoComplete - It is a autocomplete component.
 * @author 547305
 *
*/
import React from 'react'
import Autosuggest from 'react-autosuggest';
import {debounce} from 'lodash';
//var _ = require('lodash');
/** @function getSuggestions -
 * This method is used to get suggestions for autocomplete component.
 * @param {string} value - whatever user enters.
 * @param {object } languages - It is used to select particular language.
 * @returns {object}
*/
function getSuggestions(value, languages) {
  if(value){
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
}
}
/** @function getSuggestionValue -
 * Whenever user selects some suggestion, this method will get called and it will tell
 * name of that selection.
 * @param {object} suggestion - Whatever suggestion selected by user.
 * @returns {string}
*/
function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}
/** @function renderSuggestion -
 * This method is used to render suggestion name with the help of span HTML tag.
 * @param {object} suggestion - Whatever suggestion selected by user.
 * @returns {string}
 * HTML markup
*/
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
/**
 * @augments React.Component
*/
class autoComplete extends React.Component {
/**
 *  @param {object} props - The propery object.
 *  @param  {function}  props.onChange - This function will get called when onChange event takes place.
 *  @param  {function}  props.onSuggestionsUpdateRequested - When suggestions update request comes, this function will get called.
*/
  constructor(props) {
    super(props);
/**
 * The state value.
 * @type {object}
*/
    this.state = {
      value: props.value.value,
      suggestions: props.data
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = debounce(props.onSuggestionsUpdateRequested.bind(this),200);
  }
/** An event. Its name is module:AssessmentMetadata.event:onChange.
* @event module:AssessmentMetadata.event:onChange
*/
  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }
/**
 * @param {object} nextProps - The next propery Object.
*/
  componentWillReceiveProps(nextProps) {
    if(nextProps.data.text){
      this.setState({
        suggestions: getSuggestions(nextProps.data.text, nextProps.data.data)
      });
    }else{
        suggestions: []
    }
  }
/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a product',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} {...this.state.product}/>
    );
  }
}

autoComplete.propTypes = {
  data: React.PropTypes.object,
  onSuggestionsUpdateRequested:React.PropTypes.func,
  value:React.PropTypes.string,

}

export default autoComplete;
