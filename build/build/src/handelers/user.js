"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
const store = new user_1.Users();
router.get("/users", helpers_1.authToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }
}));
router.get("/users/:id", helpers_1.authToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(parseInt(_req.params.id, 1));
        res.json(user);
    }
    catch (err) {
        res.json(err);
    }
}));
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email
        };
        yield store.create(user).then((_res) => {
            var _a;
            const token = jsonwebtoken_1.default.sign({ user }, (_a = process.env.TOKEN_SECRET) === null || _a === void 0 ? void 0 : _a.toString());
            res.json({
                statusCode: 200,
                message: "Done.",
                data: user,
                token
            });
        });
    }
    catch (err) {
        res.json({ statusCode: 404, message: "an error occurred.", data: err });
    }
}));
router.put("/users/:id", helpers_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        yield store.update(user, parseInt(req.params.id, 1)).then(() => {
            res.json({ statusCode: 200, message: "Done", data: user });
        });
    }
    catch (err) {
        res.json(err);
    }
}));
router.delete("/users/:id", helpers_1.authToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield store.delete(parseInt(_req.params.id, 1)).then(() => {
            res.json({
                statusCode: 200,
                message: "Done."
            });
        });
    }
    catch (err) {
        res.json(err);
    }
}));
router.post("/users/authentication", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = _req.body;
    try {
        const oldUser = yield store.authenticateUser(password, email);
        const token = jsonwebtoken_1.default.sign({ oldUser }, (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.TOKEN_SECRET);
        if (oldUser) {
            res.status(200).json({
                status: "Authorized",
                data: { token, user: oldUser }
            });
        }
        else {
            res.status(401).json({
                status: "error",
                message: "un authorize user."
            });
        }
    }
    catch (err) {
        res.json(err);
    }
}));
exports.default = router;
