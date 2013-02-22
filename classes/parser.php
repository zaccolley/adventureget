<?php

//The parser class

class Parser{ 
    
    private $_verbs;

    function Parser()
    {
        $this->_verbs = file('txt/verbs.txt');
        $this->_nouns = file('txt/nouns.txt');
    }

    public function printVerbs()
    {
        foreach($this->_verbs as $verb)
        {
            $commandParts = explode(":", $verb);
            $verb = $commandParts[0];
            echo "<p>* $verb</p>";
        }
    }

    public function parseCommands($command)
    {
        $commands = explode(" ", $command);
        echo "<p>- $command</p>";
        foreach($commands as $c)
        {
            foreach($this->_verbs as $verb)
            {
                $commandParts = explode(":", $verb);
                if($c == trim($commandParts[0])){ //trim as there is a linebreak in text file
                    $verbID = $commandParts[1];
                    return $verbID;
                }
            }
            // if we get this far it isnt a valid input
            echo "<p>\"$c\" is not a valid input. :¬(</p>";
            return null;
        }
    }

    public function runCommand($id)
    {
        if($id != null)
        {
            switch ($id) {
            case 0: // walk, move etc
                echo "<p>you are walking</p>";
                break;
            case 1: // pickup, grab etc
                echo "<p>you are picking something up</p>";
                break;
            case 2: // climb, up, dowm etc
                echo "<p>you are climbing</p>";
                break;
             case 3: // help
                echo "<p>Some helpful stuff printed here followed by a list of available commands</p>";
                echo "<p>Available verbs:</p>";
                $this->printVerbs();
                break;
            case 100: // hello
                echo "<p>Hi there!</p>";
            }
        }
    }
}

?> 