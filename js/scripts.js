// When the window is resized
$(window).resize(function(){ 
	$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
});

// When clicking the main terminal
$('#terminal').click(function(){ 
	$('#commands').focus(); // Focus input #commands
});

var prevCommands = new Array(); // List of entered commands
var commandIndex = 0;

// If someone presses enter when inputting
$('#commands').keydown(function(event) { // When keys are pressed in the input #commands
	code = event.keyCode || event.which; // Checks for key
	
	if(code == 13){ // If it's enter
		$enterValue = this.value.trim();
		if($enterValue !== ""){ //add the entered command to the commands array
			prevCommands[prevCommands.length] = $enterValue;
			commandIndex = prevCommands.length;
		}
		updateTerminal(this.value); // Commands away!
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 38){ // If it's the up key
		if(commandIndex > 0){
			commandIndex--;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 40){ // If it's the down key
		if(commandIndex < prevCommands.length){
			commandIndex++;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	
});

// Intialisation of game
var game = new Game(mapJSON);
var data = game.launch();
$('#text').append(data); // Append on to the end of existing content

function updateTerminal(input){
	jQuery.getJSON("js/commandlist.json", function(json) {
		$data = game._parser.printCommands(json);
	}).complete(function(){
 		$('#text').append($data); // Append on to the end of existing content
		$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
	});
	$('#commands').val("");	// Clear input box
	$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
}

function clearScreen(){ $('#text').html(""); }
function toggleFullscreen(){ $('#terminal').toggleClass("fullscreen"); } // Add/remove full screen class

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};