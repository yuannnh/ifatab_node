var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
const querystring = require('querystring');
var request_url = require('./data/RequestUrl.json');





var app = express();


/* Pour récupérer des donnes de GDFA, envoyez un requête HTTP à ces url avec les paramètres spécifié */
app.get('/areas',getResponse);
app.get('/queueTypes',getResponse);
app.get('/stores',getResponse); /* para : idArea*/
app.get('/inStoreUsers',getResponse); /* para : idStore*/
app.get('/inStoreCustomers',getResponse); /* para : idStores; para_facultatif : idQueueType, phone */


/* pour réaliser un post request, envoyez un requet http post à cette url avec le body de ce requet de format json
exemple:
    {
        "idStore":"19263",
        "postData":<post data de format json>
    }
*/ 
app.post('/inStoreCustomers',bodyParser.json(),postResponse);

/* pour re acriver un client, envoyez un requet http post à cette url avec le deux paramètres: idStore et idCustomer */ 
app.get('/reactive',patchResponse);



/* former le bon url pour réaliser le GET requête avec API GDFA */
function resolveUrl(req){
    var url = request_url.base_url;
    if(req.path==='/areas'){
        url = url + '/areas';
    }
    else if(req.path==='/queueTypes'){
        url = url + '/queueTypes';
    }
    else if(req.path==='/stores'){
        console.log(req.query.idArea);
        url = url + '/stores?idArea=' + req.query.idArea;
        console.log(url);
    }
    else if(req.path==='/inStoreUsers'){
        url = url + '/stores/' + req.query.idStore + '/profiles?inStore=true';
    }
    else if(req.path==='/inStoreCustomers'){
        url = url + '/stores/' + req.query.idStore+ '/inStoreCustomers'; 
        if(req.query.idQueueType){
            url = url + '?searchKey=idQueueType&searchVal='+req.query.idQueueType;
        }
        if(req.query.phone){
            url = url + '?searchKey==phone&searchVal='+req.query.phone;
        }
    }
    else{
        console.log("invalide url!");
    }

    return url;

}
/* fonction callback pour tous les GET requêtes. ** SAUF CELLE DE /reactive** */
function getResponse(req,resp){

    var url=resolveUrl(req);
    
    http.get(url, (res)=>{
        const statusCode = res.statusCode;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed.\n` +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error(`Invalid content-type.\n` +
                            `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.log(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }        
       
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            try {
            resp.set('Content-Type','application/json');
            resp.set('Access-Control-Allow-Origin','*');
            resp.end(rawData);
            
            let parsedData = JSON.parse(rawData);
            //console.log(parsedData);
            console.log(req.route.path);
            console.log(req.socket.remotePort);
            } catch (e) {
            console.log(e.message);
            }
        });
    }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    });
    
}
/* fonction callback pour le POST requêtes*/
function postResponse(requ,resp){
    resp.setHeader('Access-Control-Allow-Origin','*');
    console.log(requ.body);

    var postData = JSON.stringify(requ.body.apiPostData);
    
    var options = {
        hostname: 'dv29masc02.rouen.francetelecom.fr',
        port: 80,
        path: '/api-gdfa/v0/stores/' + requ.body.idStore + '/inStoreCustomers',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            try {
                //resp.setHeader('Content-Type','application/json');
                resp.set('Access-Control-Allow-Origin','*');                
                resp.end(chunk);                
            } catch (e) {
                console.log(e.message);
            }
            
        });
        res.on('end', () => {
            
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        
    });
    console.log("postData:  "+postData);
    req.write(postData);
    req.end();
}

/* fonction callback pour le PATCH requêtes*/
function patchResponse(requ,resp){

    var patchData = '{"op": "replace", "path": "/activeFlag", "value": true}';

    var options = {
        hostname: 'dv29masc02.rouen.francetelecom.fr',
        port: 80,
        path: '/api-gdfa/v0/stores/' + requ.query.idStore + '/inStoreCustomers/' + requ.query.idCustomer,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            resp.end(chunk);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        
    });
    req.write(patchData);
    req.end();

}




var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})