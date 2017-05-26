var patternBroker = this.PatternBroker.default;
var patternAssessment = this.PatternAssessment.default;
var patternBank = this.PatternBank.default;
var patternQuestion = this.PatternQuestion.default;
var patternProductLink = this.PatternProductLink.default;
var patternAddAnAsset = this.PatternAddAnAsset.default;
var PatternSearchSelect =this.PatternSearchSelect.default;

var libConfig = {
    'locale': 'en_US',

    'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/ld+json',
        'Prefer': 'annotation=true'
    },
    'database': '?db=qa2',
    'server': 'https://staging.data.pearson.com',
    'taxonomyserver': 'https://staging.schema.pearson.com',
    'port': '80',
};

var c5filterTypeData = function() {
    var _token = document.getElementById('sessionKeyId').value;
    var _api = document.getElementById('apiKeyId').value;
    var xmlhttp = new XMLHttpRequest();
    var taxurl = libConfig['taxonomyserver'] + '/ns/taxonomictype/interactives';

    xmlhttp.onreadystatechange = function() {

      console.log(xmlhttp);

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('c5filterType').innerHTML = '';
            var response = JSON.parse(xmlhttp.response);
            console.log(response);

            var results = response.narrower.map((data, key, list) => {

                if (list[key]['prefLabel'] != undefined) {
                    return {
                        display: list[key]['prefLabel']['en'],
                        property: list[key]['id']
                    }
                } else {
                    return {
                        display: list[key].split('/')[5],
                        property: list[key]
                      }
                }
          });


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
      document.getElementById('c5filterType').innerHTML = 'loading ...';
      }

      
    };

    xmlhttp.open("GET", taxurl, true);
    xmlhttp.setRequestHeader("Accept", "application/ld+json");
    xmlhttp.setRequestHeader("x-apikey", _api);
    xmlhttp.setRequestHeader("Prefer", 'annotation=true');
    xmlhttp.setRequestHeader("X-PearsonSSOSession", _token)
    xmlhttp.send();    
}


document.getElementById('getFilterType').addEventListener( "click",c5filterTypeData.bind(),false)

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
    xmlhttp.setRequestHeader("X-OpenAM-Password", alfPwd);
    xmlhttp.send();
}

// ==+== ==+====+====+== PATTERN  ASSESSMENT ==+== ==+====+== ==+==  

var SaveCallBack = function (data) {
    var e = document.getElementById('assesmentResp');
    var content ='<div>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var property = '<p><span class="uppercase">'+key+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data[key]+'</span></p>';
        if(typeof(data[key]) === 'string'){
          content =  content+property;
        }
        if(typeof(data[key]) === 'boolean'&& key === 'adaptiveFlag'){
          content =  content+property;
        }
        else if(typeof(data[key]) === 'object'){
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

var patAssesment;
onSaveAssesment = function(astName){
 var name = document.getElementById(astName).value;
  patAssesment.fire({"id":"aaa","name":name});
}

onLaunchAssesment = function(astName,uuidTagid,planidTargid,
  publisherTargid,ISBNTargId,moduleNoTargId,chapterNoTargId,
  authorTargId,copyRightTargId,objAlignTarid,skillsTargid,
  adaptiveFlagTarId,apiKeyTarId,sessionKeyTarId,renderderedTagSelector,type,environment){
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
var adaptiveFlagId = document.getElementById(adaptiveFlagTarId).checked;
var typeId = type; 
/*var asConType = document.getElementsByName(assessContentTypeid)[0];
var asContentType = asConType.options[asConType.selectedIndex].value;*/

    if (patAssesment && patAssesment.unmount) {
        patAssesment.unmount();
    }

libConfig.headers['x-apikey'] = apiKeyId;
libConfig.headers['X-PearsonSSOSession'] = sessionKeyId;
patternBroker.setup(libConfig);

patAssesment = patternBroker.create(type, patternAssessment);

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
if(objAlignid!==''){
  patAssesmentConfig.objAlign = objAlignid;
}
if(skillsId!==''){
var comma = ',';
patAssesmentConfig.goalKeywords = splitString(skillsId, comma);
}
if(adaptiveFlagId!==''){
  patAssesmentConfig.adaptiveFlag = adaptiveFlagId;
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
        }else if(key === 'adaptiveFlag'&& typeof(data[key].value) === 'boolean'){
            var selectedProperty = '<tr><td class="uppercase">'+key+'</td><td>'+data[key].value+'</td></tr>';
            metadataContent =  metadataContent+selectedProperty;
        }
      }
    }
    metadataContent =metadataContent+'</table>';
    e.innerHTML = metadataContent;

};

// Setup the instance using configuraton and callback
patAssesment.setup(patAssesmentConfig, cbAssesment);

// Run the render method, processess user interactions and do teardown when finished
patAssesment.run(patAssesment);


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

// ==+== ==+====+====+== PATTERN ADD AN ASSET ==+== ==+====+== ==+== 
var addAnAsset;

onLaunchAddAnAsset = function (renderderedTagSelector, uuid,
                               PAFID,caption, altText, copyrtInfo,type) {
    var addAnAssetConfig =  {'selector' : renderderedTagSelector};
    
    if(addAnAsset && addAnAsset.unmount){
        addAnAsset.unmount();
    }
    
    addAnAsset = patternBroker.create(type, patternAddAnAsset);
    
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


    libConfig.alfuname = document.getElementById('alfuname').value;
    libConfig.alfpwd = document.getElementById('alfpwd').value;
    libConfig.headers['X-PearsonSSOSession'] = document.getElementById('sessionKeyId').value;
    libConfig.headers['x-apikey'] = document.getElementById('apiKeyId').value;
    libConfig.repoName = document.getElementById('repoName').value;
    addAnAssetConfig.nodeRef = document.getElementById('nodeRef').value;
    addAnAssetConfig.alfserver = document.getElementById('repoInst').value;
    addAnAssetConfig.tabVisibility = document.getElementById('tabVisibility').value;
    addAnAssetConfig['cmis'] = document.getElementById('workURN').value;
    addAnAssetConfig['epsserver'] = "https://us-school-stg.pearsoned.com/school";

    patternBroker.setup(libConfig);

     try{
     if ( (type==='AddAnAsset')  && (addAnAssetConfig.nodeRef === '') ) {
        
        throw new Error('Product is not linked.  Please provide a valid Product Id.');
        }else{
            addAnAsset.setup(addAnAssetConfig, addAnAsset);

            addAnAsset.run(addAnAsset);

            addAnAsset.on(AddanAssetCallBack);

        }
   }catch (ex1){     
        alert(ex1.message);
    }
}

document.getElementById('EpsContainer').style.visibility= 'hidden';
var AddanAssetCallBack = function (data){ 
    console.log('data---->', data);
    //data.url = _.replace(data.url,'/thumbnails/',''); 
    if(data.mimetype !== undefined && data.mimetype !== null){
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
    }
    
    document.getElementById('questionStemImg').setAttribute('src',data.url);
    if(data.EpsUrl){
        document.getElementById('EpsContainer').style.visibility= 'visible';
        document.getElementById('EpsUrl').setAttribute('href',data.EpsUrl);
    }
    else{
        document.getElementById('EpsContainer').style.visibility= 'hidden';
    }
    if(data.height || data.width || data['iptc:keywords'] || data['alt-text'] || data['dc: Description'] || data.wasDerivedFrom){
      document.getElementById('additionalPropertyContainer').style.visibility= 'visible';
      var element = document.getElementById('additionalPropertyBackResp');
      var contentData ='<table>';
      var propertyForNonEps;
      if (data.height) {
        propertyForNonEps = '<tr><td class="uppercase">height</td><td>'+data.height+'</td></tr>';
        contentData = contentData+propertyForNonEps;
      }
      if (data.width) {
        propertyForNonEps = '<tr><td class="uppercase">width</td><td>'+data.width+'</td></tr>';
        contentData = contentData+propertyForNonEps;
      }
      if (data['iptc:keywords']) {
        propertyForNonEps = '<tr><td class="uppercase">iptc:keywords</td><td>'+data['iptc:keywords']+'</td></tr>';
        contentData = contentData+propertyForNonEps;
      }
      if (data['alt-text']) {
        propertyForNonEps = '<tr><td class="uppercase">alt-text</td><td>'+data['alt-text']+'</td></tr>';
        contentData = contentData+propertyForNonEps;
      }
      if (data['dc: Description']) {
        propertyForNonEps = '<tr><td class="uppercase">iptc:keywords</td><td>'+data['dc: Description']+'</td></tr>';
        contentData = contentData+propertyForNonEps;
      }
      if (data.wasDerivedFrom) {
        propertyForNonEps = '<tr><td class="uppercase">wasDerivedFrom</td><td>'+data.wasDerivedFrom+'</td></tr>';
        contentData = contentData+propertyForNonEps;
      }
      contentData =contentData+'</table>';
      element.innerHTML = contentData;
    } else {
      document.getElementById('additionalPropertyContainer').style.visibility= 'hidden';
    }
    var ele = document.getElementById('addAnAssetCBResp');
    
    var content ='<table class="addAnAssetTable">';
    for (var key in data) {
      if (data.hasOwnProperty(key)) { 
            /*if(key==='results'){
              for(i=0;i<data[key].length;i++){
                var tempValue = data[key][i].properties['s.avs:url'].value;
                var property = '<tr><td class="addAnAssetTd">'+key+'</td><td class="addAnAssetTd">'+tempValue+'</td></tr>';  
                content =  content+property;
              }
            }else{
              var property = '<tr><td class="addAnAssetTd">'+key+'</td><td class="addAnAssetTd">'+data[key]+'</td></tr>';  
              content =  content+property;
            }*/
            if(data.desc.indexOf('smartLinkType') !== -1){
              if(key==='body'){
                var res = data.body.results;
                for(i=0;i<res.length;i++){
                    var urlObj = data.body.results[i].properties['s.avs:url'];
                    for(var objs in urlObj){
                      if(objs === 'value'){
                        var property = '<tr><td class="addAnAssetTd">'+objs+'</td><td class="addAnAssetTd"><a target=_blank href='+urlObj[objs]+'>'+urlObj[objs]+'</a></td></tr>';  
                        content =  content+property;
                      }else{
                        var property = '<tr><td class="addAnAssetTd">'+objs+'</td><td class="addAnAssetTd">'+urlObj[objs]+'</td></tr>';  
                        content =  content+property;
                      }
                    }
                    var jsonObj = data.body.results[i].properties['s.avs:jsonString'];
                    for(var objs in jsonObj){
                      var property = '<tr><td class="addAnAssetTd">'+objs+'</td><td class="addAnAssetTd">'+jsonObj[objs]+'</td></tr>';  
                      content =  content+property;
                    }
                    
                }
              }
            }else if(data.desc.indexOf('streamingMediaPackageType') !== -1){
              if(key==='body'){
                var res = data.body;
                for(var resKey in res){
                  if(resKey==='sourceAssetFile'){
                    var assetObj = res[resKey];
                    for(var assetKey in assetObj){
                      var property = '<tr><td class="addAnAssetTd">'+assetKey+'</td><td class="addAnAssetTd">'+assetObj[assetKey]+'</td></tr>';  
                      content =  content+property;
                    }
                  }else if(resKey === 'mediaId'){
                    var property = '<tr><td class="addAnAssetTd">'+resKey+'</td><td class="addAnAssetTd"><a target=_blank href='+res[resKey]+'>'+res[resKey]+'</a></td></tr>';  
                    content =  content+property;
                  }else{
                    var property = '<tr><td class="addAnAssetTd">'+resKey+'</td><td class="addAnAssetTd">'+res[resKey]+'</td></tr>';  
                    content =  content+property;
                  }
                }

              }
            }else if(data.hasOwnProperty(key) && (key == 'wURN'  || key == 'mURN' || key == 'creationDate')) {                             
              var property = '<tr><td class="addAnAssetTd">'+key+'</td><td class="addAnAssetTd">'+data[key]+'</td></tr>';  
              content =  content+property;          
          }
      }
    }
    content =content+'</table>';
    ele.innerHTML = content;
}

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
        }
        if(typeof(data[key]) === 'boolean'&& key === 'adaptiveFlag'){
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


// ==+== ==+== ==+== ==+==QUESTION ==+== ==+== ==+== ==+== 

var patQuestion;


onSaveQuestion = function(quesName){
  var name = document.getElementById(quesName).value;
  patQuestion.fire({"id":"bbb","name": name});
}

onLaunchQuestion= function(quesName,uuidTagid,questionPlanidTargid,
  questionPublisherTarg,questionISBNid,questionModuleNoid,questionChapterNoid,
  questionBookAuthorid,
  questionCopyRightid,quesObjAlignTarid,quesSkillsTarid,quesAdaptiveFlagTarId,apiKeyTarId,sessionKeyTarId,
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
var adaptiveFlagId = document.getElementById(quesAdaptiveFlagTarId).checked;
var sessionKeyId = document.getElementById(sessionKeyTarId).value;
var typeId = type;

if(patQuestion && patQuestion.unmount){
  patQuestion.unmount();
}

libConfig.headers['x-apikey'] = apiKeyId;
libConfig.headers['X-PearsonSSOSession'] = sessionKeyId;

patternBroker.setup(libConfig);

patQuestion= patternBroker.create(type,patternQuestion);

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
if(objAlignid!==''){
  patQuestionConfig.objAlign = objAlignid;
}
if(adaptiveFlagId!==''){
  patQuestionConfig.adaptiveFlag = adaptiveFlagId;
}
if(skillsTarid!==''){
var comma = ',';
patQuestionConfig.goalKeywords = splitString(skillsTarid, comma);
}

var cbQuestion = function (data) {

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
        }else if(key === 'adaptiveFlag' && typeof(data[key].value) === 'boolean'){
            var selectedProperty = '<tr><td class="uppercase">'+key+'</td><td>'+data[key].value+'</td></tr>';
            metadataContent =  metadataContent+selectedProperty;
        }
      }
    }
    metadataContent =metadataContent+'</table>';
    e.innerHTML = metadataContent;

};

// Setup the instance using configuraton and callback
patQuestion.setup(patQuestionConfig, cbQuestion);

// Run the render method, processess user interactions and do teardown when finished
patQuestion.run(patQuestion);


patQuestion.on(SaveCallBack1);
//patButton.off();

}

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

// ==+== ==+== ==+== ==+== Pattern Bank ==+== ==+== ==+== ==+== 
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

if(patBank && patBank.unmount){
  patBank.unmount();
}

libConfig.headers['x-apikey'] = apiKeyId;
libConfig.headers['X-PearsonSSOSession'] = sessionKeyId;

    patternBroker.setup(libConfig);

    patBank= patternBroker.create(type, patternBank);

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

if(objAlignId!==''){
  patBankConfig.objAlign = objAlignId;
}
if(skillsId!==''){
var comma = ',';

patBankConfig.goalKeywords = splitString(skillsId, comma);
}

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
patBank.run(patBank);


patBank.on(SaveCallBackBank);
//patButton.off();

}

// ==+== ==+====+== ==+== PATTERN REVIEW ASSET ==+== ==+====+== ==+==

onLaunchReviewAsset = function(renderderedTagSelector, type, uuid,
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


    reviewAsset = patternBroker.create(type, patternReviewAsset);
    
    reviewAsset.setup(reviewAssetConfig, reviewAsset);

    reviewAsset.run(reviewAsset);
}

// ==+== ==+== ==+== ==+== PATTERN PRODUCT LINKING ==+== ==+== ==+== ==+====+== ==+== 

var _productLink;

document.getElementById("productLinkClk").addEventListener("click", function(event){
 
var _productLinkConfig = {'selector' : '#productLink'};

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

    _productLink = patternBroker.create('ProductLink', patternProductLink);

    libConfig.alfuname = document.getElementById('alfuname').value;
    libConfig.alfpwd = document.getElementById('alfpwd').value;
    libConfig.headers['X-PearsonSSOSession'] = document.getElementById('sessionKeyId').value;
    libConfig.headers['x-apikey'] = document.getElementById('apiKeyId').value;
    patternBroker.setup(libConfig);

_productLink.setup(_productLinkConfig, _productLinkCallBack);

_productLink.run(_productLink);
_productLink.on(_productLinkOnsaveCallBack);


}, false);

// ==+== ==+====+== ==+==  PATTERN SEARCH SELECT ==+== ==+====+== ==+== 

var _interactivePattern;
document.getElementById("interactivePattern").addEventListener("click", function(event){ 

var searchAndSelectCallBack = function(data) {  
  //console.log(data)
    var ele = document.getElementById('interactivePatternResponse');
    var content ='<table>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {  
            if(key==='workExample'){
              var exampleUrl = 'https://'+data[key][0];
              var property = '<tr><td class="uppercase">'+key+'</td><td>'+exampleUrl+'</td></tr>';  
              content =  content+property;   
            } else{
              var property = '<tr><td class="uppercase">'+key+'</td><td>'+data[key]+'</td></tr>';  
              content =  content+property;   
            }       
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
 
 
_interactivePatternConfig.filename = document.getElementById('c5filename').value;
_interactivePatternConfig.filterType = vals;


_interactivePattern = patternBroker.create('interactivePattern',PatternSearchSelect);
libConfig.alfuname = document.getElementById('alfuname').value;
libConfig.alfpwd = document.getElementById('alfpwd').value;
libConfig.headers['X-PearsonSSOSession'] = document.getElementById('sessionKeyId').value;
libConfig.headers['x-apikey'] = document.getElementById('apiKeyId').value;
libConfig.userId = document.getElementById('alfuname').value;
  

patternBroker.setup(libConfig);

_interactivePattern.setup(_interactivePatternConfig, searchAndSelectCallBack);
_interactivePattern.run(_interactivePattern);
_interactivePattern.on(searchAndSelectonSave);

}, false);



