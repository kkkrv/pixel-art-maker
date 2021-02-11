import initialDrawing from "./defaultDrawing.js";
import floodFill from "./flood.js";

const canvasField = document.getElementById("gridCanvas");
const paletteField = document.getElementById('palette');
const indicator = document.getElementById("currentColor");
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const customColor = document.getElementById("customColor");
const toolCheckbox = document.getElementById("tool");

let activeColor = 'red';
indicator.style.backgroundColor = activeColor;
let isDrawing = false;
let selectedTool = "brush";

// ================ EVENT LISTENERS =====================
window.addEventListener('load', () => {
    if (! getDrawingFromStorage()) draw(initialDrawing);
})

toolCheckbox.addEventListener("change", () => {
    changeInstrument();
})


paletteField.addEventListener('click', (e) => {
    let el = e.target;
    if (el.className === 'colorField' && el.tagName !== "input") {
        activeColor = el.style.backgroundColor;
        indicator.style.backgroundColor = activeColor;
    }
})

customColor.addEventListener("change", (e) => {
    let el = e.target;
    activeColor = el.value;
    indicator.style.backgroundColor = activeColor;
})


clearButton.addEventListener('click', () => {
    let pixels = document.getElementsByClassName("element");
    for(let pixel of pixels) {
        if (pixel.style.backgroundColor != "") pixel.style.backgroundColor = "";
    }
})

saveButton.addEventListener('click', () => {
    setDrawingInStorage();
})

// Add the event listeners for mousedown, mousemove, and mouseup
canvasField.addEventListener('mousedown', e => {let el = e.target;
    e.preventDefault();
    if (el.className === 'element' && selectedTool === "brush") el.style.backgroundColor = activeColor;
    isDrawing = true;
});

canvasField.addEventListener('mouseover', e => {
    e.preventDefault();
    if (isDrawing === true) {
        let el = e.target;
        if (el.className === 'element' && selectedTool === "brush") el.style.backgroundColor = activeColor;
    }
});

window.addEventListener('mouseup', () => {
    if (isDrawing === true && selectedTool === "brush") {
        isDrawing = false;
    }
});


canvasField.addEventListener("click", (e) => {
    let target = e.target;
    if (selectedTool === "flood") {
        let pixels = document.getElementsByClassName("element");
        let x = Number(target["x-position"]);
        let y = Number(target["y-position"]);
        floodFill(pixels, x, y, activeColor);
    }

})
// ===================== FUNCTIONS =======================

function createPalette() {
    const colors = [ 'maroon', 'red', "tomato", 'coral', 'lightcoral', 'lightpink', 'lightsalmon',
        'sandybrown', 'peru', 'orangered', 'orange', 'gold',  'yellowgreen', 'olive',
        'green', 'seagreen', 'darkcyan', 'cornflowerblue', 'blue', 'darkblue', 'blueviolet', 'slateblue',
        'darkorchid', 'darkmagenta', 'black', 'gray', 'lightgrey', 'white'];
    for (let color of colors) {
        console.log(color);
        let colorField = document.createElement('div');
        colorField.className = 'colorField';
        colorField.style.backgroundColor = color;
        paletteField.prepend(colorField);
    }
}

function createGrid() {
    let width = 800,
        height = 500,
        size = 10;
    let ratioW = Math.floor(width / size),
        ratioH = Math.floor(height / size);

    canvasField.style.width = String(ratioW * size);
    canvasField.style.height = String(ratioH * size);

    for (let i = 0; i < ratioH; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for(let p = 0; p < ratioW; p++){
            let el = document.createElement("div");
            el.className = "element";
            el["x-position"] = `${i}`;
            el["y-position"] = `${p}`;
            row.appendChild(el);
        }
        canvasField.appendChild(row);
    }
}

function draw(savedPixels) {
    let pixels = document.getElementsByClassName("element");
    for (let pixel of pixels) {
        for (let savedBlock of savedPixels) {
            if (Number(pixel["x-position"]) === Number(savedBlock.x) && Number(pixel["y-position"]) === Number(savedBlock.y)) {
                pixel.style.backgroundColor = savedBlock.color;
            }
        }
    }
}

function changeInstrument() {
    (selectedTool === "brush") ? selectedTool = "flood" : selectedTool = "brush";
}


// ================== WORK WITH LOCALSTORAGE ======================

function setDrawingInStorage() {
    let pixels = document.getElementsByClassName("element");
    let drawing = [];
    for(let pixel of pixels) {
        let colorBlock = {};
        if (pixel.style.backgroundColor) {
            colorBlock.x = pixel["x-position"];
            colorBlock.y = pixel["y-position"];
            colorBlock.color = pixel.style.backgroundColor;
            drawing.push(colorBlock);
        }
    }
    localStorage.setItem('drawing', JSON.stringify(drawing));
}

function getDrawingFromStorage() {
    let savedPixels = JSON.parse(localStorage.getItem('drawing'));

    if (savedPixels) {
        draw(savedPixels);
        return true
    } else {
        return false;
    }
}


createGrid();
createPalette();