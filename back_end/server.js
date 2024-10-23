"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = app;
var common_1 = require("@angular/common");
var ssr_1 = require("@angular/ssr");
var express_1 = require("express"); // Importa express de manera consistente
var node_path_1 = require("node:path");
var main_server_1 = require("../front_end/src/main.server");
var user_1 = require("./routes/user");
function app() {
    var server = (0, express_1.default)(); // initialice express
    var serverDistFolder = __dirname;
    var browserDistFolder = (0, node_path_1.resolve)(serverDistFolder, '../browser');
    var indexHtml = (0, node_path_1.join)(serverDistFolder, 'index.server.html');
    var commonEngine = new ssr_1.CommonEngine();
    server.set('view engine', 'html');
    server.set('views', browserDistFolder);
    // Middleware to analize json
    server.use(express_1.default.json());
    // user routes
    server.use('/api/users', user_1.default);
    // Serve static files from /browser
    server.get('**', express_1.default.static(browserDistFolder, {
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
