function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;
    
    this.getCharacter = () => {
        if (this.letter === " "){
            return " ";
        }
        else if (!this.isGuessed) {
            return "_";
        } else {
            return this.letter;
        }
    }
    this.check = (guess) => {
        if (guess === this.letter) {
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;