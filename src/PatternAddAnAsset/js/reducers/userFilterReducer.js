let initilizeValues = {
  'displayvaluecount':9,
  'sortIndex': '0',
  'viewName': 'grid-view',
  'displayValueCountForList': 25
}

const userFilterReducer = (state = initilizeValues, action)=>{
  switch(action.type) {
    case 'CHECK_SELECT':
      return {
        displayvaluecount : action.payload.displayvaluecount,
        sortIndex: action.payload.sortIndex,
        viewName: action.payload.viewName,
        displayValueCountForList: action.payload.displayValueCountForList
      }
    default:
      return state

  }
}

module.exports= userFilterReducer ;
