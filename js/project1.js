// Select DOM elements
const clockElement   = document.getElementById("clock");
const formatToggle   = document.getElementById("formatToggle");
const colorPicker    = document.getElementById("colorPicker");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const savePrefsBtn   = document.getElementById("savePrefsBtn");
const alarmTimeInput = document.getElementById("alarmTime");
const setAlarmBtn    = document.getElementById("setAlarmBtn");
const alarmList      = document.getElementById("alarmList");

// Variables to track user preferences and alarms in memory
// (We'll only write them to localStorage when "Save Preferences" is clicked.)
let is24HourFormat = false;
let clockColor     = "#000000";
let clockFontSize  = "60"; // Default
let alarms         = [];   // Will hold alarm strings in "HH:MM" (24-hr format)

// On window load, read from localStorage and apply preferences/alarms.
window.addEventListener("load", () => {
  // Load time format
  const storedFormat = localStorage.getItem("timeFormat");
  if (storedFormat) {
    formatToggle.value = storedFormat;
    is24HourFormat     = storedFormat === "24";
  }

  // Load clock color
  const storedColor = localStorage.getItem("clockColor");
  if (storedColor) {
    clockColor = storedColor;
  }

  // Load font size
  const storedFontSize = localStorage.getItem("clockFontSize");
  if (storedFontSize) {
    clockFontSize = storedFontSize;
  }

  // Load alarms
  const storedAlarms = localStorage.getItem("alarms");
  if (storedAlarms) {
    alarms = JSON.parse(storedAlarms);
  }

  // Apply loaded preferences to UI
  formatToggle.value   = is24HourFormat ? "24" : "12";
  colorPicker.value    = clockColor;
  fontSizeSelect.value = clockFontSize;
  clockElement.style.color     = clockColor;
  clockElement.style.fontSize  = clockFontSize + "px";

  // Populate alarms in the UI
  renderAlarms();

  // Start the clock
  updateClock();
  setInterval(updateClock, 1000);
});

// Update the digital clock display every second
function updateClock() {
  const now    = new Date();
  let hours    = now.getHours();
  let minutes  = now.getMinutes();
  let seconds  = now.getSeconds();

  // Check for any matching alarms each minute
  // (Since we compare "HH:MM", you can check on each second if you want.)
  checkAlarms(hours, minutes);

  if (!is24HourFormat) {
    // 12-hour format
    const amPm = hours >= 12 ? "PM" : "AM";
    hours      = hours % 12 || 12; 
    clockElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${amPm}`;
  } else {
    // 24-hour format
    clockElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
}

// Helper function to pad digits
function pad(num) {
  return num < 10 ? "0" + num : num;
}

// Keep track of user preference changes in memory
formatToggle.addEventListener("change", (e) => {
  const formatValue  = e.target.value;
  is24HourFormat     = (formatValue === "24");
  updateClock();
});

colorPicker.addEventListener("input", (e) => {
  clockColor = e.target.value;
  clockElement.style.color = clockColor;
});

fontSizeSelect.addEventListener("change", (e) => {
  clockFontSize = e.target.value;
  clockElement.style.fontSize = clockFontSize + "px";
});

// Save Preferences button: writes all current settings + alarms to localStorage
savePrefsBtn.addEventListener("click", () => {
  localStorage.setItem("timeFormat",    is24HourFormat ? "24" : "12");
  localStorage.setItem("clockColor",    clockColor);
  localStorage.setItem("clockFontSize", clockFontSize);
  localStorage.setItem("alarms",        JSON.stringify(alarms));

  alert("Preferences and alarms have been saved!");
});

// Alarm functionality
setAlarmBtn.addEventListener("click", () => {
  const alarmTime = alarmTimeInput.value; // "HH:MM" in 24-hour format
  if (!alarmTime) return;

  // Add new alarm to in-memory array
  alarms.push(alarmTime);

  // Reflect in UI immediately
  renderAlarms();

  // Clear the time input
  alarmTimeInput.value = "";
});

function renderAlarms() {
  alarmList.innerHTML = "";
  alarms.forEach((alarm) => {
    const li = document.createElement("li");
    li.textContent = alarm;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", () => {
      removeAlarm(alarm);
    });

    li.appendChild(removeBtn);
    alarmList.appendChild(li);
  });
}

function removeAlarm(alarm) {
  // Remove from in-memory array
  alarms = alarms.filter((a) => a !== alarm);
  renderAlarms();
}

// Check if current time matches any set alarm (compare "HH:MM")
function checkAlarms(hours, minutes) {
  const currentTime = `${pad(hours)}:${pad(minutes)}`;
  if (alarms.includes(currentTime)) {
    alert(`Alarm! It's ${currentTime}`);
    // Optionally remove the alarm after it rings
    removeAlarm(currentTime);
  }
}
