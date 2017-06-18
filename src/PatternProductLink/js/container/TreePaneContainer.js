/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePaneContainer
 * React bindings for Redux embrace the idea of separating presentational
 * and container component How things work (data fetching, state updates)
 * Subscribe to Redux state
 * Dispatch Redux actions
 * @author TDC
 **/
import React from 'react';
import { connect } from 'react-redux';
import TreePaneRenderer from '../../../PatternAddAnAsset/js/components/folderpane/FolderPane';
import {getFolders, getSubFolders, updateCurrentFolder} from '../actions/TreePaneAction';

/**
 * @function mapStateToProps If specified, the component will subscribe to
 * Redux store updates. Any time it updates, mapStateToProps will be called.
 * Its result must be a plain object*, and it will be merged into the component’s props.
 * If you omit it, the component will not be subscribed to the Redux store
 *  @param state
 */
const mapStateToProps = (state) => {
  let data = getSelectedValues(state.TreePaneReducers);
  return {
    model: data,
    show : data.show
  }
}

const getSelectedValues = (dataArray) => {
  if (dataArray.length > 0) {
    return dataArray[dataArray.length-1];
  }
  return [];
}
/**
 * @function mapDispatchToProps If an object is passed, each function inside
 *  it will be assumed to be a Redux action creator. An object with the same function names,
 *  but with every action creator wrapped into a dispatch call so they may be invoked directly,
 *  will be merged into the component’s props
 *  * @param dispatch
 *  @returns {{componentWillMount: componentWillMount, toggle: toggle, getSubFolders: getSubFolders}}
 */
let previousNodeRef;
const mapDispatchToProps = (dispatch) => {
  return {
    componentWillMount: function () {
      dispatch(getFolders(this.props.nodeRef));
      previousNodeRef = this.props.nodeRef;
    },
    componentWillReceiveProps: function (nextProps) {
      if(previousNodeRef !== nextProps.nodeRef) {
        dispatch(getFolders(nextProps.nodeRef));
        previousNodeRef = nextProps.nodeRef;
      }
    },
    toggle:function (model,foldername, nodeRef, curPageNo){
      console.log(' Folder Name : '+ foldername +' ... '+' Node Ref : '+nodeRef);
      dispatch(updateCurrentFolder(nodeRef));
    },
    getSubFolders:function (foldername,child, nodeRef) {
      dispatch(getSubFolders('browseasset',foldername,child, nodeRef));
    }
  }
}

const treePaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreePaneRenderer)

export default treePaneContainer;
