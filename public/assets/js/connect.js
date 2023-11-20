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
for (var i = 0; i < 42; i++) {
    var paragraphElement = document.createElement("p");
    paragraphElement.style.border = "1px solid black";
    paragraphElement.setAttribute("id", "".concat(i));
    connectBoard.appendChild(paragraphElement);
}
var checkBelowClick = function (id) {
    var nextRowElement = connectBoard.children[id + 7];
    if (nextRowElement) {
        var computedStyle = window.getComputedStyle(nextRowElement);
        var backgroundColor = computedStyle.getPropertyValue('background-color');
        if (backgroundColor === whiteRGB) {
            return checkBelowClick(id + 7);
        }
    }
    return id;
};
var makePlayerMoveConnect = function (target, player1) { return new Promise(function (resolve, reject) {
    var newId = checkBelowClick(parseInt(target.id));
    var newTarget = connectBoard.children[newId];
    newTarget.style.backgroundColor = player1 ? "red" : "yellow";
    resolve(null);
}); };
var getValidMovesConnect = function () {
    var validMoves = [];
    for (var i = 0; i < connectBoard.children.length; i++) {
        var computedStyle = window.getComputedStyle(connectBoard.children[i]);
        var backgroundColor = computedStyle.getPropertyValue('background-color');
        if (backgroundColor == "rgb\(255, 255, 255\)") {
            validMoves.push(i);
        }
    }
    return validMoves;
};
var makeComputerMoveConnect = function () { return new Promise(function (resolve, reject) {
    var validMoves = getValidMovesConnect();
    var randMove = checkBelowClick(validMoves[Math.floor(Math.random() * validMoves.length)]);
    connectBoard.children[randMove].style.backgroundColor = "red";
    resolve(null);
}); };
var evaluateGameConnect = function () {
    var boardString = "";
    for (var _i = 0, _a = Array.from(connectBoard.children); _i < _a.length; _i++) {
        var i = _a[_i];
        var computedStyle = window.getComputedStyle(i);
        var backgroundColor = computedStyle.getPropertyValue('background-color');
        if (backgroundColor === redRGB)
            boardString += "r";
        if (backgroundColor === yellowRGB)
            boardString += "y";
        if (backgroundColor === whiteRGB)
            boardString += "w";
    }
    for (var i = 0; i < boardString.length; i++) {
        // Vertical Win
        var updownString = "";
        var diagonalString = "";
        var diagonalLeftString = "";
        var ignoreDiagonal = false;
        var ignoreDiagonalLeft = false;
        for (var j = 0; j < 6; j++) {
            updownString += boardString[i + 7 * j] || "z";
            if (i % 8 !== 0)
                ignoreDiagonal = true;
            if (i % 6 !== 0)
                ignoreDiagonalLeft = true;
            if (i % 7 < 4 && !ignoreDiagonal)
                diagonalString += boardString[i + 8 * j] || "z";
            if (i % 7 > 3 && !ignoreDiagonal)
                diagonalLeftString += boardString[i + 6 * j] || "z";
        }
        console.log(updownString, diagonalString, diagonalLeftString, i, boardString[i]);
        if (updownString.length === 6 && updownString.includes("rrrr"))
            return vsComputer ? "CPU wins" : "Player 2 Wins";
        if (updownString.length === 6 && updownString.includes("yyyy"))
            return vsComputer ? "Player wins" : "Player 1 Wins";
        // Horizontal Win
        if (i < 7 && boardString.slice(0 + 7 * i, 7 + 7 * i).includes("rrrr"))
            return vsComputer ? "CPU wins" : "Player 2 wins";
        if (i < 7 && boardString.slice(0 + 7 * i, 7 + 7 * i).includes("yyyy"))
            return vsComputer ? "Player wins" : "Player 1 Wins";
        // Diagonal Win
        if (diagonalString.includes("rrrr"))
            return vsComputer ? "CPU wins" : "Player 2 Wins";
        if (diagonalString.includes("yyyy"))
            return vsComputer ? "Player wins" : "Player 1 Wins";
        if (diagonalLeftString.includes("rrrr"))
            return vsComputer ? "CPU wins" : "Player 2 Wins";
        if (diagonalLeftString.includes("yyyy"))
            return vsComputer ? "Player wins" : "Player 1 Wins";
    }
};
var connectListener = function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var computedStyle, backgroundColor, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                computedStyle = window.getComputedStyle(e.target);
                backgroundColor = computedStyle.getPropertyValue('background-color');
                if (!(connectBoard.contains(e.target) && backgroundColor === whiteRGB))
                    return [2 /*return*/];
                if (!vsComputer) return [3 /*break*/, 2];
                return [4 /*yield*/, makePlayerMoveConnect(e.target)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, makePlayerMoveConnect(e.target, turnCounter % 2 === 0)];
            case 3:
                _a.sent();
                turnCounter++;
                _a.label = 4;
            case 4:
                result = evaluateGameConnect();
                if (result != null)
                    return [2 /*return*/, endGame(result, connectListener, resetConnect)];
                if (!vsComputer) return [3 /*break*/, 6];
                return [4 /*yield*/, makeComputerMoveConnect()];
            case 5:
                _a.sent();
                result = evaluateGameConnect();
                if (result != null)
                    return [2 /*return*/, endGame(result, connectListener, resetConnect)];
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
document.addEventListener("click", connectListener);
