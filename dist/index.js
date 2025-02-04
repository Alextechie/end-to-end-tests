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
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./utils/db");
exports.app = (0, express_1.default)();
exports.port = 4000;
// middleware
exports.app.use(express_1.default.json());
// routes
exports.app.get("/", (req, res) => {
    res.json({ message: "This is the home route in the backend server" });
});
exports.app.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the data from a client
    const { a, b } = req.body;
    const result = a + b;
    if (a > 100000 || b > 1000000) {
        res.status(422).json({
            message: "Sorry we don't support big numbers."
        });
    }
    const request = yield db_1.prisma.request.create({
        data: {
            a,
            b,
            answer: result,
            type: "sum"
        }
    });
    res.json({ answer: result, id: request.id });
    // store the answer and the data into the database
}));
