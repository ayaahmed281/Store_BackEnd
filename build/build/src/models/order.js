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
exports.Orders = void 0;
const database_1 = __importDefault(require("../database"));
class Orders {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                return new Error(`there is an error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id=($1)";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                return new Error(`there is an error ${id}. Error: ${err}`);
            }
        });
    }
    create(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO orders (order_status, quantity, product_id, user_id) VALUES($1, $2, $3, $4) RETURNING *";
                const result = yield conn.query(sql, [
                    orderData.order_status,
                    orderData.quantity,
                    orderData.product_id,
                    orderData.user_id
                ]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                return new Error(`there is an error: ${err}`);
            }
        });
    }
    update(order, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `UPDATE orders SET order_status = $1, quantity = $2, product_id = $3, user_id= $4 WHERE id = ${id} RETURNING pid, p_name, price, category`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    order.order_status,
                    order.quantity,
                    order.product_id,
                    order.user_id
                ]);
                const orders = result.rows[0];
                conn.release();
                return orders;
            }
            catch (err) {
                return new Error(`there is an error in  ${order.id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM orders WHERE id=($1)";
                const result = yield conn.query(sql, [id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                return new Error(`there is an error ${id}. Error: ${err}`);
            }
        });
    }
    addProductWithOrder(productPlusOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO ordersProducts (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
                const result = yield conn.query(sql, [
                    productPlusOrder.order_id,
                    productPlusOrder.product_id,
                    productPlusOrder.quantity
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                return new Error(`there is an error: ${err}`);
            }
        });
    }
}
exports.Orders = Orders;
