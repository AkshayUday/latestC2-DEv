var patternsLib = PatternsLib.default;
// Following is exported from PatternsLib : { type : typeList, setup: function, create: function }
// const typeList = { BUTTON : 'button',
//                    BUTTONLONG : 'buttonLong'
//                  };

// ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+==

// Initial (one time) library configuration

// Headers which C1 expects: Access-Control-Allow-Headers:origin, content-type, accept, authorization
/*
  'headers' : {'Accept-Encoding': 'gzip,deflate',
  'X-Roles'        : 'roleX,roleY,roleC',
  'Authorization'  : 'Basic c3RyYXdiZXJyeToqbnJSUEc0akA1b1JCUnVDMkckITh4IzVqSFA=',
  'Content-Type'   : 'application/json',
  'Accept'         : 'application/ld+json',
  'Access-Control-Allow-Credentials' : true
  },
*/

var libConfig = {'locale': 'en_US',
                   
                   'headers' : {
                                'Content-Type'   : 'application/json',
                                'Accept'         : 'application/ld+json',
                                // 'X-Roles-Test'        : 'ContentMetadataEditor',
                                //'Authorization'  : 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
                                'Prefer' : 'annotation=true'
        //'x-apikey' :  '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd',
                               //'X-PearsonSSOSession' : 'AQIC5wM2LY4SfczJwDEKiLveBuH9DtGGXLkfvRlveimpxgQ.*AAJTSQACMDIAAlNLABM0NjAwMDQ4NTYxOTkyNTk3NTU1AAJTMQACMDE.*'
                               },
                   'database'       : '?db=qa2',
                   'server'         : 'https://staging.data.pearson.com',
       'taxonomyserver' : 'https://staging.schema.pearson.com',
                   'port'           : '80',
                   //'alfserver'      :'https://ukppewip.pearsoncms.com'
                   //'alfserver'        :'https://staging.api.pearson.com/content/cmis/ukwip',
                    'epsserver':     'https://us-school-stg.pearsoned.com/school'
                  };


document.addEventListener( "DOMContentLoaded", function () {
   // debugger;
   var xmlhttp = new XMLHttpRequest();
   var taxurl = libConfig['taxonomyserver']+'/ns/taxonomictype/interactives';

    xmlhttp.onreadystatechange = function() {

      console.log(xmlhttp);

      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var response = JSON.parse(xmlhttp.response);  
        // debugger;
        console.log(response);
        
        var results = response.narrower.map( (data) => { 
              return {display: data['prefLabel']['en'],
                property : data['id']}
        });
          
        console.log(results);
      for(var i=0; i < results.length; i++){
      var label= document.createElement("label");
      var description = document.createTextNode(results[i]['display']);
      var checkbox = document.createElement("input");
      var br = document.createElement("br");

      checkbox.type = "checkbox";    // make the element a checkbox
      checkbox.name = "filterType";      // give it a name we can check on the server side
      checkbox.value = results[i]['display'];         // make its value "pair"

      label.appendChild(checkbox);   // add the box to the element
      label.appendChild(description);// add the description to the element
      label.appendChild(br);
      // add the label element to your div
      document.getElementById('c5filterType').appendChild(label);

      }

      }else{

      }

      
    };


    xmlhttp.open("GET", taxurl, true);
    // xmlhttp.setRequestHeader("X-Roles-Test", "ContentMetadataEditor");
    xmlhttp.setRequestHeader("Accept", "application/ld+json");
    xmlhttp.setRequestHeader("x-apikey", '5x8gLqCCfkOfgPkFd9YNotcAykeldvVd');
    xmlhttp.setRequestHeader("X-PearsonSSOSession", document.getElementById('sessionKeyId').value)

    xmlhttp.send();
    
}, false );

//patternsLib.setup(libConfig);


// libConfig for UAT as on 11/8/2016
/* var libConfig = {

  'locale': 'en_US',
  'headers' : {
      'Content-Type'   : 'application/json',
      'Accept'         : 'application/ld+json',
      /*  'X-Roles-Test'        : 'ContentMetadataEditor', */
    /*  'Authorization'  : 'Basic Ymx1ZWJlcnJ5OmVAQkhSTUF2M2V5S2xiT1VjS0tAWl56Q0ZhMDRtYw==',
      'Prefer' : 'annotation=true'
    },
  'database'       : '?db=qa12',
  'server'         : 'https://uat.pearsonmeta.io',
  'taxonomyserver' : 'https://uat.pearsonmeta.io',
  'port'           : '80'

}; */

// ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+==


//
// A simple pattern usage : BUTTON
//

// Create an instance of a pattern object
// The instance has following properties:
// { patSetup: obj,
//   pattern: string,
//   uqid : number,
//   resultsEventId : pattern + '-' + uqid,
//   eventId : pattern + '-channel-' + uqid
//   setup : function,
//   run : function,
//   on : function,
//   off : function,
//   fire : function
// }
/*var patButton = patternsLib.create(patternsLib.type.BUTTON);

// Define a configuration for pattern instance
var patConfig =  {arg : '00001', link : 'button.com1', selector : '#patternHolder1'};

// Define a callback which will receive results back from the pattern instance
var cb = (data) => {
    // data is a JSON structure returned back from the pattern instance

    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('patternResp1');
    e.innerHTML = JSON.stringify(data);
};

// Setup the instance using configuraton and callback
patButton.setup(patConfig, cb);

// Run the render method, processess user interactions and do teardown when finished
patButton.run();





// Following additional methods are available for
// communicating with the live pattern instance

var channelCB = (channelData) => {
    // channel data is a JSON structure

    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('patternChannelResp1');
    e.innerHTML = JSON.stringify(channelData);
};
patButton.on(channelCB);
patButton.fire({ 'one': 'some data', 'two' : 99, 'three' : { 'nested' : {}} });
patButton.off();


// ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+==






//
// A simple pattern usage : BUTTONLONG
//

// Create an instance of a pattern object
var patButton2 = patternsLib.create(patternsLib.type.BUTTONLONG);

// Define a configuration for pattern instance
var patConfig2 =  {arg : '00001', link : 'buttonLong.com2', selector : '#patternHolder2'};

// Define a callback which will receive results back from the pattern instance
var cb2 = (data) => {
    // data is a JSON structure returned back from the pattern instance

    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('patternResp2');
    e.innerHTML = JSON.stringify(data);
};

// Setup the instance using configuraton and callback
patButton2.setup(patConfig2, cb2);

// Run the render method, processess user interactions and do teardown when finished
patButton2.run();

// Following additional methods are available for
// communicating with the live pattern instance
//patButton.on();
//patButton.off();
//patButton.fire()

// ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+== ==+==

//
// A simple pattern usage : BUTTON
// (A test case for multiple instances of same pattern on a single page)
//

var patButton3 = patternsLib.create(patternsLib.type.BUTTON);

var patConfig3 =  {arg : '00001', link : 'button.com3', selector : '#patternHolder3'};
var cb3 = (data) => {
    var e = document.getElementById('patternResp3');
    e.innerHTML = JSON.stringify(data);
};
patButton3.setup(patConfig3, cb3);
patButton3.run();
//patButton.on();
//patButton.off();
//patButton.fire()
*/

/*var SaveCallBack = function (data) {debugger;
   var e = document.getElementById('assesmentResp');
   var content ='<div>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var property = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data[key]+'</span></p>';
        if(typeof(data[key]) === 'string'){
          content =  content+property;
        }
      }
    }
    content =content+'</div>';
    e.innerHTML = content;
};*/


/* Function to generate SSO token */

 function generateToken(){
  let loginUrl = document.getElementById('loginUrl').value;
  let alfUname = document.getElementById('alfuname').value;
  let alfPwd = document.getElementById('alfpwd').value;
  var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
            let response = JSON.parse(xmlhttp.response);  
            document.getElementById("sessionKeyId").value= response.tokenId;   
            //document.cookie = "PearsonSSOSession="+response.tokenId;
            let cookieName = 'X-PearsonSSOSession';
            let cookieValue = response.tokenId;
            let domain = '.pearson.com';
            let myDate = new Date();
            myDate.setMonth(myDate.getMonth() + 12);
            document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate 
                  + ";domain="+domain+";path=/";
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("POST", loginUrl, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.setRequestHeader("X-OpenAM-Username", alfUname);
    xmlhttp.setRequestHeader("X-OpenAM-Password", alfPwd)
    xmlhttp.send();
}

var SaveCallBack = function (data) {
   var e = document.getElementById('assesmentResp');
   var content ='<div>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var property = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data[key]+'</span></p>';
        if(typeof(data[key]) === 'string'){
          content =  content+property;
        }else if(typeof(data[key]) === 'object'){
          if(key === 'keywords' || key === 'goalKeywords'){
            var keyArr = [];
            for(i=0;i<data[key].length;i++){
              keyArr.push(data[key][i].name);
            }
          var keyProperty = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+keyArr+'</span></p>';
          content =  content+keyProperty;
          }
        }
      }
    }
    content =content+'</div>';
    e.innerHTML = content;
};

///______________________________________________________________

var patAssesment;
onSaveAssesment = function(astName){
 var name = document.getElementById(astName).value;
  patAssesment.fire({"id":"aaa","name":name});
}

onLaunchAssesment = function(astName,uuidTagid,planidTargid,
  publisherTargid,ISBNTargId,moduleNoTargId,chapterNoTargId,
  authorTargId,copyRightTargId,objAlignTarid,skillsTargid,
  apiKeyTarId,sessionKeyTarId,renderderedTagSelector,type,environment){
var name = document.getElementById(astName).value;
var assesmentUUID = document.getElementById(uuidTagid).value;
var planId = document.getElementById(planidTargid).value;
//var fileName = document.getElementById(fileNameTargid).value;
var publisherId = document.getElementById(publisherTargid).value;
var isbnId = document.getElementById(ISBNTargId).value;
var moduleNoid = document.getElementById(moduleNoTargId).value;
var chapterNoid = document.getElementById(chapterNoTargId).value;
var bookAuthorid = document.getElementById(authorTargId).value;
var copyRightid = document.getElementById(copyRightTargId).value;
var objAlignid = document.getElementById(objAlignTarid).value;
var skillsId = document.getElementById(skillsTargid).value;
var apiKeyId = document.getElementById(apiKeyTarId).value;
var sessionKeyId = document.getElementById(sessionKeyTarId).value;
var typeId = type;
/*var asConType = document.getElementsByName(assessContentTypeid)[0];
var asContentType = asConType.options[asConType.selectedIndex].value;*/

if(patAssesment && patAssesment.unmount){
  patAssesment.unmount();
}

libConfig.headers['x-apikey'] = apiKeyId;
libConfig.headers['X-PearsonSSOSession'] = sessionKeyId;
/*if(libConfig.server === 'https://staging.data.pearson.com'){
  delete libConfig.headers['X-Roles-Test']; 
}*/
patternsLib.setup(libConfig);


patAssesment = patternsLib.create(type);

// Define a configuration for pattern instance
//var patAssesmentConfig =  {selector : '#comp', uuid: 'c9ce48d4-a24dsds8-43c7-a36d-69dc5c42f2d4', 'callback' : SaveCallBack};
//var patAssesmentConfig =  {selector : '#comp'};

var patAssesmentConfig =  {'selector' : renderderedTagSelector, 'env':environment};
if(name!==''){
    patAssesmentConfig.name = name;
}
if(renderderedTagSelector!=='' && renderderedTagSelector === '#assesmentComp'){
  patAssesmentConfig.metadataType = 'AssesmentMetadata';
}
if(assesmentUUID!==''){
    patAssesmentConfig.uuid = assesmentUUID;
}
if(planId!==''){
    patAssesmentConfig.planId = planId;
}
/*if(fileName!==''){
    patAssesmentConfig.filename = fileName;
}*/
if(publisherId!==''){
    patAssesmentConfig.publisher = publisherId;
}
if(isbnId!==''){
    patAssesmentConfig.isbn = isbnId;
}
if(moduleNoid!==''){
    patAssesmentConfig.modNo = moduleNoid;
}
if(chapterNoid!==''){
    patAssesmentConfig.chapNo = chapterNoid;
}
if(bookAuthorid!==''){
    patAssesmentConfig.author = bookAuthorid;
}
if(copyRightid!==''){
    patAssesmentConfig.copyrightInfo = copyRightid;
}
/*if(asContentType!==''){
  patAssesmentConfig.contentType = asContentType;
}*/
if(objAlignid!==''){
  patAssesmentConfig.objAlign = objAlignid;
}
if(skillsId!==''){
var comma = ',';
//var skills = splitString(skillsId, comma);
patAssesmentConfig.goalKeywords = splitString(skillsId, comma);
}


// Define a callback which will receive results back from the pattern instance
var cbAssesment = function (data) {
    // data is a JSON structure returned back from the pattern instance
    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('compResp');
    //e.innerHTML = String(data);
    var metadataContent ='<table>';
    for (var key in data) {
      if (data.hasOwnProperty(key) && typeof(data[key]) === 'object' && data[key].hasOwnProperty('value')) {
        var property = '<tr><td class="uppercase">'+key+'</td><td>'+data[key].value+'</td></tr>';
        if(typeof(data[key].value) === 'string'){
          metadataContent =  metadataContent+property;
        }else if(typeof(data[key].value) === 'object'){
          if(key === 'keywords' || key === 'goalKeywords'){
              var tags = data[key].value;
              var keyArr = [];
              for(i=0;i<tags.length;i++){
                  keyArr.push(tags[i].name);
              }
          var keyProperty = '<tr><td class="uppercase">'+key+'</td><td>'+keyArr+'</td></tr>';
          metadataContent =  metadataContent+keyProperty;
          }else if(key === 'audience' || key === 'discipline'){
            var selectedValue = data[key].value.toString();
            var selectedProperty = '<tr><td class="uppercase">'+key+'</td><td>'+selectedValue+'</td></tr>';
            metadataContent =  metadataContent+selectedProperty;
          }
        }
      }
    }
    metadataContent =metadataContent+'</table>';
    e.innerHTML = metadataContent;

};

// Setup the instance using configuraton and callback
patAssesment.setup(patAssesmentConfig, cbAssesment);

// Run the render method, processess user interactions and do teardown when finished
patAssesment.run();


patAssesment.on(SaveCallBack);
//patButton.off();
}

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  const itemArr = [];
  for(var key in arrayOfStrings){
    if(arrayOfStrings.hasOwnProperty(key)){
      itemArr.push({'id': key, 'name': arrayOfStrings[key]});
  }}

  return itemArr;
}

var addAnAsset;

onLaunchAddAnAsset = function (renderderedTagSelector, uuid,
                               PAFID,caption, altText, copyrtInfo,type) {
    var addAnAssetConfig =  {'selector' : renderderedTagSelector};

    if(addAnAsset && addAnAsset.unmount){
      addAnAsset.unmount();
    }

    addAnAsset = patternsLib.create(type);

    uuid = document.getElementById(uuid).value;
    caption = document.getElementById(caption).value;
    altText = document.getElementById(altText).value;
    copyrtInfo = document.getElementById(copyrtInfo).value;
    pafID = document.getElementById(PAFID).value;

    if(uuid !== ''){
      addAnAssetConfig.uuid = uuid;
    }

    if(caption !== ''){
      addAnAssetConfig.caption = caption;
    }

    if(altText !== ''){
      addAnAssetConfig.altText = altText;
    }

    if(copyrtInfo !== ''){
      addAnAssetConfig.copyrtInfo = copyrtInfo;
    }

    if(pafID !== ''){
      addAnAssetConfig.pafID = pafID;
    }

    //libConfig.alfToken = document.getElementById('alfToken').value;
    libConfig.alfuname = document.getElementById('alfuname').value;
    libConfig.alfpwd = document.getElementById('alfpwd').value;
    libConfig.nodeRef = document.getElementById('nodeRef').value;
    libConfig.tabVisibility = document.getElementById('tabVisibility').value;
    libConfig.headers['X-PearsonSSOSession'] = document.getElementById('sessionKeyId').value;
    //libConfig.imagesPath = document.getElementById('imagesPath').value;
    addAnAssetConfig.nodeRef = document.getElementById('nodeRef').value;
    libConfig.alfserver = document.getElementById('repoInst').value;
    libConfig.repoName = document.getElementById('repoName').value;
    libConfig['cmis'] = document.getElementById('workURN').value;
    
    patternsLib.setup(libConfig);

    try {
        addAnAsset.setup(addAnAssetConfig, addAnAsset);
        addAnAsset.run();

        addAnAsset.on(AddanAssetCallBack);

    } catch (ex1)
    {
        alert(ex1.message);
    }


}

document.getElementById('EpsContainer').style.visibility= 'hidden';
var AddanAssetCallBack = function (data){ 
  //console.log(data);  
  //data.url = _.replace(data.url,'/thumbnails/',''); 
   
   var uniqueID = data.nodeRef.split('/')[3];
   var assetType = data.mimetype.split('/')[0];

   data['uniqueID'] = uniqueID;
   data['assetType'] = assetType;
   
   if(data['assetType'] == 'image'){
      var img = new Image();
      img.addEventListener("load", function(){            
      data['thumbnail_height'] = this.height;
      data['thumbnail_width'] =  this.width;      
    });

    img.src = data.url;
   }   

   document.getElementById('questionStemImg').setAttribute('src',data.url);
   if(data.EpsUrl){
    //document.getElementById('epsUrlImg').setAttribute('src',data.EpsUrl);
  document.getElementById('EpsContainer').style.visibility= 'visible';
  document.getElementById('EpsUrl').setAttribute('href',data.EpsUrl);
  }else{
    document.getElementById('EpsContainer').style.visibility= 'hidden';
  }
   
   var ele = document.getElementById('addAnAssetCBResp');


   var content ='<table class="addAnAssetTable">';
    for (var key in data) {
      if (data.hasOwnProperty(key) && (key == 'wURN'  || key == 'mURN' || key == 'creationDate')) {                             
           var property = '<tr><td class="addAnAssetTd">'+key+'</td><td class="addAnAssetTd">'+data[key]+'</td></tr>';  
            content =  content+property;          
      }
    }
    content =content+'</table>';
    ele.innerHTML = content;
}

///______________________________________________________________
/*var patAssesment2 = patternsLib.create(patternsLib.type.ASSESMENT);

// Define a configuration for pattern instance
var patAssesmentConfig1 =  {selector : '#comp2'};

// Define a callback which will receive results back from the pattern instance
var cbAssesment1 = (data) => {
    // data is a JSON structure returned back from the pattern instance

    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('compResp2');
    e.innerHTML = JSON.stringify(data);
};

// Setup the instance using configuraton and callback
patAssesment2.setup(patAssesmentConfig1, cbAssesment1);

// Run the render method, processess user interactions and do teardown when finished
patAssesment2.run();*/


///______________________________________________________________

function toggle() {
  var ele = document.getElementById("assesmentResp");
  var text = document.getElementById("display1");
  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "show";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "hide";
  }
}

function toggle2() {
  var ele = document.getElementById("compResp");
  var text = document.getElementById("display2");
  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "show";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "hide";
  }
}

function toggle3() {
  var ele = document.getElementById("questionResp");
  var text = document.getElementById("display3");
  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "show";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "hide";
  }
}

function toggle4() {
  var ele = document.getElementById("questionCompResp");
  var text = document.getElementById("display4");
  if(ele.style.display == "block") {
    ele.style.display = "none";
    text.innerHTML = "show";
  }
  else {
    ele.style.display = "block";
    text.innerHTML = "hide";
  }
}


/*var SaveCallBack1 = function (data) {
    // channel data is a JSON structure
    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('questionResp');
    var content ='<div>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var property = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data[key]+'</span></p>';
        if(typeof(data[key]) === 'string'){
          content =  content+property;
        }
      }
    }
    content =content+'</div>';
    e.innerHTML = content;
};*/

var SaveCallBack1 = function (data) {
    // channel data is a JSON structure
    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('questionResp');
    var content ='<div>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var property = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data[key]+'</span></p>';
        if(typeof(data[key]) === 'string'){
          content =  content+property;
        }else if(typeof(data[key]) === 'object'){
          if(key === 'keywords' || key === 'goalKeywords'){
            var keyArr = [];
            for(i=0;i<data[key].length;i++){
              keyArr.push(data[key][i].name);
            }
          var keyProperty = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+keyArr+'</span></p>';
          content =  content+keyProperty;
          }
        }
      }
    }
    content =content+'</div>';
    e.innerHTML = content;
};


var patQuestion;


onSaveQuestion = function(quesName){
  var name = document.getElementById(quesName).value;
  patQuestion.fire({"id":"bbb","name": name});
}


onLaunchQuestion= function(quesName,uuidTagid,questionPlanidTargid,
  questionPublisherTarg,questionISBNid,questionModuleNoid,questionChapterNoid,
  questionBookAuthorid,
  questionCopyRightid,quesObjAlignTarid,quesSkillsTarid,apiKeyTarId,sessionKeyTarId,
  renderderedTagSelector,type,environment){
var name = document.getElementById(quesName).value;
var uuid = document.getElementById(uuidTagid).value;
var planidTargid = document.getElementById(questionPlanidTargid).value;
//var fileNameTargid = document.getElementById(questionFileNameTargid).value
var publisherTargid = document.getElementById(questionPublisherTarg).value
var isbnId = document.getElementById(questionISBNid).value
var moduleNoid = document.getElementById(questionModuleNoid).value
var ChapterNoid = document.getElementById(questionChapterNoid).value
var bookAuthorid = document.getElementById(questionBookAuthorid).value
var copyRightid = document.getElementById(questionCopyRightid).value
var objAlignid = document.getElementById(quesObjAlignTarid).value
var skillsTarid = document.getElementById(quesSkillsTarid).value
var apiKeyId = document.getElementById(apiKeyTarId).value;
var sessionKeyId = document.getElementById(sessionKeyTarId).value;
var typeId = type;
/*var qConType = document.getElementsByName(QuesContentTypeid)[0];
var quesContentType = qConType.options[qConType.selectedIndex].value;*/

if(patQuestion && patQuestion.unmount){
  patQuestion.unmount();
}

libConfig.headers['x-apikey'] = apiKeyId;
libConfig.headers['X-PearsonSSOSession'] = sessionKeyId;
/*if(libConfig.server === 'https://staging.data.pearson.com'){
  delete libConfig.headers['X-Roles-Test']; 
}*/
patternsLib.setup(libConfig);

patQuestion= patternsLib.create(type);
// uuid: '9f7a14d1-5135-42f6-8307-2907e561bcc8',
// Define a configuration for pattern instance
//var patQuestionConfig =  {selector : '#questionComp',uuid: '5c5ba452-0122-4569-a8cb-f9e99cd9a03a'};
//var patQuestionConfig =  {selector : '#questionComp',uuid: 'b2e1113d-410e-4a24-86f9-35cf69f65732'};
var patQuestionConfig =  {selector : renderderedTagSelector,env: environment};
if(name!==''){
  patQuestionConfig.name = name;
}
if(renderderedTagSelector!=='' && renderderedTagSelector==='#questionComp'){
  patQuestionConfig.metadataType = 'QuestionMetadata';
}
if(uuid!==''){
    patQuestionConfig.uuid = uuid;
}
if(planidTargid!==''){
    patQuestionConfig.planId = planidTargid;
}
/*if(fileNameTargid!==''){
    patQuestionConfig.filename = fileNameTargid;
}*/
if(publisherTargid!==''){
    patQuestionConfig.publisher = publisherTargid;
}
if(isbnId!==''){
    patQuestionConfig.isbn = isbnId;
}
if(moduleNoid!==''){
    patQuestionConfig.modNo = moduleNoid;
}
if(ChapterNoid!==''){
    patQuestionConfig.chapNo = ChapterNoid;
}
if(bookAuthorid!==''){
    patQuestionConfig.author = bookAuthorid;
}
if(copyRightid!==''){
    patQuestionConfig.copyrightInfo = copyRightid;
}
/*if(quesContentType!==''){
    patQuestionConfig.contentType = quesContentType;
}*/
if(objAlignid!==''){
  patQuestionConfig.objAlign = objAlignid;
}
if(skillsTarid!==''){
var comma = ',';
//var skills = splitString(skillsId, comma);
patQuestionConfig.goalKeywords = splitString(skillsTarid, comma);
}


//var patAssesmentConfig =  {selector : '#comp'};

// Define a callback which will receive results back from the pattern instance
var cbQuestion = function (data) {

    // data is a JSON structure returned back from the pattern instance
    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('questionCompResp');
    //e.innerHTML = String(data);
    var metadataContent ='<table>';
    for (var key in data) {
      if (data.hasOwnProperty(key) && typeof(data[key]) === 'object' && data[key].hasOwnProperty('value')) {
        var property = '<tr><td class="uppercase">'+key+'</td><td>'+data[key].value+'</td></tr>';
        if(typeof(data[key].value) === 'string'){
          metadataContent =  metadataContent+property;
        }else if(typeof(data[key].value) === 'object'){
          if(key === 'keywords' || key === 'goalKeywords'){
              var tags = data[key].value;
              var keyArr = [];
              for(i=0;i<tags.length;i++){
                  keyArr.push(tags[i].name);
              }
          var keyProperty = '<tr><td class="uppercase">'+key+'</td><td>'+keyArr+'</td></tr>';
          metadataContent =  metadataContent+keyProperty;
          }else if(key === 'audience' || key === 'discipline'){
            var selectedValue = data[key].value.toString();
            var selectedProperty = '<tr><td class="uppercase">'+key+'</td><td>'+selectedValue+'</td></tr>';
            metadataContent =  metadataContent+selectedProperty;
          }
        }
      }
    }
    metadataContent =metadataContent+'</table>';
    e.innerHTML = metadataContent;

};

// Setup the instance using configuraton and callback
patQuestion.setup(patQuestionConfig, cbQuestion);

// Run the render method, processess user interactions and do teardown when finished
patQuestion.run();


patQuestion.on(SaveCallBack1);
//patButton.off();

}

//_________________________________________________________________________________________
/*var SaveCallBackBank = function (data) {
    // channel data is a JSON structure
    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('bankResp');
    var content ='<div>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var property = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data[key]+'</span></p>';
        if(typeof(data[key]) === 'string'){
          content =  content+property;
        }
      }
    }
    content =content+'</div>';
    e.innerHTML = content;
};*/

var SaveCallBackBank = function (data) {
    // channel data is a JSON structure
    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('bankResp');
    var content ='<div>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var property = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data[key]+'</span></p>';
        if(typeof(data[key]) === 'string'){
          content =  content+property;
        }else if(typeof(data[key]) === 'object'){
          if(key === 'keywords' || key === 'goalKeywords'){
            var keyArr = [];
            for(i=0;i<data[key].length;i++){
              keyArr.push(data[key][i].name);
            }
          var keyProperty = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+keyArr+'</span></p>';
          content =  content+keyProperty;
          }
        }
      }
    }
    content =content+'</div>';
    e.innerHTML = content;
};

var patBank;


onSaveBank = function(bankName){
  var name = document.getElementById(bankName).value;
  patBank.fire({"id":"bbb","name": name});
}


onLaunchBank= function(bankName,bankuuidTagid,bankPlanidTargid,
  bankPublisherTarg,bankISBNid,bankModuleNoid,bankChapterNoid,
  bankBookAuthorid,
  bankCopyRightid,bankObjAlignTarid,bankSkillsTarid,
  bankapiKeyTarId,banksessionKeyTarId,renderderedTagSelector,type,environment){
var name = document.getElementById(bankName).value;
var uuid = document.getElementById(bankuuidTagid).value;
var planidTargid = document.getElementById(bankPlanidTargid).value;
//var fileNameTargid = document.getElementById(bankFileNameTargid).value
var publisherTargid = document.getElementById(bankPublisherTarg).value
var isbnId = document.getElementById(bankISBNid).value
var moduleNoid = document.getElementById(bankModuleNoid).value
var ChapterNoid = document.getElementById(bankChapterNoid).value
var bookAuthorid = document.getElementById(bankBookAuthorid).value
var copyRightid = document.getElementById(bankCopyRightid).value
var objAlignId = document.getElementById(bankObjAlignTarid).value
var skillsId = document.getElementById(bankSkillsTarid).value
var apiKeyId = document.getElementById(bankapiKeyTarId).value;
var sessionKeyId = document.getElementById(banksessionKeyTarId).value;
var typeId = type;
/*var qConType = document.getElementsByName(bankContentTypeid)[0];
var bankContentType = qConType.options[qConType.selectedIndex].value;
*/
if(patBank && patBank.unmount){
  patBank.unmount();
}

libConfig.headers['x-apikey'] = apiKeyId;
libConfig.headers['X-PearsonSSOSession'] = sessionKeyId;
/*if(libConfig.server === 'https://staging.data.pearson.com'){
  delete libConfig.headers['X-Roles-Test']; 
}*/
patternsLib.setup(libConfig);

patBank= patternsLib.create(type);
// uuid: '9f7a14d1-5135-42f6-8307-2907e561bcc8',
// Define a configuration for pattern instance
//var patQuestionConfig =  {selector : '#questionComp',uuid: '5c5ba452-0122-4569-a8cb-f9e99cd9a03a'};
//var patQuestionConfig =  {selector : '#questionComp',uuid: 'b2e1113d-410e-4a24-86f9-35cf69f65732'};
var patBankConfig =  {selector : renderderedTagSelector, env: environment};
if(name!==''){
  patBankConfig.name = name;
}
if(renderderedTagSelector!=='' && renderderedTagSelector === '#bankComp'){
  patBankConfig.metadataType = 'BankMetadata';
}
if(uuid!==''){
    patBankConfig.uuid = uuid;
}
if(planidTargid!==''){
    patBankConfig.planId = planidTargid;
}
/*if(fileNameTargid!==''){
    patBankConfig.filename = fileNameTargid;
}*/
if(publisherTargid!==''){
    patBankConfig.publisher = publisherTargid;
}
if(isbnId!==''){
    patBankConfig.isbn = isbnId;
}
if(moduleNoid!==''){
    patBankConfig.modNo = moduleNoid;
}
if(ChapterNoid!==''){
    patBankConfig.chapNo = ChapterNoid;
}
if(bookAuthorid!==''){
    patBankConfig.author = bookAuthorid;
}
if(copyRightid!==''){
    patBankConfig.copyrightInfo = copyRightid;
}
/*if(bankContentType!==''){
    patBankConfig.contentType = bankContentType;
}*/
if(objAlignId!==''){
  patBankConfig.objAlign = objAlignId;
}
if(skillsId!==''){
var comma = ',';
//var skills = splitString(skillsId, comma);
patBankConfig.goalKeywords = splitString(skillsId, comma);
}


//var patAssesmentConfig =  {selector : '#comp'};

// Define a callback which will receive results back from the pattern instance
var cbBank = function (data) {

    // data is a JSON structure returned back from the pattern instance
    // Here we are just displaying the stringified version of JSON structure
    var e = document.getElementById('bankCompResp');
    //e.innerHTML = String(data);
    var metadataContent ='<table>';
    for (var key in data) {
      if (data.hasOwnProperty(key) && typeof(data[key]) === 'object' && data[key].hasOwnProperty('value')) {
        var property = '<tr><td class="uppercase">'+key+'</td><td>'+data[key].value+'</td></tr>';
        if(typeof(data[key].value) === 'string'){
          metadataContent =  metadataContent+property;
        }else if(typeof(data[key].value) === 'object'){
          if(key === 'keywords' || key === 'goalKeywords'){
              var tags = data[key].value;
              var keyArr = [];
              for(i=0;i<tags.length;i++){
                  keyArr.push(tags[i].name);
              }
          var keyProperty = '<tr><td class="uppercase">'+key+'</td><td>'+keyArr+'</td></tr>';
          metadataContent =  metadataContent+keyProperty;
          }else if(key === 'audience' || key === 'discipline'){
            var selectedValue = data[key].value.toString();
            var selectedProperty = '<tr><td class="uppercase">'+key+'</td><td>'+selectedValue+'</td></tr>';
            metadataContent =  metadataContent+selectedProperty;
          }
        }
      }
    }
    metadataContent =metadataContent+'</table>';
    e.innerHTML = metadataContent;

};

// Setup the instance using configuraton and callback
patBank.setup(patBankConfig, cbBank);

// Run the render method, processess user interactions and do teardown when finished
patBank.run();


patBank.on(SaveCallBackBank);
//patButton.off();

}

onLaunchReviewAsset = function (renderderedTagSelector, type, uuid,
                               caption, altText, copyrtInfo) {

    var reviewAssetConfig =  {'selector' : renderderedTagSelector};

    if(reviewAsset && reviewAsset.unmount){
      reviewAsset.unmount();
    }

    uuid = document.getElementById(uuid).value;
    caption = document.getElementById(caption).value;
    altText = document.getElementById(altText).value;
    copyrtInfo = document.getElementById(copyrtInfo).value;

    if(uuid !== ''){
      reviewAssetConfig.uuid = uuid;
    }

    if(caption !== ''){
      reviewAssetConfig.caption = caption;
    }

    if(altText !== ''){
      reviewAssetConfig.altText = altText;
    }

    if(copyrtInfo !== ''){
      reviewAssetConfig.copyrtInfo = copyrtInfo;
    }


    reviewAsset = patternsLib.create(type);

    reviewAsset.setup(reviewAssetConfig, reviewAsset);

    reviewAsset.run();
}


//document.getElementById('questionStemImg').setAttribute('src',location.origin + '/images/default-thumbnail.gif');

var _productLink;

document.getElementById("productLinkClk").addEventListener("click", function(event){
 
var _productLinkConfig = {'selector' : '#productLink'};
/*_productLinkConfig.repoList = [   
    { 'repo' : 'https://staging.api.pearson.com/content/cmis/ukwip', 'repoName' : 'UK'},    
    { 'repo' : 'https://staging.api.pearson.com/content/cmis/ukwip', 'repoName' : 'US East'},   
    { 'repo' : 'https://staging.api.pearson.com/content/cmis/uswip', 'repoName' : 'US East1'}   
    ]*/
var list = document.getElementById('repoInput').value;
_productLinkConfig.repoList = JSON.parse(list);

var _productLinkCallBack = function(data) { 
  //console.log(data)
};

var _productLinkOnsaveCallBack = function(data) { 
    console.log(data);

    var ele = document.getElementById('ProductLinkCallBackResp');
    var content ='<table>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {                             
           var property = '<tr><td class="uppercase">'+key+'</td><td>'+data[key]+'</td></tr>';  
            content =  content+property;          
      }
    }
    content =content+'</table>';
    ele.innerHTML = content;
    document.getElementById('repoInst').value = data.repoInstance;    
    document.getElementById('repoName').value = data.repoName;    
    document.getElementById('nodeRef').value = data.nodeRef;

};

if(_productLink && _productLink.unmount){
  _productLink.unmount();
}

_productLink = patternsLib.create('ProductLink');

    //libConfig.alfToken = document.getElementById('alfToken').value;
    libConfig.alfuname = document.getElementById('alfuname').value;
    libConfig.alfpwd = document.getElementById('alfpwd').value;
    libConfig.nodeRef = document.getElementById('nodeRef').value;    
    libConfig.headers['X-PearsonSSOSession'] = document.getElementById('sessionKeyId').value;
    patternsLib.setup(libConfig);

_productLink.setup(_productLinkConfig, _productLinkCallBack);

_productLink.run();
_productLink.on(_productLinkOnsaveCallBack);

    
},false);


var _interactivePattern;
document.getElementById("interactivePattern").addEventListener("click", function(event){ 

var searchAndSelectCallBack = function(data) {  
  //console.log(data)
    var ele = document.getElementById('interactivePatternResponse');
    var content ='<table>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {                             
           var property = '<tr><td class="uppercase">'+key+'</td><td>'+data[key]+'</td></tr>';  
            content =  content+property;          
      }
    }
    content =content+'</table>';
    ele.innerHTML = content;
};

var searchAndSelectonSave = function(data) { 
  //console.log(data)
  
  console.log(data);
    var ele = document.getElementById('interactivePatternResponse');
    var content ='<table>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {                             
           var property = '<tr><td class="uppercase">'+key+'</td><td>'+data[key]+'</td></tr>';  
            content =  content+property;          
      }
    }
    content =content+'</table>';
    ele.innerHTML = content;
};

var checkboxes = document.getElementsByName('filterType');

var vals = "";
for (var i=0, n=checkboxes.length;i<n;i++) {
  if (checkboxes[i].checked) {
    vals += ","+checkboxes[i].value;
  }
}
console.log(vals);

if (vals) vals = vals.substring(1);
  console.log(vals);
if(vals != ''){
  console.log(vals.split(','));
  vals = vals.split(',');
}


var _interactivePatternConfig = {'selector' : '#interactivePatternSelector'};

  if(_interactivePattern && _interactivePattern.unmount){
    _interactivePattern.unmount();
  }
 
 debugger;
_interactivePatternConfig.filename = document.getElementById('c5filename').value;
_interactivePatternConfig.filterType = vals;


_interactivePattern = patternsLib.create('interactivePattern');
libConfig.alfuname = document.getElementById('alfuname').value;
libConfig.alfpwd = document.getElementById('alfpwd').value;
libConfig.headers['X-PearsonSSOSession'] = document.getElementById('sessionKeyId').value;
libConfig.headers['x-apikey'] = document.getElementById('apiKeyId').value;

  

patternsLib.setup(libConfig);

_interactivePattern.setup(_interactivePatternConfig, searchAndSelectCallBack);
_interactivePattern.run();
_interactivePattern.on(searchAndSelectonSave);

}, false);



