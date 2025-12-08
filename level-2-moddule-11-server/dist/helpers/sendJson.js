"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendJson(res, statuscode, data) {
    res.writeHead(statuscode, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
}
exports.default = sendJson;
