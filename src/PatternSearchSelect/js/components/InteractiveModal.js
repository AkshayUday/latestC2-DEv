/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class Modal component used to create a Pop Up to the 
 * Search SC Pattern
 * @author Udhayakumar Gururaj
 **/
import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import PL_Layout from '../../../PatternLayouts/PL_Layout'
import PL_Footer from '../../../PatternLayouts/PL_Footer'
import PopupStyles from './styles/modalStyles.css'
import SearchAssetsContainer from '../container/SearchAssetsContainer'
import bean from 'bean';
class InteractiveModal extends React.Component{
	constructor(props){
		super(props);
		this.clearModal = props.clearModal;
		this.closeOnSelect = this.closeOnSelect.bind(this);
		this.getCallBackData = this.getCallBackData.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			open : true,
			selectfreeze: false,
			callBackValue: {}
		}
		document.querySelector('body').style.overflow='hidden'; // Prevent Background application Scroll
	}

	closeOnSelect() {
		document.querySelector('body').style.overflow='auto'; // Enable background scroll after modal is closed
		this.setState({open:false});
		this.clearModal();
		bean.fire(this.props.patConfig.patSetup,this.props.patConfig.eventId,this.state.callBackValue);
	}

	closeModal(){
		document.querySelector('body').style.overflow='auto'; // Enable background scroll after modal is closed
		this.setState({open:false});
		this.props.clearModal();
	}

	getCallBackData(selectedRecord){
		this.setState({selectfreeze: true})
		this.setState({callBackValue:selectedRecord});
	}

	render(){ 
		const { open } = this.state;
		const {Title, cancelLabel, acceptLabel} = this.props.componentConfig;
		return(
			<PL_Layout open={open} modalTitle={Title} 
				modalClass={PopupStyles.modalLayout}
				modalClose={this.closeModal}>
				
				<div className={PopupStyles.modalBodyDiv}>
					<div className={PopupStyles.interactiveContent}>
	          			<SearchAssetsContainer componentConfig={this.props.componentConfig} patConfig={this.props.patConfig} libConfig={this.props.libConfig} getCallBackData={this.getCallBackData}/>
	          		</div>
	          	</div>
	          	<PL_Footer>
	                    <button className={PopupStyles.btnCancel} onClick={this.closeModal} type="button">{cancelLabel}</button>
	                    <button className={this.state.selectfreeze?PopupStyles.btnSelect : PopupStyles.btnSelectdisabled} disable={this.state.selectfreeze} onClick={this.state.selectfreeze?this.closeOnSelect:''} id='assetSelectBtn' type="button">{acceptLabel}</button>
	          	</PL_Footer>
			</PL_Layout>

			)
	}
}

InteractiveModal.propTypes = {
	children : React.PropTypes.object,
	clearModal : React.PropTypes.func,
	location : React.PropTypes.string,
	componentConfig: React.PropTypes.object,
	patConfig:React.PropTypes.object,
    libConfig:React.PropTypes.object
}
export default InteractiveModal;
