/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class Table component - it is reusable component which will be used to form
 * the table format of displaying the data
 * @author Udhayakumar Gururaj
 **/
import React, { Component, PropTypes } from 'react';
import Row from './RenderRow.js';
import Column from './RenderColumn.js';
import Label from '../../../../common/components/Labels.js';
import { Link } from 'react-router';

import Styles from './table.css';
class Table extends Component {

  /**
  * @constructor used to intialize Table components objects with it props
  * @param {props} props - used to acquire parent properties
  */
  constructor(props){
    super(props);
    this.state={
      checked: true,
      newName:''
    }
  }

/**
* @function onChildChanged method is used to change status of the table component
* @param {string} newState
* @param {string} name
*/
onChildChanged(newState,name) {
        this.setState({ checked: newState });
        this.setState({newName:name});
  }

  /**
  * @default render method will be used to render the DOM to the parent pages
  * to render the web pages
  */
  render(){
   let jobName= function () { return '';};
   let jobStatusChart;
   if(!this.state.checked){
      jobName = function () { return (<div className={Styles.clabel3}>
                  <b><Label label="Job Name:" underline="false"/>{this.state.newName}</b>
                </div>);
              }
      jobStatusChart = function () { return (<div className={Styles.clabel1}>
                        <Label label="Job Status Chart" underline="true"/>
                      </div>);
                    }
   }else{
      jobStatusChart = function () { return (<div className={Styles.clabel1}>
                        <Label label="Job Status Chart" underline="false" className={Styles.clabelOrg}/>
                      </div>);
                  }
   }
    return(
    <div className={Styles.peJobstatusContainer}>
      <div className={Styles.peJobstatusPage}> 
      <div className={Styles.clabel}>
        {jobStatusChart()}
        <div className={Styles.clabel2}>
         <label onClick={this.props.fileUploadPage}>Upload start screen</label>
        </div>
      </div>
        {jobName()}
        <Column cols={this.props.columns}/>
        {this.props.rows.length > 0 ? <Row rows={this.props.rows} parent={this.onChildChanged.bind(this)}/> : '' }
        </div>
        </div>

      );
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  fileUploadPage : PropTypes.func
}

export default Table;
