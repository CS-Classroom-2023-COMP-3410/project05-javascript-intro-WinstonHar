/************************************************
 * 1. DOM Elements & State
 ************************************************/
const visualizer   = document.getElementById("visualizer");
const algorithmSelect = document.getElementById("algorithmSelect");
const speedRange   = document.getElementById("speedRange");
const generateBtn  = document.getElementById("generateBtn");
const sortBtn      = document.getElementById("sortBtn");

const commentaryBox = document.getElementById("commentaryBox");

let array = [];
let animationSpeed = parseInt(speedRange.value); // ms per step
let sortingInProgress = false;
let cancelSorting   = false;

/************************************************
 * 2. Generate Random Array
 ************************************************/
function generateArray(size = 25) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 200) + 10); // random 10..210
  }
}

/************************************************
 * 3. Render Bars
 ************************************************/
function renderArray(arr, highlightIndices = []) {
  visualizer.innerHTML = "";
  arr.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    if (highlightIndices.includes(index)) {
      bar.classList.add("active");
    }

    visualizer.appendChild(bar);
  });
}

/************************************************
 * 4. Log Commentary
 ************************************************/
function logStep(message) {
  commentaryBox.innerHTML += `<div>${message}</div>`;
  commentaryBox.scrollTop = commentaryBox.scrollHeight;
}

/************************************************
 * 5. Sorting Algorithms
 ************************************************/
async function bubbleSort(arr) {
  let n = arr.length;
  logStep("Starting Bubble Sort...");
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (cancelSorting) return; // in case user resets

      // Highlight bars being compared
      renderArray(arr, [j, j+1]);
      logStep(`Comparing arr[${j}] = ${arr[j]} and arr[${j+1}] = ${arr[j+1]}`);

      await wait(animationSpeed);

      if (arr[j] > arr[j+1]) {
        // Swap
        logStep(`Swapping ${arr[j]} and ${arr[j+1]}`);
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        renderArray(arr, [j, j+1]);
        await wait(animationSpeed);
      }
    }
    // Mark the last element in the pass as sorted
    // i.e., index n-i-1 is in correct position
    const sortedIndex = n - i - 1;
    markSorted(sortedIndex);
  }
  // Mark the entire array as sorted
  markWholeSorted(arr.length);
  logStep("Bubble Sort Complete!");
}

async function insertionSort(arr) {
  logStep("Starting Insertion Sort...");
  for (let i = 1; i < arr.length; i++) {
    if (cancelSorting) return;
    let key = arr[i];
    let j = i - 1;

    // Show which bar is being "inserted"
    renderArray(arr, [i]);
    logStep(`Taking arr[${i}] = ${key} as the key`);

    await wait(animationSpeed);

    while (j >= 0 && arr[j] > key) {
      if (cancelSorting) return;

      logStep(`arr[${j}] = ${arr[j]} is > key (${key}). Shift it right.`);
      arr[j + 1] = arr[j];
      renderArray(arr, [j, j+1]);
      await wait(animationSpeed);
      j--;
    }
    arr[j + 1] = key;
    renderArray(arr, [j+1]);
    logStep(`Placed key = ${key} at index [${j+1}]`);
    await wait(animationSpeed);
  }
  // Mark entire array sorted
  markWholeSorted(arr.length);
  logStep("Insertion Sort Complete!");
}

/************************************************
 * 6. Helper Functions
 ************************************************/
// Mark a single bar as sorted
function markSorted(index) {
  const bars = document.querySelectorAll(".bar");
  if (bars[index]) {
    bars[index].classList.remove("active");
    bars[index].classList.add("sorted");
  }
}

// Mark entire array as sorted
function markWholeSorted(size) {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < size; i++) {
    bars[i].classList.remove("active");
    bars[i].classList.add("sorted");
  }
}

// Promise-based delay
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/************************************************
 * 7. Control Handlers
 ************************************************/
// Generate new array
generateBtn.addEventListener("click", () => {
  cancelSorting = true;
  sortingInProgress = false;
  logStep("==== Reset Array ====");
  commentaryBox.innerHTML = "";
  generateArray(25);
  renderArray(array);
});

// Start sorting
sortBtn.addEventListener("click", async () => {
  if (sortingInProgress) return; // ignore if already sorting
  sortingInProgress = true;
  cancelSorting = false;

  commentaryBox.innerHTML = ""; // clear commentary

  const selectedAlgo = algorithmSelect.value;
  logStep(`Selected Algorithm: ${selectedAlgo}`);

  if (selectedAlgo === "bubble") {
    await bubbleSort(array);
  } else if (selectedAlgo === "insertion") {
    await insertionSort(array);
  }

  sortingInProgress = false;
});

// Adjust speed
speedRange.addEventListener("input", (e) => {
  animationSpeed = parseInt(e.target.value);
});

/************************************************
 * 8. Initialize on page load
 ************************************************/
window.addEventListener("load", () => {
  generateArray(25);
  renderArray(array);
  logStep("Array Generated. Ready to sort!");
});
