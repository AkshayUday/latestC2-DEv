import MVMConstants from '../../../PatternBank/js/constants/MVMConstants';
import metadatareducers from '../../../PatternBank/js/reducers/metadatareducers'
import * as actions from '../../../PatternBank/js/action/MetadataAction'
import expect from 'expect'

describe('Bank Level Metadata reducers', () => {


const initilizeValues = [{
  uuid : '' ,
  filename:'',
  name:'',
  urn:'',
  objAlign:'',
  publisher:'',
  planId: '',
  modNo:'',
  chapNo:'',
  author:'',
  contentTypeData: [],
  audienceRolesData: [],
  difficultyLevelData: [],
  knowledgeLevelData: [],
  alignmentTypeData: [],
  disciplineData: [],
  goalAlignmentData: [],
  languages: [],
  timeReq:'' ,
  isbn: '',
  desc:'',
  keywords: [],
  prodKeywords: [],
  goalKeywords: [],
  //product:'',
  hours: '',
  mins: '',
  secs: '',
  eTag:'',
  errMsg:'',
  copyrightInfo: '',
  onloadValue:{}
}]

before('before creating ', function() {

  this.QMD_Data= {
  "uuid" : '' ,  
  "filename":"test",
  "name":"rr",
  "urn" : "",
  "contentType":"Journal",
  "audience":"Professor",
  "difficultyLevel":"Medium",
  "alignType":"Align Type 2",
  "knowledgeLevel":"Practioner",
  "discipline":"Discipline 1",
  "goalAlignment":"Goal 1",
  "timeReq":"",
  "planId":"",
  "enabObj":"",
  "hours":"00",
  "mins":"00",
  "secs":"00",
  "copyrightInfo": "test",
 "audienceRolesData":[{"value":0,"text":"Choose audience role"},
                    {"value":5,"text":"Student"},
                    {"value":6,"text":"Journalist"},
                    {"value":7,"text":"Professor"},
                    {"value":8,"text":"Professionals"}
    ],
    "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
    ],
    "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
    ],
     "goalKeywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }],
    "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]
}

 });

it('should handle initial state', () => {

      let ret = metadatareducers(undefined,{});
      //expect(ret).toEqual(initilizeValues);

     });

it('should handle SAVE_METADATA', () => {
let values={
  "filename":"test",
  "name":"rr",
  "urn" : "",
  "audience":"Professor",
  "difficultyLevel":"Medium",
  "discipline":"Discipline 1",
  "timeReq":"",
  "planId":"",
  "enabObj":"",
  "hours":"00",
  "mins":"01",
  "secs":"02",
  "copyrightInfo": "test",
  "audienceRolesData":[{"value":0,"text":"Choose audience role"},
                    {"value":5,"text":"Student"},
                    {"value":6,"text":"Journalist"},
                    {"value":7,"text":"Professor"},
                    {"value":8,"text":"Professionals"}
  ],
  "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
  ],
  "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
  ],
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]
};


let nextState = metadatareducers([{}], {
    type:MVMConstants.SAVE_METADATA,
    values:values
});

expect(nextState[0]).toEqual({
  audience: 'Professor', 
audienceRolesData: 
  [  { text: 'Choose audience role', value: 0 }, 
     { text: 'Student', value: 5 }, 
     { text: 'Journalist', value: 6 }, 
     { text: 'Professor', value: 7 }, 
     { text: 'Professionals', value: 8 } 
  ], 
copyrightInfo: 'test', 
difficultyLevel: 'Medium', 
difficultyLevelData: 
  [   { id: 0, text: 'Choose difficulty level' }, 
    { text: 'Easy', value: 15 }, 
    { text: 'Moderate', value: 16 }, 
    { text: 'Difficult', value: 17 } 
  ], 
discipline: 'Discipline 1', 
disciplineData: 
  [   { id: 0, text: 'Choose one or more disciplines' }, 
    { text: 'Discipline 1', value: 25 }, 
    { text: 'Discipline 2', value: 26 } 
  ], 
enabObj: '', 
filename: 'test', 
hours: '00', 
keywords: 
  [   { id: '1', name: 'Whitman' }, 
    { id: '2', name: 'Dickinson' } 
  ], 
mins: '01', 
name: 'rr', 
planId: '', 
secs: '02', 
timeReq: '', 
urn: '' 
});

});

it('should handle METADATA_GET', () => {

let QMD_Data={
  "filename":"test",
  "name":"rr",
  "urn" : "",
  "audience":"Professor",
  "difficultyLevel":"Medium",
  "discipline":"Discipline 1",
  "timeReq":"",
  "planId":"",
  "enabObj":"",
  "hours":"00",
  "mins":"00",
  "secs":"00",
  "copyrightInfo": "test",
  "audienceRolesData":[{"value":0,"text":"Choose audience role"},
                    {"value":5,"text":"Student"},
                    {"value":6,"text":"Journalist"},
                    {"value":7,"text":"Professor"},
                    {"value":8,"text":"Professionals"}
  ],
  "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
  ],
  "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
  ],
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]
}


 let nextState = metadatareducers([{}], {
        type:MVMConstants.METADATA_GET,
        QMD_Data:QMD_Data
       });

  expect(nextState[0]).toEqual({
 "filename":"test",
  "name":"rr",
  "urn" : "",
  "audience":"Professor",
  "difficultyLevel":"Medium",
  "discipline":"Discipline 1",
  "timeReq":"",
  "planId":"",
  "enabObj":"",
  "hours":"00",
  "mins":"00",
  "secs":"00",
  "copyrightInfo": "test",
  "audienceRolesData":[{"value":0,"text":"Choose audience role"},
                    {"value":5,"text":"Student"},
                    {"value":6,"text":"Journalist"},
                    {"value":7,"text":"Professor"},
                    {"value":8,"text":"Professionals"}
  ],
  "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
  ],
  "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
  ],
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]
});

});

it('should handle SET_ON_LOAD_VALUE', () => {

let data={

  "filename":"test",
  "name":"rr",
  "urn" : "",
  "audience":"Professor",
  "difficultyLevel":"Medium",
  "discipline":"Discipline 1",
  "timeReq":"",
  "planId":"",
  "enabObj":"",
  "hours":"00",
  "mins":"00",
  "secs":"00",
  "copyrightInfo": "test",
  "audienceRolesData":[{"value":0,"text":"Choose audience role"},
                    {"value":5,"text":"Student"},
                    {"value":6,"text":"Journalist"},
                    {"value":7,"text":"Professor"},
                    {"value":8,"text":"Professionals"}
  ],
  "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
  ],
  "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
  ],
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]

}

let nextState = metadatareducers(initilizeValues, {
    type:'SET_ON_LOAD_VALUE',
    data:data
});

expect(nextState[0]).toEqual({
  alignmentTypeData: [], 
audienceRolesData: [], 
author: '', 
chapNo: '', 
contentTypeData: [], 
copyrightInfo: '', 
desc: '', 
difficultyLevelData: [], 
disciplineData: [], 
eTag: '', 
errMsg: '',
filename: '', 
goalAlignmentData: [], 
goalKeywords: [], 
hours: '', 
isbn: '', 
keywords: [], 
knowledgeLevelData: [], 
languages: [], 
mins: '', 
modNo: '', 
name: '', 
objAlign: '', 
onloadValue: { 
  audience: 'Professor', 
  audienceRolesData: [ 
    { text: 'Choose audience role', value: 0 }, 
    { text: 'Student', value: 5 }, 
    { text: 'Journalist', value: 6 }, 
    { text: 'Professor', value: 7 }, 
    { text: 'Professionals', value: 8 } 
  ], 
  copyrightInfo: 'test', 
  difficultyLevel: 'Medium', 
  difficultyLevelData: [ 
    { id: 0, text: 'Choose difficulty level' }, 
    { text: 'Easy', value: 15 }, 
    { text: 'Moderate', value: 16 }, 
    { text: 'Difficult', value: 17 } 
  ], 
  discipline: 'Discipline 1', 
  disciplineData: [ 
    { id: 0, text: 'Choose one or more disciplines' }, 
    { text: 'Discipline 1', value: 25 }, 
    { text: 'Discipline 2', value: 26 } 
  ], 
  enabObj: '', 
  filename: 'test', 
  hours: '00', 
  keywords: [ 
    { id: '1', name: 'Whitman' }, 
    { id: '2', name: 'Dickinson' } 
  ], 
  mins: '00', 
  name: 'rr', 
  planId: '', 
  secs: '00', 
  timeReq: '', 
  urn: '' 
}, 
planId: '', 
prodKeywords: [], 
publisher: '', 
secs: '', 
timeReq: '', 
urn: '', 
uuid: '' 
});
  
});

it('should handle SET_UUID', () => {

let data={

  "filename":"test",
  "name":"rr",
  "urn" : "",
  "audience":"Professor",
  "difficultyLevel":"Medium",
  "discipline":"Discipline 1",
  "timeReq":"",
  "planId":"",
  "enabObj":"",
  "hours":"00",
  "mins":"00",
  "secs":"00",
  "copyrightInfo": "test",
  "audienceRolesData":[{"value":0,"text":"Choose audience role"},
                    {"value":5,"text":"Student"},
                    {"value":6,"text":"Journalist"},
                    {"value":7,"text":"Professor"},
                    {"value":8,"text":"Professionals"}
  ],
  "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
  ],
  "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
  ],
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]

}

let nextState = metadatareducers([{}], {
    type:MVMConstants.SET_UUID,
    QMD_Data:data
});

expect(nextState[0]).toEqual({

  "filename":"test",
  "name":"rr",
  "urn" : "",
  "audience":"Professor",
  "difficultyLevel":"Medium",
  "discipline":"Discipline 1",
  "timeReq":"",
  "planId":"",
  "enabObj":"",
  "hours":"00",
  "mins":"00",
  "secs":"00",
  "copyrightInfo": "test",
  "audienceRolesData":[{"value":0,"text":"Choose audience role"},
                    {"value":5,"text":"Student"},
                    {"value":6,"text":"Journalist"},
                    {"value":7,"text":"Professor"},
                    {"value":8,"text":"Professionals"}
  ],
  "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
  ],
  "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
  ],
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]
    
});
  
});

it('should handle UPDATE_TAG', () => {

let data={
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]
}

let nextState = metadatareducers([{}], {
    type:'UPDATE_TAG',
    Keyword_Data:data
});

expect(nextState[0]).toEqual({
  "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }]
    
});
  
});

});

