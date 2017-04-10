import SavedSearchConstant from '../constants/SavedSearchConstant';

export default{

	formatAutoSuggestionData(autoSuggestObj){
		let recSrVal = {};
		let saveSrValue = {};
		let suggestion = [];
		/*if(typeof autoSuggestObj != undefined || typeof autoSuggestObj.recentArr != undefined){
			recSrVal = this.convert_Array_To_Object(autoSuggestObj.recentArr);
		} 
		if(typeof autoSuggestObj != undefined || typeof autoSuggestObj.savedSrArr != undefined){
			saveSrValue = this.convert_Array_To_Object(autoSuggestObj.savedSrArr);
		}*/
		if(autoSuggestObj == undefined || autoSuggestObj.recentArr == undefined){
			console.log('Recent Search is empty');
		}else{
			recSrVal = this.convert_Array_To_Object(autoSuggestObj.recentArr);
		}

		if(autoSuggestObj == undefined || autoSuggestObj.savedSrArr == undefined){
				console.log('Saved Search is empty');
		}else{
			saveSrValue = this.convert_Array_To_Object(autoSuggestObj.savedSrArr);
		}
		if(recSrVal.length !== undefined && recSrVal.length > 0){
			let reInputData = {};
			reInputData.title = SavedSearchConstant.RECENT_SEARCH_TITLE;
			reInputData.srValue = recSrVal;
			let finalRecData = this.constructSuggestionObject(reInputData);
			suggestion.push(finalRecData);
		}
		if(saveSrValue.length !== undefined && saveSrValue.length > 0){
			let savInputData = {};
			savInputData.title = SavedSearchConstant.SAVE_SEARCH_TITLE;
			savInputData.srValue = saveSrValue;
			let finalSavData = this.constructSuggestionObject(savInputData);
			suggestion.push(finalSavData);
		}
		return suggestion
	},

	constructSuggestionObject(inputObj){
		let str = {};
		str.title = inputObj.title;
		str.searchterm = inputObj.srValue;
		return str

	},

	convert_Array_To_Object(array_of_names) {
	let searchterm = [];
	  for(let value of array_of_names){
	  	let arrObj = {};
	  	arrObj.name = value;
	  	searchterm.push(arrObj);
	  }
	  return searchterm;
	}
}
