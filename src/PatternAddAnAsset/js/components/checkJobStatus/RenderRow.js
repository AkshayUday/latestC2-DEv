/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class RenderRow component will be used for render the rows dyanmically 
 * on the web pages
 * @author TDC
 **/
 import React, { Component, PropTypes } from 'react';
 import Image from './IconComponent.js';
 import  ProgressBar from '../../../../common/components/ProgressBar';
 let img = '../../../../../images/accept.png';
 let loadimg = '../../../../../images/loader.gif'
 //let loadimg = '/images/loader.gif';

import Styles from './table.css';

 class RenderRow extends Component{
/**
* @constructor will be used for initializing RenderRow objects
* it will create State for RenderRow class
* @param {function} toggle
*/
constructor(props){
	super(props);
	this.state={
		visible:true,
		display : ''
	};
	this.toggle = this.toggle.bind(this);
}

/**
* @function toggle method is used for chaning the state of the RenderRow
* class and invoke the parent function
*/
toggle(type){
	const newState = !this.state.visible;
	const name = type.Name;
	this.setState({visible: newState});
	this.setState({display: name});
	this.props.parent(newState, name);
}

/**
* @function getAssets method is used for format a children DOM to display
* onclick of the displayed asset
*/
getAssets(node, style){
	const assets = node;
	let assetArry = [];
	let key;
	for(key in assets){

		if(assets.hashasOwnProperty('name') && 
			assets.hashasOwnProperty('size')){
			assetArry.push(
				<div key={key}className={Styles.children}>
				<div className={Styles.col13} style={style}>{assets[key].name}</div>
				<div className={Styles.col13} style={style}>{assets[key].size}</div>
				<div className={Styles.col13} style={style}><ProgressBar percentage={'0'}/></div>
				<div className={Styles.col13} style={style}>

				<span className={Styles.img}>
				<i className="fa fa-check-circle" aria-hidden="true"></i>
				</span>
				<span>{assets[key].status}</span>
				</div>


				</div>
				);
			}
		}
		return assetArry;
	}

	/**
	* @function getChildren method is used for get the children for the object
	* make necessary state changes
	*/
	getChildren(self, assetRow){

		let asset = assetRow.assets;
		let style = {};
		if(assetRow.Name !== this.state.display){
			style.display = 'none';
		}else if(assetRow.Name === this.state.display){
			if(this.state.visible){
				style.display = 'none';
			}else{
				style.display = '';
			}
		}
		return this.getAssets(asset, style);
	}

	/**
	* @default render method will be used for returning the DOM to called functions
	*/
	render(){
		let childList;
		let self = this;
		let nameElement;
	
		let rows = this.props.rows.map(function (item,index){
			let rowArr = [];
			childList = self.getChildren(self,item);

			for(let row in item){

				if(row === 'Name'){
					//nameElement = <u><a onClick={self.toggle.bind(self,item)}>{item[row]}</a></u>;
					nameElement = <div className={Styles.colMd5}><span className={Styles.fileName}>{item[row]}</span></div>;
				}
				else if(row === 'Progress'){
					if(item[row] === 100){
						nameElement = <div className={Styles.colMd2}><ProgressBar percentage={'100'}/></div>;

					}else{
						nameElement = <div className={Styles.colMd2}><ProgressBar percentage={item[row]}/></div>;
					}
				}else if(row === 'status'){
					if(item[row] === 'Success') {
					nameElement = (<div className={Styles.colMd4 +' '+Styles.jobstatusText}><span className={Styles.parentImg}>
					<i className="fa fa-check-circle" aria-hidden="true"></i>
					</span>
					<span>{item[row]}</span></div>);
					}else if(item[row] === 'Uploading'){
					nameElement = (<div className={Styles.colMd4 +' '+Styles.jobstatusText}><span className={Styles.parentImg}>
					<i className="fa fa-spinner fa-spin checkJobStatusLoader"></i></span>
					<span>{item[row]}</span></div>);
					}else{
						nameElement = (<div className={Styles.colMd4 +' '+Styles.jobstatusText}><span><i className="fa fa-times-circle checkJobStatusSuccess">
						</i>{item[row]}</span></div>);
					}
				}else{
					if(row !== 'assets'){
						nameElement = <div className={Styles.colMd1}>{item[row]}</div>;
					}else{
						nameElement = '';
					}
				}

				if(nameElement !== ''){
					rowArr.push(<div key={Math.random()}>
								{nameElement}</div>);
				}
			}			

			rowArr.push(childList);
			return <div key={Math.random()} className={Styles.row +' '+ Styles.subRows}>{rowArr}</div>

		});

		return(
		<div style={{paddingTop:'10'}}>
		{rows}
		</div>
		)
	}
}
RenderRow.propTypes={
	parent:PropTypes.func,
	myFunc:PropTypes.func,
	rows: React.PropTypes.oneOfType([
	React.PropTypes.object,
	React.PropTypes.array,
	])
};
export default RenderRow;
