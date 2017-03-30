
import $ from 'jquery';

const serverFetchJQuery = function (config, resolve, reject) {
    $.ajax({
        url: config.url,
        type: config.method,
        headers: config.headers,
        data: (config.method === 'GET') ? null : JSON.stringify(config.data),
        dataType: 'json',
        success:function (data,status, xhr)
        {
            let eTag = xhr.getResponseHeader('ETag');
            resolve({data: data, eTag: eTag});
        },
        error:function (jqXHR,textStatus,errorThrown)
        {
	          reject(errorThrown);
        }
    });
};

// Exports
export default {
    send : function (config) {
	      const p = new Promise(function (resolve, reject) {
            try {
		            serverFetchJQuery(config, resolve, reject);     // Generic
            }
            catch (e) {
                reject('Exception in REST processing : ' + e);
            }
        });
	      return p;
    }
};
