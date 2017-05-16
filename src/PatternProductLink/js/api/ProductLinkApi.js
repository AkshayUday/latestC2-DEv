import AlfrescoApiService from '../../../common/util/alfrescoApiService';

export default {

  getProduct(repo,repoName,alferscoLibConfig){ 
  	let plConfig = {};
  	plConfig.alferscoLibConfig = alferscoLibConfig;
  	plConfig.alferscoLibConfig.alfserver = repo;
  	plConfig.alferscoLibConfig.repoName = repoName;
  	return AlfrescoApiService.getSiteRootFolders(plConfig);
  }

}
