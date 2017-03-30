import request from 'superagent-bluebird-promise'
import service from '../constants/service'

const TIMEOUT = 100

export default {

/*    fetch_PMD_Data(cb, timeout) {
    return request.get('http://10.102.123.19:8080/get.xqy?product-name=product-name11254')
     .auth('admin', 'admin')
     .set('Accept', 'application/json')
     .set('Access-Control-Allow-Origin','http://10.102.122.232:8080')
     .withCredentials()
     .end(function (err, res, req){
    console.log(res.body);
});
  },*/
    fetch_PMD_Data(cb, timeout) {
      try{
        return request.get(service.assetsData).promise();
      }catch(e){
        console.log(e);
      }
  },

  get_PMD_Data(cb, timeout) {
  try{
    return request.get(service.assetsDataSelectBox).promise();
  }catch(e){
    console.log(e);
  }
  },

  autoComplete_Data(cb, timeout) {
  try{
    return request.get(service.autoCompleteDataSugg).promise();
  }catch(e){
    console.log(e);
  }

  },


  save_PMD_Data(value,cb, timeout) {
  try{
    return request.post(service.saveAssetsDataPost)
    .send(value)
    .end(function (err, res){

    	console.log('result'+res);
  });
  }
  catch(e){
    console.log(e);
  }
}
}
