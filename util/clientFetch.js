//api/clientFetch.js

const url = require('url');
const fetch = require('isomorphic-unfetch').default;

/**
 * Since I'm not sure where this will be deployed and relative paths aren't good practice in this case,
 * this function will determine the current host and fetch from the given endpoint on that host and return that
 * response.
 * 
 * @param {Document} document The document the request is being performed from. Used to get the url of the host
 * @param {String} endpoint The server endpoint to be fetched
 * @param {Boolean} returnJson If true, also parses the response as json. Only set this if you know 'Content-Type' is 'Application/Json'
 * 
 * @returns {Promise<any>}
 */
async function clientFetch(document, endpoint, returnJson = false) {
    var urlObj = url.parse(document.location.href);
    if(endpoint.charAt(0) != '/') {
        endpoint = '/' + endpoint;
    }
    var uri = urlObj.protocol + '//' + urlObj.host + endpoint;
    try {
        var res = await fetch(uri);
        if(returnJson) {
            return await res.json();
        } else {
            return res;
        }
    } catch (err) {
        return Promise.reject(err);
    }
    

}

module.exports = clientFetch;