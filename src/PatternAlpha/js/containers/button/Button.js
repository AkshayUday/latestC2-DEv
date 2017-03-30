import React, {Component} from 'react';
import './Button.scss';
import bean from 'bean';
import metadataService from '../../../../common/util/metadataService';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.link = this.props.patConfig.patSetup.link;
        console.log('link is ' + this.link);
        this.onClick = this.onClick.bind(this);  // this stmt make 'this' avail within the onClick() callback.
    }
    onClick(event) {
        event.preventDefault();
	      // The response back to host must occur from action processing
        bean.fire(this.props.patConfig, this.props.patConfig.resultsEventId, 
		              { key:'some key', value:'some value from PaternAlpha widget ' +
                    this.props.patConfig.patSetup.link });

        let buffer = {
            'libConfig' : this.props.libConfig,          // Includes host app supplied init values for lib + Should have all Taxonomies
            'patConfig' : this.props.patConfig,          // Includes host app supplied init values for pattern

            'req'       : 'ProductMetadata',             // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Create',                      // Create / Read One / Update / Delete / Search / Read All

            'data' : {
                'uuid':'',                                // Only required for actioon = Update/Delete/Read
                'status' : '',                           // Not sure if this is needed
                'filename' : '',                         // This is prob. only for Asset
                'discipline' : 'Mathematics',            // Taxonomy value
                'difficultyLevel' : 'Easy',              // Taxonomy value
                'trigger' : '',
                'knowledgeLevel' : 'Grade 10',
                'hasAlignment' : '',                     // Taxonomy value
                'keywords' : ['key1', 'key2', 'key3'],
                'name': 'Some Product Name',
                'timeRequired' : {
                    'hh':'01',
                    'mm':'20',
                    'ss':'30'
                },
                'description' : 'Some description for Product with decipline Math and knowledge level of Grade 10',
                'audience' : 'Parents',                  // Taxonomy value
                'searchterms' : ''
            }
        };


        let bufferImage = {
            'libConfig' : this.props.libConfig,          // Includes host app supplied init values for lib + Should have all Taxonomies
            'patConfig' : this.props.patConfig,          // Includes host app supplied init values for pattern

            'req'       : 'ImageMetadata',             // ProductMetadata / AssessmentMetadata / QuestionMetadata / ImageMetadata / AudioMetadata / VideoMetadata
            'action'    : 'Create',                      // Create / Read One / Update / Delete / Search / Read All

            'data' : {
                'uuid':'',                                // Only required for actioon = Update/Delete/Read
                'status' : '',                           // Not sure if this is needed
                'filename' : 'imageFileName.type',                         // This is prob. only for Asset
                'discipline' : 'Mathematics',            // Taxonomy value
                'difficultyLevel' : 'Easy',              // Taxonomy value
                'trigger' : 'someTrigger',
                'knowledgeLevel' : 'Grade 10',
                'hasAlignment' : 'someAlignment',                     // Taxonomy value

                'audience' : 'Parents',                  // Taxonomy value
                'keywords' : ['key1', 'key2', 'key3'],
                'name': 'Some Product Name',
                'timeRequired' : {
                    'hh':'01',
                    'mm':'20',
                    'ss':'30'
                },
                'description' : 'Some description for Product with decipline Math and knowledge level of Grade 10',

                'pafId' : 'somePafId',
                'alternateName' : 'someAlternateText',
                'caption' : 'someImageCaptionTextValue',
                'copyrightHolder' : 'someCopyrightHolderName',
                'contentUrl' : 'referenceToAlfrescoUUID',
                'thumbnail' : 'referenceToAlfrescoUUID',
                'dateCreated' : '1111111',
                'dateModified' : '222222',

                'captionFileName' : 'someCaptionFileName',
                'transcriptFileName' : 'someTranscriptFileName',

                'searchterms' : ''
            }
        };


        let bufferPut = {
            'libConfig' : this.props.libConfig,          // Includes host app supplied init values for lib + Should have all Taxonomies
            'patConfig' : this.props.patConfig,          // Includes host app supplied init values for pattern

            'req'       : 'ProductMetadata',             // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Create',                      // Create / Read One / Update / Delete / Search / Read All

            'data' : {
                'uuid':'',                                // Only required for actioon = Update/Delete/Read
                'status' : '',                           // Not sure if this is needed
                'filename' : '',                         // This is prob. only for Asset
                'discipline' : 'Mathematics',            // Taxonomy value
                'difficultyLevel' : 'Easy',              // Taxonomy value
                'trigger' : '',
                'knowledgeLevel' : 'Grade 10',
                'hasAlignment' : '',                     // Taxonomy value
                'keywords' : ['newkey1', 'newkey2', 'newkey3'],
                'name': 'Some Product Name',
                'timeRequired' : {
                    'hh':'01',
                    'mm':'20',
                    'ss':'30'
                },
                'description' : 'Some description for Product with decipline Math and knowledge level of Grade 10',
                'audience' : 'Parents',                  // Taxonomy value
                'searchterms' : ''
            }
        };

        let bufferGet = {
            'libConfig' : this.props.libConfig,          // Includes host app supplied init values for lib + Should have all Taxonomies
            'patConfig' : this.props.patConfig,          // Includes host app supplied init values for pattern

            'req'       : 'ProductMetadata',             // ProductMetadata / AssessmentMetadata / QuestionMetadata / AssetMetadata
            'action'    : 'Read One',                      // Create / Read One / Update / Delete / Search / Read All

            'data' : {
                'uuid':''                                 // Only required for actioon = Update/Delete/Read
            }
        };

        console.log('Button:onClick - issue a create send request for %o', buffer);
        let promise = metadataService.send(bufferImage);
        promise.then(function (replyCreate) {
            console.log('Button:onClick - create send successful response received %o', replyCreate);

            // Issue a GET request for just created item
            bufferGet.data.uuid = replyCreate.uuid;
            let promiseGet = metadataService.send(bufferGet);
            promiseGet.then(function (replyGet) {
                console.log('Button:onClick - get send successful response received %o', replyGet);
                

                // Issue a PUT request for update
                let promisePut = metadataService.send(bufferPut);
                promisePut.then(function (replyPut) {
                    console.log('Button:onClick - put send successful response received %o', replyPut);
                }, function (replyPut) {
                    console.log('Button:onClick - put send failed error message received %o', replyPut);
                });


            }, function (replyGet) {
                console.log('Button:onClick - get send failed error message received %o', replyGet);

            });

        }, function (replyCreate) {
            console.log('Button:onClick - create send failed error message received %o', replyCreate);
        });
    }
    render() {
	      return (<button className={'button'} onClick={this.onClick} type='button'>
                {this.props.patConfig.patSetup.link}
                </button>
		           );
    }
}
Button.propTypes = {
	  patConfig: React.PropTypes.object,
	  libConfig: React.PropTypes.object
};
