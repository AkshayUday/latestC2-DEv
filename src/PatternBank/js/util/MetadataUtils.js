import moment from 'moment';

export default {

    convert_to_ObjArray(keywords) {
      const itemArr = [];
      if(keywords && Array.isArray(keywords)){
        for(let i=0; i<keywords.length;i++){
            itemArr.push({'id': i,'name' : keywords[i]});
        }
      }else if(keywords && typeof(keywords) === 'string'){
        itemArr.push({'id': 0,'name' : keywords});
      }else if(keywords && typeof(keywords) === 'object'){
        let keywordsItr = keywords.en;
        if(typeof(keywordsItr) === 'string'){
            itemArr.push({'id': 0,'name' : keywordsItr});
        }else{
           if(keywordsItr.length === undefined){
              itemArr.push({'id': 0,'name' : keywordsItr});
            }else{
              for(let key in keywordsItr){
                if(keywordsItr.hasOwnProperty(key)){
                    itemArr.push({'id': key, 'name': keywordsItr[key]});
                  }
                }
            }  
        }
          
      }
      return itemArr;
    },

  convert_to_SelectBoxData(Obj) {
      const itemArr = [];
      
      for(let i=0; i<Obj.length; i++){
        itemArr.push({'value': Obj[i].schemaUrl,'text' : Obj[i].name});
      }
       
        return itemArr;
    },

  copy(src,target){
      if(src && target){
        for (const key in src) {
          if(src[key] && src[key]!=''){
                  target[key] = src[key];
          }
        }
      } 
      return target;
    },

    convert_to_StringArray(keywords) {
      const itemArr = [];
      if(keywords && Array.isArray(keywords)){
        for(let i=0; i<keywords.length;i++){
            if(keywords[i] && keywords[i].name){
              itemArr.push(keywords[i].name);
            }else{
              itemArr.push(keywords[i]);
            }
         }
      }
      return itemArr;
    },

    getTimeObj(values){
      let timeReq = {};
      if(values){
          timeReq = {'hh':(values.hours)?values.hours:'00' ,
                   'mm' : (values.mins)?values.mins:'00', 
                   'ss': (values.secs)?values.secs:'00'}
      }

     /* let timeStr = ''+((values.hours)?values.hours:'00')+':'+((values.mins)?values.mins:'00')+
      ':'+((values.secs)?values.secs:'00');
      timeReq = moment(timeStr,'HH:mm:ss').format();*/
      timeReq=moment.duration({ hours: ((values.hours)?values.hours:'00'), 
        minutes: ((values.mins)?values.mins:'00'),
          seconds: ((values.secs)?values.secs:'00') }).toISOString();
      return timeReq;
    },


    /*getHoursMinsSecsObj(obj, timeStampValue){
      if(!obj){
        obj = {};
      }
      let time = moment(timeStampValue,'YYYY-MM-DD HH:mm:ss');
      obj.hours = time.get('hour');
      obj.mins = time.get('minutes');
      obj.secs = time.get('seconds');
      return obj;
    }*/
    getHoursMinsSecsObj(obj, timeStampValue){
      if(!obj){
        obj = {};
      }
      let time = moment.duration(timeStampValue);
      obj.hours = time.hours();
      obj.mins = time.minutes();
      obj.secs = time.seconds();
      return obj;
    }

}
