/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class RenderColumn component will be used for render the column labels 
 * on the web pages
 * @author Udhayakumar Gururaj
 **/
import React, { Component, PropTypes } from 'react';

import Styles from './table.css';
class RenderColumn extends Component{

/**
* @defaul render method will be used for return the column label
* DOM to the called function.
*/
render(){

	const column = this.props.cols.map(function (currColumn,index){
		/*return <div className='col-3' key={index}><b>{currColumn}</b></div>;*/
		
		return <div className={Styles['column'+index]} key={index}><b>{currColumn}</b></div>;
	});

	return(
		<div className={Styles.row + ' ' +Styles.colHeadDiv}>
			{column}
		</div>
		)
}
}

RenderColumn.propTypes = {
    cols: PropTypes.array
}

export default RenderColumn;
