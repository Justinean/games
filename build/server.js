"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "..", 'public')));
app.use;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, parameterLimit: 50000 }));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", 'public', "index.html"));
});
app.get("/hangman/words", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "assets", "json", "hangmanWords.json"));
});
app.listen(port, () => {
    console.log(`Main server listening on port ${port}`);
});
