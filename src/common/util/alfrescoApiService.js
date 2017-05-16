/**
* ATIC-389	Udhayakumar Gururaj		Adding maxItems parameters in Product linking Query
**/

let request = require('superagent');
let  Promise = require('bluebird');

// function queryBaseUrl(){
// 	return '/alfresco/api/-default-/public/cmis/versions/1.1/browser?';
// }
const PRODUCT_LINK_QUERY = '/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000';
function queryBaseUrl(){
	return '/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser';
}


function getRequest(ssoSessionToken,requestUrl){
	return Promise.promisifyAll(
		request
		.get(requestUrl)
		.set('X-PearsonSSOSession', ssoSessionToken)
		)
}

function postRequest(ssoSessionToken,requestUrl,postData){
	return Promise.promisifyAll(
		request
		.post(requestUrl)
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
	 let baseUrl = plConfig.alferscoLibConfig.alfserver+queryBaseUrl();
	// let requestUrl = baseUrl+'cmisselector=query&q=select cmis:name,cmis:objectId from st:site where st:siteVisibility = \'PRIVATE\'';	
	// if(libConfig.alfToken===''){
	// 	return SendWithAlfCreds(libConfig,requestUrl)
	// }else{
	// 	requestUrl = libConfig.alfserver+'/alfresco/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q=select cmis:name,cmis:objectId from st:site where st:siteVisibility = \'PRIVATE\'&alf_ticket='+libConfig.alfToken;
	// 	return SendWithAlfToken(requestUrl);
	// }
	
	//let requestUrl = baseUrl+'cmisselector=query&q=select cmis:name,cmis:objectId from st:site where st:siteVisibility = \'PRIVATE\'';
	
	// let requestUrl = baseUrl+'?cmisselector=query&q=select cmis:name,cmis:objectId,st:siteVisibility from st:site where st:siteVisibility IN (\'PRIVATE\', \'PUBLIC\', \'MODERATED\')';
	let requestUrl = plConfig.alferscoLibConfig.alfserver+PRODUCT_LINK_QUERY;
	console.log('requestUrl : '+requestUrl);
	let apiRes = getRequest(plConfig.alferscoLibConfig.headers['X-PearsonSSOSession'],requestUrl);
	apiRes.alfServer = plConfig.alferscoLibConfig.alfserver;
	apiRes.repoName = plConfig.alferscoLibConfig.repoName;
	console.log(apiRes);
	//return getRequest(plConfig.alferscoLibConfig.headers['X-PearsonSSOSession'],requestUrl);
	return apiRes
},


getSearchAutcompleteData(libConfig,SearchTextCond){
	 let baseUrl = libConfig.alfserver+queryBaseUrl();
	// let requestUrl = baseUrl+'cmisselector=query&q=SELECT d.cmis:name,t.cm:title' 
 //        +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' 
 //        +' where in_tree(d,\'workspace://SpacesStore/'+libConfig.nodeRef+'\')'+SearchTextCond+' '+'ORDER BY cm:title';	
 //        if(libConfig.alfToken===''){
	// 	return SendWithAlfCreds(libConfig,requestUrl)
	// }else{
	// 	requestUrl = baseUrl+'cmisselector=query&q=SELECT d.cmis:name,t.cm:title' 
 //        +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' 
 //        +' where in_tree(d,\'workspace://SpacesStore/'+libConfig.nodeRef+'\')'+SearchTextCond+' '+'ORDER BY cm:title'+'&alf_ticket='+libConfig.alfToken;
	// 	return SendWithAlfToken(requestUrl);
	// }


	let workURNJoin = '';

	if(JSON.parse(libConfig['cmis'])['wURN'] == true) {
		workURNJoin = ' JOIN  cp:resource  AS  r  on  d.cmis:objectId  =  r.cmis:objectId ';
	}

	let requestUrl = baseUrl+'?cmisselector=query&q=SELECT d.cmis:name,t.cm:title,t.cmis:name'
         +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' + workURNJoin
         +' where IN_TREE(d,\'workspace://SpacesStore/'+libConfig.nodeRef+'\')'+SearchTextCond+' '+' ORDER BY cmis:name';
 	return getRequest(libConfig.headers['X-PearsonSSOSession'],requestUrl);

},

getAssetsBySearch(libConfigData,SearchTextCond,fileTypeCond,sortValue,index,limit){
	 //console.log(libConfigData);

	 let baseUrl = libConfigData.alfserver+queryBaseUrl();
	// let requestUrl = baseUrl+'cmisselector=query&skipCount='+index+'&maxItems='+limit+'&q=SELECT d.*,t.cm:title' 
 //        +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' 
 //        +' where in_tree(d,\'workspace://SpacesStore/'+libConfigData.nodeRef+'\')'
 //        +SearchTextCond+fileTypeCond+' '+sortValue+'&alf_ticket='+Token;

 //        return SendWithAlfToken(requestUrl);
 
 let workURN = '';
 let workURNJoin = '';

 if(JSON.parse(libConfigData['cmis'])['wURN'] == true) {
   workURN  = ' , r.cp:workURN ';
   workURNJoin = ' JOIN  cp:resource  AS  r  on  d.cmis:objectId  =  r.cmis:objectId ';
 }

 	let requestUrl = baseUrl+'?cmisselector=query&skipCount='+index+'&maxItems='+limit+'&q=SELECT d.*,t.cm:title,t.cmis:name' + workURN 
        +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' + workURNJoin 
        +' where in_tree(d,\'workspace://SpacesStore/'+libConfigData.nodeRef+'\')'
        +SearchTextCond+fileTypeCond+' '+sortValue;
	return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
},

getAssetsByFolder(libConfigData,nodeRef,SearchTextCond,fileTypeCond,sortValue,index,limit){
     //console.log(libConfigData);
	 let baseUrl = libConfigData.alfserver+queryBaseUrl();
	// let requestUrl = baseUrl+'cmisselector=query&skipCount='+index+'&maxItems='+limit+'&q=SELECT d.*,t.cm:title' 
 //        +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' 
 //        +' where in_tree(d,\'workspace://SpacesStore/'+nodeRef+'\')'
 //        +SearchTextCond+fileTypeCond+' '+sortValue+'&alf_ticket='+Token;

 //        return SendWithAlfToken(requestUrl);
let skipCount = '',maxItems = '';
 if(index){
 	skipCount = '&skipCount='+index;
 }
 if(limit){
 	maxItems = '&maxItems='+limit;
 }

 let workURN = '';
 let workURNJoin = '';

 if(JSON.parse(libConfigData['cmis'])['wURN'] == true) {
   workURN  = ' , r.cp:workURN ';
   workURNJoin = ' JOIN  cp:resource  AS  r  on  d.cmis:objectId  =  r.cmis:objectId ';
 }

 let requestUrl = baseUrl+'?cmisselector=query'+skipCount+maxItems+'&q=SELECT d.*,t.cm:title,t.cmis:name' + workURN 
         +' FROM cmis:document AS d JOIN cm:titled AS t ON d.cmis:objectId = t.cmis:objectId' + workURNJoin  
         +' where IN_FOLDER(d,\'workspace://SpacesStore/'+nodeRef+'\')'
         +SearchTextCond+fileTypeCond+' '+sortValue;
    return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
},

getSubFolders(libConfigData,nodeRef,Token){
	 let baseUrl = libConfigData.alfserver+queryBaseUrl();
 //    let requestUrl = baseUrl+'cmisselector=query&q=select * from  cmis:folder where cmis:baseTypeId = \'cmis:folder\' and IN_FOLDER(\''+nodeRef+'\')';
	//  if(libConfigData.alfToken===''){
	//  	return SendWithAlfCreds(libConfigData,requestUrl);
	//  }else{
	//  	let requestUrl = baseUrl+'cmisselector=query&q=select * from  cmis:folder where cmis:baseTypeId = \'cmis:folder\' and IN_FOLDER(\''+nodeRef+'\')&alf_ticket='+Token;
 //        return SendWithAlfToken(requestUrl);
 //    }

 let requestUrl = baseUrl+'?cmisselector=query&q=select * from cmis:folder where cmis:baseTypeId = \'cmis:folder\' and IN_FOLDER(\''+nodeRef+'\')';
	return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
},


getSiteData(libConfigData){
	 let baseUrl = libConfigData.alfserver+queryBaseUrl();
	// let requestUrl = baseUrl+'cmisselector=query&q=SELECT * FROM cmis:folder WHERE cmis:objectId=\''+libConfigData.nodeRef+'\'';	
 //        if(libConfigData.alfToken===''){
	// 	return SendWithAlfCreds(libConfigData,requestUrl)
	// }else{
	// 	requestUrl = baseUrl+'cmisselector=query&q=SELECT * FROM cmis:folder WHERE cmis:objectId=\''+libConfigData.nodeRef+'\'&alf_ticket='+libConfigData.alfToken;
	// 	return SendWithAlfToken(requestUrl);
	// }

	let requestUrl = baseUrl+'?cmisselector=query&q=SELECT * FROM cmis:folder WHERE cmis:objectId=\''+libConfigData.nodeRef+'\'';
	return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
},

uploadAsset(libConfigData,nodeRef,title,fileName,postData){
	let baseUrl = libConfigData.alfserver+queryBaseUrl()+'/root?';
	let requestUrl = baseUrl+'objectId=workspace://SpacesStore/' + nodeRef +
	'&cmisaction=createDocument&overwriteFlag=true&propertyId[0]=cmis:name&propertyValue[0]=' + fileName +
	'&propertyId[1]=cmis:objectTypeId&propertyValue[1]=cmis:document'+
	'&propertyId[2]=cmis:secondaryObjectTypeIds&propertyValue[2]=P:cm:titled'+
	'&propertyId[3]=cm:title&propertyValue[3]='+title;
	return postRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl,postData);

},


getEpsUrl(libConfigData,nodeRef){
	let requestUrl = libConfigData.alfserver+'/alfresco-proxy/s/publication-url?nodeRef=workspace://SpacesStore/'+nodeRef;
	return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
},

/**
* this method is used to get content from Platform and smarlink assets
**/
getContentFromURL(libConfig,requestURL){
	return getRequest(libConfig.headers['X-PearsonSSOSession'],requestURL);
}


// getAssetRoutePath(libConfigData,nodeRef){
// 	let requestUrl = libConfigData.alfserver+'/alfresco-proxy/s/slingshot/node/workspace/SpacesStore/'+nodeRef;
// 	return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
// },

// getGuid(libConfigData,siteName){
// 	let requestUrl = libConfigData.alfserver+'/alfresco-proxy/api/-default-/public/alfresco/versions/1/sites/'+siteName;
// 	return getRequest(libConfigData.headers['X-PearsonSSOSession'],requestUrl);
// }
}


