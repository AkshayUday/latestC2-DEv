import React, { Component, PropTypes } from 'react';
import Modal from '../components/InteractiveModal';
import { connect } from 'react-redux';
import {getAssessment} from '../actions/SearchAssetsAction';
import bean from 'bean';

const mapDispatchToProps = (dispatch, ownProps) => { 

	return{
		clearModal(){ 
			dispatch({
        		type : 'INIT_APP'
      		})
		},
		getAssessment(assessmentData) {

			dispatch(getAssessment(assessmentData,ownProps.libConfig,  (data) => {  
                debugger;
				this.setState({open:false});	
				this.clearModal();
				bean.fire(ownProps.patConfig.patSetup,ownProps.patConfig.eventId,data);
			}).bind(this));

		}
	}

}

const SearchModal = connect(
  null,
  mapDispatchToProps
)(Modal)

export default SearchModal;
