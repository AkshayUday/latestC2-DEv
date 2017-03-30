/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file EntryContainer - It is an entry point for AddanAsset component
 * @author TDC
 */


import React, { Component, PropTypes } from 'react';
import Popup from '../components/EntryPopup';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => { 
	return{
		clearModal(){ 
			dispatch({
        		type : 'INIT_APP'
      		})
		}
	}
}

const EntryContainer = connect(
  null,
  mapDispatchToProps
)(Popup)

export default EntryContainer;
