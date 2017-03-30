import {getModifiedOn} from '../../../common/components/browseAssetUtil'
export default{

	getRequiredParameter(results){ 
		let searchResults = [];
		for(let searchObj of results){
			
			if(searchObj !== undefined && searchObj !== '' 
				&& searchObj.workExample && searchObj.workExample !== ''){
				let resultObj = {};
				if(searchObj.name){
					resultObj.title = searchObj.name.en || '';
				}
				resultObj.type = this.getTaxonomicType(searchObj.taxonomicType);
				resultObj.dateModified = searchObj.dateModified ? getModifiedOn(searchObj.dateModified) : '';
				resultObj.id = searchObj.id || '';
				resultObj.workExample = searchObj.workExample || '';
				resultObj.taxonomicType = searchObj.taxonomicType || '';
				searchResults.push(resultObj);
			}
		}
		return searchResults;
	},

	getTaxonomicType(taxonomicType){
		let type = '';
		if(taxonomicType !== '' && taxonomicType !== undefined){
			let taxonomy = taxonomicType[0];
			type = taxonomy.split('/');
			type = type[type.length-1];
		}

		return type;
	},

	getActionObj(type, value){
		let actionObj = {};
		actionObj.type = type;
		actionObj.value = value;
		return actionObj;
	}
}
