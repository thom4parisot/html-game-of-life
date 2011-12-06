function Grid(el){
	var grid_element = el;

	if (!el || el.nodeName !== "TABLE")
	{
		throw Error("First parameter must be a TABLE element.");
	}

	return {
		applyRulesOnCell: function(element){
			var pass = false,
				rules = this.rules,
				rules_length = rules.length,
				adjacents = this.getAdjacents(element, this.isCellAlive);

			while (pass != true && rules_length--){
				pass = this.rules[rules_length].call(this, element, adjacents);
			}
		},
		isCellAlive: function(element){
			return /(^| )alive( |$)/.test(element.className);
		},
		getAdjacents: function(element, callback){
			var selectors = [],
				x = element.parentNode.rowIndex + 1,
				y = element.cellIndex + 1,
				adjacents = [],
				callback = typeof callback === "function" ? callback : function(){ return true; };

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
			selectors.forEach(function(selector){
				var el = grid_element.querySelector(selector);

				if (el && callback(el))
				{
					adjacents.push(el);
				}
			});

			return adjacents;
		},
		nextState: function(){
			Array.prototype.map.call(grid_element.getElementsByTagName("td"), this.applyRulesOnCell, this);
		},
		rules: [
			function setAlive(cell_element, adjacent_elements){
				if (adjacent_elements.length === 3)
				{
					cell_element.className += " alive";
					return true;
				}
			},
			function unsetAlive(cell_element, adjacent_elements){
				if (adjacent_elements.length < 2 || adjacent_elements.length > 3)
				{
					cell_element.className = cell_element.className.replace(/(^| )alive( |$)/, "");
					return true;
				}
			}
		]
	};
}