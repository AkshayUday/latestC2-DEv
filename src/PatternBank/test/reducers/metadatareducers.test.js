import MVMConstants from '../../js/constants/MVMConstants';
import metadatareducers from '../../js/reducers/metadatareducers'
import * as actions from '../../js/action/metadataAction'
import expect from 'expect'

describe('Question Level Metadata reducers', () => {


let initilizeValues = [{
        uuid : '' , 
        filename:'',
        name:'',
        urn:'',
        enabObj:'' ,
        planId: '',
        isbn: '',
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
        desc:'',
        keywords: [],
        product:'',
        hours: '',
        mins: '',
        secs: '',
        copyrightInfo: ''
}]

before('before creating ', function() {

  this.QMD_Data= {
  "filename":"test",
  "name":"rr",
  "product":"riy",
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
    "contentTypeData":[{"value":0,"text":"Choose a content type"},
        {"value":9,"text":"Narrative Text"},
        {"value":10,"text":"Video"},
        {"value":11,"text":"Audio"},
        {"value":12,"text":"Interactive"},
        {"value":13,"text":"Image"},
        {"value":14,"text":"Assessment item"}
    ],
    "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
    ],
    "knowledgeLevelData":[{"id":0,"text":"Choose knowledge level"},
        {"value":18,"text":"Expert"},
        {"value":19,"text":"Practioner"},
        {"value":20,"text":"Beginner"}
    ],
    "alignmentTypeData":[{"id":0,"text":"Choose publisher"},
        {"value":21,"text":"Align Type 1"},
        {"value":22,"text":"Align Type 2"},
        {"value":23,"text":"Align Type 3"},
        {"value":24,"text":"Align Type 4"}
    ],
    "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
    ],
    "goalAlignmentData":[{"id":0,"text":"Choose skill level"},
        {"value":27,"text":"Goal 1"},
        {"value":28,"text":"Goal 2"}
    ],
    "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }],
    "suggestions": [{
      "id": "3",
      "name": "English"
    }, {
      "id": "4",
      "name": "Poetry"
    }, {
      "id": "5",
      "name": "mathematics"
  }],
"languages":[{
    "name": "C",
    "year": "1972"
    }, {
    "name": "Elm",
    "year": "2012"
  },
  {
    "name": "Welcome",
    "year": "2015"
  }]
}

 });
it('should handle initial state', () => {

      let ret = metadatareducers(undefined,{});

      expect(ret).toEqual(initilizeValues);

     });

it('should handle SAVE_METADATA', () => {
let values={
  "status": "success",
  "tags": [{
    "id": 1,
    "name": "Whitman"
  }, {
    " id": 2,
    "name": "Dickinson"
  }],
  "suggestions": [{
    "id": 3,
    "name": "English"
  }, {
    "id": 4,
    "name": "Poetry"
  }, {
    "id": 5,
    "name": "mathematics"
  }]

};

let nextState = metadatareducers({}, {

type:MVMConstants.SAVE_METADATA,
  values:{
    "status": "success",
    "tags": [{
    "id": 1,
    "name": "Whitman"
  }, {
    " id": 2,
    "name": "Dickinson"
  }],
    "suggestions": [{
    "id": 3,
    "name": "English"
  }, {
    "id": 4,
    "name": "Poetry"
  }, {
    "id": 5,
    "name": "mathematics"
  }]

}

});

expect(nextState[0].tags).toEqual([{
    "id": 1,
    "name": "Whitman"
  }, {
    " id": 2,
    "name": "Dickinson"
  }]);

expect(nextState[0].suggestions).toEqual([{
    "id": 3,
    "name": "English"
  }, {
    "id": 4,
    "name": "Poetry"
  }, {
    "id": 5,
    "name": "mathematics"
  }]);

});

it('should handle METADATA_GET', () => {

	let QMD_Data={
  "filename":"test",
  "name":"rr",
  "product":"riy",
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
    "contentTypeData":[{"value":0,"text":"Choose a content type"},
        {"value":9,"text":"Narrative Text"},
        {"value":10,"text":"Video"},
        {"value":11,"text":"Audio"},
        {"value":12,"text":"Interactive"},
        {"value":13,"text":"Image"},
        {"value":14,"text":"Assessment item"}
    ],
    "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
    ],
    "knowledgeLevelData":[{"id":0,"text":"Choose knowledge level"},
        {"value":18,"text":"Expert"},
        {"value":19,"text":"Practioner"},
        {"value":20,"text":"Beginner"}
    ],
    "alignmentTypeData":[{"id":0,"text":"Choose publisher"},
        {"value":21,"text":"Align Type 1"},
        {"value":22,"text":"Align Type 2"},
        {"value":23,"text":"Align Type 3"},
        {"value":24,"text":"Align Type 4"}
    ],
    "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
    ],
    "goalAlignmentData":[{"id":0,"text":"Choose skill level"},
        {"value":27,"text":"Goal 1"},
        {"value":28,"text":"Goal 2"}
    ],
    "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }],
    "suggestions": [{
      "id": "3",
      "name": "English"
    }, {
      "id": "4",
      "name": "Poetry"
    }, {
      "id": "5",
      "name": "mathematics"
  }],
"languages":[{
    "name": "C",
    "year": "1972"
    }, {
    "name": "Elm",
    "year": "2012"
  },
  {
    "name": "Welcome",
    "year": "2015"
  }]
}


 let nextState = metadatareducers([{}], {
        type:MVMConstants.METADATA_GET,
        QMD_Data:QMD_Data
       });

  expect(nextState[0]).toEqual({
  "filename":"test",
  "name":"rr",
  "product":"riy",
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
    "contentTypeData":[{"value":0,"text":"Choose a content type"},
        {"value":9,"text":"Narrative Text"},
        {"value":10,"text":"Video"},
        {"value":11,"text":"Audio"},
        {"value":12,"text":"Interactive"},
        {"value":13,"text":"Image"},
        {"value":14,"text":"Assessment item"}
    ],
    "difficultyLevelData":[{"id":0,"text":"Choose difficulty level"},
        {"value":15,"text":"Easy"},
        {"value":16,"text":"Moderate"},
        {"value":17,"text":"Difficult"}
    ],
    "knowledgeLevelData":[{"id":0,"text":"Choose knowledge level"},
        {"value":18,"text":"Expert"},
        {"value":19,"text":"Practioner"},
        {"value":20,"text":"Beginner"}
    ],
    "alignmentTypeData":[{"id":0,"text":"Choose publisher"},
        {"value":21,"text":"Align Type 1"},
        {"value":22,"text":"Align Type 2"},
        {"value":23,"text":"Align Type 3"},
        {"value":24,"text":"Align Type 4"}
    ],
    "disciplineData":[{"id":0,"text":"Choose one or more disciplines"},
        {"value":25,"text":"Discipline 1"},
        {"value":26,"text":"Discipline 2"}
    ],
    "goalAlignmentData":[{"id":0,"text":"Choose skill level"},
        {"value":27,"text":"Goal 1"},
        {"value":28,"text":"Goal 2"}
    ],
    "keywords": [{
        "id": "1",
        "name": "Whitman"
    }, {
      "id": "2",
      "name": "Dickinson"
    }],
    "suggestions": [{
      "id": "3",
      "name": "English"
    }, {
      "id": "4",
      "name": "Poetry"
    }, {
      "id": "5",
      "name": "mathematics"
  }],
"languages":[{
    "name": "C",
    "year": "1972"
    }, {
    "name": "Elm",
    "year": "2012"
  },
  {
    "name": "Welcome",
    "year": "2015"
  }]
});



});

});
