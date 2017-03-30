/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * This layer used for connecting to different external servers.
 *
 * @module MediaAssets
 * @file assets - This layer is used for connecting to different external servers.
    In this module, It is used for fetching assets data from server
 * @author TDC
 *
*/

import AlfrescoApiService from '../../../common/util/alfrescoApiService';


let filterString = '';

export default {
/** @function get_assets -
 * request.get service call is used to get the assets data.
 * @returns {function}
 * This function returns promise.
*/
   get_assets(nodeRef, filter, sortValue='ORDER BY cmis:creationDate desc',index, limit) {
    if (filter !== '' && filter !== undefined) {
        filterString = filter;
    }

    let SearchTextCond= '';
    let fileTypeCond = '';
        if(filterString!==''&&filterString!=='/*'){
          //fileTypeCond = ' AND d.cmis:contentStreamMimeType IN(\''+filter+'\')';
          fileTypeCond = ' AND d.cmis:contentStreamMimeType LIKE \''+filterString.split('/')[0]+'/%25\' ';
        }else{

          //fileTypeCond = ' AND d.cmis:contentStreamMimeType NOT IN(\'image/*\',\'audio/*\',\'video/*\')';
          
          fileTypeCond = ' AND d.cmis:contentStreamMimeType NOT LIKE \'image/%25\' AND d.cmis:contentStreamMimeType NOT LIKE \'audio/%25\' AND d.cmis:contentStreamMimeType NOT LIKE \'video/%25\' ';


        }

    return AlfrescoApiService.getAssetsByFolder(window.tdc.libConfig,nodeRef,SearchTextCond,fileTypeCond,sortValue,index,limit);
  }
}
