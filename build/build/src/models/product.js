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
exports.Products = void 0;
const database_1 = __importDefault(require("../database"));
class Products {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM products";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                return new Error(`there is an error: ${err}`);
            }
        });
    }
    show(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM products WHERE pid=($1)";
                const result = yield conn.query(sql, [pid]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                return new Error(`there is an error ${pid}. in : ${err}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO products (p_name, price, category) VALUES($1, $2, $3) RETURNING *";
                const result = yield conn.query(sql, [product.pName, product.price, product.category]);
                const products = result.rows[0];
                conn.release();
                return products;
            }
            catch (err) {
                return new Error(`there is an error  ${product.pName}. in : ${err}`);
            }
        });
    }
    update(product, pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE products SET pName = $1, price = $2, category = $3 WHERE pid = ${pid} RETURNING pid, p_name, price, category`;
                const result = yield conn.query(sql, [product === null || product === void 0 ? void 0 : product.pName, product === null || product === void 0 ? void 0 : product.price, product === null || product === void 0 ? void 0 : product.category]);
                const products = result.rows[0];
                conn.release();
                return products;
            }
            catch (err) {
                return new Error(`there is an error  ${product.pName}. in : ${err}`);
            }
        });
    }
    delete(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM products WHERE pid=($1)";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [pid]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                return new Error(`there is an error  ${pid}. in : ${err}`);
            }
        });
    }
}
exports.Products = Products;
