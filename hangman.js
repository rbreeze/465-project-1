/**
 * Hangman javascript functions
 *
 * @author: Remington Breeze
 */

var count = 0; 

/**
 * Starts a new hangman game.
 */
let startGame = function() {
  document.getElementById("hangman").src = "images/base.png";
  count = 0;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.status == 200) {
      let words = JSON.parse(this.responseText);
      let index = Math.floor(Math.random() * 100);
      let word = words[index].word;
      document.getElementById("hiddenword").innerHTML = word; 
      let gameText = "_ ".repeat(word.length);
      for (var i = 0; i < word.length; i++) {
        if (word[i] == "-" || word[i] == " ") {
          gameText = gameText.substr(0, i*2) + word[i] + gameText.substr(i*2 + 1);
        }
      }
      document.getElementById("game").innerHTML = gameText;
    }
  }
  const url='https://api.datamuse.com/words?ml=stupid&max=100';
  xmlhttp.open("GET", url);
  xmlhttp.send();
}

/**
 * Activated when a user guesses a letter.
 *
 * @param {character} e The key that was pressed
 */
let guessLetter = function(e) {
  if (document.getElementById("guessbox") == document.activeElement)
    return;
  let letter = String.fromCharCode(event.keyCode);
  let word = document.getElementById("hiddenword").innerHTML; 
  let game = document.getElementById("game");
  let gameText = game.innerHTML;  
  var success = false; 
  for (var i = 0; i < word.length; i++) {
    if (word[i] == letter) {
      success = true; 
      gameText = gameText.substr(0, i*2) + letter + gameText.substr(i*2 + 1);
    }
  }
  if (success == false) {
    count++; 
    if (count == 6) {
      window.alert("You lose")
      startGame(); 
    }
    else 
      document.getElementById("hangman").src = "images/" + count + ".png";
  } else {
    game.innerHTML = gameText;
    if (gameText.replace(/\s/g, '') == word) {
      window.alert("Congratulations!")
    }
  }
}

/**
 * Shows prompt box and button for guessing a word.
 */
let showPrompt = function() {
  document.getElementById("guessbox").style.display = "block";
  document.getElementById("guessbutton").style.display = "block";
}

/**
 * Activated when a user guesses a word.
 */
let guessWord = function() {
  let word = document.getElementById("hiddenword").innerHTML; 
  let guess = document.getElementById("guessbox").value;
  if (word == guess) {
    window.alert("Congratulations!");
  } else {
    window.alert("Sorry- keep trying!");
    // my god these alerts are stupid
  }
}
