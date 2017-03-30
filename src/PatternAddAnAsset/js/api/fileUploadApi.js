/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * This layer used for connecting to different external servers.
 *
 * @module MediaAssets
 * @file fileUploadApi - This layer is used for uploading a file to server
 * @author TDC
 *
*/

import AlfrescoApiService from '../../../common/util/alfrescoApiService';

import { hashHistory, browserHistory } from 'react-router';

export default {
   post_Data(values,currFolderId,dispatch, getState) {   	//let defaultNodeRef = '1a6b62f6-0efb-4448-b405-6c014350191e'; //Temporary fix
   	let fileName = values.fileName;
    let title = values.title;    
	let formData = new FormData();
	formData.append('filedata',values.file[0]);
	let libConfig = window.tdc.libConfig;
	let apiData = {
	 rows :  [
	          {
	            Name: fileName,
	            Size: 0+' KB',
	            Progress: 0,
	            status:'Uploading'
	          }
	      ]
	    }
	    dispatch({
			type : 'JOB_STATUS',
			data : apiData
		})
	// browserHistory.push('/CheckJobStatus');
	return AlfrescoApiService.uploadAsset(window.tdc.libConfig,currFolderId,title,fileName,formData).on('progress', function (e){
			let state =  getState();
			let currstate = state.CheckJobStatusReducers[state.CheckJobStatusReducers.length-1];

			 /* console.log(e.total);
			  console.log(e.total <= 1023);
              console.log(e.loaded);*/
              
			  let progressData = {
		  	       rows :  [
		  	        {
		  			Name: fileName,
		            Size: (e.total <= 1023)?e.loaded + 'B':Math.round(e.loaded/1024) +' KB',
		            Progress: Math.round(e.percent),
		            status:'Uploading'
		           }
		          ]
			  }

              if(e.target.readyState === undefined && e.target.status === undefined){
					dispatch({
					type : 'JOB_STATUS_UPDATE',
					data : progressData
					})

              }
           })
  },
}
