let initilizeValues = [{
  'nodeRef':'',
  'productName':''
}]


const siteDataReducer = (state = initilizeValues, action)=>{
  switch(action.type) {
    case 'SITE_DATA':
    return  [
          ...state, action.data
    ]
    break
    default:
    return state

    }
  }

 module.exports= siteDataReducer;
