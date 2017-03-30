/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class CheckJobStatusAction - it creates action object and return back to 
 * the container
 * @author Udhayakumar Gururaj
 **/

 /**
 * @function getJobStatus method is used to form a type and data and 
 * return the action object to the called container class
 * @param {object} apiData
 */
export function getJobStatus(apiData) { 
	return {
		type : 'JOB_STATUS',
		data : apiData
	}
  }
