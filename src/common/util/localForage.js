import localForage from 'localforage';

export default {

	getLocalForageData(getObj) {
  	let store = localForage.createInstance({
	          name: getObj.type   
	    });
	return store.getItem(getObj.userId);
	},

	saveLocalForageData(saveObj) {
  	let store = localForage.createInstance({
	          name: saveObj.type   
	    });
	return store.setItem(saveObj.userId,saveObj);
	}
   
}
