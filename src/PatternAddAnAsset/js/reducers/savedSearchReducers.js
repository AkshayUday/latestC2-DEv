/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 *
 * @module MediaAssets
 * @file savedSearchReducers - This savedSearch reducers is a function 
   that takes two parameters (state and action)and returns updated state. 
   It is used to get saved search values and for enabling and disabling
   run search agin and delete search buttons.
 * @author TDC
 *
*/

let initilizeValues = [{
  data:{
    'data':[]
  },
  'savedData':[],
  isChecked:false,
  enableDelete:false,
  isSavedSearch: false
}]

/**@function fileUpload
 * This fileUpload reducer will switch between actions SAVED_SEARCH_GET and CHECKBOX_HANDLER
 * Whenever dispatch call is made with action as an argument, reducer will catch this call and return updated state.
 * If state is undefined or null it will return initial state else it will merge current state with initial state
 * @param {object} state - state object of component.
 * @param {object} action - action object of component.
 * @returns {object} state-
 * updated state of component.
*/
const savedSearchReducer = (state = initilizeValues, action)=>{
  switch(action.type) {    
    case 'UPDATE_SAVED_SEARCH_CHECKBOX_VALUE':
   
    let updateState = Object.assign({}, state[0]);
    
    let chkValue = _.filter(updateState.savedData,(data) => { return data.id == action.data.id});

    if(action.data.id == chkValue[0]['id']){
      chkValue[0]['checked'] = false; 
      updateState.enableSearch = false;
      updateState.enableDelete = false;
    }
    return [updateState];    

    case 'SAVED_SEARCH_GET':
    let newState = Object.assign({}, state[0], {
            data: action.Search_Data,
            isChecked: !state[0].isChecked
          });
    return [newState];
    break;

    case 'CHECKBOX_HANDLER':
    /*let newState = Object.assign({}, state[0], {
            isChecked: action.checkTest
          });*/
    let itrObj = Object.assign({}, state[0]);
    let savedSearchData = itrObj.data.data;
    let selectedCount = 0;
    if (typeof savedSearchData.map === 'function') {
      savedSearchData.map(function (item,index){
       if(item.id === action.checkTest.id){
        console.log('item.searchterm: '+item.searchterm);
        console.log('action.checkTest.id: '+action.checkTest.id);
        console.log('action.checkTest.checked: '+action.checkTest.checked);
        item.isChecked = action.checkTest.checked;
        console.log('item.isChecked: '+item.isChecked);
       }
      });

      // savedSearchData.map(function(item,index){
      //  if(item.isChecked === true){
      //     selectedCount++;
      //  }
      // });
      let checkedHistory = itrObj.savedData;
      if(checkedHistory.length>0){
        checkedHistory.map(function (item,index){
          if(item.checked === true){
            selectedCount++;
          }
        });
      } else{
         itrObj.enableDelete = false;
         itrObj.enableSearch = false;
      }

      if(selectedCount === 1){
        itrObj.enableDelete = true;
        itrObj.enableSearch = true;
      }else if (selectedCount === 0){
        itrObj.enableDelete = false;
        itrObj.enableSearch = false;
      }else if(selectedCount > 1){
        itrObj.enableDelete = true;
        itrObj.enableSearch = false;
      }

      action.checkTest.callback(itrObj.enableDelete, itrObj.enableSearch);

    }
    itrObj.data.data = savedSearchData;
    itrObj.isChecked = !itrObj.isChecked;


    return [itrObj];
    break;
    case 'CHECKED_SAVED_SEARCH_VALUE':
      let newData = action.data;
      let Data = Object.assign({}, state[0]);
      if(Data.savedData.length===0){
        Data.savedData.push(newData);
      }else{
        let alreadyExists = false;
      for(let i=0;i<Data.savedData.length;i++){
        if(Data.savedData[i].id===newData.id){
          Data.savedData[i].checked = newData.checked;
          alreadyExists = true;
        }
      }
      if(!alreadyExists){
        Data.savedData.push(newData);
      }
      // Data.enableSearch = false;
      // Data.enableDelete = true;
  }
      // existData.savedData.push(action.data);
       return [Data];
      break;
       case 'DELETE_CHECKED_SAVED_SEARCH_VALUE':
       let dataObj = Object.assign({}, state[0]);
       console.log(action);
       let deletedData = action.data;
       let checkedHistory = dataObj.savedData;
       let newCheckedHistory =[];
        if(checkedHistory.length>0){
          for(let i=0;i<checkedHistory.length;i++){
            for(let j=0;j<deletedData.length;j++){
              if(checkedHistory[i].id!==deletedData[j].id){
                if(checkedHistory[i].checked!==true){
                newCheckedHistory.push(checkedHistory[i]);
                }
              }
            }
          }
      }
      dataObj.savedData = newCheckedHistory;
      dataObj.enableDelete = false;
      dataObj.enableSearch = false;
      return [dataObj];
    // var newState = Object.assign({}, state[0], {
    //         data: action.Search_Data,
    //         isChecked: !state[0].isChecked
    //       });
    // return [newState];
    break;
    default:
    return state

    }
  }

 module.exports= savedSearchReducer;
