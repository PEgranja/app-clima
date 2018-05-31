// server.ts

import * as http from "http";

var port: number = 5000;

function app (req: http.RequestOptions, res: http.ServerResponse): void {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}

module.exports = app;

// Only start the server when code is called directly
if (!module.parent) {
    http.createServer(app).listen(port, function() {
        console.log("Server listening on port " + port);
    });
}
