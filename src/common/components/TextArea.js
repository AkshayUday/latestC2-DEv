/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a TextArea component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file TextArea - It is a TextArea component.
 * @author 547305
 *
 */
import React from 'react';
import {removeUnkownProps} from '../../PatternAddAnAsset/js/utils/util'
/**
 * @augments React.Component
*/
class TextArea extends React.Component{
/**
 *  @param {object} props - The property object.
 *  @param  {function}  props.handleKeyUp -This function will get called when keyUp event occures.
*/
constructor(props) {
    super(props);
/**
 * The displayName TextArea.
 * @type {string}
*/
    this.displayName = 'TextArea';

     this.state = {
         warMsg: '1024 characters remaining',
         value: 'test',
         showResults: false,
         initialMsg: ''
     }

    this.handleKeyUp = this.handleKeyUp.bind(this);

}

/**
 * This function is used to update the state of TextArea Component, when someone enters message in it.
 * @param {string} msg - Whatever entered by user in textarea component.
*/
 updateState(msg) {
      this.setState({warMsg: msg});
 }
/** @event module:QuestionMetadata.event:handleKeyUp -
 * An event. Its name is module:QuestionMetadata.event:handleKeyUp.
 * The max length of textarea is given as 300 characters. So, this method is used to show remaining characters
 * onKeyUp event
 * Also if user enters more than 300 characters then substring ,method is used. This method will help us to show only 300 characters.
 * This method is also called on onKeyUp event
*/
 handleKeyUp(e, noOfChar) {
      let text_max = 1024 , textLength;
      if (e === 'loadEvent') {
        textLength = noOfChar.value.length;
      }
      else {
        textLength = e.target.value.length;
      }
      if (e.target !== undefined && e.target.value !== undefined && textLength > 1024) {
        e.target.value.substring(0, 1024);
      }
      let remainLength = text_max - textLength;
      this.setState({warMsg: remainLength + ' characters remaining'});
      if(textLength == 1024){
        this.setState({warMsg: 'Reached 1024 characters'});
         this.setState({ showResults: true });
       }else{
         this.setState({ showResults: false });
       }
 }
/**
 * It will invoked when a component is receiving new props. This method is not called for the initial render.
 * @param {object} nextProps - The next propery Object.
*/
 componentWillReceiveProps(nextProps){
    this.handleKeyUp('loadEvent', nextProps.value);
 }
/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
render() {
  //<div id="textFeedBack"> {this.state.data} </div>
   let divProps = Object.assign({}, this.props.value);
   divProps = removeUnkownProps(divProps);
        return (
        <div>
        <div>
           <textarea {...divProps}
                className="pe-textarea"
                required={this.props.required}
                maxLength={this.props.maxLength}
                cols={this.props.cols}
                rows={this.props.rows}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                placeholder={this.props.placeholder}>
           </textarea>
        </div>
        <div id="textFeedBack"> { this.state.showResults ? this.state.warMsg : null } </div>
        </div>
        )
    }

};
TextArea.propTypes = {
        id:React.PropTypes.string,
        value: React.PropTypes.object,
        placeholder: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        readOnly: React.PropTypes.bool,
        required: React.PropTypes.bool,
        maxLength:React.PropTypes.string,
        autofocus: React.PropTypes.bool,
        rows: React.PropTypes.number,
        cols: React.PropTypes.number

}
TextArea.defaultProps= {
          id: '',
          value: '',
          placeholder:'',
          disabled:false,
          readOnly:false,
          required:false,
          //maxLength:'1024',
          autofocus: false,
          rows:4,
          cols:50
}

module.exports = TextArea;
