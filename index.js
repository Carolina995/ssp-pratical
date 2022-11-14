const http = require('http'),//HTTP Server
        express = require('express'), //heading HTTP requesting and routing
        fs = require('fs'), //File system functionalization
        xmlParse = require('xslt-processor').xmlParse, //XML building
        xsltProcess = require('xslt-processor').xsltProcess; // XSLT headling
        router = express(), //init the router
        server = http.createServer(router); //Init a server

router.get('/', function(req, res){

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'utf8'),
        xsl = fs.readFileSync('menu.xsl', 'utf8');

        xml = xmlParse(xml);
        xsl = xmlParse(xsl);

    let html = xsltProcess(xml, xsl);

    res.end(html.toString());
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){

    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});