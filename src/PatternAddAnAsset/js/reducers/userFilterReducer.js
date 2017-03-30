let initilizeValues = {
  'displayvaluecount':'9',
  'sortIndex': '0'
}

const userFilterReducer = (state = initilizeValues, action)=>{
  switch(action.type) {
    case 'CHECK_SELECT':
      return {
        displayvaluecount : action.payload.displayvaluecount,
        sortIndex: action.payload.sortIndex
      }
    default:
      return state

  }
}

module.exports= userFilterReducer ;
