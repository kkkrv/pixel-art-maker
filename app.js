const canvasField = document.getElementById("canvas");
const paletteField = document.getElementById('palette');

let activeColor = 'red';

canvasField.addEventListener('click', (e) => {
    let el = e.target;
    if (el.className === 'element') el.style.backgroundColor = activeColor;
})

paletteField.addEventListener('click', (e) => {
    let el = e.target;
    if (el.className === 'colorField') activeColor = el.style.backgroundColor;
})

function createPalette() {
    const colors = [ 'maroon', 'darkred', 'red', 'indianred', 'tomato', 'lightcoral', 'lightpink', 'lightsalmon',
        'sandybrown', 'peru', 'orangered', 'orange', 'goldenrod','gold',  'khaki', 'yellowgreen', 'olive',
        'green', 'seagreen', 'mediumaquamarine', 'darkcyan', 'cornflowerblue', 'blue', 'darkblue', 'blueviolet', 'slateblue',
        'darkorchid', 'darkmagenta', 'black', 'gray', 'lightgrey', 'white'];
    for (let color of colors) {
        console.log(color);
        let colorField = document.createElement('div');
        colorField.className = 'colorField';
        // colorField.id = color;
        colorField.style.backgroundColor = color;
        paletteField.appendChild(colorField);
    }
}

function createGrid() {
    let width = 800,
        height = 500,
        size = 10;
    let ratioW = Math.floor(width / size),
        ratioH = Math.floor(height / size);

    let parent = document.getElementById("gridCanvas");
    parent.style.width = String(ratioW  * size);
    parent.style.height = String(ratioH  * size);


    for (let i = 0; i < ratioH; i++) {
        for(let p = 0; p < ratioW; p++){
            let el = document.createElement("div");
            el.className = "element";
            el.id = `el_${i}_${p}`;
            parent.appendChild(el);
        }
    }
}

createGrid();
createPalette();