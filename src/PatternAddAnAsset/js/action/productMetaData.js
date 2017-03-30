//import productMetaDataApi from '../../js/api/productMetaDataApi'
import store from '../store';
//import * as CONST from '../../js/constants/productMetaDataConstants'


export function  selectPublisherData (productName){
    return dispatch => {
      productMetaDataApi.fetch_PMD_Data(productName).then(function (data){
    //    console.log(data);
        dispatch({
          type: CONST.PRODUCT_META_DATA,
          PMD_Data : JSON.parse(data.text),
          success: true
          })
      },function (error){
        console.log('Error: '+ error) ;
        dispatch({
          type: CONST.PRODUCT_META_DATA_ERROR,
          PMD_Data_Err : error.message,
          success: false
        })
      }).catch(e => {
        console.log('error: '+ e) ;
        dispatch({
          type: CONST.PRODUCT_META_DATA_ERROR,
          PMD_Data_Err : e.message,
          success: false
        })
    })

  }
}

export function  selectBoxData (){
    return dispatch => {
      productMetaDataApi.get_PMD_Data().then(function (data){
        dispatch({
          type: CONST.META_DATA,
          PMD_Data : JSON.parse(data.text),
          success: true
          })
      },function (error){
        console.log('Error: '+ error) ;
        dispatch({
          type: CONST.META_DATA_ERROR,
          PMD_Data_Err : error.message,
          success: false
        })
      }).catch(e => {
        console.log('error: '+ e) ;
        dispatch({
          type: CONST.META_DATA_ERROR,
          PMD_Data_Err : e.message,
          success: false
        })
    })
  }
}

export function  saveProductMetaData (values){
    return dispatch => {
      productMetaDataApi.save_PMD_Data(values).then(function (data){
        dispatch({
          type: CONST.SAVE_PRODUCT_META_DATA,
          SPMD_Data : JSON.parse(data.text),
          values,
          success: true
          })
      },function (error){
        console.log('Error: '+ error) ;
        dispatch({
          type: CONST.SAVE_PRODUCT_META_DATA_ERROR,
          SPMD_Data_Err : error.message,
          success: false
        })
      }).catch(e => {
        console.log('error: '+ e) ;
        dispatch({
          type: CONST.SAVE_PRODUCT_META_DATA_ERROR,
          SPMD_Data_Err : e.message,
          success: false
        })
    })
  }
}

export function  populateAutoComplete (text){
    return dispatch => {
      productMetaDataApi.autoComplete_Data(text).then(function (data){
        dispatch({
          type: CONST.AUTOCOMPLETE_DATA,
          data : JSON.parse(data.text),
          text,
          success: true
          })
      },function (error){
        console.log('Error: '+ error) ;
        dispatch({
          type: CONST.AUTOCOMPLETE_DATA_ERROR,
          AUTO_Data_Err : error.message,
          success: false
        })
      }).catch(e => {
        console.log('error: '+ e) ;
        dispatch({
          type: CONST.AUTOCOMPLETE_DATA_ERROR,
          AUTO_Data_Err : e.message,
          success: false
        })
    })
  }
}




