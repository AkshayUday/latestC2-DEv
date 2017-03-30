/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a TimeComponent component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file TimeComponent - It is a TimeComponent component.
 * @author 547305
 *
 */
import React from 'react';
import NumericInput from 'react-numeric-input';
/**
 * @augments React.Component
*/
class TimeComponent extends React.Component {
/**
 *  @param {object} props - The propery object.
*/
  constructor(props){
        super(props);
        this.displayName = 'TimeComponent';
        this.state={
            hours:this.props.hours,
            mins :this.props.mins,
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
/** An event. Its name is module:QuestionMetadata.event:hoursOnchange.
* @event module:QuestionMetadata.event:hoursOnchange
* @returns {object}
*/
  hoursOnchange(e){
    this.state.hours = this.myFormat(e);
  }
/** An event. Its name is module:QuestionMetadata.event:minsOnchange.
* @event module:QuestionMetadata.event:minsOnchange
* @returns {object}
*/
  minsOnchange(e){
    this.state.mins = this.myFormat(e);
  }
/** An event. Its name is module:QuestionMetadata.event:secsOnchange.
* @event module:QuestionMetadata.event:secsOnchange
* @returns {object}
*/
  secsOnchange(e){
    this.state.secs = this.myFormat(e);
  }

/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
   render() {
      return (
         <div>

            <label>Hours</label>
            <NumericInput min={0} max={24} size={1}
             format={this.myFormat} name="hh" onChange={this.hoursOnchange}
             value={this.state.hours} {...this.props.hours}/>&nbsp;&nbsp;


            <label>Minutes</label>
            <NumericInput min={0} max={60} size={1}
             format={this.myFormat} name="mm" onChange={this.minsOnchange}
             value={this.state.mins} {...this.props.mins}/>&nbsp;&nbsp;


            <label>Seconds</label>
            <NumericInput min={0} max={60} size={1}
             format={this.myFormat} name="ss" onChange={this.secsOnchange}
             value={this.state.secs} {...this.props.secs}/>&nbsp;&nbsp;

         </div>
      );
   }
}
TimeComponent.propTypes= {
    id:React.PropTypes.string,
    hours: React.PropTypes.object,
    mins: React.PropTypes.object,
    secs: React.PropTypes.object
  }
TimeComponent.defaultProps ={
          id:'',
          hours:'',
          mins:'',
          secs:''
  }
export default TimeComponent;
