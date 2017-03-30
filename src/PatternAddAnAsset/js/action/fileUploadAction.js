import fileUploadApi from '../api/fileUploadApi'
import { Link, browserHistory, hashHistory } from 'react-router'
import AlfrescoApiService from '../../../common/util/alfrescoApiService';

  export function fileUploadToServer(values){ 

   return (dispatch, getState) => { 
    	let state = getState();
    	let treePaneObj = {};
    	let currFolderId = '';
    	if (state.SingleFileFolderReducer.length > 0) {
		    treePaneObj = state.SingleFileFolderReducer[state.SingleFileFolderReducer.length-1];
		}
		if(treePaneObj){
			currFolderId = treePaneObj.FolderID.nodeRef;
		}
		let fileName = values.fileName;

		//console.log('current folder is ',currFolderId);
     // AlfrescoApiService.getAlfToken(window.tdc.libConfig).then(function (success){
        //const parser = new DOMParser();
		//const xmlDoc = parser.parseFromString(success.text,'text/xml');
        //const token = xmlDoc.getElementsByTagName('ticket')[0].childNodes[0].nodeValue;
            //const token = JSON.parse(success.text).data.ticket;
            fileUploadApi.post_Data(values,currFolderId,dispatch, getState).then(function (success){
	         //fileUploadApi.file_Upload(formData,values,token,currFolderId,
	        //  dispatch, getState).then(function (success){
                   //let responseData = JSON.parse(success.xhr.responseText);
                   let title = values.name;    
                   let responseData = JSON.parse(success.text);
                   let totalSize  = responseData.properties['cmis:contentStreamLength'].value;


                   //console.log(responseData)


	         		const apiData = {
				         rows :  [
				                  {
				                    Name: fileName,
				                    //Name: responseData.fileName,
				                    //Size: Math.round(formData.get('filedata').size/1024)+'kb',
									Size: (totalSize <= 1023)?totalSize + 'B':Math.round(totalSize/1024) +' KB',
				                    Progress: 100,
				                    status:'Success'
				                  }
				              ]
				            }
			        dispatch({
			          type : 'JOB_STATUS_END',
			          data : apiData
			        })
				//hashHistory.push('/UploadInProgress');

	         },function (error){
	           //console.log(error.message);
	           let errorMsg = '';
	           if(error.status == 409){
	           	errorMsg = ' (Uploaded File Already Exists!)';
	           }
	            const apiData = {
				         rows :  [
				                  {
				                    Name: fileName,
				                    Size: '0 KB',
				                    Progress: 0,
				                    status:'Failure'+errorMsg
				                  }
				              ]
				            }

                  dispatch({
			          type : 'JOB_STATUS_END',
			          data : apiData
			      })

	           //hashHistory.push('/errorUploading');

	         })


      // },function (error){
	     //       let errorMsg = ' (Please try again later)';
      //  const apiData = {
				  //        rows :  [
				  //                 {
				  //                   Name: fileName,
				  //                   Size: '0 KB',
				  //                   Progress: 0,
				  //                   status:'Failure'+errorMsg
				  //                 }
				  //             ]
				  //           }
      //   dispatch({
			   //        type : 'JOB_STATUS_END',
			   //        data : apiData
			   //    })
      //   hashHistory.push('/CheckJobStatus');
      //  //hashHistory.push('/errorUploading');
      // })
  }
}
