/*

CS 290 Week 5 Assignment -  DOM and Events
Author: Eric Colvin Morgan

*/

const CELL_FORMATING = "1px solid Gainsboro";
const SELECTED_CELL_FORMATING = "2px solid Black";

class Grid {
    constructor(height, width) {
        this.height = height > 1 ? height : 1;
        this.width = width > 1 ? width : 1;
        this._currentRow = 1;
        this._currentCol = 1;
    }

    set currentRow(value) {
        if (value >= 1 && value <= this.width) {
            this._currentRow = value;
        }
    }

    get currentRow() {
        return this._currentRow;
    }

    set currentCol(value) {
        if (value >= 1 && value <= this.width) {
            this._currentCol = value;
        }
    }

    get currentCol() {
        return this._currentCol;
    }

    createBoard() {
        //Remove Existing Grid
        let existingGrid = document.getElementById("grid-node");
        if (existingGrid !== null) {
            existingGrid.remove();
        }

        //Create New Grid
        let gridTable = document.createElement("table");
        gridTable.style.margin = "0 auto";
        gridTable.id = "grid-node";
        gridTable.style.border = CELL_FORMATING;

        //Create Headers
        let headerTr = document.createElement("tr");
        gridTable.appendChild(headerTr);
        for (let headerCol = 1; headerCol <= this.width; headerCol++) {
            let headerCell = document.createElement("th");
            headerCell.style.border = CELL_FORMATING;
            headerCell.textContent = "Header " + headerCol;
            headerTr.appendChild(headerCell);
        }

        //Create Detail Area
        for (let detailRow = 1; detailRow <= this.height; detailRow++) {
            let detailTr = document.createElement("tr");
            gridTable.appendChild(detailTr);
            for (let detailCol = 1; detailCol <= this.width; detailCol++) {
                let detailCell = document.createElement("td");
                detailCell.classList.add("detail-cell");
                detailCell.setAttribute("detail-row", detailRow);
                detailCell.setAttribute("detail-col", detailCol);
                detailCell.style.border = CELL_FORMATING;

                //Per requirements, this should be in R, C format, but per grading rubic this should be in C, R format.
                //This was addressed in Piazza #78, and Fengfei Zheng indicted specific order does not matter.
                detailCell.textContent = detailRow + ", " + detailCol;
                detailTr.appendChild(detailCell);
            }
        }

        document.body.appendChild(gridTable);
        this.highlightCurrent();

        //Navigation Button Creation Function
        let createButton = (direction) => {
            let button = document.createElement("button");
            button.addEventListener("click", () => {
                this.moveCurrent(direction);
            });
            button.textContent = direction;
            return button;
        }

        //Initialize Navigation Buttons
        //Top Buttons
        let navigationTop = document.createElement("div");
        navigationTop.style.textAlign = "center";
        
        let buttonUp = createButton("Up");
        navigationTop.appendChild(buttonUp);
        document.body.appendChild(navigationTop);

        //Middle Buttons
        let navigationMiddle = document.createElement("div");
        navigationMiddle.style.textAlign = "center";
        let buttonLeft = createButton("Left");
        let buttonRight = createButton("Right");
        
        let buttonMark = document.createElement("button");
        buttonMark.addEventListener("click", () => {
            this.markCurrent();
        })
        buttonMark.textContent = "Mark Cell";

        navigationMiddle.appendChild(buttonLeft);
        navigationMiddle.appendChild(buttonMark);
        navigationMiddle.appendChild(buttonRight);
        document.body.appendChild(navigationMiddle);

        //Bottom Buttons
        let navigationBottom = document.createElement("div");
        navigationBottom.style.textAlign = "center";
        let buttonDown = createButton("Down");
        navigationBottom.appendChild(buttonDown);
        document.body.appendChild(navigationBottom);

    }

    highlightCurrent() {
        let detailCells = document.querySelectorAll(".detail-cell");
        detailCells.forEach((cell) => {
            let cellRow = cell.getAttribute("detail-row");
            let cellCol = cell.getAttribute("detail-col");

            if (this.currentRow == cellRow && this.currentCol == cellCol) {
                cell.style.border = SELECTED_CELL_FORMATING;
            }
            else {
                cell.style.border = CELL_FORMATING;
            }
        });
    }

    moveCurrent(direction) {
        switch (direction) {
            case "Up":
                this.currentRow -= 1;
                break;

            case "Right":
                this.currentCol += 1;
                break;

            case "Down":
                this.currentRow += 1;
                break;

            case "Left":
                this.currentCol -= 1;
                break;
        }

        this.highlightCurrent();
    }

    markCurrent() {
        let detailCells = document.querySelectorAll(".detail-cell");
        detailCells.forEach((cell) => {
            let cellRow = cell.getAttribute("detail-row");
            let cellCol = cell.getAttribute("detail-col");

            if (this.currentRow == cellRow && this.currentCol == cellCol) {
                if (cell.style.background == "wheat") {
                    //Do nothing, cell should be "permanently" changed.
                    //cell.style.background = "";
                }
                else {
                    cell.style.background = "wheat";
                }
            };
        });
    }
}

let grid = new Grid(4, 4);
grid.createBoard();