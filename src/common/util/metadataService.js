/**
 * @module PatternsLib
 */
//YS import * as jsonld from 'jsonld';

import rest from './rest';

/*const ctx = {
  '@context': {
    'id': '@id',
    'type': {
      '@id': '@type',
      '@container': '@set'
    },
    'graph': '@graph',
    'notation': 'http://www.w3.org/2004/02/skos/core#notation',
    'prefLabel': {
      '@id': 'http://www.w3.org/2004/02/skos/core#prefLabel',
      '@container': '@language'
    },
    'altLabel': {
      '@id': 'http://www.w3.org/2004/02/skos/core#altLabel',
      '@container': '@set'
    },
    'hiddenLabel': {
      '@id': 'http://www.w3.org/2004/02/skos/core#altLabel',
      '@container': '@language'
    },
    'narrower': {
      '@id': 'http://www.w3.org/2004/02/skos/core#narrower',
      '@container': '@set'
    },
    'broader': {
      '@id': 'http://www.w3.org/2004/02/skos/core#broader',
      '@container': '@set'
    },
    'related': {
      '@id': 'http://www.w3.org/2004/02/skos/core#related',
      '@container': '@set'
    },
    'inScheme': {
      '@id': 'http://www.w3.org/2004/02/skos/core#inScheme',
      '@type': '@id',
      '@container': '@set'
    },
    'topConceptOf': {
      '@id': 'http://www.w3.org/2004/02/skos/core#topConceptOf',
      '@type': '@id',
      '@container': '@set'
    },
    'topConcept': 'http://www.w3.org/2004/02/skos/core#hasTopConcept',
    'language': 'http://schema.org/inLanguage',
    'about': {
      '@type': '@id',
      '@id': 'http://schema.org/about',
      '@container': '@set'
    },
    'contentSize': 'http://schema.org/contentSize',
    'discipline': {
      '@type': '@id',
      '@id': 'https://schema.pearson.com/ns/content/discipline',
      '@container': '@set'
    },
    'knowledgeLevel': {
      '@type': '@id',
      '@id': 'http://schema.pearson.com/ns/learn/knowledgeLevel',
      '@container': '@set'
    },
    'audience': {
      '@type': '@id',
      '@id': 'http://schema.org/audience',
      '@container': '@set'
    },
    'accessibilityFeature': {
      '@type': '@id',
      '@id': 'http://schema.org/accessibilityFeature',
      '@container': '@set'
    },
    'duration': 'http://schema.org/duration',
    'dateCreated': 'http://schema.org/dateCreated',
    'status': 'http://schema.org/status',
    'timeRequired': 'http://schema.org/timeRequired',
    'format': 'http://purl.org/dc/terms/format',
    'hasPart': {
      '@type': '@id',
      '@id': 'http://schema.org/hasPart'
    },
    'sameAs': {
      '@id': 'http://www.w3.org/2002/07/owl#sameAs',
      '@type': '@id'
    },
    'isDefinedBy': {
      '@id': 'http://www.w3.org/2000/01/rdf-schema#isDefinedBy',
      '@type': '@id'
    },
    'eTag': 'http://schema.pearson.com/ns/raf/eTag',
    'security': 'http://schema.pearson.com/ns/raf/security',
    'removal': 'http://schema.pearson.com/ns/changeset/removal',
    'addition': 'http://schema.pearson.com/ns/changeset/addition',
    'replacement': 'http://schema.pearson.com/ns/changeset/replacement',
    'subject': {
      '@type': '@id',
      '@id': 'http://schema.pearson.com/ns/changeset/subject'
    },
    'predicate': {
      '@type': '@id',
      '@id': 'http://schema.pearson.com/ns/changeset/predicate'
    },
    'object': {
      '@id': 'http://schema.pearson.com/ns/changeset/object'
    },
    'ifMatch': {
      '@id': 'http://schema.pearson.com/ns/raf/ifMatch'
    },
    'ifNonMatch': {
      '@id': 'http://schema.pearson.com/ns/raf/ifNonMatch'
    },
    'uuid': {
      '@id': 'https://schema.pearson.com/ns/content/uuid'
    },
    'hasContributor': 'https://schema.pearson.com/ns/content/hasContributor',
    'hasAlignment': 'http://schema.pearson.com/ns/learn/hasAlignment',
    'identifiedBy': 'https://schema.pearson.com/ns/content/identifiedBy',
    'contributorRole': {
      '@type': '@id',
      '@id': 'https://schema.pearson.com/ns/content/contributorRole'
    },
    'contributorAgent': 'https://schema.pearson.com/ns/content/contributorAgent',
    'alignmentType': {
      '@type': '@id',
      '@id': 'http://schema.pearson.com/ns/learn/alignmentType'
    },
    'alignmentObjective': {
      '@type': '@id',
      '@id': 'http://schema.pearson.com/ns/learn/alignmentObjective'
    },
    'idTerm': {
      '@type': '@id',
      '@id': 'https://schema.pearson.com/ns/content/idTerm'
    },
    'idValue': 'https://schema.pearson.com/ns/content/idValue',
    'Person': 'http://schema.org/Person',
    'results': {
      '@id': 'http://www.w3.org/ns/ldp#contains',
      '@container': '@list'
    },
    'name': {
      '@id': 'http://schema.org/name',
      '@container': '@language'
    },
    'isPartOf': {
      '@type': '@id',
      '@id': 'http://schema.org/isPartOf'
    },
    'description': {
      '@id': 'http://schema.org/description',
      '@container': '@language'
    },
    'keyword': {
      '@id': 'https://schema.pearson.com/ns/content/keyword',
      '@container': '@language'
    },
    'workExample': {
      '@type': '@id',
      '@id': 'http://schema.org/workExample'
    },
    'exampleOfWork': {
      '@type': '@id',
      '@id': 'http://schema.org/exampleOfWork'
    },
    'DirectContainer': 'http://www.w3.org/ns/ldp#DirectContainer',
    'PageSortCriterion': 'http://www.w3.org/ns/ldp#PageSortCriterion',
    'Ascending': 'http://www.w3.org/ns/ldp#Ascending',
    'pageSortCriteria': {
      '@id': 'http://www.w3.org/ns/ldp#pageSortCriteria',
      '@container': '@list',
      '@type': '@id'
    },
    'order': {
      '@type': '@id',
      '@id': 'http://www.w3.org/ns/ldp#pageSortOrder'
    },	
    'pageSequence': {
      '@id': 'http://www.w3.org/ns/ldp#pageSequence',
      '@type': '@id'
    },
    'SingletonProperty': 'http://schema.pearson.com/ns/raf/SingletonProperty',
    'Work': 'https://schema.pearson.com/ns/content/Work',
    'Manifestation': 'https://schema.pearson.com/ns/content/Manifestation',
    'Container': 'https://schema.pearson.com/ns/content/Container',
    'LearningObjective': 'http://schema.pearson.com/ns/learn/LearningObjective',
    'ObjectivesFramework': 'http://schema.pearson.com/ns/learn/ObjectivesFramework'
  }
    };*/

/**
  * MetadataService module facilitates JSON to JSON-LD (and reverse) Transformation.
  * It also handles the MDS API REST CALLs.
  *
  * Expected Input JSON structure:
  *
  *      let buffer = {
  *          'libConfig' : this.props.libConfig,         
   // Includes host app supplied init values for lib + Should have all Taxonomies
  *          'patConfig' : this.props.patConfig,         
   // Includes host app supplied init values for pattern
  *
  *          'req'       : 'ProductMetadata',          
     // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
  *          'action'    : 'Create',                      // Create / Read One / Update / Delete / Search / Read All
  *

  *          'data' : {
  *                'urn':'',                           
       // Only required for actioon = Update/Delete/Read
  *                'status' : '',                           // Not sure if this is needed
  *                'filename' : '',                         // This is prob. only for Asset
  *                'discipline' : 'Mathematics',            // Taxonomy value
  *                'difficultyLevel' : 'Easy',              // Taxonomy value
  *                'trigger' : '',
  *                'knowledgeLevel' : 'Grade 10',
  *                'hasAlignment' : '',                     // Taxonomy value
  *                'keywords' : ['key1', 'key2', 'key3'],
  *                'name': 'Some Product Name',
  *                'timeRequired' : {
  *                    'hh':'01',
  *                    'mm':'20',
  *                    'ss':'30'
  *          },
  *          'description' : 'Some description for Product with 
  decipline Math and knowledge level of Grade 10',
  *          'audience' : 'Parents',                  // Taxonomy value
  *          'searchterms' : ''
  *      }
  *
  *  Modified into JSON-LD for use by rest.send()
  *
  *      let config = {
  *          method: '',                                // GET, POST, PUT, DELETE
  *          url:'',                                    // REST endpoint url
  *          data: {                                    // JSON-LD data for C1 MDS
  *          },
  *      }
  */

function _createContext() {
/*    return {
        'id': '@id',
        'type': '@type',
		'sameAs': {
			'@id':'http://www.w3.org/2002/07/owl#sameAs', 
			'@type':'@id', 
			'@container':'@set'
		 },
        'Work': 'https://schema.pearson.com/ns/content/Work',
        'status': 'https://schema.pearson.com/ns/content/status',

        'AssessmentItem': 'https://schema.pearson.com/ns/content/AssessmentItem',
        'ClosedCaption': 'https://schema.pearson.com/ns/content/ClosedCaption',
        'Transcript': 'https://schema.pearson.com/ns/content/Transcript',
        'filename': 'https://schema.pearson.com/ns/content/filename',
        'discipline': 'https://schema.pearson.com/ns/content/discipline',

        'difficultyLevel': 'http://schema.pearson.com/ns/learn/difficultyLevel',
        'trigger': 'http://schema.pearson.com/ns/learn/trigger',
        'knowledgeLevel': 'http://schema.pearson.com/ns/learn/knowledgeLevel',
        'hasAlignment': 'http://schema.pearson.com/ns/learn/hasAlignment',
        'thumbnail': 'http://schema.org/thumbnail',


        'audience' : 'http://schema.org/CreativeWork/audience',
        'keywords' : 'http://schema.org/CreativeWork/keywords',
        'CreativeWork': 'http://schema.org/CreativeWork',
        //'name': 'http://schema.org/CreativeWork/name',  
        'timeRequired': 'http://schema.org/CreativeWork/timeRequired',
        'description': 'http://schema.org/CreativeWork/description',
        'alignmentObjective': 'http://schema.pearson.com/ns/learn/alignmentObjective',
        'metadataType': 'https://schema.pearson.com/ns/content/metadataType',
        'alternateName': 'http://schema.org/Thing/alternateName',       

    	'name': 'http://schema.org/Thing/name',
		
		//'format': 'http://schema.org/CreativeWork/format',
		'createableBy' :'http://schema.org/CreativeWork/createableBy',
		
		'AudioObject': 'http://schema.org/AudioObject',
		'VideoObject': 'http://schema.org/VideoObject',
		'ImageObject': 'http://schema.org/ImageObject',
		'pafId': 'https://schema.pearson.com/ns/system/pafId',
		'caption' : 'http://schema.org/caption',
        'copyrightHolder' : 'http://schema.org/copyrightHolder',
        'dateCreated' : 'http://schema.org/dateCreated',
        'dateModified' : 'http://schema.org/dateModified',
        'contentType': 'https://schema.pearson.com/ns/content/ContentType',
        'AssetMetaName': 'http://schema.org/name',
        'workExample': 'http://schema.org/workExample'


    };*/
       return [
        'https://schema.pearson.com/context/content-context.jsonld',
        'https://schema.pearson.com/context/assessment-context.jsonld',
        'https://schema.pearson.com/context/schema-org-context.jsonld',
        'https://schema.pearson.com/context/terms-context.jsonld',
        'https://schema.pearson.com/context/learn-context.jsonld',
        ]
};

function _createJSONLD(method,context, buffer) {
  
if(buffer){
  if(buffer.origjsonld !== undefined){
    let learnContextCheck = buffer.origjsonld['@context'].includes('https://schema.pearson.com/context/learn-context.jsonld');
    if(learnContextCheck){
        buffer.origjsonld;
    }else{
        buffer.origjsonld['@context'].push('https://schema.pearson.com/context/learn-context.jsonld');
    }
  }
}
    const obj = buffer.origjsonld ||  {
        '@context'    : context,
        'type'        : ['Work', buffer.assType]
        //'metadataType': buffer.req
    };

    /*if(buffer.action == 'Update' && buffer.req == 'AssetMetadata'){    	
    	obj['metadataType'] = {'@value': 'AssetMetadata'}
    }*/    

    if (method === 'PUT') {
       /* obj['id'] = 'urn:pearson:work:' + buffer.data.uuid;
        obj['sameAs'] = ['https://data.pearson.com/work/' + buffer.data.uuid];
        obj['type'] = ['Work','ImageObject','VideoObject','AudioObject'];*/
        
      /*if(buffer.orig != undefined){
	   	if (buffer.orig.thumbnailUrl)
	        obj['thumbnail'] = buffer.orig.thumbnailUrl;

	    if (buffer.orig.dateModified)
	        obj['dateModified'] = buffer.orig.dateModified;

	    if (buffer.orig.createableBy)
	        //obj['createableBy'] = [buffer.orig.createableBy];
	    	 obj['createableBy'] = buffer.libConfig.headers['X-Roles-Test'].split(',');

	    if (buffer.orig.retrievableBy)
	        //obj['retrievableBy'] = [buffer.orig.retrievableBy];
	          obj['retrievableBy'] = buffer.libConfig.headers['X-Roles-Test'].split(',');

	    if (buffer.orig.updateableBy)
	        //obj['updateableBy'] = [buffer.orig.updateableBy]; 
	          obj['updateableBy'] = buffer.libConfig.headers['X-Roles-Test'].split(','); 

	    if(buffer.orig.format)
	       obj['format'] = buffer.orig.format;  

	    if(buffer.orig.format)
	       obj['contentType'] = buffer.orig.format;

	   if(buffer.orig.workExample)
	       obj['workExample'] = buffer.orig.workExample;         
        }*/


	    if(buffer.data.filename || buffer.data.filename === '')
      obj['filename'] = buffer.data.filename;

    if(buffer.data.closedcaption)
      obj['ClosedCaption'] = buffer.data.closedcaption;

    if(buffer.data.transcript)
      obj['Transcript'] = buffer.data.transcript;

    if(buffer.data.caption)
      obj['caption'] = buffer.data.caption;

    if(buffer.data.copyright || buffer.data.copyright === '')
      obj['copyrightHolder'] = buffer.data.copyright;
    }
    /*if (buffer.data.product){
        obj['product'] = buffer.data.product;
    }*/

    /*if (buffer.data.urn){
        obj['urn'] = buffer.data.urn;
    }*/

    if(method === 'PUT' && buffer.action == 'Update' && buffer.req == 'AssetMetadata'){    	
    	if (buffer.data.name)
        	obj['AssetMetaName'] = buffer.data.name;
    }

    if (buffer.data.filename || buffer.data.filename === '')
        obj['filename'] = buffer.data.filename;

    if (buffer.data.desc || buffer.data.desc === ''){
        obj['description'] = buffer.data.desc;
    }

    /*if (buffer.data.contentType){
        obj['contentType'] = buffer.data.contentType;
    }*/

    /*if (buffer.data.knowledgeLevel)
        obj['knowledgeLevel'] = buffer.data.knowledgeLevel; */

    if (buffer.data.url)
        obj['thumbnail'] = buffer.data.url;

    if (buffer.data.alternateName)
        obj['alternateName'] = buffer.data.alternateName;

    /*Update Metadata*/
      //NOTE: If adding new fields here then same needs in _createJSON
    if (buffer.data.name || buffer.data.name === '')
        obj['name'] = {'en' : buffer.data.name };

    if(buffer.data.filename || buffer.data.filename === '')
      obj['filename'] = {'en' : buffer.data.filename};

    if (buffer.data.desc || buffer.data.desc === '')
        obj['description'] = {'en' : buffer.data.desc};

    if (buffer.data.keywords)
        obj['keyword'] = {'en' : buffer.data.keywords};

    if (buffer.data.timeRequired)
        obj['timeRequired'] =  buffer.data.timeRequired;

    if (buffer.data.discipline)
        obj['discipline'] =  buffer.data.discipline;

    if (buffer.data.difficultyLevel)
        obj['difficultyLevel'] = buffer.data.difficultyLevel;

    if (buffer.data.audience)
        obj['audience'] = buffer.data.audience;

    /*if (buffer.data.objAlign)
        obj['alignmentObjective'] = {'en' : buffer.data.objAlign};*/

    if (buffer.data.alignmentObjective || buffer.data.alignmentObjective === '')
        obj['alignmentObjective'] = {'en': buffer.data.alignmentObjective};

    //sending goalAlignmanent as hasAlignment
    /*if (buffer.data.goalKeywords)
        obj['hasAlignment'] = {'en' : buffer.data.goalKeywords};*/
       
    return obj;
}

function _createConfig(buffer) {
    let method;
    let url;
    switch (buffer.action) {
    case 'Create' :
        method = 'POST';
        url = buffer.libConfig.server + '/thing';
        break;
    case 'Read One' :
        method = 'GET';
        url = buffer.libConfig.server + '/work/' + buffer.data.uuid;
        break;
     case 'tempRead' :
        method = 'GET';
        url = buffer.libConfig.server + '/work/' + buffer.libConfig.database;
        break;
    case 'Manifest' :
        method = 'GET';
        url = buffer.libConfig.server + '/manifestation/' + buffer.data.manifestId + buffer.libConfig.database;
        break;
    case 'Update' :
        method = 'PUT';
        url = buffer.libConfig.server + '/work/' + buffer.data.uuid;
        break;
    case 'Delete' :
        method = 'DELETE';
        url = buffer.libConfig.server + '/work/' + buffer.data.uuid + buffer.libConfig.database;
        break;
    case 'Search' :
        method = 'GET';
        url = buffer.libConfig.server + '/search' + buffer.libConfig.database +'&' +buffer.data.searchterms;
        break;
     case 'Taxonomies' :
        method = 'GET';
        url = buffer.libConfig.taxonomyserver + '/ns/'+ buffer.data.taxonomies;
        //headers['prefer']='annotation=true';
        break;
    default:
        method = '';
        url = '';
        break;
    }
    let  headers =
        (method == 'PUT') ? Object.assign({}, buffer.libConfig.headers, { 'If-Match' : buffer.data.eTag }) :
        (method == 'GET') ? Object.assign({}, buffer.libConfig.headers, { 'If-Modified-Since' : '0' }) :
        //(method == 'GET' && buffer.action === 'Taxonomies') ? Object.assign({}, buffer.libConfig.headers, {'Prefer' : 'annotation=true'}) : 
        buffer.libConfig.headers;

    const context = _createContext();
    const jsonld = _createJSONLD(method,context, buffer);
    const config = {
        'method': method,
        'url': url,
        'headers': headers,
        'data': jsonld
    }
    return config;
};

function _createJSON(data, eTag) {
    const obj = { };
    for (const k in data) {
        if (k.includes('/name')) {
            obj['name'] = data[k];
        }
        else
        if (k.includes('filename')) {
            obj['filename'] = data[k];
        }
        else
        if (k.includes('description')) {
            obj['desc'] = data[k].en;
        }
        else
        if (k.includes('thumbnail')) {
            obj['thumbnail'] = data[k];
        }
        else
        if (k.includes('keyword')) {
            obj['keyword'] = data[k];
        }
        else
        if (k.includes('timeRequired')) {
            obj['timeRequired'] = data[k];
        }
        else
        if (k.includes('discipline')) {
            obj['discipline'] = data[k];
        }
        // else
        // if (k.includes('hasAlignment')) {
        //     obj['goalKeywords'] = data[k];
        // }
        else
        if (k.includes('difficultyLevel') || k.includes('difficultylevel')) {
            obj['difficultyLevel'] = data[k];
        }
        else
        if (k.includes('audience')) {
            obj['audience'] = data[k];
        }
        else
        if (k.includes('knowledgeLevel')) {
            obj['knowledgeLevel'] = data[k];
        }
        else
        if (k.includes('uuid')) {
            obj['uuid'] = data[k];
            obj['urn'] = data[k];
        }
        else
        if (k.includes('id')) {
            obj['id'] = data[k];
        }else
        if (k.includes('alignmentObjective')) {
            obj['objAlign'] = data[k];
        }
         else
            if(k.includes('workExample')){
              obj['workExample'] = data[k];
            }
          else
            if(k.includes('sameAs')){
              obj['sameAs'] = data[k];
            }
          else
            if(k.includes('format')){
              obj['format'] = data[k];
            }
          else
            if(k.includes('isPartOf')){
              obj['isPartOf'] = data[k];
            }

         else if(k.includes('dateModified')){
              obj['dateModified'] = data[k];
            }

            else if(k.includes('createableBy')){
              obj['createableBy'] = data[k];
            }
            else if(k.includes('retrievableBy')){
              obj['retrievableBy'] = data[k];
            }
            else if(k.includes('updateableBy')){
              obj['updateableBy'] = data[k];
            }
            else if(k.includes('type')){
              //obj['type'] = data[k][0]; 
              obj['type'] = searchMetadataType(data[k]);
            }
            if(k.includes('thumbnailUrl')){
              obj['thumbnailUrl'] = data[k];
            }

			if (k.includes('alignmentObjective')) {
			obj['alignmentObjective'] = data[k];
			}

			if (k.includes('exampleOfWork')) {							
                obj['workurn'] = data[k]; 
			}

      if(k.includes('label')){
        if(data[k].en.value === 'Difficulty Level'){
          obj['difficultyLevel'] = data[k];
        }else if(data[k].en.value === 'Domain'){
          obj['discipline'] = data[k];
        }else if(data[k].en.value === 'Audience'){
          obj['audience'] = data[k];
        }
      }
    }

    if(eTag !== undefined)
        obj['eTag'] = eTag;
      
    return obj;
}

function searchMetadataType(metaTypeArr){
  let metaType = '';
    for (let i=0; i < metaTypeArr.length; i++) {
        if (metaTypeArr[i] === 'AssessmentInstrument') {
            metaType = metaTypeArr[i];
        }else if(metaTypeArr[i] === 'AssessmentItem'){
            metaType = metaTypeArr[i];
        }
    }
    return metaType
}

function createTaxomomyData(taxonomyName,data){
  let taxonomyData = [];
  if(taxonomyName == 'difficultylevel'){
     taxonomyData.push( {'id':1,'schemaUrl':'https://schema.pearson.com/ns/difficultylevel/default', 
      'name':'Choose difficulty level', 'checked':false});
  }
    if(taxonomyName == 'domain'){
     taxonomyData.push( {'id':1,'schemaUrl':'https://schema.pearson.com/ns/domain/default',
      'name':'Choose discipline', 'checked':false});
  }
    if(taxonomyName == 'audience'){
     taxonomyData.push( {'id':1,'schemaUrl':'https://schema.pearson.com/ns/audience/default',
      'name':'Choose audience role', 'checked':false});
  }
   data.forEach(function (obj,index) {
      taxonomyData.push( {'id':index+2,'schemaUrl':obj.id, 
        'name':obj.prefLabel.en, 'checked':false});
   });
   return taxonomyData;
}




/**
  * send transforms supplied json into json-ld and makes REST call to MDS Server.
  * returns a response from MDS Server after transforming json-ld into json.
  *
  *
  */
export default {
	_sendJSONLD : function (buffer){
      return _createConfig(buffer);
	},
    send : function (buffer) {
        const promise = new Promise(function (fulfill, reject) {
            const config = _createConfig(buffer);
            const restPromise = rest.send(config)
            restPromise.then(function (reply) {
                       
              if(reply !== undefined){
                 let { data, eTag } = reply
                const json = _createJSON(data, eTag);

                if(data === undefined && eTag !== ''){
                  json.eTag = eTag;
                }
                if(data !== undefined && data.type !== undefined){
                  if(data.type !== 'ConceptSchema')
                   json.origjsonld = data;
                }
                /*if (reply.results) {debugger;
                  json.results = [];
                  reply.results.forEach(function (obj) {
                    json.results.push(_createJSON(obj));
                  });
                }*/
               
                /*if (reply[''] && reply[''].length > 0) {
                  json.assetsData = reply[''];
                }*/
                if(reply.data !== undefined && reply.data.topConcept){
                   let topConceptData = [];
                  reply.data.topConcept.forEach(function (obj) {
                    topConceptData.push(obj);
                  });

                  let taxonomyName = json.id.split('/').pop();
                  //let taxonomyName = json.prefLabel.en.value;
                  //if(json.id.toLowerCase().indexOf('difficultylevel') >= 0){
                    json[taxonomyName] = [];
                    json[taxonomyName] = createTaxomomyData(taxonomyName,topConceptData);
                  //}
                }
                fulfill(json);
              }else{
                fulfill({errMsg: 'success'});
              }
            
            })
                .catch(function (reply) {
                    reject(reply);
                });
        });

        return promise;
    }
};


/*
reply format
{'@context':['http://schema.pearson.com/context/content-context.jsonld'],
'id':'urn:pearson:work:db066023-041b-4753-8dfc-10ba12ed235b',
"type":["Work","http://schema.org/Thing",
"http://schema.org/CreativeWork","http://www.w3.org/2000/01/rdf-schema#Class",
"http://www.w3.org/2002/07/owl#Class"],"http://schema.org/keywords":["WordB","WordA"],
"http://schema.pearson.com/ns/content/discipline":"Mathematics",
"uuid":"db066023-041b-4753-8dfc-10ba12ed235b","security":"_:b0",
"http://www.w3.org/2000/01/rdf-schema#comment":["The most generic kind of creative work,
 including books, movies, photographs, software programs, etc.","The most generic type of item."],
 "http://www.w3.org/2000/01/rdf-schema#isDefinedBy":
 {"id":"https://data.pearson.com/work/db066023-041b-4753-8dfc-10ba12ed235b/metadata"},
 "http://www.w3.org/2000/01/rdf-schema#label":["CreativeWork","Thing","Work"],
 "http://www.w3.org/2000/01/rdf-schema#subClassOf":[{"id":"http://schema.org/Thing"},
 {"id":"http://schema.org/CreativeWork"}],"sameAs":
 ["https://data.pearson.com/work/db066023-041b-4753-8dfc-10ba12ed235b"]}

*/
