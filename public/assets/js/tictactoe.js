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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
for (var i = 0; i < 9; i++) {
    var paragraphElement = document.createElement("p");
    paragraphElement.setAttribute("id", "".concat(i));
    if (i % 2 !== 0 || i === 4) {
        paragraphElement.style.border = "5px solid black";
        if (i === 4) {
            paragraphElement.style.zIndex = "5";
        }
        else {
            switch (tempSpaceNumber) {
                case 1:
                    paragraphElement.style.borderBottom = "0px solid black";
                    paragraphElement.style.borderTop = "0px solid black";
                    paragraphElement.style.paddingBottom = "5px solid black";
                    break;
                case 2:
                    paragraphElement.style.borderRight = "0px solid black";
                    paragraphElement.style.borderLeft = "0px solid black";
                    paragraphElement.style.paddingRight = "5px solid black";
                    break;
                case 3:
                    paragraphElement.style.borderLeft = "0px solid black";
                    paragraphElement.style.borderRight = "0px solid black";
                    paragraphElement.style.paddingLeft = "5px solid black";
                    break;
                case 4:
                    paragraphElement.style.borderTop = "0px solid black";
                    paragraphElement.style.borderBottom = "0px solid black";
                    break;
            }
            tempSpaceNumber++;
        }
    }
    paragraphElement.textContent = "⬛";
    tictactoeBoard.appendChild(paragraphElement);
}
var getValidMoves = function () {
    var validMoves = [];
    for (var i = 0; i < tictactoeBoard.children.length; i++) {
        if (tictactoeBoard.children[i].textContent === "⬛")
            validMoves.push(i);
    }
    return validMoves;
};
var evaluateGame = function () {
    var boardString = "";
    for (var _i = 0, _a = Array.from(tictactoeBoard.children); _i < _a.length; _i++) {
        var i = _a[_i];
        boardString += i.textContent;
    }
    for (var i = 0; i < 3; i++) {
        // Vertical Win
        if (boardString[i] === boardString[i + 3] && boardString[i] === boardString[i + 6]) {
            if (boardString[i] === "⭕")
                return vsComputer ? "Player Wins" : "Player 1 Wins";
            if (boardString[i] === "❌")
                return vsComputer ? "CPU Wins" : "Player 2 Wins";
        }
        // Horizontal Win
        if (boardString.slice(0 + i * 3, 3 + i * 3).match(/⭕⭕⭕/) != null)
            return vsComputer ? "Player Wins" : "Player 1 Wins";
        if (boardString.slice(0 + i * 3, 3 + i * 3).match(/❌❌❌/) != null)
            return vsComputer ? "CPU Wins" : "Player 2 Wins";
        // Diagonal Win
        if ((boardString[i] === boardString[i + 4] && boardString[i] === boardString[i + 8]) || (boardString[i] === boardString[i + 2] && boardString[i] === boardString[i + 4] && i === 2)) {
            if (boardString[i] === "⭕")
                return vsComputer ? "Player Wins" : "Player 1 Wins";
            if (boardString[i] === "❌")
                return vsComputer ? "CPU Wins" : "Player 2 Wins";
        }
    }
    return null;
};
var makeComputerMove = function () { return new Promise(function (resolve, reject) {
    var validMoves = getValidMoves();
    var result = evaluateGame();
    if (validMoves.length <= 0 && result === null)
        resolve(endGame("Draw", tictactoeEventListener, resetTictactoe));
    tictactoeBoard.children[validMoves[Math.floor(Math.random() * validMoves.length)]].textContent = "❌";
    resolve(null);
}); };
var tictactoeEventListener = function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!tictactoeBoard.contains(e.target))
                    return [2 /*return*/];
                if (!(tictactoeBoard.contains(e.target) && e.target.textContent === "⬛"))
                    return [2 /*return*/];
                if (vsComputer) {
                    e.target.textContent = "⭕";
                }
                else {
                    if (turnCounter % 2 === 0) {
                        e.target.textContent = "❌";
                    }
                    else {
                        e.target.textContent = "⭕";
                    }
                    turnCounter++;
                }
                result = evaluateGame();
                if (result != null)
                    return [2 /*return*/, endGame(result, tictactoeEventListener, resetTictactoe)];
                if (!vsComputer) return [3 /*break*/, 2];
                return [4 /*yield*/, makeComputerMove()];
            case 1:
                _a.sent();
                result = evaluateGame();
                if (result != null)
                    return [2 /*return*/, endGame(result, tictactoeEventListener, resetTictactoe)];
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
document.addEventListener("click", tictactoeEventListener);
/*
❌⭕⬛
*/ 
