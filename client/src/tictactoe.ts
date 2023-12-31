for (let i = 0; i < 9; i++) {
    const paragraphElement = document.createElement("p")
    paragraphElement.setAttribute("id", `${i}`)
    if (i % 2 !== 0 || i === 4) {
        paragraphElement.style.border = "5px solid black"
        if (i === 4) {
            paragraphElement.style.zIndex = "5";
        } else {
            switch (tempSpaceNumber) {
                case 1:
                    paragraphElement.style.borderBottom = "0px solid black"
                    paragraphElement.style.borderTop = "0px solid black"
                    paragraphElement.style.paddingBottom = "5px solid black"
                    break;
                case 2:
                    paragraphElement.style.borderRight = "0px solid black"
                    paragraphElement.style.borderLeft = "0px solid black"
                    paragraphElement.style.paddingRight = "5px solid black"
                    break;
                case 3:
                    paragraphElement.style.borderLeft = "0px solid black"
                    paragraphElement.style.borderRight = "0px solid black"
                    paragraphElement.style.paddingLeft = "5px solid black"
                    break;
                case 4:
                    paragraphElement.style.borderTop = "0px solid black"
                    paragraphElement.style.borderBottom = "0px solid black"
                    break;
            }
        tempSpaceNumber++;
        }
    }
    paragraphElement.textContent = "⬛"
    tictactoeBoard.appendChild(paragraphElement)
}

const getValidMoves = () => {
    const validMoves = []
    for (let i = 0; i < tictactoeBoard.children.length; i++) {
        if (tictactoeBoard.children[i].textContent === "⬛")
        validMoves.push(i);
    }
    return validMoves;
}

const evaluateGame = (): string | null => {
    let boardString = "";
    for (let i of Array.from(tictactoeBoard.children)) {
        boardString += i.textContent
    }

    for (let i = 0; i < 3; i++) {
        // Vertical Win
        if (boardString[i] === boardString[i+3] && boardString[i] === boardString[i+6]) {
            if (boardString[i] === "⭕") return vsComputer ? "Player Wins" : "Player 1 Wins";
            if (boardString[i] === "❌") return vsComputer ? "CPU Wins": "Player 2 Wins";
        }
        // Horizontal Win
        if (boardString.slice(0+i*3, 3+i*3).match(/⭕⭕⭕/) != null) return vsComputer ? "Player Wins" : "Player 1 Wins";
        if (boardString.slice(0+i*3, 3+i*3).match(/❌❌❌/) != null) return vsComputer ? "CPU Wins": "Player 2 Wins";
        // Diagonal Win
        if ((boardString[i] === boardString[i+4] && boardString[i] === boardString[i+8]) || (boardString[i] === boardString[i+2] && boardString[i] === boardString[i+4] && i === 2)) {
            if (boardString[i] === "⭕") return vsComputer ? "Player Wins" : "Player 1 Wins";
            if (boardString[i] === "❌") return vsComputer ? "CPU Wins": "Player 2 Wins";
        }
    }

    return null;
}

const makeComputerMove = () => new Promise((resolve, reject) => {
    const validMoves = getValidMoves();
    let result = evaluateGame();
    if (validMoves.length <= 0 && result === null) resolve(endGame("Draw", tictactoeEventListener, resetTictactoe));
    tictactoeBoard.children[validMoves[Math.floor(Math.random() * validMoves.length)]].textContent = "❌";
    resolve(null)
})

const tictactoeEventListener: EventListener = async (e: Event) => {
    if (!tictactoeBoard.contains(e.target as Node)) return;
    if (!(tictactoeBoard.contains((e.target as HTMLParagraphElement)) && (e.target as HTMLParagraphElement).textContent === "⬛")) return;
    if (vsComputer) {
        (e.target as HTMLParagraphElement).textContent = "⭕";
    } else {
        if (turnCounter % 2 === 0) {
            (e.target as HTMLParagraphElement).textContent = "❌";
        } else {
            (e.target as HTMLParagraphElement).textContent = "⭕";
        }
        turnCounter++;
    }
    let result = evaluateGame();
    if (result != null) return endGame(result, tictactoeEventListener, resetTictactoe);
    if (Array.from((e.target as HTMLParagraphElement).parentElement?.children as HTMLCollection).filter((item) => item.textContent === "⬛").length <= 0) return endGame("Draw", tictactoeEventListener, resetTictactoe)
    if (vsComputer) {
        await makeComputerMove();
        result = evaluateGame();
        if (result != null) return endGame(result, tictactoeEventListener, resetTictactoe);
    }
}

document.addEventListener("click", tictactoeEventListener)

/*
❌⭕⬛
*/