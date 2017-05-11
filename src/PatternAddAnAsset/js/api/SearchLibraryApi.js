/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * This layer used for connecting to different external servers.
 *
 * @module MediaAssets
 * @file searchLibraryApi - This layer is used for retrieving assets data and for
   saving new saved search value.
  from local forage.
 * @author TDC
 *
*/
//const localforage = require('localforage');
import MetaDataService from '../../../common/util/metadataService';
import AlfrescoApiService from '../../../common/util/alfrescoApiService';


//let filterUrl = serviceUrls.searchBasedAll;
let filterUrl = '';

export default {

  /** @function autoComplete_Data -
 * request.get service call is used to get the autocomplete data from server.
 * @returns {function}
 * This function returns promise.
*/

      autoComplete_Data(searchText) {
        let  SearchTextCond;
        if(searchText == ''){
           SearchTextCond = '';
        return AlfrescoApiService.getSearchAutcompleteData(window.tdc.libConfig,SearchTextCond);
        }
        if(searchText.length>3){
          //SearchTextCond = 'AND CONTAINS(t,\'cm:title:'+'*'+searchText+'*'+'\')';
          let textVal = searchText;
          textVal.replace(/_|_/g,'');
          if(textVal.replace(/_|_/g,'') == ''){
            // SearchTextCond = ' AND  t.cmis:name LIKE \'%25%5C'+searchText+'%25\' OR  t.cm:title LIKE \'%25%5C'+searchText+'%25\'';          
            // SearchTextCond = ' AND  t.cmis:name LIKE \'%25%5C'+searchText+'%25\' ';
            // CONTAINS('~cmis:name:\'<SEARCH_TERM>\'')
            // SearchTextCond = ' AND CONTAINS(\'~t.cmis:name:'+'*'+ searchText +'*'+'\')';
            // SearchTextCond = 'AND  (t.cm:title LIKE \'%25%5C'+searchText+'%25\' OR CONTAINS(t,\'~cmis:name:\\' + '\'*' + searchText + '*\'\\' + '\'))';
             
             SearchTextCond = 'AND  (t.cm:title LIKE \'%25%5C'+searchText+'%25\' OR t.cmis:name LIKE \'%25%5C'+searchText+'%25\')';

          }else{  
            // SearchTextCond = ' AND  t.cmis:name LIKE \'%25%'+searchText+'%25\' OR t.cm:title LIKE \'%25'+searchText+'%25\'';
            // SearchTextCond = ' AND  (t.cm:title LIKE \'%25'+searchText+'%25\' OR CONTAINS(t,\'~cmis:name:\\'+ '\'*' + searchText + '*\'\\' + '\'))';
            
            SearchTextCond = ' AND  (t.cm:title LIKE \'%25'+searchText+'%25\' OR t.cmis:name LIKE \'%25'+searchText+'%25\')';
  
            // SearchTextCond = ' AND  t.cmis:name LIKE \'%25%'+searchText+'%25\' ';           
            // SearchTextCond = AND CONTAINS("'~t.cmis:name:\'*"+searchText+"*\''");
            // SearchTextCond = ' AND CONTAINS(\'~t.cmis:name:'+'*'+ searchText +'*'+'\')';
          
          }
          
          
          return AlfrescoApiService.getSearchAutcompleteData(window.tdc.libConfig,SearchTextCond)
        }
      },

/** @function searchAssets -
 * request.get service call is used to get the assets data.
 * @returns {function}
 * This function returns promise.
*/

   searchAssets(searchText, filter,index,limit, sortValue='ORDER BY cmis:creationDate desc') {
          if (filter !== '' && filter !== undefined) {
              filterUrl = filter;
          }
      let SearchTextCond= '';
      let fileTypeCond = '';
        if(searchText!==''){
        //SearchTextCond = 'AND (CONTAINS(t,\'cm:title:'+'*'+searchText+'*'+'\') OR t.cm:title=\''+searchText+'\')';
        
        //SearchTextCond = ' AND t.cm:title LIKE \'%25'+searchText+'%25\' ';
        let textVal = searchText;

        textVal.replace(/_|_/g,'');
        if(textVal.replace(/_|_/g,'') == ''){
          // SearchTextCond = ' AND t.cmis:name LIKE \'%25%5C'+searchText+'%25\' OR  t.cm:title LIKE \'%25%5C'+searchText+'%25\'';          
           SearchTextCond = 'AND  (t.cm:title LIKE \'%25%5C'+searchText+'%25\' OR t.cmis:name LIKE \'%25%5C'+searchText+'%25\')';

        }else{
          // SearchTextCond = ' AND t.cmis:name LIKE \'%25'+searchText+'%25\' OR t.cm:title LIKE \'%25'+searchText+'%25\'';          
          SearchTextCond = ' AND  (t.cm:title LIKE \'%25'+searchText+'%25\' OR t.cmis:name LIKE \'%25'+searchText+'%25\')';
  
        }

        }
        if(filterUrl!==''&&filterUrl!=='/*'){
          //fileTypeCond = ' AND d.cmis:contentStreamMimeType IN(\''+filter+'\')';                    
          fileTypeCond = ' AND d.cmis:contentStreamMimeType LIKE \''+filterUrl.split('/')[0]+'/%25\' ';
        }else{
          fileTypeCond = ' AND d.cmis:contentStreamMimeType NOT IN(\'image/*\',\'audio/*\',\'video/*\')';
        }
    return AlfrescoApiService.getAssetsBySearch(window.tdc.patConfig,SearchTextCond,fileTypeCond,sortValue,index,limit);
   },

   getProductData(){
    return AlfrescoApiService.getSiteData(window.tdc.libConfig);
   },

  /* Getting root path path of an asset */

  // getAssetRoutePath(server,SSOToken,nodeRef){
  //   return AlfrescoApiService.getAssetRoutePath(server,SSOToken,nodeRef);
  // },


/* get guid to generate eps url */
  // getGuid(server,SSOToken,siteName){
  //   return AlfrescoApiService.getGuid(server,SSOToken,siteName)
  // },


/* Get EPS url */

  getEpsUrl(nodeRef){
    return AlfrescoApiService.getEpsUrl(window.tdc.patConfig,nodeRef)
  },

  difficultyLevelData(){
    const bufferGet = {
    action: 'Taxonomies',
    req: 'difficultyLevels',
    data: {
      taxonomies: 'difficultylevel'
      }
    }

    bufferGet.libConfig = window.tdc.libConfig;
    return MetaDataService.send(bufferGet);

  }


}

