module.exports = {
    getCurrentValues: (dataArray) => {
      if (dataArray !== undefined && dataArray.size > 1) {
        let latestItem = dataArray.size-1;
        return dataArray.get(latestItem);
      }

      return [];
    },

    /**
    * this method is used to remove the unkown properties, that
    * has been added when we use {...props} from parent 
    * directly.
    **/
    removeUnkownProps(divProps){

	delete divProps.autofill;
    delete divProps.initialValue;
    delete divProps.onUpdate;
    delete divProps.valid;
    delete divProps.invalid;
    delete divProps.dirty;
    delete divProps.pristine;
    delete divProps.error;
    delete divProps.active;
    delete divProps.touched;
    delete divProps.visited;
    delete divProps.autofilled;
    return divProps;
	},

    getFilterQueryForAssets(index){
        let fileTypeForSearch = {
            0:' AND (d.cmis:contentStreamMimeType LIKE '+'\'image/%25\''+' OR (d.cmis:objectTypeId = '+'\'D:avs:smartLink\''+' AND t.cm:description LIKE '+'\'%25"smartLinkType"'+':%25"Image"%25\''+')) ',
            1:' AND (d.cmis:contentStreamMimeType LIKE '+'\'video/%25\''+' OR (d.cmis:objectTypeId = '+'\'D:avs:smartLink\''+' AND t.cm:description LIKE '+'\'%25"smartLinkType"'+':%25"Video"%25\''+') OR t.cm:description LIKE '+'\'%25"streamingMediaPackageType":'+'%25"Video"%25\') ',
            2:' AND (d.cmis:contentStreamMimeType LIKE '+'\'audio/%25\''+' OR (d.cmis:objectTypeId = '+'\'D:avs:smartLink\''+' AND t.cm:description LIKE '+'\'%25"smartLinkType"'+':%25"Audio"%25\''+') OR t.cm:description LIKE '+'\'%25"streamingMediaPackageType":'+'%25"Audio"%25\') ',
            3:' AND (d.cmis:objectTypeId = '+'\'D:avs:smartLink\' OR (d.cmis:contentStreamMimeType NOT LIKE \'image/%25\' AND d.cmis:contentStreamMimeType NOT LIKE \'audio/%25\' AND d.cmis:contentStreamMimeType NOT LIKE \'video/%25\')) AND (d.cmis:objectTypeId <> \'D:avs:smartLink\' OR (t.cm:description NOT LIKE \'%25"smartLinkType":%25"Image"%25\' AND '+ 
                't.cm:description NOT LIKE '+'\'%25"smartLinkType":%25"Video"%25\' AND t.cm:description NOT LIKE \'%25"smartLinkType":%25"Audio"%25\')) AND '+
                '(t.cm:description IS NULL OR t.cm:description NOT LIKE \'%25"streamingMediaPackageType":%25"Video"%25\') AND '+ 
                '(t.cm:description IS NULL OR t.cm:description NOT LIKE \'%25"streamingMediaPackageType":%25"Audio"%25\')'
        };

        return fileTypeForSearch[index];
    },

    findPlatformOrSmartLink: (alfServer, mimeType, description, noderef) => {
    let url;
    if(description !== null && description !== undefined){
        if(mimeType !== null && mimeType !== undefined &&
           mimeType === 'application/json' && 
           description.indexOf('streamingMediaPackageType') !== -1){
            //streaming Media
        url = alfServer+'/alfresco-proxy/s/api/node/workspace/SpacesStore/'+noderef+'/content/'

        }else if(description.indexOf('smartLinkType') !== -1){
            // smartLink
        let query = 'SELECT s.avs:url,s.avs:jsonString FROM cmis:document AS d JOIN avs:smartLink AS s ON '+
               'd.cmis:objectId = s.cmis:objectId where s.cmis:objectId = '

        url = alfServer+'/alfresco-proxy/api/-default-/public/cmis/versions/1.1/browser?cmisselector=query&q='+
               query+'\''+noderef+'\''
        }
    }
    console.log('find Platform');
    console.log(url);
        return url;
    }
}

