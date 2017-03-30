/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Heading component.
 * This component operates as a "Controller-View".
 * It is rendered using h3 html tag.
 *
 * @module AssessmentMetadata
 * @file Heading - It is a Heading component.
 * @author 547305
 *
 */
import React from 'react';


/**
 * @augments React.Component
*/
class Heading extends React.Component{
/**
 * @param {object} props - The propery object.
*/
  constructor(props) {
    super(props);
/**
 * The displayName Heading.
 * @type {string}
*/
    this.displayName = 'Heading';
  }

/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
  render() {

		//need to handle heading type also
        return (

            <h3>{this.props.value}</h3>
        )
  }

};
Heading.propTypes = {
    value: React.PropTypes.string.isRequired,
    headingType : React.PropTypes.string.isRequired,
  }
Heading.defaultProps = {
      value: 'Default Heading',
      headingType:'h3',

  }
Heading.state= {
            value: this.props.value,
            headingType: this.props.headingType,
  }
export default Heading;
