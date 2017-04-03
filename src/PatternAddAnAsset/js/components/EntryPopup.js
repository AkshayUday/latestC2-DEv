/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class EntryPopup component used to create a Pop Up to the 
 * Add Asset page
 * @author Udhayakumar Gururaj
 **/
import React from 'react';
import AddAnAsset from './AddAnAsset'
import { Link, browserHistory, hashHistory } from 'react-router';
import PL_Layout from '../../../PatternLayouts/PL_Layout'
import PopupStyles from './Styles/EntryPopupStyles.css'
import store from './../store'
import localForage from 'localforage';

class EntryPopup extends React.Component{
	constructor(props){
		super(props);
		this.clearModal = props.clearModal;
		this.closeOnSelect = this.closeOnSelect.bind(this);
		this.state = {
			open : true
		}
		document.querySelector('body').style.overflow='hidden'; // Prevent background scroll 
	}

	closeOnSelect() {
		this.setState({open:false});
		document.querySelector('body').style.overflow='auto';
		localForage.setItem('persistFilterSettings',store.getState().userFilterReducer)
	}

	render(){ 
		const { open } = this.state;
		return(
			<PL_Layout open={open} modalTitle='Add An Asset' 
				modalClass={PopupStyles.addAnAssetLayout}
				modalClose={this.closeOnSelect}>
				
				<div className={PopupStyles.modalBodyDiv}>
	          		<AddAnAsset children={this.props.children} clearModal={this.clearModal} 
	          		 closeModal={this.closeOnSelect} />
	          	</div>
			</PL_Layout>

			)
	}
}

EntryPopup.propTypes = {
	children : React.PropTypes.object,
	clearModal : React.PropTypes.func,
	location : React.PropTypes.string
}
export default EntryPopup;
