// testInput function ensures all numbers input by the user are valid for the game
// grid must be between 10x10 and 40x30
// max mines must be less than columns*rows
function testInput()
{
	alert("working...");
	var columns = document.getElementById("x-axis").value;
	var rows = document.getElementById("y-axis").value;
	var mines = document.getElementById("mines").value;
	var gridArea = columns*rows;

	if(columns<8 || rows<8 || columns>40 || rows>30) {
		alert("Sorry, please enter a grid size between 8x8 and 40x30.");
	}
	else if (mines>=(columns*rows)) {
		alert("Sorry, please enter a number of mines less than " + (columns*rows));
	}
	else {
		var popup_message = "Your minesweeper grid will be: " 
		+ document.getElementById("x-axis").value
		+ " by "
		+ document.getElementById("y-axis").value;
		alert(popup_message);
	}

	createGrid(columns, rows, mines);
	setMines(mines, gridArea);
	setNumbers();
}

function createGrid(columns, rows, mines) {
	alert("activation complete.. all systems go!");
	var $newRow;
	var $myGrid;
	var cell;
	var i, j;
	var cellID=1;

	for (i=0; i<rows; i++) {
    	$newRow = $('<tr></tr>');

    	for (j=0; j<columns; j++) {
    		cell = document.createElement("td");
        	$newRow.append(cell); // Append an empty <td> element to the row that we are building.
    		cell.setAttribute("id", cellID);
    		//cell.setAttribute("class", "unclicked");
    		cell.setAttribute("class", "notMine");
    		cellID++;
    	}

    	$('table').append($newRow);
    	
        alert("row added");
	}

}

function setMines(mines, gridArea) {
	var mineLocation;
	var whereDaMinesAt;
	var isMineBool = 0; //default to false
	var mineCounter = 0;

	while (mineCounter<mines) {
		mineLocation = (Math.floor(Math.random() * gridArea));
		cell = $('table').find('#'+mineLocation);

		if (cell.hasClass("notMine")) {
			cell.attr("class", "isMine");
			cell.text("*");
			mineCounter++;
			//cell.attr("src", "bomb.jpg");
			//whereDaMinesAt[i] = mineLocation;
		}
		else {
			//do nothing
		}
		
	}

	//Find numbers of adjacent bombs per cell
}