"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const helpers_1 = require("../helpers");
const request = (0, supertest_1.default)(index_1.default);
const token = (0, helpers_1.createJWTToken)(1, "bearer");
describe("User handler: ", () => {
    it("/user should add order ", () => {
        const data = {
            firstName: "aya",
            lastName: "Ahmed",
            email: "a@a.com",
            password: "123"
        };
        request
            .post("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .send(data)
            .expect("Content-Type", "application/json")
            .expect(201)
            .expect({
            statusCode: 200,
            message: "user has been succesfully created.",
            data: {
                firstName: "aya",
                lastName: "Ahmed",
                email: "a@a.com",
                password: "123"
            },
            token
        });
    });
    it("api/users should update user", () => {
        const data = [
            {
                id: 4,
                email: "a@a.com",
                firstName: "aya",
                lastName: "Ahmed"
            }
        ];
        request
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", "application/json")
            .expect(data);
    });
    it("/api/users/1", () => {
        const data = {
            firstName: "Aya",
            lastName: "Ahmed",
            email: "a@a.com",
            password: "123"
        };
        request
            .put("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .send(data)
            .expect({
            statusCode: 200,
            message: "D",
            data: {
                firstName: "Aya",
                lastName: "Ahmed",
                email: "a@a.com"
            }
        });
    });
});
//# sourceMappingURL=userHandlerSpect.js.map