var Word = require('./word.js');
var inquirer = require('inquirer');
const color = require('colors')

wordList = ["JAMES HARDEN", "STEPH CURRY", "KEVIN DURANT", "ERIC GORDON", "KLAY THOMPSON", "DRAYMOND GREEN", "CHRIS PAUL", "LEBRON JAMES"]
var generator = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

function init() {
    if (wordList.length<2) {
        wordList = ["JAMES HARDEN", "STEPH CURRY", "KEVIN DURANT", "ERIC GORDON", "KLAY THOMPSON", "DRAYMOND GREEN", "CHRIS PAUL", "LEBRON JAMES"]
    }
    // randomly select an index within the wordList using Math.random 
    generator = Math.floor(Math.random() * wordList.length);
    // store word at randomly selected index into a variable
    chosenWord = wordList[generator];
    // create a new instance of Word
    gameWord = new Word(chosenWord);
    gameWord.createWord();

    if (generator > -1){
        wordList.splice(generator, 1)
    }

    console.log('\nYou have 10 guesses to reveal the NBA player.\n');
    promptUser();
}

function promptUser() {
    if (counter < 10){
        // getCharacter() on each Letter instance of the word then perform displayWord() to view gameWord
        // will only be spaceholders as the user has yet to enter any guesses 
        console.log(gameWord.displayWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter then press enter. ",
            }
        ]).then(function(data){
            // after receiving a guess from user perform the checkAnswer to match it up with .check() method on each Letter instance
            checkAnswer(data);
        })
    } else {
        // condition if counter is greater than 10
        // meaning user is out of guesses
        console.log('\nSorry, but you have ran out of guesses.');
        console.log(chosenWord.red);
        chosenWord = " ";
        gameWord = "";
        generator = 0;
        counter = 0;
        // initialize game once more, and prompt user
        init();
    }
}

function checkAnswer(data) {
    // check if input is just one letter and a letter
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        // turn the data.letter to uppercase so as to properly perform Letter.check()
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.displayWord();
        // see if users guess has a match and run .check() on the letter object
        gameWord.checkGuess(checkable);
        // if a letter has not been filled let user know it was an incorrect guess
        if (temp === gameWord.displayWord()) {
            console.log('\nSorry, wrong letter!\n');
            counter++
            console.log(((10 - counter) + " guesses remaining"));
            // promptUser() will run againt as long as counter is less than 10
            promptUser();
        }else {
            rightGuess();
        }
    } else {
        console.log('\nPlease enter a letter, one at a time.\n');
        promptUser();
    }
}

function rightGuess() {
    console.log('\nYou guessed correctly.\n');
    if (chosenWord.replace(/ /g,"") == (gameWord.displayWord()).replace(/ /g,"")){
        console.log(gameWord.displayWord().yellow);
        console.log('\nYou win!!\n'.green);
        chosenWord = "";
        gameWord = "";
        generator = 0;
        counter = 0;
        init();
    }else {
        promptUser();
    }
}

init();