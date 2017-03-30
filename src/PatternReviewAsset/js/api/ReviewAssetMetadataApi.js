import request from 'superagent-bluebird-promise';
import service from '../constants/service';

export default {

  get_RMD_Data() {
    return request.get(service.metaData).promise();
  },

  save_RMD_Data() {
    return request.get(service.saveMetaData).promise();
  }
}
