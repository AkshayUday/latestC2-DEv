const bufferAssesment = {
            'req'       : 'AssesmentMetadata',       
                  // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Create',               
                   // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentInstrument'
}
 
const bufferGetAssesment = {
            'req'       : 'AssesmentMetadata',         
                // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Read One',                
                  // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentInstrument'
}


const bufferGetAssesmentTaxonomy = {
                  'req'       : 'AssesmentMetadata',      
                         // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Taxonomies', 
}

const bufferAssesmentUpdate = {
            'req'       : 'AssesmentMetadata',            
             // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Update',                
                  // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentInstrument'
}

const bufferBank = {
            'req'       : 'BankMetaData', 
                        // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Create',          
                        // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentInstrument'
}

const bufferGetBank = {
            'req'       : 'BankMetaData',     
                    // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Read One',         
                         // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentInstrument'
}

const bufferGetBankTaxonomy = {
                  'req'       : 'BankMetaData',   
                            // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Taxonomies', 
}

const bufferUpdateBank = {
            'req'       : 'BankMetaData',    
                     // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Update',           
                       // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentInstrument'
}

const bufferQuestion = {
            'req'       : 'QuestionMetadata',             
            // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Create',                      
            // Create / Read One / Update / Delete / Search / Read All
}
 
const bufferGetQuestion = {
            'req'       : 'QuestionMetadata',            
            // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Read One',                      
            // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentItem'
}

const bufferGetQuestionTaxonomy = {
                  'req'       : 'QuestionMetadata',            
                   // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Taxonomies', 
}

const bufferUpdateQuestion = {
            'req'       : 'QuestionMetadata',            
             // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Update',                     
             // Create / Read One / Update / Delete / Search / Read All
            'type' : 'AssessmentItem'
}

const MDSConstants = {
      BUFFER_ASSESMENT : bufferAssesment,
      BUFFER_GET_ASSESMENT : bufferGetAssesment,
      BUFFER_GET_ASSESMENT_TAXONOMY : bufferGetAssesmentTaxonomy,
      BUFFER_ASSESMENT_UPDATE : bufferAssesmentUpdate,
      BUFFER_BANK : bufferBank,
      BUFFER_GET_BANK : bufferGetBank,
      BUFFER_GET_BANK_TAXONOMY : bufferGetBankTaxonomy,
      BUFFER_BANK_UPDATE : bufferUpdateBank,
      BUFFER_QUESTION : bufferQuestion,
      BUFFER_GET_QUESTION : bufferGetQuestion,
      BUFFER_GET_QUESTION_TAXONOMY : bufferGetQuestionTaxonomy,
      BUFFER_QUESTION_UPDATE : bufferUpdateQuestion

}

module.exports = MDSConstants;
