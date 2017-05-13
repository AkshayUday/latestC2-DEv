import AlfrescoApiService from '../../../common/util/alfrescoApiService';

export default {

  getProduct(repo,repoName,alferscoLibConfig,patConfig){ 
  	
  	let plConfig = {};
  	console.log(patConfig);

  	plConfig.alferscoLibConfig = alferscoLibConfig;
   	plConfig.patConfig = patConfig;
  	plConfig.patConfig.alfserver = repo;
  	plConfig.patConfig.repoName = repoName;
    console.log(plConfig);
  	return AlfrescoApiService.getSiteRootFolders(plConfig);
  }

}
