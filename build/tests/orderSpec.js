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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.Orders();
describe("Order Model", () => {
    it("should add a order", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            order_status: "pending",
            quantity: 1,
            user_id: 1,
            product_id: 1
        });
        expect(result).toEqual({
            order_status: "pending",
            quantity: 1,
            user_id: 1,
            product_id: 1
        });
    }));
    it("should add a order", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            order_status: "processing",
            quantity: 8,
            user_id: 4,
            product_id: 1
        }, 1);
        expect(result).toEqual({
            order_status: "processing",
            quantity: 8,
            user_id: 4,
            product_id: 1
        });
    }));
    it("index method should return a list of Orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                id: 1,
                order_status: "processing",
                quantity: 8,
                user_id: 4,
                product_id: 7
            }
        ]);
    }));
    it("show method should return the correct Orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show("1");
        expect(result).toEqual({
            id: 1,
            order_status: "pending",
            quantity: 8,
            user_id: 4,
            product_id: 7
        });
    }));
    it("delete method should remove the Product", () => __awaiter(void 0, void 0, void 0, function* () {
        store.delete("1");
        const result = yield store.show("1");
        expect(result).not.toBeDefined();
    }));
});
//# sourceMappingURL=orderSpec.js.map