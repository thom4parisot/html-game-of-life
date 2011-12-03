phantom.injectJs("../lib/casperjs/casper.js");

var casper = new phantom.Casper({loglevel: "debug", verbose: true});

casper.start("grid.html", function(self){
	self.test.assertEval(function(){
		return document.querySelector("#grid") ? true : false;
	}, "Expecting a table with id as 'grid'.");
});

casper.then(function(self){
	self.test.assertEvalEquals(function(){
		return document.querySelectorAll("#grid td").length;
	}, 100, "Expecting 100 cells");
});

casper.then(function(self){
	self.test.assertEvalEquals(function(){
		return document.querySelectorAll("#grid td.alive").length;
	}, 4, "Expecting 4 living cells");
});

casper.then(function(self){
	self.test.assertEval(function(){
		return Grid.isCellAlive(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)")) === true;
	}, "Expecting Living cell");

	self.test.assertEval(function(){
		return Grid.isCellAlive(document.querySelector("#grid tr:nth-child(2) td:nth-child(3)")) === false;
	}, "Expecting Dead cell");
});

/*
 * Adjacent cells tests
 */
casper.then(function(self){
	self.echo("Working on cell (2,4) which is alive.", "COMMENT");

	self.test.assertEvalEquals(function(){
		return Grid.getAdjacents(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)")).length;
	}, 8, "Expecting 8 adjacent cells");

	self.test.assertEvalEquals(function(){
		return Grid.getAdjacents(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)"), Grid.isCellAlive).length;
	}, 2, "Expecting 2 alive adjacent cells");
});

/*
 * Working on next state
 */
 casper.then(function(self){
	self.echo("Next Grid State.", "COMMENT");

	self.evaluate(function(){
		Grid.nextState();
	});

	self.test.assertEvalEquals(function(){
		return Grid.getAdjacents(document.querySelector("#grid tr:nth-child(2) td:nth-child(4)"), Grid.isCellAlive).length;
	}, 3, "Expecting now 3 alive adjacent cells");

	self.test.assertEval(function(){
		return Grid.isCellAlive(document.querySelector("#grid tr:nth-child(3) td:nth-child(5)")) === true;
	}, "Next diagonal cell is now alive.");

	self.test.assertEval(function(){
		return Grid.isCellAlive(document.querySelector("#grid tr:nth-child(9) td:nth-child(6)")) === false;
	}, "Alone cell should have died.");
});

casper.run(function(self){
	self.exit();
});