//Get the DOM for the grid container in which the grid elements will be added
const gridContainer = document.querySelector('.grid-container');

//Get all necessary DOMs

//set grid size
let numCols = 64;
let numRows = 64;


//Create the grid
function createGrid () {
    gridContainer.style.setProperty('--grid-rows', numRows);
    gridContainer.style.setProperty('--grid-cols', numCols);


    let gridArea = numCols*numRows;
    for (let box = 0; box < gridArea; box++){
        let cell = document.createElement("div");
        // cell.innerText = box + 1;
        gridContainer.appendChild(cell).className = "grid-box";
    }
    console.log("created grid");
}

createGrid()