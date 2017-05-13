import ScapiService from '../../../common/util/scapiServices'

export function getSearchResults(filterObj,libConfig) {
  filterObj.libConfig = libConfig;
  
  if(filterObj.action == 'TaxonomicType'){
  	filterObj = JSON.parse(JSON.stringify(filterObj));
    if(filterObj.libConfig.headers['X-Roles-Test'] != undefined){
    	delete filterObj.libConfig.headers['X-Roles-Test'];
    }
    
  }

  return ScapiService.send(filterObj);
}
