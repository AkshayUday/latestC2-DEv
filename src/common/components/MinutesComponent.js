/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *It is a Minutes component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file MinutesComponent - It is a Minutes component.
 * @author 547305
 *
 */
import React from 'react';
//import NumericInput from 'react-numeric-input';
import NumericInput from 'react-numeric-input-with-ie-support';
import {removeUnkownProps} from '../../PatternAddAnAsset/js/utils/util'
import styles from './styles/MinutesStyles.css';
/**
 * @augments React.Component
*/
class MinutesComponent extends React.Component {
/**
 *  @param {object} props - The propery object.
*/
constructor(props) {
    super(props);
/**
 * The displayName MinutesComponent.
 * @type {string}
*/
    this.displayName = 'MinutesComponent';
     this.state={
            mins:this.props.mins
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
/** An event. Its name is module:QuestionMetadata.event:minsOnchange.
* @event module:QuestionMetadata.event:minsOnchange
* @returns {object}
*/
  minsOnchange(e){
    this.state.mins = this.myFormat(e);
  }
    componentWillReceiveProps(){
    if(this.props.mins.value == -1){
      this.props.mins.value = 59;
    }
    if(this.props.mins.value == 60){
      this.props.mins.value = 0;
    }
    if(this.props.mins.value == 0){
      this.props.mins.value = 0;
    }
    }
/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
   render() {
    let divProps = Object.assign({}, this.props.mins);
    divProps = removeUnkownProps(divProps);
      return (
         <div className={styles.assessmentMinutes}>
            <label>Minutes</label>
            <NumericInput  min={-1} max={60} size={1}
             format={this.myFormat} name="mm" value={this.state.mins}{...divProps}/>
         </div>
      );
   }
}
MinutesComponent.propTypes= {
    id:React.PropTypes.string,
    mins: React.PropTypes.object
}
MinutesComponent.defaultProps ={
          id:'',
          mins:''
  }
module.exports = MinutesComponent;
