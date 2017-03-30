
export default {

    convert_to_ObjArray(keywords) {
    	const itemArr = [];
    	if(keywords && Array.isArray(keywords)){
		    for(let i=0; i<keywords.length;i++){
		        itemArr.push({'id': i,'name' : keywords[i]});
		    }
      }else if(keywords && typeof(keywords) === 'string'){
        itemArr.push({'id': 0,'name' : keywords});
      }
        return itemArr;
  	},

  	copy(src,target){
  		if(src && target){
	  		for (const key in src) {
	                target[key] = src[key];
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
      return timeReq;
    }

}
