// --- DOM Elements ---
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const brushColorInput = document.getElementById("brushColor");
const brushSizeInput = document.getElementById("brushSize");
const brushSizeValue = document.getElementById("brushSizeValue");
const backgroundColorInput = document.getElementById("backgroundColor");

const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");

// --- Canvas Drawing State ---
let drawing = false;
let strokes = [];       // Array of all strokes
let currentStroke = []; // Points in the current stroke

// Default settings
let brushColor = "#000000";
let brushSize = 5;
let backgroundColor = "#ffffff";

// --- Event Listeners ---
brushColorInput.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

brushSizeInput.addEventListener("input", (e) => {
  brushSize = e.target.value;
  brushSizeValue.textContent = brushSize;
});

backgroundColorInput.addEventListener("input", (e) => {
  backgroundColor = e.target.value;
  redrawCanvas();
});

// Start drawing on mousedown
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  currentStroke = [];
  addPoint(e);
});

// Track points as the mouse moves
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  addPoint(e);
  redrawCanvas();
});

// Stop drawing on mouseup or mouseleave
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Undo last stroke
undoBtn.addEventListener("click", () => {
  strokes.pop();  // remove last stroke
  redrawCanvas();
});

// Clear canvas
clearBtn.addEventListener("click", () => {
  strokes = [];
  brushColorInput.value = "#000000";
  brushSizeInput.value = 5;
  brushSize = 5;
  brushSizeValue.textContent = 5;
  backgroundColorInput.value = "#ffffff";
  backgroundColor = "#ffffff";
  redrawCanvas();
});

// Save canvas as image
saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "my_drawing.png"; // default file name
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// --- Helper Functions ---

function addPoint(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Push point data (x, y, color, size)
  currentStroke.push({ x, y, color: brushColor, size: brushSize });
}

function stopDrawing() {
  if (drawing) {
    drawing = false;
    strokes.push(currentStroke);
    currentStroke = [];
  }
}

// Redraw entire canvas
function redrawCanvas() {
  // Fill the canvas with the background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Re-draw all strokes
  strokes.forEach((stroke) => {
    drawStroke(stroke);
  });

  // Draw current stroke in progress
  if (currentStroke.length > 0) {
    drawStroke(currentStroke);
  }
}

function drawStroke(stroke) {
  if (stroke.length < 2) {
    // Just a single point
    const point = stroke[0];
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = point.color;
    ctx.fill();
    return;
  }

  ctx.beginPath();
  for (let i = 0; i < stroke.length - 1; i++) {
    const currentPoint = stroke[i];
    const nextPoint = stroke[i + 1];

    ctx.strokeStyle = currentPoint.color;
    ctx.lineWidth = currentPoint.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.moveTo(currentPoint.x, currentPoint.y);
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();
  }
}

// Initial fill
redrawCanvas();
