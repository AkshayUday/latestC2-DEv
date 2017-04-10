/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a TextBox component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file TextBox - It is a TextBox component.
 * @author 547305
 *
 */
import React from 'react';
/**
* Import has been added for removing unkown properties from @link TextBox compoenent 
**/
import {removeUnkownProps} from '../../PatternAddAnAsset/js/utils/util'
/**
 * @augments React.Component
*/
class TextBox extends React.Component{
/**
 * @param {object} props - The propery object.
*/
constructor(props) {
    super(props);
/**
 * The displayName TextBox.
 * @type {string}
*/

    this.displayName = 'TextBox';
    //this.handleChange = this.handleChange.bind(this);
 }

 myFunction(e){

  }

/*handleChange(e) {
    this.props.onChange(e);
}*/


/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @return {string}
 * HTML markup for the component
*/
render() {

  let divProps = Object.assign({}, this.props.value);
  divProps = removeUnkownProps(divProps);

        return (
            <input {...divProps}
            id={this.props.id}
              ref="input" type="text"
               required={this.props.required}
               maxLength={this.props.maxLength}
                placeholder={this.props.placeholder}
                readOnly={this.props.readOnly}
                 disabled={this.props.disabled}
                 className={this.props.className}
                 autoComplete={this.props.autocomplete}
            />
        )
    }

};
TextBox.propTypes= {
    id:React.PropTypes.string,
    value: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    required: React.PropTypes.bool,
    maxLength:React.PropTypes.string,
    readOnly:React.PropTypes.bool,
    className:React.PropTypes.string,
    autocomplete:React.PropTypes.string
}
TextBox.defaultProps ={
      id:'',
      value: '',
      placeholder:'',
      disabled:false,
      required:false,
      maxLength:'250',
      readOnly: false
}
module.exports = TextBox;
