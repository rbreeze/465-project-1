/**
 * Hangman React code
 *
 * @author: Remington Breeze
 */

/**
 * Main Hangman game component
 */
class Hangman extends React.Component {
  /**
   * Hangman constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      gameText: 'click "New Game" to start',
      guessingWord: false,
      count: 0
    };
    this.guessLetter = this.guessLetter.bind(this)
    this.guessWord = this.guessWord.bind(this)
  }

  /**
   * Adds event listener for key presses after mounting
   */
  componentDidMount(){
    document.addEventListener("keydown", this.guessLetter, false);
  }

  /**
   * Starts a new game, gets word from API
   */
  startGame() {
    this.setState({ count: 0 })
    fetch("https://api.datamuse.com/words?ml=stupid&max=100")
    .then(res => res.json())
    .then(
      (result) => {
        let index = Math.floor(Math.random() * 100);
        let word = result[index].word.toUpperCase();
        this.setState({ word: word });
        let gt = "_ ".repeat(word.length);
        for (var i = 0; i < word.length; i++) {
          if (word[i] == "-" || word[i] == " ") {
            gt = gt.substr(0, i*2) + word[i] + gt.substr(i*2 + 1);
          }
        }
        this.setState({ gameText: gt })
      }
    )
  }

  /**
   * Makes guess box visible
   */
  showGuessBox() {
    this.setState({ guessingWord: true })
  }

  /**
   * Called when a user submits a word to guess
   */
  guessWord() {
    let word = this.state.word
    let guess = document.getElementById("guessbox").value.toUpperCase()
    if (word == guess) {
      window.alert("Congratulations!");
      this.startGame();
    } else {
      window.alert("Sorry- keep trying!");
      // my god these alerts are stupid
    }
  }

  /**
   * Activated when a user guesses a letter.
   *
   * @param {character} event The key that was pressed
   */
  guessLetter(event) {
    if (document.getElementById("guessbox") == document.activeElement)
      return;
    let letter = String.fromCharCode(event.keyCode);
    let gt = this.state.gameText
    let word = this.state.word
    let success = false
    for (var i = 0; i < word.length; i++) {
      if (word[i] == letter) {
        success = true; 
        gt = gt.substr(0, i*2) + letter + gt.substr(i*2 + 1);
      }
    }
    this.setState({ gameText: gt })
    if (success == false) {
      this.setState({count: this.state.count+1}) 
      if (this.state.count == 6) {
        window.alert("You lose")
        this.startGame(); 
      }
    } else {
      if (gt.replace(/\s/g, '') == this.state.word) {
        window.alert("Congratulations!")
        this.startGame();
      }
    }
  }

  /**
   * Render function
   */
  render() {
    const gw = this.state.guessingWord
    const gt = this.state.gameText
    const c = this.state.count
    return (
    <div className="content hangman-content">
      <div className="left">
        <img id="hangman" src={'images/' + (c == 0 ? 'base' : c) + '.png'}/>
        <div id="game">{ gt }</div>
      </div>
      <div className="right">
        <h1>Hangman</h1>
        <button onClick={() => this.startGame()} className="button">New Game</button>
        <button onClick={() => this.showGuessBox() } className="button">Guess Word</button>
        { gw ? <GuessBox guessWord={this.guessWord}/> : null }
      </div>
    </div>
    );
  }
}

/**
 * GuessBox component
 */
class GuessBox extends React.Component {

  render() {
    return (
    <div>
      <input id="guessbox" placeholder="guess your word here..."></input>
      <button onClick={() => this.props.guessWord() } className="button" id="guessbutton">
      Guess</button>
    </div>
    )
  }
}

ReactDOM.render(<Hangman/>, document.getElementById("hangman"));

