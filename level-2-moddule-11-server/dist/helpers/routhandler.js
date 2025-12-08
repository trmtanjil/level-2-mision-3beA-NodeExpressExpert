"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = new Map();
function addRoutes(method, path, handler) {
    if (!exports.routes.has(method))
        exports.routes.set(method, new Map());
    exports.routes.get(method).set(path, handler);
}
exports.default = addRoutes;
