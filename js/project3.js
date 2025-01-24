// Select DOM elements
const gameGrid   = document.getElementById("gameGrid");
const moveCount  = document.getElementById("moveCount");
const timeCount  = document.getElementById("timeCount");
const restartBtn = document.getElementById("restartBtn");

// Card symbols or data (pairs). 
// Example: 6 pairs => 12 cards total
// You can replace with icons or images if desired.
const cardSymbols = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"];

// Game variables
let firstCard       = null;
let secondCard      = null;
let lockBoard       = false; // Prevent flipping more than two cards
let matchedPairs    = 0;
let moves           = 0;
let timeElapsed     = 0;
let timerInterval   = null;

// Shuffle the card symbols array in place using Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j   = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the card elements in the grid
function createCard(symbol) {
  // Outer card container
  const card = document.createElement("div");
  card.classList.add("card");
  
  // Inner wrapper for flip effect
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  // Front face
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-face", "front");
  cardFront.textContent = symbol;

  // Back face
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-face", "back");
  cardBack.textContent = "?"; // or some design

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  // Event: Flip card on click
  card.addEventListener("click", () => flipCard(card, symbol));

  return card;
}

// Flip a card
function flipCard(card, symbol) {
  if (lockBoard) return;
  if (card === firstCard) return; // Same card clicked twice

  card.classList.add("flipped");

  if (!firstCard) {
    // First card flipped
    firstCard = card;
  } else {
    // Second card flipped
    secondCard = card;
    lockBoard  = true;
    moves++;
    moveCount.textContent = moves;
    checkForMatch();
  }
}

// Check if the two flipped cards match
function checkForMatch() {
  const firstSymbol  = firstCard.querySelector(".front").textContent;
  const secondSymbol = secondCard.querySelector(".front").textContent;

  if (firstSymbol === secondSymbol) {
    // It's a match
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    if (matchedPairs === cardSymbols.length / 2) {
      // Game Over
      clearInterval(timerInterval);
      setTimeout(() => {
        alert(`Congrats! You matched all pairs in ${moves} moves and ${timeElapsed} seconds!`);
      }, 500);
    }
    resetChoices();
  } else {
    // Not a match: flip them back after a short delay
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetChoices();
    }, 1000);
  }
}

// Reset choice variables after checking
function resetChoices() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Start or restart the game
function startGame() {
  // Reset variables
  firstCard    = null;
  secondCard   = null;
  lockBoard    = false;
  matchedPairs = 0;
  moves        = 0;
  moveCount.textContent = moves;

  timeElapsed = 0;
  timeCount.textContent = timeElapsed;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeElapsed++;
    timeCount.textContent = timeElapsed;
  }, 1000);

  // Clear old cards
  gameGrid.innerHTML = "";

  // Shuffle the symbols for a new layout
  shuffle(cardSymbols);

  // Create and append new cards
  cardSymbols.forEach((symbol) => {
    const cardEl = createCard(symbol);
    gameGrid.appendChild(cardEl);
  });
}

// Restart button
restartBtn.addEventListener("click", startGame);

// Initialize the game on page load
window.addEventListener("load", startGame);
