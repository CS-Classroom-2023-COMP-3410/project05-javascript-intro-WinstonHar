/************************************************
 * 1. State & DOM
 ************************************************/
const displayText     = document.getElementById("displayText");
const typeInput       = document.getElementById("typeInput");
const difficultySelect = document.getElementById("difficultySelect");
const newTextBtn      = document.getElementById("newTextBtn");

const wpmStat         = document.getElementById("wpmStat");
const accuracyStat    = document.getElementById("accuracyStat");

const resultsBox      = document.getElementById("resultsBox");
const resultsText     = document.getElementById("resultsText");
const restartBtn      = document.getElementById("restartBtn");

/* We'll store the displayed text as an array of words for easy indexing */
let wordsArray       = [];
let currentWordIndex = 0;
let startTime        = null;
let isFinished       = false;

/*
  We'll track typedChars and correctChars *per word*,
  so we can "unfinalize" them if the user backspaces
  and re-edits that word.
*/
let typedCharCounts  = [];
let correctCharCounts= [];

/************************************************
 * 2. Example Sentence Lists
 ************************************************/
const easySentences = [
  "The cat sat on the mat.",
  "I like apples and bananas.",
  "He opened the door slowly.",
  "She wore a hat to the park.",
  "We watch the birds fly by."
];
const mediumSentences = [
  "Sunlight filtered through the dusty windows.",
  "A sudden storm drenched the city streets in rain.",
  "He traveled across the country by train.",
  "The old clock chimed midnight in the hall.",
  "Her curiosity led her to hidden passages."
];
const hardSentences = [
  "Extraordinary coincidences sometimes occur unexpectedly.",
  "He meticulously documented each observation in his journal.",
  "Unprecedented discoveries expand our scientific horizons.",
  "Their collaboration led to a groundbreaking revelation.",
  "Architecture displayed a remarkable blend of styles."
];

/************************************************
 * 3. Generate & Display Sentences
 ************************************************/
function getRandomSentences(difficulty) {
  let pool;
  if (difficulty === "easy") {
    pool = easySentences;
  } else if (difficulty === "medium") {
    pool = mediumSentences;
  } else {
    pool = hardSentences;
  }

  // Pick 3 random sentences from the pool
  const chosen = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    chosen.push(pool[idx]);
  }
  return chosen.join(" "); // combine into one text
}

function renderTextAsWords(fullText) {
  displayText.innerHTML = "";
  // Split by spaces to get each word (punctuation included)
  wordsArray = fullText.split(/\s+/);

  // Initialize typed/correct arrays to 0
  typedCharCounts  = new Array(wordsArray.length).fill(0);
  correctCharCounts= new Array(wordsArray.length).fill(0);

  wordsArray.forEach((word, index) => {
    const span = document.createElement("span");
    // add a trailing space except for the last word
    span.textContent = (index < wordsArray.length - 1) ? word + " " : word;
    span.classList.add("word");
    displayText.appendChild(span);
  });
}

/************************************************
 * 4. Reset & New Text
 ************************************************/
function resetTest() {
  isFinished       = false;
  currentWordIndex = 0;
  startTime        = null;

  wpmStat.textContent       = "0";
  accuracyStat.textContent  = "0";
  resultsBox.classList.add("hidden");
  typeInput.value = "";
}

function loadNewText() {
  resetTest();
  const difficulty = difficultySelect.value;
  const text = getRandomSentences(difficulty);
  renderTextAsWords(text);
}

/************************************************
 * 5. Typing Logic with "Finalize" & "Unfinalize"
 ************************************************/
typeInput.addEventListener("input", (e) => {
  if (isFinished) return;

  // Record start time on first keypress
  if (!startTime && e.target.value.length > 0) {
    startTime = new Date();
  }

  const typed = e.target.value;                  // raw typed text
  const trimmed = typed.trim();                  // remove trailing spaces
  const typedWords = trimmed.length ? trimmed.split(" ") : [];
  const typedIndex = typedWords.length - 1;      // index of the word being typed

  // 1) If user advanced to a new word (typedIndex > currentWordIndex),
  //    finalize the old word
  if (typedIndex > currentWordIndex) {
    finalizeWord(typedWords[currentWordIndex]);
    currentWordIndex++;
    updateStats();
  }
  // 2) If user backspaced into a previous word (typedIndex < currentWordIndex),
  //    unfinalize that word so they can fix it
  else if (typedIndex < currentWordIndex) {
    unfinalizeWord(currentWordIndex);
    currentWordIndex = typedIndex;
    updateStats(); // recalc stats after removing that finalization
  }

  // 3) Highlight the current word while user types
  if (currentWordIndex < wordsArray.length && currentWordIndex >= 0) {
    const lastTypedWord = typedWords[currentWordIndex] || "";
    highlightCurrentWord(lastTypedWord);
  }

  // 4) Check if user typed all the words
  if (currentWordIndex >= wordsArray.length) {
    finishTest();
  }
});

/** 
 * finalizeWord: Compare typedWord with the correct word,
 * store its typed/correct chars, color it as correct/incorrect.
 */
function finalizeWord(typedWord) {
  if (currentWordIndex >= wordsArray.length) return;

  const actualWord = wordsArray[currentWordIndex];
  const wordSpan   = displayText.querySelectorAll(".word")[currentWordIndex];

  // Store typed chars & correct chars for this word
  typedCharCounts[currentWordIndex]  = typedWord.length;
  correctCharCounts[currentWordIndex]= getMatchingChars(typedWord, actualWord);

  // Mark final color
  if (typedWord === actualWord) {
    wordSpan.classList.add("correct");
  } else {
    wordSpan.classList.add("incorrect");
  }
}

/**
 * unfinalizeWord: remove correct/incorrect class 
 * so user can fix the word, 
 * and zero out typed/correct counts for that word.
 */
function unfinalizeWord(wordIndex) {
  if (wordIndex < 0 || wordIndex >= wordsArray.length) return;
  const wordSpan = displayText.querySelectorAll(".word")[wordIndex];
  wordSpan.classList.remove("correct", "incorrect");

  typedCharCounts[wordIndex]   = 0;
  correctCharCounts[wordIndex] = 0;
}

/**
 * highlightCurrentWord: partial check while user types the current word
 * to show if typed substring matches so far or not.
 */
function highlightCurrentWord(typedWord) {
  const actualWord = wordsArray[currentWordIndex];
  const wordSpan   = displayText.querySelectorAll(".word")[currentWordIndex];

  const typedLen   = typedWord.length;
  const actualSub  = actualWord.substring(0, typedLen);

  if (typedWord === actualSub) {
    wordSpan.classList.add("correct");
    wordSpan.classList.remove("incorrect");
  } else {
    wordSpan.classList.add("incorrect");
    wordSpan.classList.remove("correct");
  }
}

/************************************************
 * 6. Stats & Finish
 ************************************************/
function getMatchingChars(typedWord, actualWord) {
  let count = 0;
  const len = Math.min(typedWord.length, actualWord.length);
  for (let i = 0; i < len; i++) {
    if (typedWord[i] === actualWord[i]) {
      count++;
    }
  }
  return count;
}

function updateStats() {
  // Recompute total typed chars & correct chars from arrays
  const totalChars = typedCharCounts.reduce((acc, val) => acc + val, 0);
  const correctChars= correctCharCounts.reduce((acc, val) => acc + val, 0);

  const now = new Date();
  const elapsedSeconds = startTime ? (now - startTime) / 1000 : 1;  
  const wordsPerMinute = ((totalChars / 5) / (elapsedSeconds / 60));
  
  wpmStat.textContent  = Math.round(wordsPerMinute).toString();

  const accuracy = (correctChars / totalChars) * 100;
  accuracyStat.textContent = (isNaN(accuracy) || !isFinite(accuracy))
    ? "0"
    : accuracy.toFixed(0);
}

function finishTest() {
  isFinished = true;
  // One last stats update
  updateStats();

  const finalWpm = wpmStat.textContent;
  const finalAcc = accuracyStat.textContent;
  resultsText.textContent = `Your final WPM is ${finalWpm} with ${finalAcc}% accuracy.`;
  resultsBox.classList.remove("hidden");
}

/************************************************
 * 7. Restart
 ************************************************/
restartBtn.addEventListener("click", () => {
  loadNewText();
});

/************************************************
 * 8. Initialize
 ************************************************/
newTextBtn.addEventListener("click", () => {
  loadNewText();
});

window.addEventListener("load", () => {
  loadNewText();
});
