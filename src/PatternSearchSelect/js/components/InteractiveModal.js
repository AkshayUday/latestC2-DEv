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
// import AssessmentItems from '../components/search/AssessmentItems'

import AssesmentItemsContainer from '../container/AssesmentItemsContainer'

import bean from 'bean';
class InteractiveModal extends React.Component{
	constructor(props){
		super(props);
		this.clearModal = props.clearModal;
		this.closeOnSelect = this.closeOnSelect.bind(this);
		this.getCallBackData = this.getCallBackData.bind(this);
		this.getAssessmentPreviousState = this.getAssessmentPreviousState.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleAssessmentItemsCancel = this.handleAssessmentItemsCancel.bind(this);
        this.handleAssessmentItemsSelect = this.handleAssessmentItemsSelect.bind(this);
        this.getItemsCallBackData = this.getItemsCallBackData.bind(this);
        this.getAssessment = this.props.getAssessment.bind(this);
        this.handleAssessmentSelectButton = this.handleAssessmentSelectButton.bind(this);
		this.mode = this.props.patConfig.patSetup.searchmode;

		this.state = {
			open : true,
			selectfreeze: false,
			selectitemsfreeze: false,
			callBackValueAssessment: {},
			callBackValueItems: {},
			isAssessment : true,
			isAssessmentItems : false,
			isBack:false,
			assessmentURN : this.props.patConfig.patSetup.searchSelectAssessmentURN,
			assessmentPreviousState : ''
		}
	
		document.querySelector('body').style.overflow='hidden'; // Prevent Background application Scroll
	}

	closeOnSelect() {
		
		debugger;
		if(this.mode == 'partial'){ 
		   // this.state.isAssessment = false;
         // this.state.isAssessmentItems = true;
         // debugger;
		    this.setState({isAssessment:false,isAssessmentItems:true,selectitemsfreeze:false});
	      }else{
	      document.querySelector('body').style.overflow='auto'; // Enable background scroll after modal is closed
	      this.getAssessment(this.state.callBackValueAssessment);
		  // this.props.getAssessment(this.state.callBackValue);

	      // this.setState({open:false});
		  // this.props.clearModal();	
		  // bean.fire(this.props.patConfig,this.props.patConfig.eventId,this.state.callBackValue);
	   }
		
	}

	handleAssessmentItemsCancel(){
		// debugger;
   		this.setState({isAssessment:true,isAssessmentItems:false,isBack:true});
	}

	handleAssessmentItemsSelect(){
		document.querySelector('body').style.overflow='auto';
		this.setState({open:false});
		this.props.clearModal();	
		bean.fire(this.props.patConfig.patSetup,this.props.patConfig.eventId,Object.assign(this.state.callBackValueAssessment,
				{ itemsTitle : this.state.callBackValueItems.title || '',
				  itemsDateModified : this.state.callBackValueItems.dateModified || '',
				  itemsUUID : this.state.callBackValueItems.uuid || '',
				  itemID: this.state.callBackValueItems.id || '',
             	  itemsData: this.state.callBackValueItems.itemsData || '',
         	      assessmentData:this.state.callBackValueItems.assessmentData || ''
				}));


	}

	closeModal(){
		document.querySelector('body').style.overflow='auto'; // Enable background scroll after modal is closed
		this.setState({open:false});
		this.props.clearModal();	
		
	}

	getCallBackData(selectedRecord){
		  //debugger;
		  this.setState({selectfreeze: true})
		  this.setState({callBackValueAssessment:selectedRecord});
	}

	getAssessmentPreviousState(prevAssessmentState){
          prevAssessmentState.selectedAssessment = this.state.callBackValueAssessment;
	      this.setState({assessmentPreviousState:prevAssessmentState});
	}

	getItemsCallBackData(selectedRecord){
		  //debugger;
		  this.setState({selectitemsfreeze: true});
		  this.setState({callBackValueItems:selectedRecord});
	}

	handleAssessmentSelectButton(){
		  debugger;
		  this.setState({selectfreeze: false});
		  this.childToParent();
		  // this.setState({callBackValue:selectedRecord});
	}

	receiveChildToParent(childToParent){
      this.childToParent  = childToParent;
    }
     
    childToParent(){

     }

	// shouldComponentUpdate(nextProps, nextState){
	// 	// console.log(nextProps);
	// 	// console.log(nextState);
	// 	// if(nextState.isBack == true){
	// 	// 	// this.setState({isAssessment:true,isAssessmentItems:false,isBack:false});
	// 	// 	return true;
	// 	// }else{
	// 	//     return true;	
	// 	// }
	// }
    
    componentWillMount(){
    	debugger;
    	if(this.state.assessmentURN != ''){
    		this.setState({isAssessment: false, isAssessmentItems : true})
    		this.setState({callBackValueAssessment:{uuid:this.state.assessmentURN}}); 
    	}
    }

	render(){ 
		const { open } = this.state;
		const {Title, cancelLabel, acceptLabel} = this.props.componentConfig;
		return(
			<PL_Layout open={open} modalTitle={Title} 
				modalClass={PopupStyles.modalLayout}
				modalClose={this.closeModal}>
				
                {this.state.isAssessment && 
				<div  id="assessmentSection" style={{}}>
				 <div className={PopupStyles.modalBodyDiv}>				
					<div className={PopupStyles.interactiveContent}>
	          			<SearchAssetsContainer  getChildToParent = {this.receiveChildToParent.bind(this)} 
	          			 componentConfig={this.props.componentConfig} isBack={this.state.isBack} 
	          			 assessmentPreviousState = {this.state.assessmentPreviousState} 
	          			 patConfig={this.props.patConfig} libConfig={this.props.libConfig} 
	          			 getCallBackData={this.getCallBackData} 
	          			 getAssessmentPreviousState = {this.getAssessmentPreviousState} 
	          			 handleAssessmentSelectButton = {this.handleAssessmentSelectButton}/>
	          		</div>
	          	</div>
	          	
	          	<PL_Footer>
	                    <button className={PopupStyles.btnCancel} onClick={this.closeModal} type="button">{cancelLabel}</button>
	                    <button className={this.state.selectfreeze?PopupStyles.btnSelect : PopupStyles.btnSelectdisabled} disable={this.state.selectfreeze} onClick={this.state.selectfreeze?this.closeOnSelect:''} id='assetSelectBtn' type="button">{acceptLabel}</button>
	          	</PL_Footer>
	          	</div>
                }

                {this.state.isAssessmentItems &&
				<div id="assessmentItemsSection" style={{}}>
				 <div className={PopupStyles.modalBodyDiv}>				
					<div className={PopupStyles.interactiveContent}>
	          			<AssesmentItemsContainer  assessmentData={this.state.callBackValueAssessment} componentConfig={this.props.componentConfig} patConfig={this.props.patConfig} libConfig={this.props.libConfig}  getItemsCallBackData = {this.getItemsCallBackData} />
	          		</div>
	          	</div>
	          	
	          	<PL_Footer>
	                    <button className={PopupStyles.btnCancel} onClick={this.handleAssessmentItemsCancel} type="button">{cancelLabel}</button>
	                    <button className={this.state.selectitemsfreeze?PopupStyles.btnSelect : PopupStyles.btnSelectdisabled} disable={this.state.selectitemsfreeze} onClick={this.state.selectitemsfreeze?this.handleAssessmentItemsSelect:''} id='assetSelectBtn' type="button">{acceptLabel}</button>
	          	</PL_Footer>
	          	</div>
                }
			
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
    libConfig:React.PropTypes.object,
    getAssessment: React.PropTypes.object
}
export default InteractiveModal;
