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
		this.state = {
			open : true,
			callBackValue: {}
		}
	}

	closeOnSelect() {
		this.setState({open:false});
		this.clearModal();
		bean.fire(this.props.patConfig,this.props.patConfig.resultsEventId,this.state.callBackValue);
	}

	getCallBackData(selectedRecord){
		this.setState({callBackValue:selectedRecord});
	}

	render(){ 
		const { open } = this.state;
		const {Title, cancelLabel, acceptLabel} = this.props.componentConfig;
		return(
			<PL_Layout open={open} modalTitle={Title} 
				modalClass={PopupStyles.modalLayout}
				modalClose={this.closeOnSelect}>
				
				<div className={PopupStyles.modalBodyDiv}>
					<div className={PopupStyles.interactiveContent}>
	          			<SearchAssetsContainer componentConfig={this.props.componentConfig} patConfig={this.props.patConfig} libConfig={this.props.libConfig} getCallBackData={this.getCallBackData}/>
	          		</div>
	          	</div>
	          	<PL_Footer>
	                    <button className={PopupStyles.btnCancel} onClick={this.closeBrowseAssets} type="button">{cancelLabel}</button>
	                    <button className={PopupStyles.btnSelect} onClick={this.closeOnSelect} id='assetSelectBtn' type="button">{acceptLabel}</button>
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
