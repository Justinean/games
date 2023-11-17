// all
const resultText = document.getElementById("result") as HTMLElement;
const retryButton = document.getElementById("retryButton") as HTMLElement;
const boards = [] as HTMLElement[];
const endGame = (result: string, resetFunction: EventListener) => {
    resultText.textContent = result;
    resultText.style.visibility = "visible";
    document.removeEventListener("click", tictactoeEventListener);
    retryButton.style.visibility = "visible";
    retryButton.addEventListener("click", resetFunction);
}

// tic tac toe
const tictactoeBoard = document.getElementById("tictactoe") as HTMLElement;
boards.push(tictactoeBoard);
let tempSpaceNumber = 1;
const resetTictactoe = () => {
    for (let i = 0; i < tictactoeBoard.children.length; i++) {
        tictactoeBoard.children[i].textContent = "⬛"
    }
    retryButton.style.visibility = "hidden";
    resultText.style.visibility = "hidden";
    document.addEventListener("click", tictactoeEventListener);
}

// connect 4
const connectBoard = document.getElementById("connect") as HTMLElement;
boards.push(connectBoard);
const redRGB = "rgb(255, 0, 0)"
const yellowRGB = "rgb(255, 255, 0)"
const whiteRGB = "rgb(255, 255, 255)"
const resetConnect = () => {
    for (let i of Array.from(connectBoard.children)) {
        (i as HTMLParagraphElement).style.backgroundColor = "white";
    }
    retryButton.style.visibility = "hidden";
    resultText.style.visibility = "hidden";
    document.addEventListener("click", connectListener);
}

// others

// init
for (let i = 1; i < boards.length; i++) {
    boards[i].style.display = "none"
}

// Tab Handler
const tabButtons = document.getElementsByClassName("tabButton") as HTMLCollectionOf<Element>;

for (let i of Array.from(tabButtons)) {
    i.addEventListener("click", (e) => {
        for (let j of boards) {
            j.style.display = "none";
            resetTictactoe();
        }
        if ((e.target as HTMLElement).id === "tabTictactoe") tictactoeBoard.style.display = "inline-grid";
        if ((e.target as HTMLElement).id === "tabConnect") connectBoard.style.display = "flex";
    })
}
