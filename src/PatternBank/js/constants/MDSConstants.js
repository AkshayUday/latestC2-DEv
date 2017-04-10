const buffer = {
            'req'       : 'BankMetaData', 
                        // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Create',          
                        // Create / Read One / Update / Delete / Search / Read All
}
 
const bufferGet = {
            'req'       : 'BankMetaData',     
                    // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Read One',         
                         // Create / Read One / Update / Delete / Search / Read All
}

const bufferGetTaxonomy = {
			'req'       : 'BankMetaData',   
                            // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Taxonomies', 
}

const bufferUpdate = {
            'req'       : 'BankMetaData',    
                     // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Update',           
                       // Create / Read One / Update / Delete / Search / Read All
}

const MDSConstants = {
	BUFFER : buffer,
	BUFFER_GET : bufferGet,
	BUFFER_GET_TAXONOMY : bufferGetTaxonomy,
	BUFFER_UPDATE : bufferUpdate
}

module.exports = MDSConstants;
