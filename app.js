const canvasField = document.getElementById("gridCanvas");
const paletteField = document.getElementById('palette');
const indicator = document.getElementById("currentColor");
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const customColor = document.getElementById("customColor");
let activeColor = 'red';
indicator.style.backgroundColor = activeColor;
let isDrawing = false;

// ============== EVENT LISTENERS =====================
window.addEventListener('load', () => {
    getDrawingFromStorage();
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

// Add the event listeners for mousedown, mousemove, and mouseup
canvasField.addEventListener('mousedown', e => {let el = e.target;
    e.preventDefault();
    if (el.className === 'element') el.style.backgroundColor = activeColor;
    isDrawing = true;
});

canvasField.addEventListener('mouseover', e => {
    e.preventDefault();
    if (isDrawing === true) {
        let el = e.target;
        if (el.className === 'element') el.style.backgroundColor = activeColor;
    }
});

window.addEventListener('mouseup', () => {
    if (isDrawing === true) {
        isDrawing = false;
    }
});

clearButton.addEventListener('click', () => {
    let pixels = document.getElementsByClassName("element");
    for(let pixel of pixels) {
        if (pixel.style.backgroundColor != "") pixel.style.backgroundColor = "";
    }
})

saveButton.addEventListener('click', () => {
    setDrawingInStorage();
})
// ===================== FUNCTIONS =======================

function createPalette() {
    const colors = [ 'maroon', 'darkred', 'red', 'tomato', 'lightcoral', 'lightpink', 'lightsalmon',
        'sandybrown', 'sienna', 'peru', 'orangered', 'orange', 'goldenrod','gold',  'yellowgreen', 'olive',
        'green', 'seagreen', 'mediumaquamarine', 'darkcyan', 'cornflowerblue', 'blue', 'darkblue', 'blueviolet', 'slateblue',
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

    canvasField.style.width = String(ratioW  * size);
    canvasField.style.height = String(ratioH  * size);

    for (let i = 0; i < ratioH; i++) {
        for(let p = 0; p < ratioW; p++){
            let el = document.createElement("div");
            el.className = "element";
            el["x-position"] = `${i}`;
            el["y-position"] = `${p}`;
            canvasField.appendChild(el);
        }
    }
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
    let drawing = JSON.parse(localStorage.getItem('drawing'));
    let pixels = document.getElementsByClassName("element");
    for (let pixel of pixels) {
        for (let savedBlock of drawing) {
            if (Number(pixel["x-position"]) === Number(savedBlock.x) && Number(pixel["y-position"]) === Number(savedBlock.y)) {
                pixel.style.backgroundColor = savedBlock.color;
            }
        }
    }

}

createGrid();
createPalette();