/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *It is a TimePicker component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file TimePicker - It is a TimePicker component.
 * @author 547305
 *
*/
import React from 'react';
/**
 * @augments React.Component
*/
class TimePicker extends React.Component {


/**
 *  @param {object} props - The propery object.
*/

/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
    render(){
        return (
            <input type="time" id={this.props.id} name={this.props.name}
             value={this.props.value}{...this.props.value}  />
        )
    }
}
TimePicker.propTypes = {
        id: React.PropTypes.string,
        name : React.PropTypes.string,
        value : React.PropTypes.string,
    }
TimePicker.defaultProps = {
          id: '',
          name:'',
          value:''
    }
export default TimePicker
