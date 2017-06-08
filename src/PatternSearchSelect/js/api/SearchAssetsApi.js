import ScapiService from '../../../common/util/scapiServices'

export function getSearchResults(filterObj,libConfig) {
  filterObj.libConfig = libConfig;
  debugger;

  if(filterObj.action == 'TaxonomicType'){
    filterObj = JSON.parse(JSON.stringify(filterObj));
	
    if(filterObj.libConfig.headers['X-Roles-Test'] != undefined){
    	delete filterObj.libConfig.headers['X-Roles-Test'];
    }
    
  }


 if(filterObj._type == 'TDX' || filterObj._type == 'tdx' || filterObj._type == 'cite'
     || filterObj._type == 'tdxitems' || filterObj._type == 'citeitems'){
    filterObj = JSON.parse(JSON.stringify(filterObj));
    filterObj.libConfig.headers['Prefer'] = 'embedLevel=1';
    filterObj.libConfig.headers['X-Roles'] = 'ContentMetadataAdmin,ContentPlanningAdmin';
  }


  // console.log(filterObj.libConfig.headers);
  // console.log(window.tdc.libConfig.headers);

  return ScapiService.send(filterObj);
}
