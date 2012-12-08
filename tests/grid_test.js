var casper = require('casper').create({
	loglevel: "debug",
	verbose: true
});

casper.start("grid.html", function(){
	this.test.assertExists("#grid", "Expecting a table with id as 'grid'.");
});

casper.then(function(){
	this.test.assertEvalEquals(function(){
		return document.querySelectorAll("#grid td").length;
	}, 100, "Expecting 100 cells");
});

casper.then(function(){
	this.test.assertEvalEquals(function(){
		return document.querySelectorAll("#grid td.alive").length;
	}, 4, "Expecting 4 living cells");
});

casper.then(function(){
	this.test.assertEval(function(){
		return GridInstance.isCellAlive(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)")) === true;
	}, "Expecting Living cell");

	this.test.assertEval(function(){
		return GridInstance.isCellAlive(document.querySelector("#grid tr:nth-child(2) td:nth-child(3)")) === false;
	}, "Expecting Dead cell");
});

/*
 * Adjacent cells tests
 */
casper.then(function(){
	this.echo("Working on cell (2,4) which is alive.", "COMMENT");

	this.test.assertEvalEquals(function(){
		return GridInstance.getAdjacents(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)")).length;
	}, 8, "Expecting 8 adjacent cells");

	this.test.assertEvalEquals(function(){
		return GridInstance.getAdjacents(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)"), GridInstance.isCellAlive).length;
	}, 2, "Expecting 2 alive adjacent cells");
});

/*
 * Working on next state
 */
 casper.then(function(){
	this.echo("Next Grid State.", "COMMENT");

	this.evaluate(function(){
		GridInstance.nextState();
	});

	this.test.assertEvalEquals(function(){
		return GridInstance.getAdjacents(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)"), GridInstance.isCellAlive).length;
	}, 3, "Expecting now 3 alive adjacent cells");

	this.test.assertEval(function(){
		return GridInstance.isCellAlive(document.querySelector("#grid tr:nth-child(3) td:nth-child(5)")) === true;
	}, "Next diagonal cell is now alive.");

	this.test.assertEval(function(){
		return GridInstance.isCellAlive(document.querySelector("#grid tr:nth-child(9) td:nth-child(6)")) === false;
	}, "Alone cell should have died.");
});

casper.run(function(self){
	this.test.renderResults(true);
});
