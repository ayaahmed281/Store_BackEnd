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
const user_1 = require("../models/user");
const store = new user_1.Users();
describe("User Model", () => {
    const user = {
        id: 1,
        firstName: "aya",
        email: "aya@aya.com",
        lastName: "ahmed",
        password: "password123"
    };
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return store.create(user);
        });
    }
    function deleteUser(id) {
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
    it("create method should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const { firstName, lastName, id } = createdUser;
        if (createdUser) {
            expect(firstName).toBe(user.firstName);
            expect(lastName).toBe(user.lastName);
        }
        yield deleteUser(id);
    }));
    it("index method should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const userList = yield store.index();
        expect(userList).toEqual([createdUser]);
        yield deleteUser(createdUser.id);
    }));
});
//# sourceMappingURL=user_model.test.js.map