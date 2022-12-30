"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTToken = exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleUnAuthorized = (next) => {
    const err = new Error("you arent logged in");
    err.name = "authentication error";
    next(err);
};
const authToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        try {
            const decoded = token && jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            if (decoded) {
                next();
            }
            else {
                handleUnAuthorized(next);
            }
        }
        catch (e) {
            return e;
        }
    }
    catch (error) {
        res.status(401);
    }
};
exports.authToken = authToken;
const createJWTToken = (id, username) => jsonwebtoken_1.default.sign({ id, username }, process.env.TOKEN_SECRET);
exports.createJWTToken = createJWTToken;
