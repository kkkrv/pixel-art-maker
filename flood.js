function floodFill(image, targetX, targetY, newColor) {
    let current = getPixelByCoordinates(image, targetX, targetY);
    let originalColor = current.style.backgroundColor;

    if(originalColor === newColor) return image;

    console.log("START FILLING")

    const rows = document.getElementsByClassName("row");

    if (targetX < 0 || targetY < 0 || targetX > rows.length - 1 || targetY > rows[targetX].length - 1) {
        return;
    }

    let queue = [];
    queue.push(current);

    while (queue.length) {
        let current = queue.shift();
        let color = current.style.backgroundColor;

        if (color !== originalColor) {
            continue;
        }

        current.style.backgroundColor = newColor;
        expandToNeighbours(image, queue, current);
    }
}

function expandToNeighbours(image, queue, current) {
    let neighbours = getNeighbours(image, current);
    queue.push.apply(queue, neighbours);
}

function getNeighbours(image, current) {

    let targetX = Number(current["x-position"]);
    let targetY = Number(current["y-position"]);

    let neighbours = [];

    for(let pixel of image) {
        let x = Number(pixel["x-position"]);
        let y = Number(pixel["y-position"]);
        if (x === targetX + 1 && y === targetY) {
            neighbours.push(pixel);
        } else if (x === targetX - 1 && y === targetY) {
            neighbours.push(pixel);
        } else if (x === targetX && y === targetY + 1) {
            neighbours.push(pixel);
        } else if (x === targetX && y === targetY - 1) {
            neighbours.push(pixel);
        }
    }
    return neighbours;
}

function getPixelByCoordinates(image, targetX, targetY) {
    let current;
    console.log(typeof image);
    for(let pixel of image) {
        let x = Number(pixel["x-position"]);
        let y = Number(pixel["y-position"]);
        if (x === targetX && y === targetY) {
            current = pixel;
        }
    }
    return current;
}

export default floodFill;
