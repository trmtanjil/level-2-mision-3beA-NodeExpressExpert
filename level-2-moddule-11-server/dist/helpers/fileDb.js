"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUser = readUser;
exports.writeUsers = writeUsers;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const filePath = path_1.default.join(process.cwd(), './src/data/user.json');
function readUser() {
    const data = fs_1.default.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}
function writeUsers(users) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
