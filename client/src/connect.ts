for(let i = 0; i < 42; i++) {
    const paragraphElement = document.createElement("p");
    paragraphElement.style.border = "1px solid black";
    paragraphElement.setAttribute("id", `${i}`);
    connectBoard.appendChild(paragraphElement);
}

const checkBelowClick = (id: number): number => {
    const nextRowElement = connectBoard.children[id + 7] as HTMLElement;
    if (nextRowElement) {
        const computedStyle = window.getComputedStyle(nextRowElement);
        const backgroundColor = computedStyle.getPropertyValue('background-color');

        if (backgroundColor === whiteRGB) {
            return checkBelowClick(id + 7);
        }
    }
    
    return id;
}

const makePlayerMoveConnect = (target: HTMLParagraphElement, player1?: boolean) => new Promise((resolve, reject) => {
    let newId = checkBelowClick(parseInt(target.id));
    let newTarget = connectBoard.children[newId];
    (newTarget as HTMLParagraphElement).style.backgroundColor = player1 ? "red" : "yellow";
    resolve(null);
})

const getValidMovesConnect = () => {
    const validMoves = []
    for (let i = 0; i < connectBoard.children.length; i++) {
        const computedStyle = window.getComputedStyle(connectBoard.children[i]);
        const backgroundColor = computedStyle.getPropertyValue('background-color');

        if (backgroundColor == "rgb\(255, 255, 255\)") {
            validMoves.push(i);
        }
    }
    return validMoves;
}

const makeComputerMoveConnect = () => new Promise((resolve, reject) => {
    const validMoves = getValidMovesConnect();
    let randMove = checkBelowClick(validMoves[Math.floor(Math.random() * validMoves.length)]);
    (connectBoard.children[randMove] as HTMLParagraphElement).style.backgroundColor = "red";
    resolve(null);
})

const evaluateGameConnect = () => {
    let boardString = "";
    for (let i of Array.from(connectBoard.children)) {
        const computedStyle = window.getComputedStyle(i);
        const backgroundColor = computedStyle.getPropertyValue('background-color');

        if (backgroundColor === redRGB) boardString += "r";
        if (backgroundColor === yellowRGB) boardString += "y";
        if (backgroundColor === whiteRGB) boardString += "w";
    }
    for (let i = 0; i < boardString.length; i++) {
        // Vertical Win
        let updownString = "";
        let diagonalString = "";
        let diagonalLeftString = "";
        let ignoreDiagonal = false;
        let ignoreDiagonalLeft = false;
        for (let j = 0; j < 6; j++) {
            updownString += boardString[i+7*j] || "z";
            if (i % 8 !== 0) ignoreDiagonal = true;
            if (i % 6 !== 0) ignoreDiagonalLeft = true;
            if (i % 7 < 4 && !ignoreDiagonal) diagonalString += boardString[i+8*j] || "z";
            if (i % 7 > 3 && !ignoreDiagonal) diagonalLeftString += boardString[i+6*j] || "z";
        }
        console.log(updownString, diagonalString, diagonalLeftString, i, boardString[i])
        if (updownString.length === 6 && updownString.includes("rrrr")) return vsComputer ? "CPU wins" : "Player 2 Wins";
        if (updownString.length === 6 && updownString.includes("yyyy")) return vsComputer ? "Player wins" : "Player 1 Wins";
        // Horizontal Win
        if (i < 7 && boardString.slice(0 + 7*i, 7 + 7*i).includes("rrrr")) return vsComputer ? "CPU wins" : "Player 2 wins";
        if (i < 7 && boardString.slice(0 + 7*i, 7 + 7*i).includes("yyyy")) return vsComputer ? "Player wins" : "Player 1 Wins";

        // Diagonal Win
        if (diagonalString.includes("rrrr")) return vsComputer ? "CPU wins" : "Player 2 Wins";
        if (diagonalString.includes("yyyy")) return vsComputer ? "Player wins" : "Player 1 Wins";
        if (diagonalLeftString.includes("rrrr")) return vsComputer ? "CPU wins" : "Player 2 Wins";
        if (diagonalLeftString.includes("yyyy")) return vsComputer ? "Player wins" : "Player 1 Wins";
    }
}

const connectListener = async (e: Event) => {
    const computedStyle = window.getComputedStyle(e.target as HTMLElement);
    const backgroundColor = computedStyle.getPropertyValue('background-color');
    if (!(connectBoard.contains(e.target as Node) && backgroundColor === whiteRGB)) return;
    if (vsComputer) {
        await makePlayerMoveConnect(e.target as HTMLParagraphElement);
    } else {
        await makePlayerMoveConnect(e.target as HTMLParagraphElement, turnCounter % 2 === 0);
        turnCounter++;
    }
    let result = evaluateGameConnect();
    if (result != null) return endGame(result, connectListener, resetConnect) as void;
    if (vsComputer) {
        await makeComputerMoveConnect();
        result = evaluateGameConnect();
        if (result != null) return endGame(result, connectListener, resetConnect) as void;
    }
}

document.addEventListener("click", connectListener);