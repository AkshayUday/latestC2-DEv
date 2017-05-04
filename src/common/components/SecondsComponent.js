/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Seconds component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file SecondsComponent - It is a Seconds component.
 * @author 547305
 *
 */
import React from 'react';
//import NumericInput from 'react-numeric-input';
import NumericInput from 'react-numeric-input-with-ie-support';
import {removeUnkownProps} from '../../PatternAddAnAsset/js/utils/util'
import styles from './styles/SecondsStyles.css';
/**
 * @augments React.Component
*/
class SecondsComponent extends React.Component {
/**
 *  @param {object} props - The propery object.
*/
constructor(props) {
    super(props);
/**
 * The displayName SecondsComponent.
 * @type {string}
*/
    this.displayName = 'SecondsComponent';
     this.state={
            secs:this.props.secs
        };
 }


/**
* This function is used for formatting of numbers for hours .
* @param {number} num - Whatever number selected by user
*/
  myFormat(num) {
    if(num >=10){
      return num;
    }else{
        return 0 + num;
      }
  }
/** An event. Its name is module:QuestionMetadata.event:secsOnchange.
* @event module:QuestionMetadata.event:secsOnchange
* @returns {object}
*/
 secsOnchange(e){
    this.state.secs = this.myFormat(e);
  }
  componentWillReceiveProps(){
    if(this.props.secs.value == -1){
      this.props.secs.value = 59;
    }
    if(this.props.secs.value == 60){
      this.props.secs.value = 0;
    }
        if(this.props.secs.value == 0){
      this.props.secs.value = '';
    }
    }
/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
   render() {
    let divProps = Object.assign({}, this.props.secs);
    divProps = removeUnkownProps(divProps);
      return (
         <div className={styles.assessmentSeconds}>
            <label>Seconds</label>
            <NumericInput min={-1} max={60} size={1}
            format={this.myFormat} name="ss" value={this.state.secs}{...divProps}/>
         </div>
      );
   }
}
 SecondsComponent.propTypes= {
    id:React.PropTypes.string,
    secs: React.PropTypes.object
}
SecondsComponent.defaultProps ={
          id:'',
          secs:''
  }
module.exports = SecondsComponent;
