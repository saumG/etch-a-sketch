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
const gridLinesMode = document.querySelector('.grid-lines');
const clear = document.querySelector('.clear');
const toggleButtons = document.querySelectorAll('.toggle');

//set mode to default
let mode = 'default';
let showGrid = true;
let isDrawing = false;

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

    //Color the grid
    const gridBoxes = document.querySelectorAll('.grid-box');
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener('mousedown', () => {
        isDrawing = true;
        colorGrid(gridBox);
        });

        gridBox.addEventListener('mouseenter', () => {
        if (isDrawing) {
            colorGrid(gridBox);
        }
        });

        gridBox.addEventListener('mouseup', () => {
        isDrawing = false;
        });
    });
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

function colorGrid(gridBox) {
    switch (mode) {
        case 'rainbow':
            gridBox.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            gridBox.classList.remove('grey');
            break;
        case 'eraser':
            gridBox.style.backgroundColor = bgChoice.value;
            break;
        default:
            gridBox.style.backgroundColor = colorChoice.value;
            break;
    }
}

function eraseAll () {
    let gridBoxes = gridContainer.querySelectorAll('div');
    gridBoxes.forEach(gridBox => gridBox.style.backgroundColor = '#ffffff');
}

function deleteBoxDivs() {
    let gridBoxes = gridContainer.querySelectorAll('div');
    gridBoxes.forEach(gridBox => gridBox.remove());
}

function toggleButtonActive(button) {
    toggleButtons.forEach(btn => {
        btn.classList.toggle('active', btn === button && !button.classList.contains('active'));
    });
    if (rainbowMode.classList.contains('active')) {
        mode = 'rainbow';
    } else if (shadingMode.classList.contains('active')) {
        mode = 'shading'; // Replace 'shading' with the appropriate mode name if needed
    } else if (eraserMode.classList.contains('active')) {
        mode = 'eraser';
    }  else {
        mode = 'default';
    }
}


// EVENT LISTENERS
clear.addEventListener('click', eraseAll);

gridSlider.addEventListener('input', () => sliderUpdate());
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleButtonActive(button);
    });
});
gridLinesMode.addEventListener('click', () => {
    gridLinesMode.classList.toggle('active', !gridLinesMode.classList.contains('active'));
    const gridBoxes = document.querySelectorAll('.grid-box');

    gridBoxes.forEach((gridBox) => {
        if (gridLinesMode.classList.contains('active')){
            gridBox.style.border = 'none';
        } else {
            gridBox.style.border = '0.5px solid #eeeeee';
        }
    });
})