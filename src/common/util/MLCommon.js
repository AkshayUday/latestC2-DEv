export default {
  
  getConfigUrl(buffer) { 
    let configObj = {};
    switch (buffer.action) {
    case 'Create' :
        configObj.method = 'POST';
        configObj.url = buffer.libConfig.server + '/thing' + buffer.libConfig.database;
        break;
    case 'Read One' :
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.server + '/work/' + buffer.data.uuid + buffer.libConfig.database;
        break;
     case 'tempRead' :
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.server + '/work/' + buffer.libConfig.database;
        break;
    case 'Manifest' :
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.server + '/manifestation/' + buffer.data.manifestId + buffer.libConfig.database;
        break;
    case 'Update' :
        method = 'PUT';
        url = buffer.libConfig.server + '/work/' + buffer.data.uuid + buffer.libConfig.database;
        break;
    case 'Delete' :
        configObj.method = 'DELETE';
        configObj.url = buffer.libConfig.server + '/work/' + buffer.data.uuid + buffer.libConfig.database;
        break;
    case 'SearchPaginate' :
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.server + '/search?' +buffer.data.searchterms +'&' +buffer.libConfig.database +'&' +buffer.data.pageStart +'&' +buffer.data.maxPageCount +'&' +buffer.data.sortUrl;
        break;
    case 'Search' :
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.server + '/search' + '?' +buffer.data.searchterms;
        break;
    case 'SearchByCnType' :
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.server + '/search' + buffer.libConfig.database +'&' +buffer.data.conUrl +'&' +buffer.data.searchterms;
        break;
     case 'Taxonomies' :
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.taxonomyserver + '/ns/'+ buffer.data.taxonomies + buffer.libConfig.database;
        //headers['prefer']='annotation=true';
        break;
    case 'SearchFreeText':
        configObj.method = 'GET';
        configObj.url = buffer.libConfig.server + '/search' + buffer.libConfig.database +'&' +buffer.data.searchterms +'&' +buffer.data.searchText;
        break;
    
    case 'TaxonomicType':
    configObj.method = 'GET';
    configObj.url = buffer.libConfig.taxonomyserver + '/ns/taxonomictype/interactives'
    break;
        

    default:
        configObj.method = '';
        configObj.url = '';
        break;
    }
     return configObj 
  },

  createJSON(data, eTag) {
    // debugger;
    const obj = { };
    for (const k in data) {
        if (k.includes('name')) {
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
        else
        if (k.includes('hasAlignment')) {
            obj['goalKeywords'] = data[k];
        }
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
        if (k === 'id') {
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

            if(k.includes('thumbnailUrl')){
              obj['thumbnailUrl'] = data[k];
            }

      if (k.includes('alignmentObjective')) {
      obj['alignmentObjective'] = data[k];
      }

      if (k.includes('exampleOfWork')) {              
                obj['workurn'] = data[k]; 
      }
       if (k.includes('taxonomicType')) {              
                obj['taxonomicType'] = data[k]; 
      }
      if (k.includes('hasPart')) {              
                obj['hasPart'] = data[k]; 
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
},

createJSONLD(method,context, buffer) {
  
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
    };

    if (method === 'PUT') {

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

    if(method === 'PUT' && buffer.action == 'Update' && buffer.req == 'AssetMetadata'){     
      if (buffer.data.name)
          obj['AssetMetaName'] = buffer.data.name;
    }

    if (buffer.data.filename || buffer.data.filename === '')
        obj['filename'] = buffer.data.filename;

    if (buffer.data.desc || buffer.data.desc === ''){
        obj['description'] = buffer.data.desc;
    }

    if (buffer.data.url)
        obj['thumbnail'] = buffer.data.url;

    if (buffer.data.alternateName)
        obj['alternateName'] = buffer.data.alternateName;

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

    if (buffer.data.alignmentObjective || buffer.data.alignmentObjective === '')
        obj['alignmentObjective'] = {'en': buffer.data.alignmentObjective};
       
    return obj;
},

modifyResData(reply){
    let { data, eTag } = reply
    //let json = {};
    let json=[];
    if(reply.data.type==='SearchResultsContainer'){
      for(let i=0;i<data.results.length;i++){
        let obj = this.createJSON(data.results[i], eTag);
        json.push(obj);
      }
    }else{
      json = this.createJSON(data, eTag);
    }
    
    if(data === undefined && eTag !== ''){
        json.eTag = eTag;
    }
    if(data !== undefined && data.type !== undefined){
      if(data.type !== 'ConceptSchema')
        json.origjsonld = data;
    }
    if(reply.data !== undefined && reply.data.topConcept){
      let topConceptData = [];
      reply.data.topConcept.forEach(function (obj) {
        topConceptData.push(obj);
      });
      let taxonomyName = json.id.split('/').pop();
      json[taxonomyName] = [];
      json[taxonomyName] = this.createTaxomomyData(taxonomyName,topConceptData);
    }
return json
},

createTaxomomyData(taxonomyName,data){
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
}
