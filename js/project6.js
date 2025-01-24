/************************************************
 * 1. Full Periodic Table Data (118 elements)
 *    gridRow, gridColumn place them in a typical
 *    arrangement, with lanthanides (La–Lu) on row 8
 *    and actinides (Ac–Lr) on row 9.
 ************************************************/
const elementsData = [
    // Row 1
    { number: 1,  symbol: "H",   name: "Hydrogen",      group: 1,  gridRow: 1, gridColumn: 1 },
    { number: 2,  symbol: "He",  name: "Helium",        group: 18, gridRow: 1, gridColumn: 18 },
  
    // Row 2
    { number: 3,  symbol: "Li",  name: "Lithium",       group: 1,  gridRow: 2, gridColumn: 1 },
    { number: 4,  symbol: "Be",  name: "Beryllium",     group: 2,  gridRow: 2, gridColumn: 2 },
    { number: 5,  symbol: "B",   name: "Boron",         group: 13, gridRow: 2, gridColumn: 13 },
    { number: 6,  symbol: "C",   name: "Carbon",        group: 14, gridRow: 2, gridColumn: 14 },
    { number: 7,  symbol: "N",   name: "Nitrogen",      group: 15, gridRow: 2, gridColumn: 15 },
    { number: 8,  symbol: "O",   name: "Oxygen",        group: 16, gridRow: 2, gridColumn: 16 },
    { number: 9,  symbol: "F",   name: "Fluorine",      group: 17, gridRow: 2, gridColumn: 17 },
    { number: 10, symbol: "Ne",  name: "Neon",          group: 18, gridRow: 2, gridColumn: 18 },
  
    // Row 3
    { number: 11, symbol: "Na",  name: "Sodium",        group: 1,  gridRow: 3, gridColumn: 1 },
    { number: 12, symbol: "Mg",  name: "Magnesium",     group: 2,  gridRow: 3, gridColumn: 2 },
    { number: 13, symbol: "Al",  name: "Aluminium",     group: 13, gridRow: 3, gridColumn: 13 },
    { number: 14, symbol: "Si",  name: "Silicon",       group: 14, gridRow: 3, gridColumn: 14 },
    { number: 15, symbol: "P",   name: "Phosphorus",    group: 15, gridRow: 3, gridColumn: 15 },
    { number: 16, symbol: "S",   name: "Sulfur",        group: 16, gridRow: 3, gridColumn: 16 },
    { number: 17, symbol: "Cl",  name: "Chlorine",      group: 17, gridRow: 3, gridColumn: 17 },
    { number: 18, symbol: "Ar",  name: "Argon",         group: 18, gridRow: 3, gridColumn: 18 },
  
    // Row 4
    { number: 19, symbol: "K",   name: "Potassium",     group: 1,  gridRow: 4, gridColumn: 1 },
    { number: 20, symbol: "Ca",  name: "Calcium",       group: 2,  gridRow: 4, gridColumn: 2 },
    { number: 21, symbol: "Sc",  name: "Scandium",      group: 3,  gridRow: 4, gridColumn: 3 },
    { number: 22, symbol: "Ti",  name: "Titanium",      group: 4,  gridRow: 4, gridColumn: 4 },
    { number: 23, symbol: "V",   name: "Vanadium",      group: 5,  gridRow: 4, gridColumn: 5 },
    { number: 24, symbol: "Cr",  name: "Chromium",      group: 6,  gridRow: 4, gridColumn: 6 },
    { number: 25, symbol: "Mn",  name: "Manganese",     group: 7,  gridRow: 4, gridColumn: 7 },
    { number: 26, symbol: "Fe",  name: "Iron",          group: 8,  gridRow: 4, gridColumn: 8 },
    { number: 27, symbol: "Co",  name: "Cobalt",        group: 9,  gridRow: 4, gridColumn: 9 },
    { number: 28, symbol: "Ni",  name: "Nickel",        group: 10, gridRow: 4, gridColumn: 10 },
    { number: 29, symbol: "Cu",  name: "Copper",        group: 11, gridRow: 4, gridColumn: 11 },
    { number: 30, symbol: "Zn",  name: "Zinc",          group: 12, gridRow: 4, gridColumn: 12 },
    { number: 31, symbol: "Ga",  name: "Gallium",       group: 13, gridRow: 4, gridColumn: 13 },
    { number: 32, symbol: "Ge",  name: "Germanium",     group: 14, gridRow: 4, gridColumn: 14 },
    { number: 33, symbol: "As",  name: "Arsenic",       group: 15, gridRow: 4, gridColumn: 15 },
    { number: 34, symbol: "Se",  name: "Selenium",      group: 16, gridRow: 4, gridColumn: 16 },
    { number: 35, symbol: "Br",  name: "Bromine",       group: 17, gridRow: 4, gridColumn: 17 },
    { number: 36, symbol: "Kr",  name: "Krypton",       group: 18, gridRow: 4, gridColumn: 18 },
  
    // Row 5
    { number: 37, symbol: "Rb",  name: "Rubidium",      group: 1,  gridRow: 5, gridColumn: 1 },
    { number: 38, symbol: "Sr",  name: "Strontium",     group: 2,  gridRow: 5, gridColumn: 2 },
    { number: 39, symbol: "Y",   name: "Yttrium",       group: 3,  gridRow: 5, gridColumn: 3 },
    { number: 40, symbol: "Zr",  name: "Zirconium",     group: 4,  gridRow: 5, gridColumn: 4 },
    { number: 41, symbol: "Nb",  name: "Niobium",       group: 5,  gridRow: 5, gridColumn: 5 },
    { number: 42, symbol: "Mo",  name: "Molybdenum",    group: 6,  gridRow: 5, gridColumn: 6 },
    { number: 43, symbol: "Tc",  name: "Technetium",    group: 7,  gridRow: 5, gridColumn: 7 },
    { number: 44, symbol: "Ru",  name: "Ruthenium",     group: 8,  gridRow: 5, gridColumn: 8 },
    { number: 45, symbol: "Rh",  name: "Rhodium",       group: 9,  gridRow: 5, gridColumn: 9 },
    { number: 46, symbol: "Pd",  name: "Palladium",     group: 10, gridRow: 5, gridColumn: 10 },
    { number: 47, symbol: "Ag",  name: "Silver",        group: 11, gridRow: 5, gridColumn: 11 },
    { number: 48, symbol: "Cd",  name: "Cadmium",       group: 12, gridRow: 5, gridColumn: 12 },
    { number: 49, symbol: "In",  name: "Indium",        group: 13, gridRow: 5, gridColumn: 13 },
    { number: 50, symbol: "Sn",  name: "Tin",           group: 14, gridRow: 5, gridColumn: 14 },
    { number: 51, symbol: "Sb",  name: "Antimony",      group: 15, gridRow: 5, gridColumn: 15 },
    { number: 52, symbol: "Te",  name: "Tellurium",     group: 16, gridRow: 5, gridColumn: 16 },
    { number: 53, symbol: "I",   name: "Iodine",        group: 17, gridRow: 5, gridColumn: 17 },
    { number: 54, symbol: "Xe",  name: "Xenon",         group: 18, gridRow: 5, gridColumn: 18 },
  
    // Row 6
    { number: 55, symbol: "Cs",  name: "Cesium",        group: 1,  gridRow: 6, gridColumn: 1 },
    { number: 56, symbol: "Ba",  name: "Barium",        group: 2,  gridRow: 6, gridColumn: 2 },
    // Lanthanides in row 8 (La -> Lu):
    { number: 57, symbol: "La",  name: "Lanthanum",     group: 3,  gridRow: 8, gridColumn: 4 },
    { number: 58, symbol: "Ce",  name: "Cerium",        group: 3,  gridRow: 8, gridColumn: 5 },
    { number: 59, symbol: "Pr",  name: "Praseodymium",  group: 3,  gridRow: 8, gridColumn: 6 },
    { number: 60, symbol: "Nd",  name: "Neodymium",     group: 3,  gridRow: 8, gridColumn: 7 },
    { number: 61, symbol: "Pm",  name: "Promethium",    group: 3,  gridRow: 8, gridColumn: 8 },
    { number: 62, symbol: "Sm",  name: "Samarium",      group: 3,  gridRow: 8, gridColumn: 9 },
    { number: 63, symbol: "Eu",  name: "Europium",      group: 3,  gridRow: 8, gridColumn: 10 },
    { number: 64, symbol: "Gd",  name: "Gadolinium",    group: 3,  gridRow: 8, gridColumn: 11 },
    { number: 65, symbol: "Tb",  name: "Terbium",       group: 3,  gridRow: 8, gridColumn: 12 },
    { number: 66, symbol: "Dy",  name: "Dysprosium",    group: 3,  gridRow: 8, gridColumn: 13 },
    { number: 67, symbol: "Ho",  name: "Holmium",       group: 3,  gridRow: 8, gridColumn: 14 },
    { number: 68, symbol: "Er",  name: "Erbium",        group: 3,  gridRow: 8, gridColumn: 15 },
    { number: 69, symbol: "Tm",  name: "Thulium",       group: 3,  gridRow: 8, gridColumn: 16 },
    { number: 70, symbol: "Yb",  name: "Ytterbium",     group: 3,  gridRow: 8, gridColumn: 17 },
    { number: 71, symbol: "Lu",  name: "Lutetium",      group: 3,  gridRow: 8, gridColumn: 18 },
  
    { number: 72, symbol: "Hf",  name: "Hafnium",       group: 4,  gridRow: 6, gridColumn: 4 },
    { number: 73, symbol: "Ta",  name: "Tantalum",      group: 5,  gridRow: 6, gridColumn: 5 },
    { number: 74, symbol: "W",   name: "Tungsten",      group: 6,  gridRow: 6, gridColumn: 6 },
    { number: 75, symbol: "Re",  name: "Rhenium",       group: 7,  gridRow: 6, gridColumn: 7 },
    { number: 76, symbol: "Os",  name: "Osmium",        group: 8,  gridRow: 6, gridColumn: 8 },
    { number: 77, symbol: "Ir",  name: "Iridium",       group: 9,  gridRow: 6, gridColumn: 9 },
    { number: 78, symbol: "Pt",  name: "Platinum",      group: 10, gridRow: 6, gridColumn: 10 },
    { number: 79, symbol: "Au",  name: "Gold",          group: 11, gridRow: 6, gridColumn: 11 },
    { number: 80, symbol: "Hg",  name: "Mercury",       group: 12, gridRow: 6, gridColumn: 12 },
    { number: 81, symbol: "Tl",  name: "Thallium",      group: 13, gridRow: 6, gridColumn: 13 },
    { number: 82, symbol: "Pb",  name: "Lead",          group: 14, gridRow: 6, gridColumn: 14 },
    { number: 83, symbol: "Bi",  name: "Bismuth",       group: 15, gridRow: 6, gridColumn: 15 },
    { number: 84, symbol: "Po",  name: "Polonium",      group: 16, gridRow: 6, gridColumn: 16 },
    { number: 85, symbol: "At",  name: "Astatine",      group: 17, gridRow: 6, gridColumn: 17 },
    { number: 86, symbol: "Rn",  name: "Radon",         group: 18, gridRow: 6, gridColumn: 18 },
  
    // Row 7
    { number: 87, symbol: "Fr",  name: "Francium",      group: 1,  gridRow: 7, gridColumn: 1 },
    { number: 88, symbol: "Ra",  name: "Radium",        group: 2,  gridRow: 7, gridColumn: 2 },
    // Actinides in row 9 (Ac -> Lr):
    { number: 89, symbol: "Ac",  name: "Actinium",      group: 3,  gridRow: 9, gridColumn: 4 },
    { number: 90, symbol: "Th",  name: "Thorium",       group: 3,  gridRow: 9, gridColumn: 5 },
    { number: 91, symbol: "Pa",  name: "Protactinium",  group: 3,  gridRow: 9, gridColumn: 6 },
    { number: 92, symbol: "U",   name: "Uranium",       group: 3,  gridRow: 9, gridColumn: 7 },
    { number: 93, symbol: "Np",  name: "Neptunium",     group: 3,  gridRow: 9, gridColumn: 8 },
    { number: 94, symbol: "Pu",  name: "Plutonium",     group: 3,  gridRow: 9, gridColumn: 9 },
    { number: 95, symbol: "Am",  name: "Americium",     group: 3,  gridRow: 9, gridColumn: 10 },
    { number: 96, symbol: "Cm",  name: "Curium",        group: 3,  gridRow: 9, gridColumn: 11 },
    { number: 97, symbol: "Bk",  name: "Berkelium",     group: 3,  gridRow: 9, gridColumn: 12 },
    { number: 98, symbol: "Cf",  name: "Californium",   group: 3,  gridRow: 9, gridColumn: 13 },
    { number: 99, symbol: "Es",  name: "Einsteinium",   group: 3,  gridRow: 9, gridColumn: 14 },
    { number: 100, symbol: "Fm", name: "Fermium",       group: 3,  gridRow: 9, gridColumn: 15 },
    { number: 101, symbol: "Md", name: "Mendelevium",   group: 3,  gridRow: 9, gridColumn: 16 },
    { number: 102, symbol: "No", name: "Nobelium",      group: 3,  gridRow: 9, gridColumn: 17 },
    { number: 103, symbol: "Lr", name: "Lawrencium",    group: 3,  gridRow: 9, gridColumn: 18 },
  
    { number: 104, symbol: "Rf", name: "Rutherfordium", group: 4,  gridRow: 7, gridColumn: 4 },
    { number: 105, symbol: "Db", name: "Dubnium",       group: 5,  gridRow: 7, gridColumn: 5 },
    { number: 106, symbol: "Sg", name: "Seaborgium",    group: 6,  gridRow: 7, gridColumn: 6 },
    { number: 107, symbol: "Bh", name: "Bohrium",       group: 7,  gridRow: 7, gridColumn: 7 },
    { number: 108, symbol: "Hs", name: "Hassium",       group: 8,  gridRow: 7, gridColumn: 8 },
    { number: 109, symbol: "Mt", name: "Meitnerium",    group: 9,  gridRow: 7, gridColumn: 9 },
    { number: 110, symbol: "Ds", name: "Darmstadtium",  group: 10, gridRow: 7, gridColumn: 10 },
    { number: 111, symbol: "Rg", name: "Roentgenium",   group: 11, gridRow: 7, gridColumn: 11 },
    { number: 112, symbol: "Cn", name: "Copernicium",   group: 12, gridRow: 7, gridColumn: 12 },
    { number: 113, symbol: "Nh", name: "Nihonium",      group: 13, gridRow: 7, gridColumn: 13 },
    { number: 114, symbol: "Fl", name: "Flerovium",     group: 14, gridRow: 7, gridColumn: 14 },
    { number: 115, symbol: "Mc", name: "Moscovium",     group: 15, gridRow: 7, gridColumn: 15 },
    { number: 116, symbol: "Lv", name: "Livermorium",   group: 16, gridRow: 7, gridColumn: 16 },
    { number: 117, symbol: "Ts", name: "Tennessine",    group: 17, gridRow: 7, gridColumn: 17 },
    { number: 118, symbol: "Og", name: "Oganesson",     group: 18, gridRow: 7, gridColumn: 18 },
  ];
  
  /************************************************
   * 2. Get DOM Elements
   ************************************************/
  const periodicGrid   = document.getElementById("periodicGrid");
  const searchInput    = document.getElementById("searchInput");
  const searchBtn      = document.getElementById("searchBtn");
  
  const detailsPanel   = document.getElementById("detailsPanel");
  const detailsName    = document.getElementById("detailsName");
  const detailsSymbol  = document.getElementById("detailsSymbol");
  const detailsNumber  = document.getElementById("detailsNumber");
  const detailsGroup   = document.getElementById("detailsGroup");
  const closeDetailsBtn = document.getElementById("closeDetailsBtn");
  
  /************************************************
   * 3. Render the Periodic Table
   ************************************************/
  function renderPeriodicTable() {
    // Clear any existing
    periodicGrid.innerHTML = "";
  
    elementsData.forEach((el) => {
      // Create a cell
      const cell = document.createElement("div");
      cell.classList.add("element");
  
      // Assign color by group (simple example)
      if (el.group === 1) {
        cell.classList.add("group-1");
      } else if (el.group === 2) {
        cell.classList.add("group-2");
      } else if (el.group >= 3 && el.group <= 12) {
        cell.classList.add("transition-metal");
      } else if (el.group === 17) {
        cell.classList.add("group-17");
      } else if (el.group === 18) {
        cell.classList.add("group-18");
      }
      // You can add more group color logic as desired
  
      // Position in grid
      cell.style.gridRow = el.gridRow;
      cell.style.gridColumn = el.gridColumn;
  
      // HTML content
      cell.innerHTML = `
        <div class="number">${el.number}</div>
        <div class="symbol">${el.symbol}</div>
        <div class="name">${el.name}</div>
      `;
  
      // On click => show details, highlight group
      cell.addEventListener("click", () => {
        showDetails(el);
      });
  
      periodicGrid.appendChild(cell);
    });
  }
  
  /************************************************
   * 4. Show Details & Highlight
   ************************************************/
  function showDetails(element) {
    // Fill the details panel
    detailsName.textContent   = element.name;
    detailsSymbol.textContent = element.symbol;
    detailsNumber.textContent = element.number;
    detailsGroup.textContent  = element.group;
  
    // Show the panel
    detailsPanel.classList.remove("hidden");
  
    // Clear highlights
    document.querySelectorAll(".element").forEach((cell) => {
      cell.classList.remove("selected");
      cell.style.removeProperty("background-color");
    });
  
    // Highlight group
    highlightGroup(element.group, element.number);
  }
  
  function highlightGroup(groupNumber, atomicNumber) {
    const cells = document.querySelectorAll(".element");
    cells.forEach((cell) => {
      // Read the cell's atomic number from the .number element
      const cellNumber = parseInt(cell.querySelector(".number").textContent, 10);
      const elData     = elementsData.find(d => d.number === cellNumber);
      if (!elData) return;
  
      // If same group => highlight background
      if (elData.group === groupNumber) {
        cell.style.backgroundColor = "#ffe0b2"; // example highlight color
      }
  
      // If exact element => add .selected for border
      if (elData.number === atomicNumber) {
        cell.classList.add("selected");
      }
    });
  }
  
  /************************************************
   * 5. Close Details
   ************************************************/
  closeDetailsBtn.addEventListener("click", () => {
    detailsPanel.classList.add("hidden");
    // Reset any highlight color/borders
    document.querySelectorAll(".element").forEach((cell) => {
      cell.style.removeProperty("background-color");
      cell.classList.remove("selected");
    });
  });
  
  /************************************************
   * 6. Search Function
   ************************************************/
  function searchElements() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
  
    // Match atomic number, symbol, or name
    const result = elementsData.find((el) => {
      // by atomic number (string compare)
      if (String(el.number) === query) return true;
      // by symbol
      if (el.symbol.toLowerCase() === query) return true;
      // by name
      if (el.name.toLowerCase() === query) return true;
      return false;
    });
  
    if (result) {
      showDetails(result);
      scrollElementIntoView(result.number);
    } else {
      alert("No matching element found!");
    }
  }
  
  function scrollElementIntoView(atomicNumber) {
    // Simple approach: find the cell, scroll smoothly
    const cell = [...document.querySelectorAll(".element")]
      .find(c => +c.querySelector(".number").textContent === atomicNumber);
    if (cell) {
      cell.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  
  /************************************************
   * 7. Initialize
   ************************************************/
  window.addEventListener("load", () => {
    renderPeriodicTable();
  });
  
  searchBtn.addEventListener("click", searchElements);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchElements();
    }
  });
  