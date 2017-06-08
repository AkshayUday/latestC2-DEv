import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import theme from './styles/autosuggestTheme.css';

const suggestions = [];

// // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
// function escapeRegexCharacters(str) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

function getSuggestions(value) {
  return suggestions
    .map(section => {
      console.log(section);
      return {
        title: section.title,
        searchterm: section.searchterm  //section.languages.filter(language => regex.test(language.name))
      };
    }); //.filter(section => section.languages.length > 0)
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.searchterm;
}


class Search extends Component {
  constructor() {
    super();
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    this.onEnterClick = this.onEnterClick.bind(this);
    this.state = {
      value: '',
      suggestions: []
    }; 
    this.onFocus = this.onFocus.bind(this);   
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });

    this.props.getAutoData(newValue);

  };

  shouldRenderSuggestions(value){
    return true;
  }
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.suggestions)
    });
  };

  onSuggestionsUpdateRequested = ({value,reason}) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.suggestions)
    });
  };

 onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    if (method === 'click' || 'enter') {
       this.props.getAutoData(suggestionValue);
       this.props.onSearchIconClick();
    }
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onFocus(){
    console.log('inside onFocus '+this.props.getAutoData);
  }

  onEnterClick(event){
    event.preventDefault();
    this.props.onSearchIconClick();
  }


  componentWillReceiveProps(nextProps) {
   // console.log('nextProps');
   // console.log(nextProps);
   this.setState({suggestions: nextProps.autoSuggestData});
   
   // this.setState({value: nextProps.hostfilename})

  } 

  componentWillMount(){
   
    if(this.props.prevSelectedValue != undefined){
       this.setState({value: this.props.prevSelectedValue});
       this.props.getAutoData(this.props.prevSelectedValue);
    }else{
       this.setState({value: this.props.hostfilename});
       this.props.getAutoData(this.props.hostfilename);
    }
   
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onFocus: this.onFocus
    };

  return (
  <div>
     <form onSubmit={this.onEnterClick}>
       <Autosuggest 
        theme = {theme}
        multiSection={Boolean(true)}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps} />
     </form>
  </div>
    );
  }
}

Search.propTypes = {
 getAutoData : React.PropTypes.func,
 hostfilename: React.PropTypes.string,
 onSearchIconClick: React.PropTypes.func,
 prevSelectedValue : React.PropTypes.string
}


export default Search;
