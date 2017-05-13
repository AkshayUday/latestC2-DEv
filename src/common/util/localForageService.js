import localForage from './localForage';
import serviceUtil from './localForageServiceUtil';

export default{

  	getLocalForageData(inputData){
  		const promise = new Promise(function (fulfill, reject) {
  			const getPromise = localForage.getLocalForageData(inputData);
  			getPromise.then(function (sucess){
  				if(sucess == null || sucess == undefined){
		          fulfill({errMsg: 'empty'});
		        }else{
		          fulfill(sucess);
		        }
  			}).catch(function (error){
  				reject(error);
  			});
  		});
  		return promise
  	},

  	saveLocalForageData(inputData){
  		let saveObj = [];
  		let saveRecentObj = [];
  		let saveSrObj = [];
  		let saveResObj = [];
  		let tempArr = [];
  		const promise = new Promise(function (fulfill, reject) {
  			const getPromise = localForage.getLocalForageData(inputData);
  			getPromise.then(function (replyGetData){
				/*if(replyGetData=== undefined || replyGetData === null){
					if(inputData.saveType === 'RecentSearch'){
						if(inputData.saveValue){
							saveRecentObj.push(inputData.saveValue);
						}
					}else{
						if(inputData.saveValue){
							saveSrObj.push(inputData.saveValue);
						}
					}
				}else{
					if(inputData.saveType === 'RecentSearch'){
						if(replyGetData[inputData.patternName] === undefined){
							saveRecentObj.push(inputData.saveValue);
						}else{
							saveRecentObj = serviceUtil.validateSearch(replyGetData[inputData.patternName].recentSearch,inputData);	    
							if(replyGetData[inputData.patternName].saveSearch !== undefined ||
						   	replyGetData[inputData.patternName].saveSearch !== null){
								if(replyGetData[inputData.patternName].saveSearch.length > 0){
									//saveSrObj.push(replyGetData[inputData.patternName].saveSearch);
									saveSrObj = replyGetData[inputData.patternName].saveSearch.slice();
								}
							}
						}
		  				
					}
					if(inputData.saveType === 'SaveSearch'){
						if(replyGetData[inputData.patternName] === undefined){
							saveSrObj.push(inputData.saveValue);
						}else{
							saveSrObj = serviceUtil.validateSearch(replyGetData[inputData.patternName].saveSearch,inputData)
							if(replyGetData[inputData.patternName].recentSearch !== undefined ||
							   replyGetData[inputData.patternName].recentSearch !== null){
								if(replyGetData[inputData.patternName].recentSearch.length > 0){
									//saveRecentObj.push(replyGetData[inputData.patternName].recentSearch);
									saveRecentObj = replyGetData[inputData.patternName].recentSearch.slice();
								}
							}
						}
					}
				}*/
				/*saveObj.push(saveRecentObj);
				saveObj.push(saveSrObj);
			    inputData.saveInputtObj = saveObj;*/
			    saveObj = serviceUtil.constructInputSearchObj(inputData,replyGetData);
			    if(saveObj.length > 0){
			    	inputData.saveInputtObj = saveObj;
			    }
			    let modSaveObj = serviceUtil.constructSaveInputObj(inputData,replyGetData);
			    modSaveObj.type = inputData.type;
			    if(replyGetData === null){
			    	replyGetData = modSaveObj;
			    }else{
			    	replyGetData[inputData.patternName] = modSaveObj[inputData.patternName];
			    }
			    const savePromise = localForage.saveLocalForageData(replyGetData);
			    savePromise.then(function (sucess){
			        if(sucess[inputData.patternName] !== undefined){
			        	fulfill(sucess);
			        }else{
			        	fulfill({errMsg: 'Failure'});
			        }
			    }).catch(function (error) {
			    	reject(error);
			    });
  			}).catch(function (error){
  				reject(error);
  			});
  		});
  		return promise
  	},

  	updateLocalForageData(inputData){
  		const promise = new Promise(function (fulfill, reject) {
  				 const savePromise = localForage.saveLocalForageData(inputData);
			    savePromise.then(function (success){
			      fulfill(success);
			    }).catch(function (error) {
			    	reject(error);
			    });
  		});
  		return promise; 
  	},
    saveFolderStructure(inputData) {
        const promise = new Promise(function (fulfill, reject) {
            const getPromise = localForage.getLocalForageData(inputData);
            getPromise.then(function (replyGetData){
                let modSaveObj = serviceUtil.constructFolderStructureObj(inputData,replyGetData);
                modSaveObj.type = inputData.type;
                if(replyGetData === null){
                    replyGetData = modSaveObj;
                }else{
                    replyGetData[inputData.patternName] = modSaveObj[inputData.patternName];
                }
                const savePromise = localForage.saveLocalForageData(replyGetData);
                savePromise.then(function (sucess){
                    if(sucess[inputData.patternName] !== undefined){
                        fulfill(sucess);
                    }else{
                        fulfill({errMsg: 'Failure'});
                    }
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error){
                reject(error);
            });
        });
        return promise
    }

}
