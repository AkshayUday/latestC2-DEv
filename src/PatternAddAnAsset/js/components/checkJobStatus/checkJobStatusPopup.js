/**
* Copyright (c) Pearson, Inc.
* All rights reserved.
* @class checkJobStatusPopup is used for enable to track the uploaded file
* status
* @module - checkJobStatusPopup
* @author - Udhayakumar Gururaj
*/

import React, { Component, PropTypes } from 'react';
import ReactTabs from 'react-tabs';
import Table from './Table.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class checkJobStatusPopup extends Component{

	/**
	* @constructor used to initialize check job status object
	* @param {function}  props.componentWillMount
	*/
	constructor(props){
		super(props);
		this.componentWillMount = props.componentWillMount;
		this.fileuploadPage = this.fileuploadPage.bind(this);
	}

	fileuploadPage(){
		this.props.fileUploadPage();
	}

/**
* @default render method entry of the component and we access the properties from parent 
* model and create a dynamic DOM to return it. we are creating column labels and initiating
* table component in this component
*/
render(){
const columns = ['Name', 'Size', 'Progress','Status']
return(
		<div>
           <Table className="jobScheduleTable"
             columns={columns}
             rows={this.props.rows} 
             fileUploadPage = {this.fileuploadPage}/>
      	</div>
		);
}


}

checkJobStatusPopup.propTypes = {
    componentWillMount: PropTypes.func,
    rows: PropTypes.array,
    fileUploadPage : PropTypes.func
}

module.exports = checkJobStatusPopup;
