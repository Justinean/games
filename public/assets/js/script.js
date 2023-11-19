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
// all
var resultText = document.getElementById("result");
var retryButton = document.getElementById("retryButton");
var vsComputerBox = document.getElementById("vsComputer");
var currentTab;
var vsComputer = vsComputerBox.checked;
var turnCounter = 1;
var boards = [];
var endGame = function (result, gameEventListener, resetFunction) {
    resultText.textContent = result;
    resultText.style.visibility = "visible";
    document.removeEventListener("click", gameEventListener);
    retryButton.style.visibility = "visible";
    retryButton.addEventListener("click", resetFunction);
};
vsComputerBox.addEventListener("change", function (e) {
    vsComputer = e.target.checked;
    vsComputer ? hangmanCategoryElement.style.visibility = "visible" : hangmanCategoryElement.style.visibility = "hidden";
    if (currentTab === "tictactoe")
        resetTictactoe();
    if (currentTab === "connect")
        resetConnect();
});
// tic tac toe
var tictactoeBoard = document.getElementById("tictactoe");
boards.push(tictactoeBoard);
var tempSpaceNumber = 1;
var resetTictactoe = function () {
    turnCounter = 1;
    for (var i = 0; i < tictactoeBoard.children.length; i++) {
        tictactoeBoard.children[i].textContent = "⬛";
    }
    retryButton.style.visibility = "hidden";
    resultText.style.visibility = "hidden";
    document.addEventListener("click", tictactoeEventListener);
};
// connect 4
var connectBoard = document.getElementById("connect");
boards.push(connectBoard);
var redRGB = "rgb(255, 0, 0)";
var yellowRGB = "rgb(255, 255, 0)";
var whiteRGB = "rgb(255, 255, 255)";
var resetConnect = function () {
    turnCounter = 1;
    for (var _i = 0, _a = Array.from(connectBoard.children); _i < _a.length; _i++) {
        var i = _a[_i];
        i.style.backgroundColor = "white";
    }
    retryButton.style.visibility = "hidden";
    resultText.style.visibility = "hidden";
    document.addEventListener("click", connectListener);
};
// hangman
var hangmanBoard = document.getElementById("hangman");
var hangmanCovers = document.getElementsByClassName("hangmanCover");
var hangmanSubmit = document.getElementById("hangmanSubmit");
var hangmanInput = document.getElementById("hangmanInput");
var hangmanSpaces = document.getElementById("hangmanSpaces");
var hangmanGuessed = document.getElementById("hangmanGuessed");
var hangmanCategoryElement = document.getElementById("hangmanCategory");
var hangmanCategory;
var hangmanWord;
var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("/hangman/words", { method: "GET" })];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            resolve(data.categories);
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
var hangmanWords = fetchData();
var guessed = [];
var wrongGuesses = 0;
boards.push(hangmanBoard);
var getHangmanWord = function () { return __awaiter(void 0, void 0, void 0, function () {
    var categories, randomCategory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hangmanWords];
            case 1:
                categories = _a.sent();
                randomCategory = categories[Math.floor(Math.random() * categories.length)];
                hangmanCategory = randomCategory.type;
                hangmanWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
                hangmanCategoryElement.textContent = hangmanCategory;
                hangmanSpaces.textContent = hangmanWord.split("").map(function (item) { return item !== " " ? "_" : " "; }).join("");
                hangmanCategoryElement.style.visibility = "hidden";
                vsComputerBox.checked = false;
                return [2 /*return*/];
        }
    });
}); };
var resetHangman = function () {
    resultText.style.visibility = "hidden";
    retryButton.style.visibility = "hidden";
    hangmanSubmit.style.display = "block";
    hangmanInput.style.display = "block";
    for (var _i = 0, _a = Array.from(hangmanCovers); _i < _a.length; _i++) {
        var i = _a[_i];
        i.style.visibility = "hidden";
    }
    getHangmanWord();
};
// others
// init
for (var i = 1; i < boards.length; i++) {
    boards[i].style.display = "none";
}
// Tab Handler
var tabButtons = document.getElementsByClassName("tabButton");
for (var _i = 0, _a = Array.from(tabButtons); _i < _a.length; _i++) {
    var i = _a[_i];
    i.addEventListener("click", function (e) {
        for (var _i = 0, boards_1 = boards; _i < boards_1.length; _i++) {
            var j = boards_1[_i];
            j.style.display = "none";
            resetTictactoe();
        }
        if (e.target.id === "tabTictactoe") {
            tictactoeBoard.style.display = "inline-grid";
            vsComputerBox.parentElement.style.top = "0px";
            retryButton.style.top = "0px";
            vsComputerBox.parentElement.style.display = "block";
            vsComputerBox.parentElement.children[1].textContent = "Play vs Computer";
            currentTab = "tictactoe";
        }
        if (e.target.id === "tabConnect") {
            connectBoard.style.display = "flex";
            vsComputerBox.parentElement.style.top = "100px";
            retryButton.style.top = "100px";
            vsComputerBox.parentElement.style.display = "block";
            vsComputerBox.parentElement.children[1].textContent = "Play vs Computer";
            currentTab = "connect";
        }
        if (e.target.id === "tabHangman") {
            hangmanBoard.style.display = "flex";
            vsComputerBox.parentElement.style.top = "0px";
            vsComputerBox.parentElement.style.display = "block";
            vsComputerBox.parentElement.children[1].textContent = "Show Category Name";
            currentTab = "hangman";
        }
    });
}
