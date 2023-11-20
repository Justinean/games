getHangmanWord();

const endHangman = (result: string) => {
    hangmanSpaces.textContent = hangmanWord;
    hangmanSubmit.style.display = "none";
    hangmanInput.style.display = "none";
    endGame(result, handleHangmanSubmit, resetHangman)
}

const handleHangmanSubmit = (e: Event) => {
    if (hangmanInput.value == null || hangmanInput.value === "" || (hangmanGuessed.textContent as string).includes(hangmanInput.value)) return hangmanInput.value = "";
    if (hangmanInput.value?.length === 1) {
        if (hangmanWord.includes(hangmanInput.value)) {
            let newGuessed = (hangmanSpaces.textContent as string).split("");
            for (let i = 0; i < newGuessed.length; i++) {
                if (hangmanWord.split("")[i] === hangmanInput.value.toLowerCase() && hangmanInput.value !== " ") newGuessed[i] = hangmanInput.value;
            }
            hangmanSpaces.textContent = newGuessed.join("");
        } else {
            wrongGuesses++;
            hangmanCovers[wrongGuesses - 1].style.visibility = "hidden";
            if (wrongGuesses > 7) endHangman("You lose");
        }
        hangmanGuessed.textContent = hangmanGuessed.textContent + hangmanInput.value;
    } else if (hangmanInput.value?.length === hangmanWord.length) {
        if (hangmanInput.value.toLowerCase() === hangmanWord.toLowerCase()) {
            hangmanCovers[0].style.visibility = "hidden";
            hangmanCovers[1].style.visibility = "hidden";
            return endHangman("You win");
        }
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