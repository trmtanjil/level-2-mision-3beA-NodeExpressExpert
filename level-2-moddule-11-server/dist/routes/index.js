"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileDb_1 = require("../helpers/fileDb");
const parseBody_1 = __importDefault(require("../helpers/parseBody"));
const routhandler_1 = __importDefault(require("../helpers/routhandler"));
const sendJson_1 = __importDefault(require("../helpers/sendJson"));
(0, routhandler_1.default)("GET", "/", (req, res) => {
    (0, sendJson_1.default)(res, 200, {
        message: 'Hello from node js with typescript...',
        path: req.url,
    });
});
(0, routhandler_1.default)("GET", "/api", (req, res) => {
    (0, sendJson_1.default)(res, 200, {
        message: "healt strus ok",
        path: req.url,
    });
});
(0, routhandler_1.default)("POST", '/api/user', async (req, res) => {
    const body = await (0, parseBody_1.default)(req);
    //userjson read
    const users = (0, fileDb_1.readUser)();
    const newUser = {
        id: Date.now(),
        ...body,
    };
    users.push(newUser);
    (0, fileDb_1.writeUsers)(users);
    (0, sendJson_1.default)(res, 201, { succes: true, data: body });
});
