import React, { Component, PropTypes } from 'react';
import Modal from '../components/InteractiveModal';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => { 
	return{
		clearModal(){ 
			dispatch({
        		type : 'INIT_APP'
      		})
		}
	}
}

const SearchModal = connect(
  null,
  mapDispatchToProps
)(Modal)

export default SearchModal;
