<?php
if (isset($_POST['commands'])){
	$command = $_POST['commands'];
	$commands = explode(" ", $command);

	if($_POST['commands'] == ""){
		echo "<p>You entered nothing!</p>";
	}else{

		echo "<p>Words in command:</p>";
		foreach($commands as $c){
			echo "<p>$c</p>";
		}
	}
}
else{
	echo '<p>ERROR: Didn\'t get anything posted. :¬(</p>';
}
?>