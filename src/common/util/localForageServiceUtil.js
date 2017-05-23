export default {

    constructSaveInputObj(inputData,replyGetData){
        let saveInputObj = {};
        saveInputObj.userId = inputData.userId;
        saveInputObj[inputData.patternName] = {};
        saveInputObj[inputData.patternName].displayCount ={};
        if(inputData.gridMode !== undefined){
            saveInputObj[inputData.patternName].displayCount.gridMode = inputData.gridMode;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].displayCount.gridMode !== undefined){
            saveInputObj[inputData.patternName].displayCount.gridMode = replyGetData[inputData.patternName].displayCount.gridMode;
        }
        if(inputData.listMode !== undefined){
            saveInputObj[inputData.patternName].displayCount.listMode = inputData.listMode;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].displayCount.listMode !== undefined){
            saveInputObj[inputData.patternName].displayCount.listMode = replyGetData[inputData.patternName].displayCount.listMode;
        }
        if(inputData.viewMode !== undefined){
            saveInputObj[inputData.patternName].displayCount.viewMode = inputData.viewMode;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].displayCount.viewMode !== undefined){
            saveInputObj[inputData.patternName].displayCount.viewMode = replyGetData[inputData.patternName].displayCount.viewMode;
        }
        if(inputData.sortIndex !== undefined){
            saveInputObj[inputData.patternName].displayCount.sortIndex = inputData.sortIndex;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].displayCount.sortIndex !== undefined){
            saveInputObj[inputData.patternName].displayCount.sortIndex = replyGetData[inputData.patternName].displayCount.sortIndex;
        }
        saveInputObj[inputData.patternName].recentSearch = inputData.saveInputtObj[0];
        saveInputObj[inputData.patternName].saveSearch = inputData.saveInputtObj[1];
        saveInputObj[inputData.patternName].sortSelection={};
        if(inputData.sortColName!== undefined){
            saveInputObj[inputData.patternName].sortSelection.columnName = inputData.sortColName;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].sortSelection.columnName !== undefined){
            saveInputObj[inputData.patternName].sortSelection.columnName = replyGetData[inputData.patternName].sortSelection.columnName;
        }
        if(inputData.order !== undefined){
            saveInputObj[inputData.patternName].sortSelection.order = inputData.order;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].sortSelection.order !== undefined){
            saveInputObj[inputData.patternName].sortSelection.order = replyGetData[inputData.patternName].sortSelection.order;
        }
        if(inputData.filterTypeValue !== undefined){
            saveInputObj[inputData.patternName].filterValues = inputData.filterTypeValue;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].filterValues !== undefined){
            saveInputObj[inputData.patternName].filterValues = replyGetData[inputData.patternName].filterValues;
        }
        if(inputData.columnSort !== undefined){
            saveInputObj[inputData.patternName].sortSelection.columnSort = inputData.columnSort;
        }else if(replyGetData !== null && replyGetData[inputData.patternName] !== undefined && replyGetData[inputData.patternName].sortSelection.columnSort !== undefined){
            saveInputObj[inputData.patternName].sortSelection.columnSort = replyGetData[inputData.patternName].sortSelection.columnSort;
        }
        return saveInputObj;
    },

    constructTempArr(rawArr,inputData){
        let tempArr = [];
        if(inputData.patternName === 'interactivePattern'){
            tempArr = this.checkCaseInSensitive(rawArr,inputData);
            return this.saveThreeValues(rawArr,inputData);
        }else{
            let checkExists = false;
            let matchVal={};
            if(typeof inputData.saveValue == 'object'){
                for(let i=0;i<rawArr.length;i++){
                    if(rawArr[i].term.toLowerCase()==inputData.saveValue.term.toLowerCase()){
                       checkExists = true;
                       matchVal = rawArr[i];
                    }else{
                        tempArr.push(rawArr[i]);
                    }
                }
            }else{
                for(let i=0;i<rawArr.length;i++){
                    if(rawArr[i]!==inputData.saveValue){
                        checkExists = true;
                    }
                }
            }
            if(!checkExists){
                if(inputData.isThreeSave){
                    if(rawArr.length>=3){
                        rawArr.shift();
                    }
                }
                rawArr.push(inputData.saveValue);
            }else{
                tempArr.push(matchVal);
                rawArr = tempArr;
            }
            return rawArr;
        }
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
    },

    constructInputSearchObj(inputData,replyGetData){
        let tempArrObj = [];
        switch(inputData.saveType){

            case 'RecentSearch':
                tempArrObj = this.constructRecentSearchObj(inputData,replyGetData);
                return tempArrObj;

            case 'SaveSearch':
                tempArrObj = this.constructSaveSearchObj(inputData,replyGetData);
                return tempArrObj;

            default:
                return tempArrObj;

        }

    },

    constructRecentSearchObj(inputData,replyGetData){
        let saveRecentObj = [];
        let saveSrObj = [];
        let finalObj = [];
        if(inputData.saveValue){
            if(replyGetData=== undefined || replyGetData === null ||
                replyGetData[inputData.patternName] === undefined){
                saveRecentObj.push(inputData.saveValue);
            }else{
                saveRecentObj = this.validateSearch(replyGetData[inputData.patternName].recentSearch,inputData);
                if(replyGetData[inputData.patternName].saveSearch !== undefined ||
                    replyGetData[inputData.patternName].saveSearch !== null){
                    if(replyGetData[inputData.patternName].saveSearch.length > 0){
                        saveSrObj = replyGetData[inputData.patternName].saveSearch.slice();
                    }
                }
            }
        }else{
            if(replyGetData !== undefined && replyGetData !== null &&
                replyGetData[inputData.patternName] !== undefined){
                if(replyGetData[inputData.patternName].recentSearch !== undefined &&
                    replyGetData[inputData.patternName].recentSearch.length > 0){
                    saveRecentObj = replyGetData[inputData.patternName].recentSearch.slice();
                }
                if(replyGetData[inputData.patternName].saveSearch !== undefined &&
                    replyGetData[inputData.patternName].saveSearch.length > 0){
                    saveSrObj = replyGetData[inputData.patternName].saveSearch.slice();
                }
            }
        }

        finalObj.push(saveRecentObj);
        finalObj.push(saveSrObj);
        return finalObj
    },

    constructSaveSearchObj(inputData,replyGetData){
        let saveRecentObj = [];
        let saveSrObj = [];
        let finalObj = [];
        if(inputData.saveValue){
            if(replyGetData=== undefined || replyGetData === null ||
                replyGetData[inputData.patternName] === undefined){
                saveSrObj.push(inputData.saveValue);
            }else{
                saveSrObj = this.validateSearch(replyGetData[inputData.patternName].saveSearch,inputData);
                if(replyGetData[inputData.patternName].recentSearch !== undefined ||
                    replyGetData[inputData.patternName].recentSearch !== null){
                    if(replyGetData[inputData.patternName].recentSearch.length > 0){
                        saveRecentObj = replyGetData[inputData.patternName].recentSearch.slice();
                    }
                }
            }
        }else{
            if(replyGetData !== undefined && replyGetData !== null &&
                replyGetData[inputData.patternName] !== undefined){
                if(replyGetData[inputData.patternName].recentSearch !== undefined &&
                    replyGetData[inputData.patternName].recentSearch.length > 0){
                    saveRecentObj = replyGetData[inputData.patternName].recentSearch.slice();
                }
                if(replyGetData[inputData.patternName].saveSearch !== undefined &&
                    replyGetData[inputData.patternName].saveSearch.length > 0){
                    saveSrObj = replyGetData[inputData.patternName].saveSearch.slice();
                }
            }
        }
        finalObj.push(saveRecentObj);
        finalObj.push(saveSrObj);
        return finalObj
    },

    checkCaseInSensitive(rawArr,inputData){
        let tempArr = [];
        for(let i=0;i<rawArr.length;i++){
            if(rawArr[i].toLocaleLowerCase()!==inputData.saveValue.toLocaleLowerCase()){
                tempArr.push(rawArr[i]);
            }
        }
        return tempArr
    },

    constructFolderStructureObj(inputData,replyGetData) {
        let saveInputObj = {};
        saveInputObj.userId = inputData.userId;
        saveInputObj[ inputData.patternName ] = {};
        saveInputObj[ inputData.patternName ][ inputData.parentNodeRef ] = [];
        if (replyGetData !== null && replyGetData[ inputData.patternName ] !== undefined) {
            replyGetData[ inputData.patternName ][ inputData.parentNodeRef ] = inputData;
        } else if (inputData[ 0 ] !== undefined) {
            saveInputObj[ inputData.patternName ][ inputData.parentNodeRef ] = inputData;
        }
        if (replyGetData !== null && replyGetData[ inputData.patternName ] !== undefined && replyGetData[ inputData.patternName ][ inputData.parentNodeRef ].currentFolder !== undefined) {
            replyGetData[ inputData.patternName ][ inputData.parentNodeRef ].currentFolder = inputData.currentFolder;
        } else if (inputData.currentFolder !== undefined) {
            saveInputObj[ inputData.patternName ][ inputData.parentNodeRef ].currentFolder = inputData.currentFolder;
        }
        return (replyGetData !== null && replyGetData[ inputData.patternName ] !== undefined) ? replyGetData : saveInputObj;
    }

}
