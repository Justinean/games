"use strict";
// all
var resultText = document.getElementById("result");
var retryButton = document.getElementById("retryButton");
var boards = [];
var endGame = function (result, resetFunction) {
    resultText.textContent = result;
    resultText.style.visibility = "visible";
    document.removeEventListener("click", tictactoeEventListener);
    retryButton.style.visibility = "visible";
    retryButton.addEventListener("click", resetFunction);
};
// tic tac toe
var tictactoeBoard = document.getElementById("tictactoe");
boards.push(tictactoeBoard);
var tempSpaceNumber = 1;
var resetTictactoe = function () {
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
    for (var _i = 0, _a = Array.from(connectBoard.children); _i < _a.length; _i++) {
        var i = _a[_i];
        i.style.backgroundColor = "white";
    }
    retryButton.style.visibility = "hidden";
    resultText.style.visibility = "hidden";
    document.addEventListener("click", connectListener);
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
        if (e.target.id === "tabTictactoe")
            tictactoeBoard.style.display = "inline-grid";
        if (e.target.id === "tabConnect")
            connectBoard.style.display = "flex";
    });
}
