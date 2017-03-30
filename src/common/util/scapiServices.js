import rest from './rest';
import MLCommon from './MLCommon';

function _createContext() {
       return [
        'https://schema.pearson.com/context/schema-org-context.jsonld',
		'https://schema.pearson.com/context/content-context.jsonld',
		'https://schema.pearson.com/context/rdf-schema-context.jsonld',
		'https://schema.pearson.com/context/learn-context.jsonld',
		'https://schema.pearson.com/context/raf-context.jsonld',
		'https://schema.pearson.com/context/owl-context.jsonld',
		'https://schema.pearson.com/context/assessment-context.jsonld'
    ]
};


function _createConfig(buffer) { debugger;
    let method;
    let url;
    let configObj = {};
    configObj = MLCommon.getConfigUrl(buffer);
    method = configObj.method;
    url = configObj.url;
    let  headers = (method == 'GET') ? Object.assign({}, buffer.libConfig.headers, { 'If-Modified-Since' : '0' }) :
    buffer.libConfig.headers;

    const context = _createContext();
    const jsonld = MLCommon.createJSONLD(method,context, buffer);
    const config = {
        'method': method,
        'url': url,
        'headers': headers,
        'data': jsonld
    }
    return config;
};

export default {
	_sendJSONLD : function (buffer){
      return _createConfig(buffer);
	},
    send : function (buffer) { debugger;
        const promise = new Promise(function (fulfill, reject) {
            const config = _createConfig(buffer);
            const restPromise = rest.send(config)
            restPromise.then(function (reply) {
              if(reply !== undefined){
              	const json = MLCommon.modifyResData(reply);
                fulfill(json);
              }else{
                fulfill({errMsg: 'success'});
              }
            }).catch(function (reply) {
                    reject(reply);
            });
        });
        return promise;
    }
};
