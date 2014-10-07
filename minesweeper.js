// testInput function ensures all numbers input by the user are valid for the game
// grid must be between 10x10 and 40x30
// max mines must be less than columns*rows
// collaborated with Faith Walker
function testInput()
{
	var columns = document.getElementById("x-axis").value;
	var rows = document.getElementById("y-axis").value;
	var mines = document.getElementById("mines").value;

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
	setMines(columns, rows, mines);
}

function createGrid(columns, rows, mines) {
	var $newRow;
	var cell;
	var i, j, k;
	var cellID=1;
	var gridArea = columns*rows;
	var setDefaultZero = 1;

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
	}

	for (k=1; k<gridArea+1; k++) 
	{
		setDefaultZero = $('table').find('#'+k);
		setDefaultZero.text("0");
	}

}

function setMines(columns, rows, mines) 
{
	var mineLocation;
	var whereDaMinesAt = [];
	var mineCounter = 0;
	//this.columns = columns;
	//this.rows = rows;
	//this.mines = mines;
	var gridArea = columns*rows;

	while (mineCounter<mines) 
	{
		mineLocation = (Math.floor(Math.random() * gridArea));
		cell = $('table').find('#'+mineLocation);

		if (cell.hasClass("notMine")) 
		{
			cell.attr("class", "isMine");
			cell.text("*");
			mineCounter++;
			//cell.attr("src", "bomb.jpg");
			whereDaMinesAt.push( mineLocation );
			alert("MineLocation at time of placement = " + whereDaMinesAt[0]);
		}
		else 
		{
			//proceed through while loop
		}	
	}	

	alert("mineCounter after all placed = " + mineCounter);

	var n;
	var numMinesNear=0;
	var currentCellID=0;
	var cellToPopulate;

	for (n=0; n<mineCounter; n++)
	{
		var adjCells = [];
		alert("whereDaMinesAt[n] = " + n + whereDaMinesAt[n]);
		var currentMine = whereDaMinesAt[n];
		alert("Processing mine at location = " + currentMine);
		
		//if mine is top left corner
		if (currentMine===1)
		{
			alert("Mine is in top left corner.");
			adjCells.push( (currentMine+1), (currentMine+columns), (currentMine+columns+1) );
		}

		//if mine is top right corner
		else if (currentMine===columns)
		{
			alert("Mine is in top right corner.");
			adjCells.push( (currentMine-1), (currentMine+columns-1), (currentMine+columns) );
		}

		//mine bottom left corner
		else if (currentMine===gridArea-columns)
		{
			alert("Mine is in bottom left corner.");
			adjCells.push( (currentMine+1), (currentMine-columns), (currentMine-columns-1) );
		}

		//mine bottom right corner
		else if (currentMine===gridArea)
		{
			alert("Mine is in bottom right corner.");
			adjCells.push( (currentMine-1), (currentMine-columns), (currentMine-columns-1) );
		}

		//if mine is on top edge
		else if (currentMine<=columns) 
		{
			alert("Mine is on top edge.");
			adjCells.push( (currentMine-1), (currentMine+1), (currentMine+columns-1), (currentMine+columns), (currentMine+columns+1) );
		}

		//if mine is on bottom edge
		else if (currentMine>=(gridArea-columns)) 
		{
			alert("Mine is on bottom edge.");
			adjCells.push( (currentMine-1), (currentMine+1), (currentMine-columns-1), (currentMine-columns), (currentMine-columns-1) );
		}

		//if mine is on right edge
		else if (((currentMine+1)%columns)===0)
		{
			alert("Mine is on right edge.");
			adjCells.push( (currentMine-1), (currentMine-columns-1), (currentMine-columns), (currentMine+columns-1), (currentMine-columns) );
		}

		//if mine is on left edge
		else if (currentMine%columns) 
		{
			alert("Mine is on left edge.");
			adjCells.push( (currentMine-columns), (currentMine-columns+1), (currentMine+1), (currentMine+columns), (currentMine+columns+1) );
		}

		else //centrally located
		{
			alert("Mine is in center.");
			adjCells.push( (currentMine-1), (currentMine+1), (currentMine-columns-1), (currentMine-columns), (currentMine-columns+1), (currentMine+columns-1), (currentMine+columns), (currentMine+columns+1) );
		}

		for (j=0; j<adjCells.length-1; j++) 
		{

			currentCellID = adjCells[j];
			cellToPopulate = $('table').find('#'+currentCellID);
			alert("currentCellID = " + currentCellID);
			alert("adjCells[j] = " + adjCells[j]);

			if (cellToPopulate.hasClass("notMine")) 
			{
				alert("Cell is not a mine, popluating number...");
				numMinesNear = parseInt(cellToPopulate.text());
				numMinesNear++;
				cellToPopulate.text(numMinesNear);
			}
			else 
			{
				alert("Cell is a mine, will not populate with number.");
				//don't assign number to mine
			}

		}

	}

}