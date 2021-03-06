// map class
// ---------

function Map(){

	this.loadMap = function(json){	

		var xMapLimit = 0;
		var yMapLimit = 0;

		for(var i = 0; i < json.area.length; i++){
			var area = json.area[i];
			var x = area.loc.x;
			var y = area.loc.y;
			if(x > xMapLimit){ xMapLimit = x; }
			if(y > yMapLimit){ yMapLimit = y; }
		}
      			
		var areas = [];

		for(var i = 0; i < xMapLimit + 1; i++){
			areas[i] = [];
		}
		
		for(var i = 0; i < json.area.length; i++){
			area = json.area[i];
			x = area.loc.x;
			y = area.loc.y;
			exits = area.exits.split(" ");

			// pete: dirty hack until I find a better fix
			if(exits[0] == ""){ exits = new Array('north', 'south', 'east', 'west'); }

			items = new Array();
			if(typeof area.items !== 'undefined'){ // if there are items
				for(var j = 0; j < area.items.length; j++){
					item = area.items[j];
					itemObj = new Item(item.name, item.description, item.weight);
					items.push(itemObj);
				}
			}		
			
			npcs = new Array();
			if(typeof area.npcs !== 'undefined'){ // if there are npcs
				for(var j = 0; j < area.npcs.length; j++){
					npc = area.npcs[j];
					npcObj = new Npc(npc.name, area.loc.x, area.loc.y, npc.health, npc.exp, npc.hostile, npc.description);
					npcs.push(npcObj);
				}
			}

			areas[x][y] = new Area(area.title, area.description, area.locked, x, y, exits, items, npcs);
  		}

		emptyExits = new Array(); // this code is messy :(

		for(i = 0; i < xMapLimit + 1; i++){
			for(j = 0; j < yMapLimit + 1; j++){
				if(typeof areas[i][j] == 'undefined'){
					areas[i][j] = new Area("", "", 1, i, j, emptyExits, null, null);
				}
			}
		}
		
 		// As you start here it is auto explored
		areas[0][0].setExplored(true);

		return areas;

	};

};