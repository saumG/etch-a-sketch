
//set grid size
let numCol = 8;
let numRow = 8;


//Get the DOM for the grid container in which the grid elements will be added
const gridContainer = document.querySelector('.grid-container');

//Create the grid
function createGrid () {
    let gridArea = numCol*numRow;
    for (let row = 0; row < numRow; row++){
        for (let col = 0; col < numCol; col++){
            const cell = document.createElement('div');
            cell.classList.add('grid-box');
            cell.textContent = (row)*numRow + col;
            gridContainer.appendChild(cell);
        }
    }
    console.log("created grid");
}

createGrid()