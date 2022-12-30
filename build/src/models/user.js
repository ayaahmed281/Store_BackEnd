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
exports.Users = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class Users {
    authenticateUser(pass, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT password FROM users WHERE email=($1)";
                const { BCRYPT_PASSWORD } = process.env;
                const result = yield conn.query(sql, [email]);
                if (result.rows.length) {
                    const { password } = result.rows[0];
                    const isExist = bcrypt_1.default.compareSync(`${pass}${BCRYPT_PASSWORD}`, password);
                    if (isExist) {
                        const sql = "SELECT id, email, firstName, lastName FROM users WHERE email=($1)";
                        const result = yield conn.query(sql, [email]);
                        return result.rows[0];
                    }
                }
                return null;
            }
            catch (err) {
                return null;
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT id, email, firstName, lastName FROM users";
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
                const sql = "SELECT id, email, firstName, lastName FROM users WHERE id=($1)";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                return new Error(`there is an error in ${id}: ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email";
                const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
                const hash = BCRYPT_PASSWORD &&
                    SALT_ROUNDS &&
                    user.password &&
                    bcrypt_1.default.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                const result = yield conn.query(sql, [user.firstName, user.lastName, user.email, hash]);
                const users = result.rows[0];
                conn.release();
                return users;
            }
            catch (err) {
                return new Error(`there is an error in ${user.firstName}: ${err}`);
            }
        });
    }
    update(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id = ${id} RETURNING id, firstName, lastName, email`;
                const result = yield conn.query(sql, [user.firstName, user.lastName, user.email]);
                const userUpdated = result.rows[0];
                conn.release();
                return userUpdated;
            }
            catch (err) {
                return new Error(`there is an error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM users WHERE id=($1)";
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                return new Error(`there is an error in ${id}: ${err}`);
            }
        });
    }
}
exports.Users = Users;
