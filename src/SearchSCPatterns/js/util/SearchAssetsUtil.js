import {getModifiedOn} from '../../../common/components/browseAssetUtil';
import {find as lfind, toLower as ltoLower} from  'lodash';

export default{

	getRequiredParameter(results,filterTypeData){ 
		let searchResults = [];
		for(let searchObj of results){
			
			if(searchObj !== undefined && searchObj !== '' 
				&& searchObj.workExample && searchObj.workExample !== ''){
				let resultObj = {};
				if(searchObj.name){
					resultObj.title = searchObj.name.en || '';
				}
				 // resultObj.type = this.getTaxonomicType(searchObj.taxonomicType);
				 resultObj.type = this.getTaxonomicTypeLabel(searchObj.taxonomicType,filterTypeData);
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

	getTaxonomicTypeLabel(taxonomicType,filterTypeData){
     let taxLPreLabel = '';
     console.log(taxonomicType[0]);
     taxLPreLabel = lfind(filterTypeData,{'property':ltoLower(taxonomicType[0])});
     console.log(taxLPreLabel['display']);

     return taxLPreLabel['display'];

	},

	getActionObj(type, value){
		let actionObj = {};
		actionObj.type = type;
		actionObj.value = value;
		return actionObj;
	}
}
