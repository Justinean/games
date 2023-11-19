getHangmanWord();

const endHangman = (result: string) => {
    console.log(result)
    hangmanSpaces.textContent = hangmanWord;
    hangmanSubmit.style.display = "none";
    hangmanInput.style.display = "none";
    endGame(result, handleHangmanSubmit, resetHangman)
}

const handleHangmanSubmit = (e: Event) => {
    console.log(hangmanInput.value)
    if (hangmanInput.value == null || hangmanInput.value === "") return;
    console.log(hangmanInput.value?.length === 1)
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
            if (wrongGuesses >= 7) endHangman("You lose");
        }
    } else if (hangmanInput.value?.length === hangmanWord.length) {
        endHangman("You lose");
    }
    hangmanInput.value = "";
}

hangmanSubmit.addEventListener("click", handleHangmanSubmit)