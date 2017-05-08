/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class BrowseAsset - It is Utility class is provides more 
 * functionality to used in Browse asset page
 * Add Asset page
 * @author TDC
 **/
import TreeNodeUtil from 
'../../PatternAddAnAsset/js/components/folderpane/TreeNodeUtil';

/**
* @function getNodeRef method is used for get the nodeRef 
* for give parameters
* @param {string} nodeRef - value received from API
*/
export function getNodeRef(nodeRef){
		let ref;
		if(nodeRef){
			let nodes = nodeRef.split('/');
			if(nodes.length > 0){
				ref = nodes[nodes.length-1];
			}
		}

		return ref;
		// this.props.parent(self,1);
}

/**
* @function highlightChildren method is used for highlight 
* @param {object} model
* @param {fileName} string
*/
export function highlightChildren(model, fileName){
	
    for(let obj=0; obj<model.length; obj++)  {
      let item = model[obj];
      if(item.fileName === fileName){
        item.style = 'pe_filter_enabled tree-node-selected link-view';
        model[obj] = item;
      }
    }
    return model;
}

/**
* @function recentlySelectedChild method is used to highligh currently
* selected folder in folder structure and remove tree-node-selected css 
* class selector from remaining folders
* @param {string}  nodeRef
*/
/*export function recentlySelectedChild(nodeRef){
let childrens = document.querySelectorAll('.filter-container .tree-node-selected');
  childrens.forEach(function (child){
    if(child.id !== nodeRef){
      child.classList.remove('tree-node-selected');
    }
  });
}*/

/**
* @function getFirstObj method is used to get the first object
* in folder structure
* @param {object} data
*/
export function getFirstObj(data){
  let node;
  for(let obj=0; obj<data.length; obj++){
     node = data[obj];
    if(Number(obj) === 0){
      return node;
      break;
    }
  }
}

/**
* @function getNodeRefValue method is used to get the node Reference
* value from given Object
* @param {object} obj
*/
export function getNodeRefValue(obj){
  if(obj !== undefined){
    return obj.nodeRef;
  }
}

/**
* @function trimFolderName method is used for trim the foldername
* which has more than 28 characters
* @param {string} fileName
*/
export function trimFolderName(fileName, lengthOfChar){
	if (fileName){
			if (fileName.length > lengthOfChar) {
				fileName = fileName.substring(0,lengthOfChar) + '...';
			}
		}
		return fileName;
}

/**
* @function getFirstName method is used to get the first name of the
* given object
* @param {object} data
*/
export function getFirstName(data){
  let name;
  for(let obj=0; obj<data.length; obj++){
    if(data[obj].hasOwnProperty('fileName')){
    let node = data[obj];
    if(Number(obj) === 0){
      name = node.fileName;
      break;
    }
  }
  }
  return name;
}

/**
* @function getModifiedOn method is used for manipulate date for and retun
* new date format as June 12 2016
* @param {string} date
*/
export function getModifiedOn(date){ 
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let d = new Date(date);
  let modifiedOn,
  dat,
  month,
  year;
  dat = d.getDate();
  month = d.getMonth();
  year = d.getFullYear();
  months.forEach(function (item, index){
      if(month === index){
          month = item;
        }
    })
  
  modifiedOn = month+' '+dat+', '+year;
  return modifiedOn;
}

/**
* @function getAssetData method is used for filter the 
* forumpost type from the asset and return it to called 
* function
* @param {array} dataArray
*/
export function getAssetData(dataArray){
  let assetItem;
  let assetArray = [];
  dataArray = JSON.parse(JSON.stringify(dataArray));
  if(dataArray && dataArray.items.length > 0){
    let items = dataArray.items;
    for(let obj=0;obj<items.length;items++){
      assetItem = items[obj];
      if(assetItem.type !== 'forumpost'){
        assetArray.push(assetItem);
     }
   }
   dataArray.items = assetArray;
   // console.log(dataArray);
 }
 return dataArray;
}
