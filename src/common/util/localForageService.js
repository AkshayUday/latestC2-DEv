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
  		const promise = new Promise(function (fulfill, reject) {
  			const getPromise = localForage.getLocalForageData(inputData);
  			getPromise.then(function (replyGetData){
  				if(replyGetData === undefined ||replyGetData === null || replyGetData.length == 0){
          			saveObj.push(inputData.saveValue);
			    }else if(replyGetData.length > 0){
			        //saveObj = saveThreeValues(replyGetData);
			        /*let rawLength = replyGetData.length;
				    if(rawLength.length > 2){
				      replyGetData.shift();
				    }
				    saveObj = replyGetData.slice();
				    saveObj.push(inputData.saveValue);*/
				    let rawLength = replyGetData.length;
				    if(rawLength==1){
				      saveObj = replyGetData.slice();
				      saveObj.push(inputData.saveValue);
				    }else if(rawLength==2){
				      saveObj = replyGetData.slice();
				      saveObj.push(inputData.saveValue);
				    }else{
				      replyGetData.shift();
				      saveObj = replyGetData.slice();
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
