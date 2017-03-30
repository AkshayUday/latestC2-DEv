/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a label component.
 * This component operates as a "Controller-View".
 * It is rendered using label html tag.
 *
 * @module QuestionMetadata
 * @file Label - It is a label component.
 * @author 547305
 *
 */
import React from 'react';

/**
 * @augments React.Component
*/
class Label extends React.Component{
/**
 * @param {object} props - The propery object.
*/
	constructor(props) {
	    super(props);
/**
 * The displayName Label.
 * @type {string}
*/
	    this.displayName = 'Label';
  	}

/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
    render() {
        let forTxt = this.props.for;
        let text = this.props.text;

        //below is the pearson label
       // var divAsLabel = "<div class='pe-label pe-label--bold' >{text}</div>";
        return (
            <label htmlFor={forTxt} className='pe-label pe-label--bold'> {text} </label>
        );
    }

};
Label.propTypes = {
        for: React.PropTypes.string,
        text : React.PropTypes.string.isRequired,
    }
Label.defaultProps ={
          for:'',
          text: ''
    }

module.exports = Label;
