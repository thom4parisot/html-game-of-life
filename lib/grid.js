var Grid = {
	isCellAlive: function(element){
		return /(^| )alive( |$)/.test(element.className);
	},
	getAdjacents: function(element){
		var selectors = [],
			x = element.parentNode.rowIndex + 1,
			y = element.cellIndex + 1,
			grid_element = document.getElementById('grid'),
			adjacents = [];

		selectors.push("tr:nth-child("+(x-1)+") td:nth-child("+(y-1)+")");
		selectors.push("tr:nth-child("+(x-1)+") td:nth-child("+y+")");
		selectors.push("tr:nth-child("+(x-1)+") td:nth-child("+(y+1)+")");
		selectors.push("tr:nth-child("+x+") td:nth-child("+(y-1)+")");
		selectors.push("tr:nth-child("+x+") td:nth-child("+(y+1)+")");
		selectors.push("tr:nth-child("+(x+1)+") td:nth-child("+(y-1)+")");
		selectors.push("tr:nth-child("+(x+1)+") td:nth-child("+y+")");
		selectors.push("tr:nth-child("+(x+1)+") td:nth-child("+(y+1)+")");

		/*
		 * Avoiding Webkit nth-child bug…
		 * @see https://bugs.webkit.org/show_bug.cgi?id=32856
		 */
		adjacents = selectors.map(function(selector){
			var el = grid_element.querySelector(selector);

			if (el)
			{
				return el;
			}
		});

		return adjacents;
	}
};