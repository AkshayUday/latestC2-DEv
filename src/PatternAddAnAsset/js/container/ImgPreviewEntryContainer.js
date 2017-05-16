import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory, hashHistory } from 'react-router'
import bean from 'bean';
import {getCurrentValues} from '../utils/util';
import imgPreview from '../../../common/components/ImagePreview';

const mapStateToProps = (state) => {
	let data = getCurrentValues(state.imgPreviewReducer);
	console.log('==========================preview container data======');
	console.log(data);
	return {
		imgpreviewlaunch: true,
		assetObjList: data
	};
}

const mapDispatchToProps = (dispatch) => {
	return {

	};
}

const imgpreviewcontainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(imgPreview)

export default imgpreviewcontainer;
