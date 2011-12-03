var Grid = {
	isCellAlive: function(element){
		return element.className.indexOf("alive") != -1;
	},
	getAdjacents: function(element){
		var selectors = [],
			x = element.parentNode.rowIndex,
			y = element.cellIndex;

		selectors.push("#grid tr:nth-child("+(x-1)+") td:nth-child("+(y-1)+")");
		selectors.push("#grid tr:nth-child("+(x-1)+") td:nth-child("+y+")");
		selectors.push("#grid tr:nth-child("+(x-1)+") td:nth-child("+(y+1)+")");
		selectors.push("#grid tr:nth-child("+x+") td:nth-child("+(y-1)+")");
		selectors.push("#grid tr:nth-child("+x+") td:nth-child("+(y+1)+")");
		selectors.push("#grid tr:nth-child("+(x+1)+") td:nth-child("+(y-1)+")");
		selectors.push("#grid tr:nth-child("+(x+1)+") td:nth-child("+y+")");
		selectors.push("#grid tr:nth-child("+(x+1)+") td:nth-child("+(y+1)+")");

		return document.querySelectorAll(selectors.join(','));
	}
};