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
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("Test endpoint responses", () => {
    const projectPath = process.cwd();
    it("gets the api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resizing?name=d.jpg&width=1100&height=700");
        expect(response.status).toBe(200);
    }));
    it("should resize image if get correct data from the user and add it to the right folder ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/resizing?name=d.jpg&width=110&height=700");
        const resizedImagePath = projectPath + `/src/resized/110_700_d.jpg`;
        expect(fs_1.default.existsSync(resizedImagePath.toString())).toBeTruthy();
    }));
    it("should throw error if get not valid data from the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resizing?name=dsss.jpg");
        expect(response.body.error).toBe("check ur data in the url");
    }));
});
