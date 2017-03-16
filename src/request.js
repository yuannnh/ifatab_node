var http = require('http');

class Request{
    constructor(){

    }
    getRequest(){
        var options = {
            host: 'http://dv29masc02.rouen.francetelecom.fr/api-gdfa/v0/',
            path: '/areas'
        };

        http.get(options, function(resp){
            resp.on('data', function(chunk){
                console.log(chunk);
            });
        }).on("error", function(e){
            console.log("Got error: " + e.message);
        });
    }
    

}

export default Request

