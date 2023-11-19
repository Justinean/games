getHangmanWord();

const endHangman = (result: string) => {
    console.log(result)
    hangmanSpaces.textContent = hangmanWord;
    hangmanSubmit.style.display = "none";
    hangmanInput.style.display = "none";
    endGame(result, handleHangmanSubmit, resetHangman)
}

const handleHangmanSubmit = (e: Event) => {
    console.log("boo");
    if (hangmanInput.value == null || hangmanInput.value === "" || (hangmanGuessed.textContent as string).includes(hangmanInput.value)) return hangmanInput.value = "";
    if (hangmanInput.value?.length === 1) {
        console.log(hangmanWord.includes(hangmanInput.value))
        if (hangmanWord.includes(hangmanInput.value)) {
            let newGuessed = (hangmanSpaces.textContent as string).split("");
            for (let i = 0; i < newGuessed.length; i++) {
                console.log(hangmanWord.split("")[i] === hangmanInput.value)
                if (hangmanWord.split("")[i] === hangmanInput.value.toLowerCase() && hangmanInput.value !== " ") newGuessed[i] = hangmanInput.value;
            }
            console.log(hangmanSpaces.textContent)
            hangmanSpaces.textContent = newGuessed.join("");
        } else {
            wrongGuesses++;
            hangmanCovers[wrongGuesses - 1].style.visibility = "hidden";
            if (wrongGuesses > 7) endHangman("You lose");
        }
        hangmanGuessed.textContent = hangmanGuessed.textContent + hangmanInput.value;
    } else if (hangmanInput.value?.length === hangmanWord.length) {
        endHangman("You lose");
        for (let i of Array.from(hangmanCovers)) {
            i.style.visibility = "hidden";
        }
    }
    hangmanInput.value = "";
}

hangmanSubmit.addEventListener("click", handleHangmanSubmit)
document.addEventListener("keypress", (e: KeyboardEvent) => {
    if (currentTab === "hangman") {
        if (e.key === "Enter") {
            return handleHangmanSubmit(e);
        }
        if (hangmanInput !== document.activeElement) hangmanInput.value += e.key;
    }
})