const GET = {
	'req'       : 'AssetMetadata',
	'action'    : 'Read One',
   }

const UPDATE = {
	'req'       : 'AssetMetadata',
	'action'    : 'Update',
 }

const MANIFEST_GET = {
    'req'       : 'AssetMetadata',
    'action'    : 'Manifest', 
 }

const CREATE= {
      req       : 'AssetMetadata', 
      action    : 'Create',
  }

 const TAXONOMIES = {
    action: 'Taxonomies',
    req: 'difficultyLevels',
    data: {
      taxonomies: 'difficultylevel'
      }
    }

const constants = {
	REVIEW_METADATA : 'REVIEW_METADATA',
	SAVE_METADATA : 'SAVE_METADATA',
	REVIEW_METADATA_ERROR : 'REVIEW_METADATA_ERROR',
	SAVE_METADATA_ERROR : 'SAVE_METADATA_ERROR',
	BUFFER_GET : GET,
	BUFFER_UPDATE : UPDATE,
	BUFFER_MANIFEST_GET : MANIFEST_GET,
	BUFFER_CREATE : CREATE,
	BUFFER_TAX_GET : TAXONOMIES,
	RESET_METADATA :'RESET_METADATA'
};

module.exports = constants;
