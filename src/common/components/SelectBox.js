/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *It is a SelectBox component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file SelectBox - It is a SelectBox component.
 * @author 547305
 *
 */
import React from 'react';
import {removeUnkownProps} from '../../PatternAddAnAsset/js/utils/util'
/**
 * @augments React.Component
*/
class SelectBox extends React.Component{
/**
 *  @param {object} props - The propery object.
 *  @param  {function}  props.handleChange - This function is used to handle
  the change in value of selectbox component.
*/
constructor(props) {
    super(props);
/**
 * The displayName SelectBox.
 * @type {string}
*/
    this.displayName = 'SelectBox';
    this.handleChange = this.handleChange.bind(this);
}

/**
 *It will invoked once, both on the client and server, immediately before the
  initial rendering occurs.
*/
componentWillMount() {
        let defaultValue = this.props.value ;
        if(this.props.options!==undefined && this.props.options.length>0){
            this.props.options.map( function (CurrOption){
               if(defaultValue === CurrOption.text){
                    CurrOption.selected = 'selected';
                }else{
                    CurrOption.selected = '';
                }
            });
        }
}
/**
*It will invoked once, only on the client (not on the server), immediately after
 the initial rendering occurs.
*/
componentDidMount() {
    if (this.props.autofocus){
      //this.refs.select.focus();
    }
}
/**
 *It will invoked when a component is receiving new props. This method is not
  called for the initial render.
*/
componentWillReceiveProps(){
    let defaultValue = this.props.value ;
        if(this.props.options!==undefined && this.props.options.length>0){
            this.props.options.map( function (CurrOption){
               if(defaultValue === CurrOption.value){
                    CurrOption.selected = 'selected';
                }else{
                    CurrOption.selected = '';
                }
            });
        }
}

handleChange(e) {
    this.props.onChange(e);
        // if (this.props.handleChange) {
        //     this.props.handleChange({"id":e.target.id,"value":e.target.value.trim()});
        // }
}
/**
 * Renders the component.
 *  When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
render() {
     let divProps = Object.assign({}, this.props.value);
     divProps = removeUnkownProps(divProps);
        return (
            <select id={this.props.id} onChange ={this.handleChange}
             multiple={this.props.multiple} value ={this.props.value} {...divProps}
               disabled={this.props.disabled} required={this.props.required}>
                {this.props.options.map((CurrOption, index) =>
                <option value = {CurrOption.value}  key={CurrOption.text} 
                defaultValue={CurrOption.selected}>{CurrOption.text}</option>
            )}
            </select>
        )
    }

};
SelectBox.propTypes= {
    id:React.PropTypes.string.isRequired,
    multiple: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    required: React.PropTypes.bool,
    autofocus: React.PropTypes.bool,
    defaultValue:React.PropTypes.string,
    options:React.PropTypes.array.isRequired,
    handleChange:React.PropTypes.func,
    onChange: React.PropTypes.func,
    value:React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.number,
  ])

}
SelectBox.defaultProps ={
      id:'',
      multiple: false,
      disabled:false,
      required:false,
      autofocus: false,
      defaultValue:'',
      options:[]
}
module.exports = SelectBox;
