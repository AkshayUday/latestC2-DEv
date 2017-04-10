/**
* Copyright (c) Pearson, Inc.
* All rights reserved.
* treeNodeUtil exports more utility method for constructing folder pane 
* structure dynamically.
* it includes manipulating folder pane json data and sorting the folder pane
* and more utility function will be used for folder pane
* @module - treeNodeUtil
* @author - TDC
*/

import {getFirstObj} from '../../../../common/components/browseAssetUtil';
import folderPaneStyles from './styles/FolderPane.css';
export default{
	/**
	* @function getCustomFolder method is called from the action TreePaneAction.
	* this method will be used to manipulate JSON data recived from Alfresco API
	* call the subsequent function to sort the created new API structure and return back
	* action 
	* @param {object} jsonData - It holds the JSON structure received from Alfresco API
	*/
	getCustomFolder(jsonData){
		
		let treeFolder = this.treeNodeUtil(jsonData);
		let sortedFolder = this.sortFolderTree(treeFolder);
		// let treeContainer = this.expandFirstChild(sortedFolder);
		return sortedFolder;
	},

	/**
	* @function treeNodeUtil method is used to manipulate the Json Data which we received
	* from alfresco API and based on business logic we create Json structure and display it
	* on the component to manipulate easily. we are account only the the baseTypeId is folder
	*@param {object} jsonData - It holds the JSON structure received from Alfresco API
	*/
	treeNodeUtil(jsonData){ 
		let treeContainer = [];
		let tempObj,
			baseTypeId,
			objectId, cmisName, parentId;

       let jsonFolderData = jsonData.results;
		//for(let obj in jsonFolderData){
		for(let obj=0;obj<jsonFolderData.length;obj++){
			tempObj = jsonFolderData[obj];
			baseTypeId = tempObj.properties['cmis:baseTypeId'];
			objectId = tempObj.properties['cmis:objectTypeId'];
			if(baseTypeId !== undefined && objectId !== undefined){
				baseTypeId = baseTypeId.value;
				objectId = objectId.value;
				cmisName = tempObj.properties['cmis:name'].value;
				if(baseTypeId === 'cmis:folder' && cmisName.toLowerCase() !== 'surf-config'){
					if(objectId !== 'F:fm:topic'){
						let treeObj = {};
						treeObj.path = tempObj.properties['cmis:objectId'].value;
						treeObj.fileName = cmisName;
						treeObj.parentId = tempObj.properties['cmis:parentId'].value;
						treeObj.nodeRef = tempObj.properties['alfcmis:nodeRef'].value;
						treeObj.highlight = false;
						treeObj.uniqueId = false;
						treeObj.expanded = true;
						//treeObj.style = 'pe_filter no-margin';
						treeObj.style = folderPaneStyles.patternFilter;
						treeObj.fileHiglighter = 'fa fa-folder';
						treeContainer.push(treeObj);
					}
				}
			}
		}

		return treeContainer;
	},

	/**
	* @function expandFirstChild method is used to expand the first folder and it childern
	* if it has and make enable respective css class selector to underline if it has children
	* @param {object} treeContainer - sorted object will be passed
	*/
	expandFirstChild(treeContainer){
		let child;
		for(let obj in treeContainer){
			child = treeContainer[obj];
			if(obj === '0'){
				//child.style = 'pe_filter_enabled tree-node-selected';folderPaneStyles.folderIcon;
				child.style = folderPaneStyles.patternFilter+ 'tree-node-selected';
				//child.fileHiglighter = 'fa fa-folder-open folderIcon';
				child.fileHiglighter = 'fa fa-folder-open '+ folderPaneStyles.folderIcon;
				child.highlight = false;
				if(child.items){
					if(child.items.length > 0){
						child.style = child.style+' link-view';
						child.items = this.visibleChildren(child.items);
					}
				}
				treeContainer[obj] = child;
				break;
			}
		}

		return treeContainer;
	},

	/**
	* @function sortFolderTree method is used to sort the folder names ascending order
	* as per the folder rendered in alfresco API
	* @param {treeObj}
	*/
	sortFolderTree(treeObj){
		let sortedObjs = [];
		if(treeObj !== undefined){
			if(treeObj.length > 0){
			sortedObjs = _.sortBy(treeObj,'fileName');
			}
		}
		return sortedObjs;
	},

	/**
	* @function pathOccurance method is used for identify the folder is a parent or not
	* @param {string} cmisPath
	*/
	pathOccurance(cmisPath){
		let isParent;
		if(cmisPath !== undefined){
			let startIndex = cmisPath.indexOf('/');
			if(startIndex === 0){
				let parent = cmisPath.split('/');
				isParent = parent.length-1;
			}else{
				console.log('Path is not started with /');
			}
		}
		return isParent;
	},

	/**
	* @function visibleChildren method is used to make visible and
	* make changes in css selector classes
	* @param {object} childObj
	*/
	visibleChildren(childObj){
		let child;
		childObj = this.sortFolderTree(childObj);
		for(let obj in childObj){
    			child = childObj[obj];
    			child.expanded = !child.expanded;
    			child = this.disableEnabledNode(child);
    			childObj[obj] = child;
    		}
    		return childObj;
	},

	/**
	* @function hideChildren method is used to hide the childrens and make necessary changes
	* css selector
	* @param {object} childObj
	*/
	hideChildren(childObj){
		let child;
		childObj = this.sortFolderTree(childObj);
		for(let obj in childObj){
    			child = childObj[obj];
    			child.expanded = false;
    			child = this.disableEnabledNode(child);
    			if(child.items){
    				this.hideChildren(child.items);
    			}
    			childObj[obj] = child;
    		}
    		return childObj;
	},

	/**
	* @function disableEnabledNode method is used to make change in Css selector classes
	*/
	disableEnabledNode(child){

		if((child.style.indexOf(folderPaneStyles.patternFilterEnabled)>=0 || 
    		child.style.indexOf('tree-node-selected')>=0)){
	    		child.style = child.style.replace(folderPaneStyles.patternFilterEnabled, '');
	    		child.style = child.style.replace('tree-node-selected', '');
	    		child.highlight = false;
    	}
    	return child;

	}
}
