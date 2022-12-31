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
    const userAya = {
        id: 1,
        firstName: "aya",
        email: "aya@aya.com",
        lastName: "ahmed",
        password: "123"
    };
    function createUser(userAya) {
        return __awaiter(this, void 0, void 0, function* () {
            return store.create(userAya);
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
    it("create method that should create a userAya", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(userAya);
        console.log(createdUser);
        const { firstName, lastName, id } = createdUser;
        if (createdUser) {
            expect(firstName).toBe(userAya.firstName);
            expect(lastName).toBe(userAya.lastName);
        }
        yield deleteUser(id);
    }));
    it("index method should return a list of userAyas", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(userAya);
        const userAyaList = yield store.index();
        expect(userAyaList).toEqual([createdUser]);
        yield deleteUser(createdUser.id);
    }));
});
//# sourceMappingURL=userModelSpec.js.map