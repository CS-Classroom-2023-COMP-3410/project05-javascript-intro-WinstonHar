// Select DOM elements
const taskInput   = document.getElementById("taskInput");
const addTaskBtn  = document.getElementById("addTaskBtn");
const taskList    = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");

// In-memory store of tasks (will load from localStorage)
let tasks = [];

// Load tasks from localStorage on page load
window.addEventListener("load", () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();  
});

// Add Task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    // Create a new task object
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks(); // Save to localStorage
    renderTasks();
    taskInput.value = "";
  }
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear the current list

  // Filter tasks based on filterSelect value
  const filterValue = filterSelect.value;
  const filteredTasks = tasks.filter((task) => {
    if (filterValue === "all") return true;
    if (filterValue === "completed") return task.completed;
    if (filterValue === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.setAttribute("draggable", true);  // for drag-and-drop
    li.dataset.id = task.id;

    // --- Left side (checkbox + text) ---
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    // Mark/unmark completion
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;

    if (task.completed) {
      li.classList.add("task-completed");
    }

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    // --- Right side (edit + delete) ---
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("task-right");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      startEditingTask(task, li);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    taskList.appendChild(li);

    // Add drag-and-drop event listeners
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);
    li.addEventListener("dragend", handleDragEnd);
  });
}

// Start Editing a Task
function startEditingTask(task, listItem) {
  // Remove the "task-completed" class so text isn't strikethrough
  listItem.classList.remove("task-completed");
  
  // Replace the text span with an input
  const leftDiv = listItem.querySelector(".task-left");
  leftDiv.innerHTML = "";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = task.text;
  editInput.classList.add("task-edit-input");

  // We can also keep the checkbox hidden or remove it while editing
  // For simplicity, let's remove it from the DOM while editing.

  leftDiv.appendChild(editInput);
  editInput.focus();

  // Replace the buttons
  const rightDiv = listItem.querySelector(".task-right");
  rightDiv.innerHTML = "";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("edit-btn");
  saveBtn.addEventListener("click", () => {
    saveEditedTask(task, editInput.value);
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("delete-btn");
  cancelBtn.addEventListener("click", () => {
    renderTasks(); // re-render to cancel editing
  });

  rightDiv.appendChild(saveBtn);
  rightDiv.appendChild(cancelBtn);
}

// Save Edited Task
function saveEditedTask(task, newText) {
  task.text = newText.trim();
  saveTasks();
  renderTasks();
}

// Delete Task
function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks();
  renderTasks();
}

// Filter tasks on filter change
filterSelect.addEventListener("change", () => {
  renderTasks();
});

// Save tasks array to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ==================== Drag & Drop ==================== */

let draggedItem = null;

// When we start dragging an item
function handleDragStart(e) {
  draggedItem = e.currentTarget;        // The <li> being dragged
  e.dataTransfer.effectAllowed = "move";
  e.target.style.opacity = "0.4";       // Visual cue
}

// As the dragged item enters other list items
function handleDragOver(e) {
  // By default, data cannot be dropped in other elements
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

// When the dragged item is dropped onto another item
function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  const targetItem = e.currentTarget; // The <li> that the user dropped on
  if (draggedItem && draggedItem !== targetItem) {
    const draggedIndex = tasks.findIndex(t => t.id == draggedItem.dataset.id);
    const targetIndex  = tasks.findIndex(t => t.id == targetItem.dataset.id);

    // Reorder the tasks array
    const [removed] = tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, removed);

    // Persist new order
    saveTasks();
    renderTasks();
  }
}

// When dragging ends (either success or fail)
function handleDragEnd(e) {
  e.target.style.opacity = "1";
  draggedItem = null;
}
