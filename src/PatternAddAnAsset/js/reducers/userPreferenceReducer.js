let initilizeValues = [{
  'displayValueCount':9,
  'sortIndex':0
}]


const userPreferenceReducer = (state = initilizeValues, action)=>{
  switch(action.type) {
    case 'UPDATE_FILTER':
    return  [
          ...state, action.data
    ]
    break
    default:
    return state

    }
  }

 module.exports= userPreferenceReducer;
