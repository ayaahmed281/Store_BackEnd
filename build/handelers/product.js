"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
const store = new product_1.Products();
router.get("/productsList", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (err) {
        res.json(err);
    }
}));
router.get("/productsList/:id", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Product = yield store.show(parseInt(_req.params.id, 1));
        res.json(Product);
    }
    catch (err) {
        res.json(err);
    }
}));
router.post("/productsList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.body);
        const Product = {
            price: req.body.price,
            pName: req.body.name,
            category: (_a = req.body) === null || _a === void 0 ? void 0 : _a.category
        };
        yield store.create(Product).then((_res) => {
            res.json({
                data: Product,
                statusCode: 200,
                message: "Done."
            });
        });
    }
    catch (err) {
        res.json({
            statusCode: 400,
            message: "an error occurred.",
            data: err
        });
    }
}));
router.put("/productsList/:id", helpers_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Product = {
            category: req.body.category,
            price: req.body.price,
            pName: req.body.name
        };
        yield store.update(Product, parseInt(req.params.id, 1)).then(() => {
            res.json({
                statusCode: 200,
                message: "Done.",
                data: Product
            });
        });
    }
    catch (err) {
        res.json(err);
    }
}));
router.delete("/productsList/:pid", helpers_1.authToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield store.delete(parseInt(_req.params.pid, 1)).then(() => {
            res.json({
                message: "Done.",
                statusCode: 200
            });
        });
    }
    catch (err) {
        res.json(err);
    }
}));
exports.default = router;
//# sourceMappingURL=product.js.map