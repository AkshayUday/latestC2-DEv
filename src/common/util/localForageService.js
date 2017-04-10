import localForage from './localForage';

export default{

  	getLocalForageData(inputData){
  		const promise = new Promise(function (fulfill, reject) {
  			const getPromise = localForage.getLocalForageData(inputData);
  			getPromise.then(function (sucess){
  				let resObj = [];
  				if(sucess == null || sucess.length == 0 || sucess == undefined){
		          fulfill({errMsg: 'empty'});
		        }else if(sucess.length > 0){
		          resObj = sucess.slice();
		          fulfill(resObj);
		        }
  			}).catch(function (error){
  				reject(error);
  			});
  		});
  		return promise
  	},

  	saveLocalForageData(inputData){
  		let saveObj = [];
  		let saveResObj = [];
  		let tempArr = [];
  		const promise = new Promise(function (fulfill, reject) {
  			const getPromise = localForage.getLocalForageData(inputData);
  			getPromise.then(function (replyGetData){
  				if(replyGetData === undefined ||replyGetData === null || replyGetData.length == 0){
          			saveObj.push(inputData.saveValue);
			    }else if(replyGetData.length > 0){
			    	let replyLength = replyGetData.length;
			    	for(let i=0;i<replyGetData.length;i++){
	  					if(replyGetData[i]!==inputData.saveValue){
	  						tempArr.push(replyGetData[i]);
	  					}
  					}
				    let rawLength = tempArr.length;
				    if(rawLength==1){
				      saveObj = tempArr.slice();
				      saveObj.push(inputData.saveValue);
				    }else if(rawLength==2){
				      saveObj = tempArr.slice();
				      saveObj.push(inputData.saveValue);
				    }else{
				      tempArr.shift();
				      saveObj = tempArr.slice();
				      saveObj.push(inputData.saveValue);
				    }
				}
			    inputData.saveInputObj = saveObj;
			    const savePromise = localForage.saveLocalForageData(inputData);
			    savePromise.then(function (sucess){
			    	if(sucess !== undefined ||sucess.length > 0){
			          saveResObj = sucess.slice();
			          fulfill(saveResObj);
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
