//Temporary player choice variable
let playerChoice = "rock";
//Store playerscore within the playerScore variable
let playerScore = 0;
//Store computerscore within the computerscore variable
let computerScore = 0;

//Max wins for each player
let maxWins = 3;
//A function that will choose a random selection
function computerSelection(){
    let randomSelection = ["rock", "paper", "scissors"]
    return randomSelection[Math.floor(Math.random() * randomSelection.length)]
}
//Call the function computerSelection() and store it in a variable computerChoice
let computerChoice = computerSelection()

function updatePlayerScore(){
    const playerScoreElement = document.querySelector('.playerScore span')
    playerScoreElement.textContent = playerScore
}

updatePlayerScore()

function updateComputerScore() {
    const computerScoreElement = document.querySelector('.computerScore span');
    computerScoreElement.textContent = computerScore;
}



function showResultMessage(message) {
    const resultElement = document.querySelector('.result');
    resultElement.textContent = message;
    resultElement.style.visibility = 'visible'; // Make the message visible
    setTimeout(() => {
        resultElement.style.visibility = 'hidden'; // Hide the message after 2 seconds
    }, 4000);
}

function gameOver(winner){
    const overlay = document.querySelector('.overlay')
    overlay.style.display = 'block'
    const gameOverMessage = document.querySelector('.game-over-message')
    gameOverMessage.textContent = winner === 'player' ? 'You Win!' : 'Computer Wins!';
}

// function to reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updatePlayerScore();
    updateComputerScore();
    document.querySelector('.overlay').style.display = 'none';
}


function determineWinner(playerChoice, computerChoice){
    if(playerChoice === computerChoice){
        showResultMessage( `It is a draw 🤷 
        `)
        return `It is a tie`
    } else if((playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
    ){
        
        playerScore++
        if (playerScore === maxWins) {
            winner = 'player';
            gameOver('winner');
        }

        showResultMessage(`You win! 😊 ${playerChoice} beats ${computerChoice}
        `)
        return `You win! 😊 ${playerChoice} beats ${computerChoice}
        `
    } else{
        
        computerScore++
        // updateComputerScore()
        if (computerScore === maxWins) {
            winner = 'computer';
            gameOver('winner');
        }
        showResultMessage( `Computer Wins🤣
${computerChoice} beats ${playerChoice}
        `)
        return `Computer Wins🤣
        ${computerChoice} beats ${playerChoice}
                `
    }
}

// Function to simulate a round of the game
function playRound() {
    // Get player and computer choices
    let playerChoiceInput = document.getElementById("userChoiceInput");
    let playerChoice = playerChoiceInput.value.toLowerCase(); // Change this to test different player choices
    let computerChoice = computerSelection();

    // Determine the winner and update scores
    let result = determineWinner(playerChoice, computerChoice);

    // Log the result to the console
    console.log(result);

    // Update scores in the DOM
    updatePlayerScore();
    updateComputerScore();

    // Check if either player or computer has reached maxWins
    if (playerScore === maxWins || computerScore === maxWins) {
        // Display game over message and show play again button
        let gameOverMessage = playerScore === maxWins ? "You Win!" : "Computer Wins!";
        document.querySelector('.game-over-message').textContent = gameOverMessage;
        document.querySelector('.overlay').style.display = 'block';
    }

    // Clear the input field after submitting
    playerChoiceInput.value = "";
    
}

// Event listener for play again button
document.getElementById("playAgainButton").addEventListener("click", function() {
    // Reset scores and hide the overlay
    playerScore = 0;
    computerScore = 0;
    updatePlayerScore();
    updateComputerScore();
    document.querySelector('.overlay').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
// Add event listener to button for submitting choice
document.getElementById("submitChoiceButton").addEventListener("click", playRound);

// Add event listener to input for Enter key press
document.getElementById("userChoiceInput").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        playRound();
    }
});
document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.overlay').style.display = 'none';
});

});
// // Call playRound to simulate a single round of the game
// playRound();
// Add event listener to play again button
// document.getElementById("playAgainButton").addEventListener("click", resetGame);