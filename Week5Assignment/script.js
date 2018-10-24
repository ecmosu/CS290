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
            headerCell.innerText = "Header " + headerCol;
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
                detailCell.innerText = detailCol + ", " + detailRow;
                detailTr.appendChild(detailCell);
            }
        }

        document.body.appendChild(gridTable);
        this.highlightCurrent();

        //Initialize Navigation Buttons
        //Top Buttons
        let navigationTop = document.createElement("div");
        navigationTop.style.textAlign = "center";
        let buttonUp = document.createElement("button");
        buttonUp.addEventListener("click", () => {
            this.moveCurrent(1);
        });
        buttonUp.innerText = "Up";
        navigationTop.appendChild(buttonUp);
        document.body.appendChild(navigationTop);

        //Middle Buttons
        let navigationMiddle = document.createElement("div");
        navigationMiddle.style.textAlign = "center";
        let buttonLeft = document.createElement("button");
        buttonLeft.innerText = "Left";
        buttonLeft.addEventListener("click", () => {
            this.moveCurrent(4);
        });

        let buttonMark = document.createElement("button");
        buttonMark.addEventListener("click", () => {
            this.markCurrent();
        })
        buttonMark.innerText = "Mark Cell";

        let buttonRight = document.createElement("button");
        buttonRight.addEventListener("click", () => {
            this.moveCurrent(2);
        });
        buttonRight.innerText = "Right";

        navigationMiddle.appendChild(buttonLeft);
        navigationMiddle.appendChild(buttonMark);
        navigationMiddle.appendChild(buttonRight);
        document.body.appendChild(navigationMiddle);

        //Bottom Buttons
        let navigationBottom = document.createElement("div");
        navigationBottom.style.textAlign = "center";
        let buttonDown = document.createElement("button");
        buttonDown.addEventListener("click", () => {
            this.moveCurrent(3);
        });
        buttonDown.innerText = "Down";
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
            case 1:
                this.currentRow -= 1;
                break;

            case 2:
                this.currentCol += 1;
                break;

            case 3:
                this.currentRow += 1;
                break;

            case 4:
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