'use strict';
var app = require('koa')(),
    Router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    DLAPClass = require('./controllers/DLAP'),
    DLAPData = new DLAPClass(),
    router = new Router();

app.use(bodyParser());

// GET A TOKEN HERE
// var token = callgettoken();

// This example returns a simple 'hello world' in JSON format.
router.get('/', function*() {

    this.body = JSON.stringify({ message: 'hello world!' });

});

router.get('/getToken', function*() {

    // Send a POST request to http://dev.dlap.bfwpub.com/dlap.ashx along with the username and password.
    let token = yield *DLAPData.getToken(this);
    this.body = JSON.parse(token)

});

/*
** The handler for this route, the getData generator function, is passed the KOA context
** in the second parameter. The response is not returned from within this router,
** but from the handler.
*/
router.get('/getData', function*() {

    yield *DLAPData.getData('/api/titleservices/v1/titles/format/medium/titles.json', this);

});

// In this example, data is returned from a route handler, and the response is sent from within this router.
router.get('/getData2', function*() {

    let data = yield *DLAPData.getData2('/api/titleservices/v1/titles/format/medium/titles.json', this);

    data = JSON.parse(data)[0].Name;

    this.body = data;

}); 

app.use(router.middleware());

app.listen(process.env.PORT || 3000);
