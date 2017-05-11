/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class TreePaneApi
 * this will be used to call the respective service URL to get the Children
 * for Folder pane
 * @author TDC
 **/

import AlfrescoApiService from '../../../common/util/alfrescoApiService';

export default {

/**
* @function getRootChildren method is used for get the children from
* Alfreco service 
*/
getRootChildren() {
    return AlfrescoApiService.getSiteData(window.tdc.libConfig);
 },
/**
 @function getSubFolders method is used for get the children from
* Alfreco service 
* @param {string} token
 **/
 getSubFolders(nodeRef) {
   return AlfrescoApiService.getSubFolders(window.tdc.patConfig,nodeRef,
   											window.tdc.libConfig.alfToken);
  }
}
