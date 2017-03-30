let initilizeValues = [{
  'difficultylevel':[],
  'triggerVal':false
}]


const difficultyLevelReducer = (state = initilizeValues, action)=>{
  switch(action.type) {
    case 'DIFFICULTY_LEVELS':
    action.data.triggerVal = !action.data.triggerVal;
    return  [
          ...state, action.data
    ]
    break
    case 'UPDATE_DIFFICULTY_LEVEL':
     let dataObj = Object.assign({}, state[state.length-1]);
     let difficultyLevels = dataObj.difficultylevel;
     for(let i=0;i<difficultyLevels.length;i++){
      if(difficultyLevels[i].id===action.data){
        difficultyLevels[i].checked = !difficultyLevels[i].checked;
      }
     }
    dataObj.triggerVal = !dataObj.triggerVal;
    return [...state, dataObj];
    break;
    default:
    return state

    }
  }

 module.exports= difficultyLevelReducer;
