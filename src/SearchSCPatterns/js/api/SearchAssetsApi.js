import ScapiService from '../../../common/util/scapiServices'

export function getSearchResults(filterObj) {
  filterObj.libConfig = window.tdc.libConfig;
  return ScapiService.send(filterObj);
}
