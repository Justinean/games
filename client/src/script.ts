// all
const resultText = document.getElementById("result") as HTMLElement;
const retryButton = document.getElementById("retryButton") as HTMLElement;
const vsComputerBox = document.getElementById("vsComputer") as HTMLInputElement;
let currentTab: string;
let vsComputer = vsComputerBox.checked;
let turnCounter = 1;
const boards = [] as HTMLElement[];
const endGame = (result: string, gameEventListener: EventListener, resetFunction: EventListener) => {
    resultText.textContent = result;
    resultText.style.visibility = "visible";
    document.removeEventListener("click", gameEventListener);
    retryButton.style.visibility = "visible";
    retryButton.addEventListener("click", resetFunction);
}

vsComputerBox.addEventListener("change", (e: Event) => {
    vsComputer = (e.target as HTMLInputElement).checked;
    vsComputer ? hangmanCategoryElement.style.visibility = "visible" : hangmanCategoryElement.style.visibility = "hidden";
    if (currentTab === "tictactoe") resetTictactoe();
    if (currentTab === "connect") resetConnect();
})

// tic tac toe
const tictactoeBoard = document.getElementById("tictactoe") as HTMLElement;
boards.push(tictactoeBoard);
let tempSpaceNumber = 1;
const resetTictactoe = () => {
    turnCounter = 1;
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
    turnCounter = 1;
    for (let i of Array.from(connectBoard.children)) {
        (i as HTMLParagraphElement).style.backgroundColor = "white";
    }
    retryButton.style.visibility = "hidden";
    resultText.style.visibility = "hidden";
    document.addEventListener("click", connectListener);
}

interface hangmanWordsType {
    type: string;
    words: string[]
}

// hangman
const hangmanBoard = document.getElementById("hangman") as HTMLElement;
const hangmanCovers = document.getElementsByClassName("hangmanCover") as HTMLCollectionOf<HTMLDivElement>
const hangmanSubmit = document.getElementById("hangmanSubmit") as HTMLInputElement;
const hangmanInput = document.getElementById("hangmanInput") as HTMLInputElement;
const hangmanSpaces = document.getElementById("hangmanSpaces") as HTMLDivElement;
const hangmanGuessed = document.getElementById("hangmanGuessed") as HTMLDivElement;
const hangmanCategoryElement = document.getElementById("hangmanCategory") as HTMLElement;
let hangmanCategory: string;
let hangmanWord: string;
const fetchData = async () => new Promise(async (resolve, reject)  => {
    const response = await fetch("/hangman/words", {method: "GET"});
    const data = await response.json();
    resolve(data.categories);
})
const hangmanWords = fetchData() as Promise<hangmanWordsType[]>;
const guessed = [];
let wrongGuesses = 0;
boards.push(hangmanBoard);

const getHangmanWord = async () => {
    const categories = await hangmanWords;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    hangmanCategory = randomCategory.type;
    hangmanWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
    hangmanCategoryElement.textContent = hangmanCategory;
    hangmanSpaces.textContent = hangmanWord.split("").map((item) => item !== " " ? "_" : " ").join("");
    hangmanCategoryElement.style.visibility = "hidden";
    vsComputerBox.checked = false;
}

const resetHangman = () => {
    resultText.style.visibility = "hidden";
    retryButton.style.visibility = "hidden";
    hangmanSubmit.style.display = "block";
    hangmanInput.style.display = "block";
    getHangmanWord();
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
        if ((e.target as HTMLElement).id === "tabTictactoe") {
            tictactoeBoard.style.display = "inline-grid";
            (vsComputerBox.parentElement as HTMLElement).style.top = "0px";
            retryButton.style.top = "0px";
            (vsComputerBox.parentElement as HTMLElement).style.display = "block";
            ((vsComputerBox.parentElement as HTMLElement).children[1] as HTMLElement).textContent = "Play vs Computer"
            currentTab = "tictactoe"
        }
        if ((e.target as HTMLElement).id === "tabConnect") {
            connectBoard.style.display = "flex";
            (vsComputerBox.parentElement as HTMLElement).style.top = "100px";
            retryButton.style.top = "100px";
            (vsComputerBox.parentElement as HTMLElement).style.display = "block";
            ((vsComputerBox.parentElement as HTMLElement).children[1] as HTMLElement).textContent = "Play vs Computer"
            currentTab = "connect"
        }
        if ((e.target as HTMLElement).id === "tabHangman") {
            hangmanBoard.style.display = "flex";
            (vsComputerBox.parentElement as HTMLElement).style.top = "0px";
            (vsComputerBox.parentElement as HTMLElement).style.display = "block";
            ((vsComputerBox.parentElement as HTMLElement).children[1] as HTMLElement).textContent = "Show Category Name"
            currentTab = "hangman"
        }
    })
}
