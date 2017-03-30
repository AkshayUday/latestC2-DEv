/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class Labels component will be used to render the Label on web page
 * it is reusable component
 * search Libraray pages. 
 * @author Udhayakumar Gururaj
 **/
import React, { Component, PropTypes } from 'react';

class Labels extends Component{

/**
* @default render method is used for returning DOM
* to called function
*/
render(){

	let labelName = this.props.label;
	let underLine = this.props.underline;

	if(underLine === 'true'){
		labelName = <u>{labelName}</u>;
	}

	return(
			<div className={this.props.className}>
				{labelName}
			</div>

		);
}

}

Labels.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string.isRequired,
	underline: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ])
}

module.exports= Labels;
