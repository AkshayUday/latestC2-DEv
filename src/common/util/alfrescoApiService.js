/**
* ATIC-389	Udhayakumar Gururaj		Adding maxItems parameters in Product linking Query
**/

let request = require('superagent');
let  Promise = require('bluebird');
const PRODUCT_LINK_QUERY = '/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000';
function queryBaseUrl(){
	return '/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser';
}


function getRequest(apiKey,ssoSessionToken,requestUrl){
	return Promise.promisifyAll(
		request
		.get(requestUrl)
		.set('x-apikey', apiKey)
		.set('X-PearsonSSOSession', ssoSessionToken)
		)
}

function postRequest(apiKey,ssoSessionToken,requestUrl,postData){
	return Promise.promisifyAll(
		request
		.post(requestUrl)
		.set('x-apikey', apiKey)
		.set('X-PearsonSSOSession', ssoSessionToken)
		.send(postData)
		)
}

function SendWithAlfToken(requestUrl){
	return Promise.promisifyAll(
		request
		.get(requestUrl)
		)
}

function SendWithAlfCreds(libConfig,requestUrl){
	return Promise.promisifyAll(
		request
		.get(requestUrl)
        .auth(libConfig.alfuname, libConfig.alfpwd)
		 )
}


export default {

/* Alfresco Get SSO Token */

getSSOToken(){
	 return Promise.promisifyAll(
		request
	     .post('https://identity-internal-test.pearson.com/auth/json/pearson/authenticate')
	     .set('Content-type','application/json')
	     .set('X-OpenAM-Username','sso4')
	     .set('X-OpenAM-Password','Password1')
	     .send()
		  )
},
getSiteRootFolders(plConfig){
	 let baseUrl = plConfig.patConfig.alfserver+queryBaseUrl();
	
	let requestUrl = plConfig.patConfig.alfserver+PRODUCT_LINK_QUERY;
	console.log('requestUrl : '+requestUrl);
	let apiRes = getRequest(plConfig.alferscoLibConfig.headers['x-apikey'],plConfig.alferscoLibConfig.headers['X-PearsonSSOSession'],requestUrl);
	apiRes.alfServer = plConfig.patConfig.alfserver;
	apiRes.repoName = plConfig.patConfig.repoName;
	console.log(apiRes);
	return apiRes
},


getSearchAutcompleteData(libConfig,SearchTextCond){
	 let baseUrl = window.tdc.patConfig.alfserver+queryBaseUrl();
	let workURNJoin = '';

	if(JSON.parse(window.tdc.patConfig['cmis'])['wURN'] == true) {
		workURNJoin = ' JOIN  cp:resource  AS  r  on  d.cmis:objectId  =  r.cmis:objectId ';
	}

	let requestUrl = baseUrl+'?cmisselector=query&q=SELECT d.cmis:name,t.cm:title,t.cmis:name'
         +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' + workURNJoin
         +' where IN_TREE(d,\'workspace://SpacesStore/'+window.tdc.patConfig.nodeRef+'\')'+SearchTextCond+' '+' ORDER BY cmis:name';
 	return getRequest(window.tdc.libConfig.headers['x-apikey'],window.tdc.libConfig.headers['X-PearsonSSOSession'],requestUrl);

},

getAssetsBySearch(libConfigData,SearchTextCond,fileTypeCond,sortValue,index,limit){
	 let baseUrl = window.tdc.patConfig.alfserver+queryBaseUrl();
 let workURN = '';
 let workURNJoin = '';

 if(JSON.parse(window.tdc.patConfig['cmis'])['wURN'] == true) {
   workURN  = ' , r.cp:workURN ';
   workURNJoin = ' JOIN  cp:resource  AS  r  on  d.cmis:objectId  =  r.cmis:objectId ';
 }

 	let requestUrl = baseUrl+'?cmisselector=query&skipCount='+index+'&maxItems='+limit+'&q=SELECT d.*,t.cm:title,t.cmis:name' + workURN 
        +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' + workURNJoin 
        +' where in_tree(d,\'workspace://SpacesStore/'+window.tdc.patConfig.nodeRef+'\')'
        +SearchTextCond+fileTypeCond+' '+sortValue;
	return getRequest(window.tdc.libConfig.headers['x-apikey'],window.tdc.libConfig.headers['X-PearsonSSOSession'],requestUrl);
},

getAssetsByFolder(libConfigData,nodeRef,SearchTextCond,fileTypeCond,sortValue,index,limit){
	 let baseUrl = window.tdc.patConfig.alfserver+queryBaseUrl();
let skipCount = '',maxItems = '';
 if(index){
 	skipCount = '&skipCount='+index;
 }
 if(limit){
 	maxItems = '&maxItems='+limit;
 }

 let workURN = '';
 let workURNJoin = '';

 if(JSON.parse(window.tdc.patConfig['cmis'])['wURN'] == true) {
   workURN  = ' , r.cp:workURN ';
   workURNJoin = ' JOIN  cp:resource  AS  r  on  d.cmis:objectId  =  r.cmis:objectId ';
 }

 let requestUrl = baseUrl+'?cmisselector=query'+skipCount+maxItems+'&q=SELECT d.*,t.cm:title,t.cmis:name' + workURN 
         +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' + workURNJoin  
         +' where IN_FOLDER(d,\'workspace://SpacesStore/'+nodeRef+'\')'
         +SearchTextCond+fileTypeCond+' '+sortValue;
    return getRequest(window.tdc.libConfig.headers['x-apikey'],window.tdc.libConfig.headers['X-PearsonSSOSession'],requestUrl);
},

getSubFolders(libConfigData,nodeRef,Token){
	 let baseUrl = window.tdc.patConfig.alfserver+queryBaseUrl();
 let requestUrl = baseUrl+'?cmisselector=query&q=select * from cmis:folder where cmis:baseTypeId = \'cmis:folder\' and IN_FOLDER(\''+nodeRef+'\')';
	return getRequest(window.tdc.libConfig.headers['x-apikey'],window.tdc.libConfig.headers['X-PearsonSSOSession'],requestUrl);
},

getSiteData(libConfigData){
	 let baseUrl = window.tdc.patConfig.alfserver+queryBaseUrl();
	let requestUrl = baseUrl+'?cmisselector=query&q=SELECT * FROM cmis:folder WHERE cmis:objectId=\''+window.tdc.patConfig.nodeRef+'\'';
	return getRequest(window.tdc.libConfig.headers['x-apikey'],window.tdc.libConfig.headers['X-PearsonSSOSession'],requestUrl);
},

uploadAsset(libConfigData,nodeRef,title,fileName,postData){
	let baseUrl = window.tdc.patConfig.alfserver+queryBaseUrl()+'/root?';
	let requestUrl = baseUrl+'objectId=workspace://SpacesStore/' + window.tdc.patConfig.nodeRef +
	'&cmisaction=createDocument&overwriteFlag=true&propertyId[0]=cmis:name&propertyValue[0]=' + fileName +
	'&propertyId[1]=cmis:objectTypeId&propertyValue[1]=cmis:document'+
	'&propertyId[2]=cmis:secondaryObjectTypeIds&propertyValue[2]=P:cm:titled'+
	'&propertyId[3]=cm:title&propertyValue[3]='+title;
	return postRequest(window.tdc.libConfig.headers['x-apikey'],window.tdc.libConfig.headers['X-PearsonSSOSession'],requestUrl,postData);

},


getEpsUrl(libConfigData,nodeRef){
	let requestUrl = window.tdc.patConfig.alfserver+'/alfresco-proxy/s/publication-url?nodeRef=workspace://SpacesStore/'+nodeRef;
	return getRequest(window.tdc.libConfig.headers['x-apikey'],window.tdc.libConfig.headers['X-PearsonSSOSession'],requestUrl);
},
getNonEpsUrl(libConfigData,nodeRef){
	console.log('test',nodeRef)
	let baseUrl = libConfigData.alfserver+queryBaseUrl();
	let requestUrl = baseUrl+'?cmisselector=query&q=SELECT d.*, e.exif:pixelXDimension, e.exif:pixelYDimension FROM cmis:document AS d JOIN exif:exif AS e ON d.cmis:objectId =' +
		'e.cmis:objectId where d.cmis:objectId = \''+nodeRef+'\'';
	return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
},

/**
* this method is used to get content from Platform and smarlink assets
**/
getContentFromURL(libConfig,requestURL){
	return getRequest(libConfig.headers['x-apikey'],libConfig.headers['X-PearsonSSOSession'],requestURL);
}
}


