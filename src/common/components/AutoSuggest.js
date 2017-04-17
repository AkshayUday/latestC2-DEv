/*import React from 'react';
import Autosuggest from 'react-autosuggest';
import theme from './styles/autosuggestTheme.css';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }];

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class AutoSuggest extends React.Component{
	
  constructor(props) {
	    super(props);
	    this.displayName = 'AutoComplete';
	    this.state = {
	      value: '',
	      suggestions: []
    	};
    	this.onChange = this.onChange.bind(this);
    	this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
 	}

 	getSuggestions(value){
      debugger;
  		const inputValue = value.trim().toLowerCase();
  		const inputLength = inputValue.length;
  			return inputLength === 0 ? [] : languages.filter(lang =>
    		lang.name.toLowerCase().slice(0, inputLength) === inputValue
  		);
	};

	onChange(event, { newValue }) {
      debugger;
	    this.setState({
	      value: newValue
	    });
  	};

  	onSuggestionsFetchRequested({ value }){
      debugger;
	    this.setState({
	      suggestions: this.getSuggestions(value)
	    });
  	};

  	onSuggestionsClearRequested(){
      debugger;
	    this.setState({
	      suggestions: []
	    });
  	};

  	render() {
    debugger;
 		const { value, suggestions } = this.state;

 		const inputProps = {
	      value,
	      onChange: this.onChange
    	};

 		return(
 			<div>
 				<Autosuggest suggestions={this.suggestions} theme={theme}
        		onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        		onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        		getSuggestionValue={this.getSuggestionValue}
        		renderSuggestion={this.renderSuggestion}
        		inputProps={this.inputProps}
      			/>
 			</div>
 		)
 	}
}
AutoSuggest.propTypes= {
    suggestions:React.PropTypes.func,
    onSuggestionsFetchRequested: React.PropTypes.func,
    onSuggestionsClearRequested: React.PropTypes.func,
    getSuggestionValue: React.PropTypes.func,
    renderSuggestion: React.PropTypes.func,
    onChange: React.PropTypes.func,
    inputProps: React.PropTypes.func
}
module.exports = AutoSuggest;
*/

import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import theme from './styles/autosuggestTheme.css';

const suggestions = [
  {
    title: 'last 3 executed searches',
    searchterm: [
      {
        name: 'C',
      },
      {
        name: 'Redux',
      },
      {
        name: 'React',
      }
    ]
  },
  {
    title: 'last 3 saved search',
    searchterm: [
      {
        name: 'JavaScript',
      },
      {
        name: 'Perl',
      },
      {
        name: 'Redux',
      }
    ]
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

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
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsUpdateRequested = ({value,reason}) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onFocus(){
    console.log('inside onFocus '+this.props.getAutoData);
  }

  componentWillReceiveProps(nextProps) {
   console.log('nextProps');
   console.log(nextProps);
   this.setState({suggestions: nextProps.autoSuggestData});
   
   // this.setState({value: nextProps.hostfilename})

  } 

  componentWillMount(){
    this.setState({value: this.props.hostfilename});
    this.props.getAutoData(this.props.hostfilename);
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
       <Autosuggest 
        theme = {theme}
        multiSection={Boolean(true)}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps} />
        </div>
    );
  }
}

Search.propTypes = {
 getAutoData : React.PropTypes.func,
 hostfilename: React.PropTypes.string
}


export default Search;
