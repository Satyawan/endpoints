var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

class DLAP {

    constructor() {

        // Make the request module run asynchronously.
        Promise.promisifyAll(request);

    }

    /*
    ** Call this method to log into DLAP as an administrator.
    ** Store the returned token to use in subsequent calls to DLAP as the administrator.
    ** The token expires after being idle for 14 minutes. The expiration time is listed in the response XML.
    */
    *getToken() {
        let token = yield request.postAsync({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'http://dev.dlap.bfwpub.com/dlap.ashx',
            body:    "cmd=login&username=root/administrator&password=Password1&submit=Login"
        }, function(error, response, body){
          console.log(body);
        });
    }

    *getData(path, ctx) {

        const DLAP = 'https://join.macmillanhighered.com';

        // Make an async request for data.
        let data = yield request.getAsync(DLAP + path);

        ctx.body = data[0].body;

    }

    *getData2(path, ctx) {

        const DLAP = 'https://join.macmillanhighered.com';

        // Make an async request for data.
        let data = yield request.getAsync(DLAP + path);

        return data[0].body;

    }
}

module.exports = DLAP;
