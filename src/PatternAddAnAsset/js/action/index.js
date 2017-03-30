
import searchLibraryApi from '../api/SearchLibraryApi'
import {AUTO_COMPLETE} from '../constants/searchLibraryConstants';

function checkAndAdd(autoCompleteData,title) {
  let found = autoCompleteData.some(function (el) {
    return el.term === title;
  });
 return found;
}

export function populateAutoComplete(text,savedSearch,lastThreeSearch) {
    return dispatch => {
    	searchLibraryApi.autoComplete_Data(text).then(function (data){
        let responseData = data.body.results;
        let autoCompleteData = [];
        let _title = [];
        let _name = [];

        let _nameVal;
        let _titleVal;

        if(responseData.length>0){
          for(let i=0;i<responseData.length;i++){
            // let titleVal = responseData[i].properties['t.cm:title'].value[0];
            // debugger;
            _nameVal = '';
            _titleVal = '';

            if(responseData[i].properties['t.cm:title']['value'] != null 
              && responseData[i].properties['t.cm:title']['value'] != '') {
                _title.push(responseData[i].properties['t.cm:title'].value[0]);
              _titleVal = responseData[i].properties['t.cm:title'].value[0];

            }

            if(responseData[i].properties['t.cmis:name']['value'] != null 
              && responseData[i].properties['t.cmis:name']['value'] != '') {
                 _name.push(responseData[i].properties['t.cmis:name'].value[0]);
                _nameVal = responseData[i].properties['t.cmis:name'].value[0];
            }
           
            // console.log(_title);
            // console.log(_name);


            // let titleVal = responseData[i].properties['t.cmis:name'].value[0];
            
            // if(checkAndAdd(autoCompleteData,titleVal)==false){
            // autoCompleteData.push({term:titleVal});
            // }

            if(checkAndAdd(autoCompleteData,_titleVal)==false){
            autoCompleteData.push({term:_titleVal});
            }

            if(checkAndAdd(autoCompleteData,_nameVal)==false){
            autoCompleteData.push({term:_nameVal});
            }
    

          }
        }

        //console.log('API');
        //console.log(text);

        if(text == ''){
          dispatch({
          type: 'UPDATE_ALL_ASSET',
          data: autoCompleteData,
          savedSearch,
          lastThreeSearch
        });
        }else{
          dispatch({
          type: AUTO_COMPLETE,
          data: autoCompleteData,
          /*text,*/
          savedSearch,
          lastThreeSearch
        });

        }
        
    });

  }
}
