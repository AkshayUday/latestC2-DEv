/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Hours component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file HoursComponent - It is a Hours component.
 * @author 547305
 *
 */
import React from 'react';
//import NumericInput from 'react-numeric-input';
import NumericInput from 'react-numeric-input-with-ie-support';
import {removeUnkownProps} from '../../PatternAddAnAsset/js/utils/util'

import styles from './styles/HourStyles.css';

/**
 * @augments React.Component
*/
class HoursComponent extends React.Component {
/**
 *  @param {Object} props - The propery object.
*/
constructor(props) {
    super(props);
/**
 * The displayName HoursComponent.
 * @type {string}
*/
    this.displayName = 'HoursComponent';
     this.state={
            hours:this.props.hours
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
/** An event. Its name is module:Questionmetadata.event:hoursOnchange.
* @event module:Questionmetadata.event:hoursOnchange
* @returns {object}
*/
  hoursOnchange(e){
    this.state.hours = this.myFormat(e);
  }
  componentWillReceiveProps(){
    if(this.props.hours.value == 0){
      this.props.hours.value = '';
    }
    if(this.props.hours.value == -1){
      this.props.hours.value = 23;
    }
    if(this.props.hours.value == 24){
      this.props.hours.value = 0;
    }   
    }
/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
   render() {
     let divProps = Object.assign({}, this.props.hours);
     divProps = removeUnkownProps(divProps);

      return (
         <div className={styles.assessmentHours}>
            <label>Hours</label>
            <NumericInput min={-1} max={24} size={1}
            format={this.myFormat} name="hh" value={this.state.hours} {...divProps} />
         </div>
      );
   }
}
HoursComponent.propTypes= {
    id:React.PropTypes.string,
    hours: React.PropTypes.object
}
HoursComponent.defaultProps ={
          id:'',
          hours:''
  }
module.exports = HoursComponent;
