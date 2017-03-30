import React, { Component, PropTypes } from 'react';
import CheckboxComponent from './CheckboxComponent.js';
import { checkBoxHandler } from '../../action/savedSearchAction.js';

import savedSearchStyles from './styles/savedSearchStyles.css';


class RenderRow extends Component{

	constructor(props){
        super(props);
        this.checkChangeHandler = this.checkChangeHandler.bind(this);
    }


	checkChangeHandler(obj){
		if(this.props.CheckboxHandler){
            this.props.CheckboxHandler(obj);
		}
	}

displayJson(jsonObj,self){
	let itemArr = [];
	if (typeof jsonObj.map === 'function') {
		jsonObj.map(function (item,index){
			let id = item.id;
			let searchTerm = item.searchterm;
			let filter = item.filter;
			
			itemArr.push(<div>
					<div className={savedSearchStyles.row}>
					<span className={savedSearchStyles.savedSearchChkbox}>
					<CheckboxComponent
						name={searchTerm}
						val={searchTerm}
						id={id}
						checked={item.isChecked}
						onChangeHandler={self.checkChangeHandler.bind(this)}/>
					</span>
					<span>{searchTerm}</span>
					</div>
					<div>{filter}</div>
				</div>);

		});
	}

    return itemArr;
}


render(){
	let self = this;
	let rows = this.props.rows;
	let test;
	if(rows !== undefined){
		test = this.displayJson(rows,self);
	}
	if(test==null){
		let test = 'test is null';
	}else{
		console.log('test: '+test);
	}

	return(
		<div>
			{test}
		</div>
		)
}
}

RenderRow.propTypes = {
	CheckboxHandler: PropTypes.func,
	rows: PropTypes.any
}
export default RenderRow;
