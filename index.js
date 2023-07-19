//Get the DOM for the grid container in which the grid elements will be added
const gridContainer = document.querySelector('.grid-container');

//Get all necessary DOMs
const colorChoice = document.getElementById('color-select');
const bgChoice = document.getElementById('bg-select');
const rainbowMode = document.querySelector('.rainbow');
const shadingMode = document.querySelector('.shading');
const eraserMode = document.querySelector('.eraser');
const gridSlider = document.getElementById('size-range');
const gridValSpans = document.querySelectorAll('.grid-val');
const gridLines = document.querySelector('.grid-lines');
const clear = document.querySelector('.clear');
const toggleButtons = document.querySelectorAll('.toggle');


//set grid size
let numCols = 10;
let numRows = 10;

// Creates grid on page load
createGrid()

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
    console.log(`created grid ${numCols}`);
}

function sliderUpdate () {
    // Get the current value of the slider
    const sliderValue = gridSlider.value;
    console.log("update slider value " + `${sliderValue}`)
    // Update the grid size variables
    numCols = sliderValue;
    numRows = sliderValue;

    // Update the text content of the grid-val spans
    gridValSpans.forEach(span => {
        span.textContent = sliderValue;
        console.log("update slider value " + `${sliderValue}`)
    });

    // Delete the existing grid boxes
    deleteBoxDivs();

    // Recreate the grid with the new size
    createGrid();
}

function deleteBoxDivs() {
    let gridBoxes = gridContainer.querySelectorAll('div');
    gridBoxes.forEach(gridBox => gridBox.remove());
}

function toggleButtonActive(button) {
    toggleButtons.forEach(btn => {
        btn.classList.toggle('active', btn === button && !button.classList.contains('active'));
    });
}

// EVENT LISTENERS
gridSlider.addEventListener('input', () => sliderUpdate());
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleButtonActive(button);
    });
});