import ScapiService from '../../../common/util/scapiServices'

export function getSearchResults(filterObj,libConfig) {
  filterObj.libConfig = libConfig;
  
  if(filterObj.action == 'TaxonomicType'){
  	filterObj = JSON.parse(JSON.stringify(filterObj));
    if(filterObj.libConfig.headers['X-Roles-Test'] != undefined){
    	delete filterObj.libConfig.headers['X-Roles-Test'];
    }
    
  }
  console.log(filterObj.libConfig.headers);
  console.log(window.tdc.libConfig.headers);

  return ScapiService.send(filterObj);
}
