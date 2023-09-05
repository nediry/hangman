// array of words
const words = [
    {
        word: "apple",
        hint: "Common fruit, often red or green."
    },
    {
        word: "table",
        hint: "Furniture with flat top and legs."
    },
    {
        word: "music",
        hint: "Art of arranging sounds in time."
    },
    {
        word: "happy",
        hint: "State of well-being and joy."
    },
    {
        word: "ocean",
        hint: "Vast saltwater body on Earth."
    },
    {
        word: "light",
        hint: "Agent that stimulates sight."
    },
    {
        word: "house",
        hint: "Building for human habitation."
    },
    {
        word: "money",
        hint: "Medium of exchange, coins, banknotes."
    },
    {
        word: "world",
        hint: "Planet Earth and its inhabitants."
    },
    {
        word: "chair",
        hint: "Furniture for sitting, with back."
    },
    {
        word: "night",
        hint: "Period of darkness, sunset to sunrise."
    },
    {
        word: "water",
        hint: "Colorless, odorless liquid, essential for life."
    },
    {
        word: "green",
        hint: "Color of foliage and grass."
    },
    {
        word: "smile",
        hint: "Facial expression of happiness."
    },
    {
        word: "dance",
        hint: "Rhythmic body movements to music."
    },
    {
        word: "tiger",
        hint: "Large cat, orange coat, black stripes."
    },
    {
        word: "earth",
        hint: "Third planet from the sun, supports life."
    },
    {
        word: "lemon",
        hint: "Bright yellow citrus fruit, sour taste."
    },
    {
        word: "piano",
        hint: "Musical instrument with keyboard."
    },
    {
        word: "beach",
        hint: "Sandy shore by ocean, for recreation."
    }
];

let currentWord, wrongLetterCount = 0, correctLetterCount = 0;
const maxWrong = 7;

const fails = [".stang4", ".head", ".body", ".arm", ".arm2", ".leg", ".leg2"];

// all letters for gaming keyboard
const letters = "abcdefghijklmnopqrstuvwxyz";

window.addEventListener("DOMContentLoaded", () => {
    gE(".game-end").style.display = "flex";
    
    gE(".game-end h1").innerHTML = "Hangman Game!";


    gE(".game-end button").innerHTML = "Play Game";
    gE(".game-end button").addEventListener("click", newGame);
});


// get HTML elements
const gE = (sel) => document.querySelector(sel);


// create keyboard
const createKeyboard = () => {
    // get html keyboard element
    const keyboard = gE(".keyboard");
    keyboard.innerHTML = "";
    for (let i = 0; i < letters.length; i++) {
        let button = document.createElement("button");
        button.innerText = letters[i];
        keyboard.appendChild(button);
        button.addEventListener("click", e => init(e.target, letters[i]))
    }
}


// get random word from words list
const getWord = () => {
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    currentWord = word;
    gE(".hint-text b").innerText = hint;
    gE(".word-display").innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}


const init = (button, clickedLetter) => {
    button.disabled = true;
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                gE(`.word-display :nth-child(${index + 1})`).innerText = letter;
                button.style.background = "green";
                correctLetterCount++;
            }
        })
    } else {
        gE(fails[wrongLetterCount]).style.display = "block";
        button.style.color = "#999";
        wrongLetterCount++;
    }
    gE(".guess b").innerText = `${wrongLetterCount} / ${maxWrong}`;

    if (correctLetterCount == currentWord.length) return gameEnd(true);
    if (wrongLetterCount == maxWrong) return gameEnd(false);
}


const gameEnd = (value) => {
    gE(".game-end").style.display = "flex";
    if (value) {
        gE(".game-end h1").innerText = "You Win!";
        gE(".game-end span").innerHTML = "God Job</br>";
        gE(".game-end p").innerHTML = `The word was: <b>${currentWord}</b>`;
        gE(".game-end button").innerHTML = "Play Again";
    } else {
        gE(".game-end h1").innerText = "Game Over!";
        gE(".game-end span").innerHTML = "Better luck next time";
        gE(".game-end p").innerHTML = `The word was: <b>${currentWord}</b>`;
        gE(".game-end button").innerHTML = "Try Again";
    }
    gE(".game-end button").addEventListener("click", newGame);
}


const newGame = () => {
    currentWord = "", wrongLetterCount = 0, correctLetterCount = 0;
    gE(".game-end").style.display = "none";

    // update wrong letter count
    gE(".guess b").innerText = `${wrongLetterCount} / ${maxWrong}`;

    // clear draw box
    fails.forEach(sel => gE(fails[fails.indexOf(sel)]).style.display = "none");
    createKeyboard();
    getWord();
}