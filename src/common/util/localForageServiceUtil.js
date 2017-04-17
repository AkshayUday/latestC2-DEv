export default {

  constructSaveInputObj(inputData){
      let saveInputObj = {};
      saveInputObj.userId = inputData.userId;
      saveInputObj[inputData.patternName] = {};
      saveInputObj[inputData.patternName].displayCount ={};
      if(inputData.gridMode !== undefined)
      saveInputObj[inputData.patternName].displayCount.gridMode = inputData.gridMode;
      saveInputObj[inputData.patternName].displayCount.listMode = inputData.listMode;
      saveInputObj[inputData.patternName].displayCount.viewMode = inputData.viewMode;
      saveInputObj[inputData.patternName].recentSearch = inputData.saveInputtObj[0];
      saveInputObj[inputData.patternName].saveSearch = inputData.saveInputtObj[1];
      saveInputObj[inputData.patternName].sortSelection={};
      if(inputData.sortColName!== undefined)
      saveInputObj[inputData.patternName].sortSelection.columnName = inputData.sortColName;
      if(inputData.order !== undefined)
      saveInputObj[inputData.patternName].sortSelection.order = inputData.order;
      if(inputData.filterTypeValue !== undefined)
      saveInputObj[inputData.patternName].filterValues = inputData.filterTypeValue;
      return saveInputObj;
    },

    constructTempArr(rawArr,inputData){
      let tempArr = [];
        for(let i=0;i<rawArr.length;i++){
          if(rawArr[i]!==inputData.saveValue){
            tempArr.push(rawArr[i]);
        }
      }
        return this.saveThreeValues(tempArr,inputData);
    },

    saveThreeValues(tempArr,inputData){
      let saveRecentObj = [];
      if(inputData.isThreeSave){
        let rawLength = tempArr.length;
        if(rawLength==1){
          saveRecentObj = tempArr.slice();
          saveRecentObj.push(inputData.saveValue);
        }else if(rawLength==2){
          saveRecentObj = tempArr.slice();
          saveRecentObj.push(inputData.saveValue);
        }else{
          tempArr.shift();
          saveRecentObj = tempArr.slice();
          saveRecentObj.push(inputData.saveValue);
        }
      }else{
        saveRecentObj = tempArr.slice();
        saveRecentObj.push(inputData.saveValue);
      }
    return saveRecentObj
    },

    validateSearch(searchObj,inputData){
      let saveObj = [];
      if(searchObj === undefined || searchObj === null){
        saveObj.push(inputData.saveValue);
      }
      else if(searchObj.length==0){
        saveObj.push(inputData.saveValue);
      }else{
        saveObj = this.constructTempArr(searchObj,inputData);
      }
      return saveObj
    }

}
