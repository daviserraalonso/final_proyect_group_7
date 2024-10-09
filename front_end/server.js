"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = app;
var common_1 = require("@angular/common");
var ssr_1 = require("@angular/ssr");
var node_path_1 = require("node:path");
var main_server_1 = require("./src/main.server");
// The Express app is exported so that it can be used by serverless Functions.
function app() {
    var express = require('express');
    var server = express();
    var serverDistFolder = __dirname; // Usamos __dirname en lugar de import.meta.url
    var browserDistFolder = (0, node_path_1.resolve)(serverDistFolder, '../browser');
    var indexHtml = (0, node_path_1.join)(serverDistFolder, 'index.server.html');
    var commonEngine = new ssr_1.CommonEngine();
    server.set('view engine', 'html');
    server.set('views', browserDistFolder);
    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get('**', express.static(browserDistFolder, {
        maxAge: '1y',
        index: 'index.html',
    }));
    // All regular routes use the Angular engine
    server.get('**', function (req, res, next) {
        var protocol = req.protocol, originalUrl = req.originalUrl, baseUrl = req.baseUrl, headers = req.headers;
        commonEngine
            .render({
            bootstrap: main_server_1.default,
            documentFilePath: indexHtml,
            url: "".concat(protocol, "://").concat(headers.host).concat(originalUrl),
            publicPath: browserDistFolder,
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: baseUrl }],
        })
            .then(function (html) { return res.send(html); })
            .catch(function (err) { return next(err); });
    });
    return server;
}
function run() {
    var port = process.env['PORT'] || 4000;
    // Start up the Node server
    var server = app();
    server.listen(port, function () {
        console.log("Node Express server listening on http://localhost:".concat(port));
    });
}
run();
