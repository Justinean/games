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

const makePlayerMoveConnect = (target: HTMLParagraphElement) => new Promise((resolve, reject) => {
    let newId = checkBelowClick(parseInt(target.id));
    let newTarget = connectBoard.children[newId];
    (newTarget as HTMLParagraphElement).style.backgroundColor = "yellow";
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
        for (let j = 0; j < 6; j++) {
            updownString += boardString[i+7*j] || "z";
            if (i % 7 < 4) diagonalString += boardString[i+8*j] || "z";
            if (i % 7 >= 3) diagonalLeftString += boardString[i+6*j] || "z";
        }
        if (updownString.length === 6 && updownString.includes("rrrr")) return "CPU wins";
        if (updownString.length === 6 && updownString.includes("yyyy")) return "Player wins"
        // Horizontal Win
        if (i < 7 && boardString.slice(0 + 7*i, 7 + 7*i).includes("rrrr")) return "CPU wins";
        if (i < 7 && boardString.slice(0 + 7*i, 7 + 7*i).includes("yyyy")) return "Player wins";

        // Diagonal Win
        console.log(diagonalString);
        if (diagonalString.includes("rrrr")) return "CPU wins";
        if (diagonalString.includes("yyyy")) return "Player wins";
        if (diagonalLeftString.includes("rrrr")) return "CPU wins";
        if (diagonalLeftString.includes("yyyy")) return "Player wins";
    }
}

const connectListener = async (e: MouseEvent) => {
    const computedStyle = window.getComputedStyle(e.target as HTMLElement);
    const backgroundColor = computedStyle.getPropertyValue('background-color');
    console.log(backgroundColor)
    if (!(connectBoard.contains(e.target as Node) && backgroundColor === whiteRGB)) return;
    await makePlayerMoveConnect(e.target as HTMLParagraphElement);
    let result = evaluateGameConnect();
    if (result != null) return endGame(result, resetConnect);
    await makeComputerMoveConnect();
    result = evaluateGameConnect();
    if (result != null) return endGame(result, resetConnect);
}

document.addEventListener("click", connectListener);