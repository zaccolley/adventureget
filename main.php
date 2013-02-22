<?php

include "classes/parser.php";
$parser = new Parser();

if (isset($_POST['commands']))
	{

	$command = trim($_POST['commands']);

	if($command == "")
	{
		echo "<p>You entered nothing!</p>";
	}
	else
	{
		$id = $parser->parseCommands($command);
		runCommand($id);
	}	
}
else
{
	echo "<p>adventureGet - super super awesome text <em>adventure</em> game</p>";
	include 'classes/player.php';
	$player = new Player('John Smith', 130, 50);
	$player->printDetails();
}

function runCommand($id)
{
	if($id != null)
	{
		switch ($id) {
	    case 0:
	        echo "<p>You are walking!</p>";
	        break;
	    case 1:
	        echo "<p>You are picking something up!</p>";
	        break;
	    case 2:
	        echo "<p>You are climbing!</p>";
	        break;
		}
	}
}

?>