
const url = require('url');


module.exports = (document, endpoint) => {
    var urlObj = url.parse(document.location.href);
    if(endpoint.charAt(0) != '/') {
        endpoint = '/' + endpoint;
    }
    return urlObj.protocol + '//' + urlObj.host + endpoint;
}