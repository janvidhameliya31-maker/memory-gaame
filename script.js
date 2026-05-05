const symbols = [
    "🍎","🍌","🍇","🍒",
    "🍉","🍍","🥝","🍑",
    "🍎","🍌","🍇","🍒",
    "🍉","🍍","🥝","🍑"
];

let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    let shuffled = shuffle(symbols);

    shuffled.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = symbol;
        card.innerHTML = "?";

        card.onclick = () => flipCard(card);

        board.appendChild(card);
    });
}

function flipCard(card) {
    if (lock || card === firstCard) return;

    card.innerHTML = card.dataset.value;
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        moves++;
        document.getElementById("moves").innerText = "Moves: " + moves;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        resetTurn();
    } else {
        lock = true;
        setTimeout(() => {
            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

function restartGame() {
    moves = 0;
    document.getElementById("moves").innerText = "Moves: 0";
    createBoard();
}

createBoard();