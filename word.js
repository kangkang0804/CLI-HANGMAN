const Letter = require('./letter.js');


function Word(wordArray){
    this.wordArray = wordArray;
    this.hiddenWord = [];
    // create an array of new Letter objects
    this.createWord = function() {
        for (var i = 0; i<wordArray.length; i++){
            var let = new Letter(wordArray[i]);
            this.hiddenWord.push(let)
        }
    };
    // perfrom the getCharacter() method on each letter object of the hiddenWord Array
    // push each let.letter to wordDisplay Array
    this.displayWord = function () {
        var wordDisplay = [];
        for (var i=0; i<this.hiddenWord.length; i++){
            wordDisplay.push(this.hiddenWord[i].getCharacter());
        }
        return wordDisplay.join(" ")
    }
    // perform check() method on each let.letter
    // will check user input from inquerer prompt for each index in the length of the hiddenWord
    this.checkGuess = function(guess) {
        for (var i =0; i<this.hiddenWord.length; i++){
            this.hiddenWord[i].check(guess);
        }
    }
}

module.exports = Word;