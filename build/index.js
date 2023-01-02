"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const order_1 = __importDefault(require("./handelers/order"));
const product_1 = __importDefault(require("./handelers/product"));
const user_1 = __importDefault(require("./handelers/user"));
const app = (0, express_1.default)();
app.listen("54242", () => {
    console.log(`Server is starting at prot:${54242}`);
});
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("hello world");
});
app.use("/api", product_1.default);
app.use("/api", user_1.default);
app.use("/api", order_1.default);
// app.get("/books", function (req, res) {
//   try {
//     res.send("get all books")
//   } catch (err) {
//     res.status(400)
//     res.json(err)
//   }
// })
// app.get("/books/:id", function (req, res) {
//   try {
//     res.send("get book by id")
//   } catch (err) {
//     res.status(400)
//     res.json(err)
//   }
// })
// app.delete("/books", function (req, res) {
//   try {
//     res.send("delete all books")
//   } catch (err) {
//     res.status(400)
//     res.json(err)
//   }
// })
exports.default = app;
//# sourceMappingURL=index.js.map