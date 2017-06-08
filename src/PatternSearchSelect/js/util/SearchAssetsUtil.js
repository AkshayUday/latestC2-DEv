import {getModifiedOn} from '../../../common/components/browseAssetUtil';
import {find as lfind, toLower as ltoLower, map as lmap, pick,size,chain,values,value,map,flatten } from  'lodash';

export default{

	getRequiredParameter(results,filterTypeData, searchTaxonomicType){ 

		
		let searchResults = [];
		let searchObj;
		for(searchObj of results){
			
			if(searchObj !== undefined && searchObj !== '' 
				&& searchObj.name !== undefined && searchObj.name !== ''){
				//search for an assessments types MMI/TDX/CITE
			let _type = searchObj.taxonomicType.filter(this.validateTaxonomicTypes) || '';
			let resultObj = {};
			let taxType = this.getlastItem(_type);
				if(taxType === searchTaxonomicType && taxType === 'Journal' ){
					if(searchObj.workExample && searchObj.workExample !== ''){
						resultObj.workExample = searchObj.workExample || '';
						searchResults.push(this.constructObject(searchObj, resultObj, filterTypeData));
					}else{
						console.log('No workExample for an  => '+searchObj.id);
					}
				}else if(( taxType === searchTaxonomicType  && taxType === 'CITE') || 
						 (taxType === searchTaxonomicType  &&  taxType === 'TDX')){
					if(searchObj.hasPart && searchObj.hasPart !== ''){
						searchResults.push(this.constructObject(searchObj, resultObj, filterTypeData));
					}else{
						console.log('hasPart property violation => '+searchObj.id);
					}
				}
		}else{
			console.log('Name Should not be empty for an ID => '+searchObj.id);
		}
		}
		return searchResults;
	},

	constructObject(searchObj, resultObj, filterTypeData){
		
			if(searchObj.name){
				resultObj.title = searchObj.name.en || '';
			}
			resultObj.type = searchObj.taxonomicType ? this.getTaxonomicTypeLabel(searchObj.taxonomicType,filterTypeData) : '';
			resultObj.dateModified = searchObj.dateModified ? getModifiedOn(searchObj.dateModified) : '';
			resultObj.id = searchObj.id || '';
			// resultObj.taxonomicType = searchObj.taxonomicType || '';
			resultObj.uuid = searchObj.uuid || '';

		return resultObj;
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
     // let taxLPreLabel = '';
     // console.log(taxonomicType[0]);
     // taxLPreLabel = lfind(filterTypeData,{'property':ltoLower(taxonomicType[0])});
     // console.log(taxLPreLabel['display']);
     debugger;
     let _ctype = '';
     _ctype  = lmap(taxonomicType.map((v,i,data) => { return lfind(filterTypeData,{'property': data[i]})}),'display').join(',');
     
     return _ctype.length <= 30 ? _ctype : _ctype.substring(0,30) + '...';    
     // return taxLPreLabel['display'];

	},

	getActionObj(type, value){
		let actionObj = {};
		actionObj.type = type;
		actionObj.value = value;
		return actionObj;
	},

	getHasPartItems(assessmentData){
       // debugger;
      let result = pick(assessmentData, 'hasPart');
      if(size(result) < 0){
      	 return []
      }else{
        return  chain(assessmentData).pick('hasPart').values().flatten().map((data,key) => { 
         	// console.log(data[key]); 
         	return { 
         		     title:data['name']['en'],
         			 dateModified: data['dateModified']?getModifiedOn(data['dateModified']):'',
         			 uuid:data['uuid'],
         			 id:data['id'],
         			 itemsData:data,
         			 assessmentData:assessmentData
         		   }
         }).value();
      }
  
	},
	validateTaxonomicTypes(value, index, array){
			let returnValue = false;
			if(value === 'https://schema.pearson.com/ns/taxonomictype/TDX'  || 
			   value === 'https://schema.pearson.com/ns/taxonomictype/CITE' || 
			   value === 'https://schema.pearson.com/ns/taxonomictype/Journal'){
				returnValue = true;
			}
			return returnValue;
	},
	getlastItem(value){
		value = value.join('');
		let ref;
		if(value){
			let v = value.split('/');
			if(v.length > 0){
				ref = v[v.length-1];
			}
		}

		return ref;
		// this.props.parent(self,1);
}
}
