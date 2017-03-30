var uat = {
  audienceURL : 'https://uat.pearsonmeta.io/ns/audience?db=qa12',
  difficultyURL : 'https://uat.pearsonmeta.io/ns/difficultylevel?db=qa12',
  disciplineURL : 'https://uat.pearsonmeta.io/ns/discipline?db=qa12',
  dataPOSTURL : 'https://uat.pearsonmeta.io/thing?db=qa12',
  dataGETURLBase : 'https://uat.pearsonmeta.io/work/',
  dataGETURLDB : '?db=qa12',
  type : 'uat'
}

var stg = {
  audienceURL : 'https://staging.schema.pearson.com/ns/audience?db=qa2',
  difficultyURL : 'https://staging.schema.pearson.com/ns/difficultylevel?db=qa2',
  disciplineURL : 'https://staging.schema.pearson.com/ns/discipline?db=qa2',
  dataPOSTURL : 'https://staging.data.pearson.com/thing?db=qa2',
  dataGETURLBase : 'https://staging.data.pearson.com/work/',
  dataGETURLDB : '?db=qa2',
  type : 'stg'
}
//var env = stg;
var env = uat;

var global = {
  auth : 'Basic xxxxxxxxx',
  ETag : '',
  APIKey : '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
  SSOKey : 'xxxx.*yyyy.*',
  sameAs : '',
  id : '',
  location : '',
  UUID : ''
}

function onclickEnv(e, type) {
  env = (type === 'uat') ? uat : stg;
  console.log('capture ' + e.value + ' dump env %o', env);
}
function onblurAuth(e) {
  console.log('capture ' + e.value);
  if (e.value)
    global.auth = e.value;
}

function onblurAPIKey(e) {
  console.log('capture ' + e.value);
  if (e.value)
    global.APIKey = e.value;
}

function onblurSSOKey(e) {
  console.log('capture ' + e.value);
  if (e.value)
    global.SSOKey = e.value;
}

function onblurUUID(e) {
  console.log('capture ' + e.value);
  if (e.value)
    global.UUID = e.value;
}

function checkReqd() {
  var rc = true;
  if (env.type === 'stg') {
    // must have SSOKey and APIKey
    if (!global.APIKey) {
      alert('Must supply APIKey for STG environment');
      rc = false;
    }
    if (!global.SSOKey) {
      alert('Must supply SSOSession Token for STG environment');
      rc = false;
    }
  }
  else {
    // must have Authorization
    if (!global.auth) {
      alert('Must supply Auth for UAT environment');
      rc = false;
    }
  }
  return rc;
}
        //'x-apikey' : global.APIKey,
        //'X-PearsonSSOSession':global.SSOKey,
var taxonomyGET = 
{
	"method": "GET",
	"url": 'NotSet',
	"headers": {
		"Content-Type": "application/json",
		"Accept": "application/ld+json",
		"Authorization": global.auth
	},
	"data": {}
};
		//"X-Roles": "roleX,roleY,roleC",

        //'x-apikey' : global.APIKey,
        //'X-PearsonSSOSession':global.SSOKey,
var configGET = 
{
	"method": "GET",
	"url": 'NotSet',
	"headers": {
		"Content-Type": "application/json",
		"Accept": "application/ld+json",
		"X-Roles": "roleX,roleY,roleC",
		"Authorization": global.auth
	},
	"data": {}
};
        //'x-apikey' : global.APIKey,
        //'X-PearsonSSOSession': global.SSOKey
var configPOST = 
{
	"method": "POST",
	"url": 'NotSet',
	"headers": {
		"Content-Type": "application/json",
		"Accept": "application/ld+json",
		"X-Roles": "roleX,roleY,roleC",
		"Authorization": global.auth
    },
	"data": {
    "@context": [
 	  "https://schema.pearson.com/context/content-context.jsonld",
      "https://schema.pearson.com/context/assessment-context.jsonld",
  	  "https://schema.pearson.com/context/schema-org-context.jsonld",
      "https://schema.pearson.com/context/learn-context.jsonld"
    ],

    "type": ["Work", "AssessmentInstrument"],
    "name" : { "en" :  "Some Name" }, 
 "description" : { "en" : "Some Description1" },
  "timeRequired" : "PT12H30M",
 "keyword": {
 		"en": ["WordA ", "WordB"]
 },
 "discipline" : "https://schema.pearson.com/ns/domain/art",
  "difficultyLevel" : "https://schema.pearson.com/ns/difficultylevel/easy",
  "audience" : "https://schema.pearson.com/ns/audience/parentsonly"
  }
};

var configPUT =
{
	"method": "PUT",
	"url": 'NotSet',
	"headers": {
		"Content-Type": "application/json",
		"Accept": "application/ld+json",
		"X-Roles": "roleX,roleY,roleC",
		"Authorization": global.auth
    },
	"data": {
     "@context": [
    	"https://schema.pearson.com/context/content-context.jsonld",
     "https://schema.pearson.com/context/assessment-context.jsonld",
   	"https://schema.pearson.com/context/schema-org-context.jsonld",
     "https://schema.pearson.com/context/learn-context.jsonld"
    ],
  
     "id": "some id",
     "sameAs": ["some same as"],
     "type": ["Work", "AssessmentInstrument"],
     "name" : { "en" :  "Some Name Modified" }, 
     "description" : { "en" : "Some Description1 Modified" },
     "timeRequired" : "PT5H30M",
     "keyword": {
    		"en": ["WordA Modified", "WordB Modified"]
     },
     "discipline" : "https://schema.pearson.com/ns/domain/art",
     "difficultyLevel" : "https://schema.pearson.com/ns/difficultylevel/difficult",
     "audience" : "https://schema.pearson.com/ns/audience/parentsonly"
   }
};

var configPATCH =
{
	"method": "PATCH",
	"url": 'NotSet',
	"headers": {
		"Content-Type": "application/json",
		"Accept": "application/ld+json",
		"X-Roles": "roleX,roleY,roleC",
		"Authorization": global.auth
    },
	"data": {
    "@context": {
      "removal": "https://schema.pearson.com/ns/changeset/removal",
      "addition": "https://schema.pearson.com/ns/changeset/addition",
      "replacement": "https://schema.pearson.com/ns/changeset/replacement",
      "eTag": "https://schema.pearson.com/ns/raf/eTag",
      "subject": {
        "@type": "@id",
        "@id": "https://schema.pearson.com/ns/changeset/subject"
      },
      "predicate": {
        "@type": "@id",
        "@id": "https://schema.pearson.com/ns/changeset/predicate"
      },
      "object": {
        "@id": "https://schema.pearson.com/ns/changeset/object"
      },
      "ifMatch": {
        "@id": "https://schema.pearson.com/ns/raf/ifMatch"
      }
    },
    "eTag": [
    {
      "@id": "some id",
      "ifMatch": "match etag"
    }
    ],

    "replacement": [
    { "@context": {"@language": "en"},
      "subject": "some location",
      "predicate": "http://schema.org/description",
      "object": "Some Description Patched"
    }
    ]
  }   
};

function REST(config) {
console.log('issue ajax call with config : %o', config);
$.ajax({
        url: config.url,
        type: config.method,
        headers: config.headers,
        data: (config.method === 'GET') ? null : JSON.stringify(config.data),
        dataType: 'json', 
        success:function (data, status, xhr)
        {
            console.log('REST reply is %o', data)
            global.ETag =     xhr.getResponseHeader('ETag');
            global.location = xhr.getResponseHeader('Location') || global.location;
            global.UUID =     xhr.getResponseHeader('uuid') || global.UUID;            

            if (data && data.uuid) {
               global.UUID = data.uuid;
            }    
            if (data && data.sameAs) {
		           global.sameAs = data.sameAs;
            }

            console.log('eTag | location | uuid : ' + global.ETag + 
                        ' | ' + global.location + ' | ' + global.UUID );

            var tmp = global.sameAs && global.sameAs[0] || '';
            console.log('sameas : ' + tmp);

            if (global.UUID) {
              $('#uuid').val(global.UUID);
            }
        },
        error:function (jqXHR,textStatus,errorThrown)
        {
        	alert(errorThrown);
        }
    });
};

function runTaxonomyGET(e,type) {
  console.log('running taxonomy GET for ' + type);
  taxonomyGET.headers["Authorization"] = global.auth;
console.log('runTax env %o', env);
console.log('type :', type);
  if (env.type === 'stg') {
    taxonomyGET.headers['x-apikey'] = global.APIKey;
    taxonomyGET.headers['X-PearsonSSOSession'] = global.SSOKey;
  }
  if (type === 'audience')
    taxonomyGET["url"] = env.audienceURL;
  if (type === 'difficulty')
    taxonomyGET["url"] = env.difficultyURL;
  if (type === 'discipline')
    taxonomyGET["url"] = env.disciplineURL;

console.log('taxonomyGET %o', taxonomyGET);

  if (!checkReqd()) return;
  REST(taxonomyGET);
}

function runPOST() {
  console.log('running POST');
  if (env.type === 'stg') {
console.log('set api key');
    configPOST.headers['x-apikey'] = global.APIKey;
    configPOST.headers['X-PearsonSSOSession'] = global.SSOKey;
  }

  configPOST["url"] = env.dataPOSTURL;
  configPOST.headers["Authorization"] = global.auth;

  if (!checkReqd()) return;

console.log('POST config buffer %o', configPOST);
  REST(configPOST);

}
function runGET() {
  console.log('running GET uuid : ' + global.UUID);
  if (env.type === 'stg') {
    configGET.headers['x-apikey'] = global.APIKey;
    configGET.headers['X-PearsonSSOSession'] = global.SSOKey;
  }
  var dataGETURL = env.dataGETURLBase + global.UUID + env.dataGETURLDB;

  configGET['url'] = dataGETURL;
  configGET.headers["Authorization"] = global.auth;

  if (!checkReqd()) return;
  REST(configGET);

}

function runPUT() {
  console.log('running PUT');
  if (env.type === 'stg') {
    configPUT.headers['x-apikey'] = global.APIKey;
    configPUT.headers['X-PearsonSSOSession'] = global.SSOKey;
  }
  var dataPUTURL = env.dataGETURLBase + global.UUID + env.dataGETURLDB;

  configPUT['url'] = dataPUTURL;
  configPUT.headers["If-Match"] = global.ETag;
  configPUT.headers["Authorization"] = global.auth;
  configPUT.data["sameAs"] = "https://data.pearson.com/work/" + global.UUID;
  configPUT.data["id"] = "urn:pearson:work:" + global.UUID;

  if (!checkReqd()) return;
  REST(configPUT);  
};

function runPATCH() {
  console.log('running PATCH');
  if (env.type === 'stg') {
    configPATCH.headers['x-apikey'] = global.APIKey;
    configPATCH.headers['X-PearsonSSOSession'] = global.SSOKey;
  }
  var dataPUTURL = env.dataGETURLBase + global.UUID + env.dataGETURLDB;

  configPATCH['url'] = dataPUTURL;
  configPATCH.headers["Authorization"] = global.auth;

  configPATCH.data.eTag[0]["@id"] = global.location;
  configPATCH.data.eTag[0]["ifMatch"] = global.ETag;

  configPATCH.data.replacement[0]["subject"] = global.location;

  if (!checkReqd()) return;
  REST(configPATCH);  
};


