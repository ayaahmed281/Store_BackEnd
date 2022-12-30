"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../helpers");
const order_1 = require("../models/order");
const router = express_1.default.Router();
const store = new order_1.Orders();
router.get("/orders", helpers_1.authToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.json(err);
    }
}));
router.get("/orders/:id", helpers_1.authToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(_req.params.id);
        res.json(order);
    }
    catch (err) {
        res.json(err);
    }
}));
router.post("/orders", helpers_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, order_status, user_id, quantity, product_id } = req.body;
        const order = { id, order_status, quantity, product_id, user_id };
        yield store.create(order).then((_res) => {
            res.json({ statusCode: 200, message: "Added", data: order });
        });
    }
    catch (err) {
        res.json({
            statusCode: 400,
            message: "an error occurred",
            data: err
        });
    }
}));
router.post("/orders/post", helpers_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quantity, order_id: orderId, product_id: productId } = req.body;
        if (!orderId || !productId || !quantity) {
            return res.status(400).json({
                error: "data not found"
            });
        }
        const product = yield store.addProductWithOrder({
            order_id: orderId,
            product_id: productId,
            quantity
        });
        res.status(200).json(product);
    }
    catch (err) {
        res.json({ statusCode: 400, message: "an error occurred", data: err });
    }
}));
router.put("/orders/id", helpers_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_status, quantity, product_id, user_id } = req.body;
        const order = { order_status, quantity, product_id, user_id };
        yield store.update(order, parseInt(req.params.id, 1)).then(() => {
            res.json({
                statusCode: 200,
                data: order,
                message: "Done"
            });
        });
    }
    catch (err) {
        res.json(err);
    }
}));
router.delete("/orders/id", helpers_1.authToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield store.delete(_req.params.id).then(() => {
            res.json({ statusCode: 200, message: "Done." });
        });
    }
    catch (err) {
        res.json(err);
    }
}));
exports.default = router;
