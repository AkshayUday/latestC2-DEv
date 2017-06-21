/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class FolderPane used to create a Folder structure and it will be used in browse asset and
 * search Libraray pages. 
 * @author TDC
 **/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Image from '../../../../common/components/Image';
import TreeNodeUtil from './TreeNodeUtil';
import {getNodeRef, trimFolderName, highlightChildren} 
from '../../../../common/components/browseAssetUtil';
import folderPaneStyles from './styles/FolderPane.css';


//import {getSubFolders} from '../../action/TreePaneAction';

class FolderPane extends Component{

	/**
	* @constructor used to intialize folder pane objects with it props
	* @param {props} props - used to acquire parent properties
	* @param {function}  props.componentWillMount
	* @param {function}  props.toggle
	*/
	constructor(props){
        super(props);
        this.state={
            expanded : false,
            style:'',
        }
        if(this.props.componentWillMount){
            this.componentWillMount = props.componentWillMount.bind(this);
        }
	        if(this.props.toggle){
	        	this.toggle = this.toggle.bind(this);
	        }

		if(this.props.getSubFolders){
			this.getSubFolders = props.getSubFolders.bind(this);
		}
		if(this.props.updateNodeRef) {
			this.updateNodeRef = props.updateNodeRef.bind(this)
		}
		if(this.props.componentWillReceiveProps){
			this.componentWillReceiveProps = props.componentWillReceiveProps.bind(this);
		}
    }   
    /**
    * @function toggle used to get the childrens of the clicked folder
    * and those children will be visible under the folder and also it invokes the parent
    * toggle method in @class TreePanecontainer
    * @param {Object} model - it is object holds the subsequent children object
    * @param {string} folder name - it holds track of clicked folder name
    * @param {string} nodeRef - passing noderef value of clicked folder to parent function
    */
     	toggle(model, foldername, nodeRef) { 
    		let child;
    		let oldStyle;
    		this.setState({expanded: !this.state.expanded});
    		//for(let obj in model){
    		for(let obj=0;obj<model.length;obj++){
    			if(model[obj].hasOwnProperty('fileName')){
    			child = model[obj];
    			if(child.fileName === foldername){
    				if(!child.highlight){ // condition work if folder open
    					child.highlight = true;
	    				oldStyle = child.style;
	    				//child.fileHiglighter = 'fa fa-folder-open folderIcon';
	    				child.fileHiglighter = 'fa fa-folder-open '+ folderPaneStyles.folderIcon;
	    				if(!oldStyle.indexOf('tree-node-selected') >= 0){
	    				//if(!oldStyle.includes('tree-node-selected')){
	    					oldStyle = oldStyle + ' '+ 'tree-node-selected'
	    				}
	    				if(!oldStyle.indexOf(folderPaneStyles.patternFilterEnabled) >= 0){
	    				//if(!oldStyle.includes('pe_filter_enabled')){
    						child.style = folderPaneStyles.patternFilterEnabled+' '+oldStyle;
    					}
                        let _foldername = foldername;  
                        child.items = this.getSubFolders(_foldername,child,nodeRef);
    				}else{ // folder close
    					child.style = child.style.replace(folderPaneStyles.patternFilterEnabled, '');
                        child.style = child.style+ ' tree-node-selected';
    					// TreeNodeUtil.hideChildren(child.items);
    					delete child.items;
    					child.highlight = false;
    					child.fileHiglighter = 'fa fa-folder';
    					if(child.isParent){
    						nodeRef = window.tdc.patConfig.nodeRef;
    					}else{
    						nodeRef = child.parentId;
    					}
    				}
    			}else{
    				if((child.style.indexOf(folderPaneStyles.patternFilterEnabled)>=0 || 
    				//if((child.style.includes('pe_filter_enabled') || 
    					child.style.indexOf('tree-node-selected')>=0)){
	    				child.style = child.style.replace(folderPaneStyles.patternFilterEnabled, '');
	    				child.style = child.style.replace('tree-node-selected', '');
	    				// TreeNodeUtil.hideChildren(child.items);
	    				delete child.items;
	    				child.highlight = false;
	    				child.fileHiglighter = 'fa fa-folder';
    			}
    			}
    		}
    		}
        	this.props.toggle(model,foldername, nodeRef);
					if (this.props.updateNodeRef) {
						this.updateNodeRef(nodeRef, foldername);
					}
    	}

    	/**
    	* @default render method entry of the component and we access the properties from parent 
    	* model and create a dynamic DOM to return to the parent page
    	*/
		render(){ 
			let self = this;
			let model = this.props.model;
			let folderArr = [];
			let items;
			let nodeRef;
        	let folderName;
        	let fileNameObj;
        	let cssStyle;
			//for(let folder in model){
			for(let folder=0;folder<model.length;folder++){
				// folderName = trimFolderName(model[folder].fileName);
				folderName = model[folder].fileName;
				fileNameObj = model[folder];
					if(fileNameObj.fileName){
						if(fileNameObj.expanded){
							nodeRef = getNodeRef(fileNameObj.nodeRef);
							cssStyle = fileNameObj.style;
							folderArr.push(
								<div className={folderPaneStyles.patternFilter}
								key={fileNameObj.fileName}
								onClick={this.toggle.bind(self,model, fileNameObj.fileName, nodeRef)}> 
								<i className={fileNameObj.fileHiglighter}></i>
								<span id={nodeRef} name={fileNameObj.fileName} key={fileNameObj.fileName} className={cssStyle + folderPaneStyles.folderEllipsis}>{folderName}</span>
								</div>
							);
							if(fileNameObj.items && fileNameObj.items.length > 0){
								items = fileNameObj.items;
								folderArr.push(<div key={Math.random()} className={folderPaneStyles.patternFilter}>
												<FolderPane 
												model={items} 
												toggle={self.props.toggle}
												getSubFolders = {self.props.getSubFolders}
												updateNodeRef = {self.props.updateNodeRef}
												/>
												</div>);
							}

						}
			}
		}
			return(
				<div className={folderPaneStyles.folderTree}>
				{ folderArr }
				</div>
				);
		}
}

FolderPane.propTypes = {
    componentWillMount: PropTypes.func,
    toggle: PropTypes.func,
    model: PropTypes.array,
    getSubFolders :PropTypes.func,
	  componentWillReceiveProps: PropTypes.func,
	  updateNodeRef: PropTypes.func
}

export default FolderPane;
