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
const product_1 = require("../models/product");
const store = new product_1.Products();
describe("product Model", () => {
    const productAya = {
        pid: 7,
        pName: "jaket",
        category: "clothes",
        price: 20
    };
    function createProduct(productAya) {
        return __awaiter(this, void 0, void 0, function* () {
            return store.create(productAya);
        });
    }
    function deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return store.delete(id);
        });
    }
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have a remove method", () => {
        expect(store.delete).toBeDefined();
    });
    it("index method should return a list of productAyas", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield createProduct(productAya);
        const productAyaList = yield store.index();
        expect(productAyaList).toEqual([createdProduct]);
        yield deleteProduct(createdProduct.id);
    }));
});
//# sourceMappingURL=productsModelSpec.js.map