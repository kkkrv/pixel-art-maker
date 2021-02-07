let canvasField = document.getElementById("canvas");


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

createGrid()