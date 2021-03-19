if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}

/* Function ready() starts the timer when the player clicks the number input and
   calls play() to start the game.
   Precondition: The webpage's fully rendered.
   Postcondition: The timer starts running when the player clicks the number input and 
   the game's engine starts running.
*/
function ready()
{
    // Start the timer when the player clicks the number input.
    const timeInMinutes = 1;
    let executed = false;
    const input = document.querySelector(".player-answer");
    input.addEventListener("click", () => {
      
        if (!executed) // If the timer's not running, then start it
        {
          executed = true;
          
          // Start the timer.
          const currentTime = Date.parse(new Date());
          const deadline = new Date(currentTime + timeInMinutes*60*1000);
          initializeTimer(deadline);
        }
      }, false);

    // Start the game.
    sessionStorage.setItem("highScore", "0");
    const multiplier = {num: 1};
    const mathProblem = 
    {
        firstOperand: 0,
        operator: "",
        secondOperand: 0
    };
    generateMathProblem(mathProblem);
    const enterAnswerButton = document.querySelector(".enter-answer-btn");
    enterAnswerButton.addEventListener("click", () => {
        if (executed) // If the user clicked the input to start the timer before entering their answer
        {
            evaluateMathProblem(mathProblem.firstOperand, mathProblem.operator, mathProblem.secondOperand, multiplier);
            generateMathProblem(mathProblem);
        }
        else
        {
            executed = true;
          
            // Start the timer.
            const currentTime = Date.parse(new Date());
            const deadline = new Date(currentTime + timeInMinutes*60*1000);
            initializeTimer(deadline);

            // Decrease the player's score since they entered no answer.
            document.querySelector(".score").innerHTML = `-10`;
        }
    }, false);

    /* When the user clicks the "play again" button, reset the timer, re-display it, the math problem,
       the input, and the "enter choice" button, and generate a new math problem.
    */
       const playAgainButton = document.querySelector(".play-again-btn");
       playAgainButton.addEventListener("click", () => {
           // Reset the timer.
           document.querySelector('.minutes').innerHTML = ``;
           document.querySelector('.seconds').innerHTML = ``;
           executed = false; // So the closure inside the input's event listener can start the timer

           // Render the normal game screen.
           displayNormalGameScreen();
           
           // Generate a new math problem.
           generateMathProblem(mathProblem);

           // Reset the multiplier to 1x.
           multiplier.num = 1;
           document.querySelector(".multiplier").innerHTML = `1x`;
       }, false);
}

/* TIMER FUNCTIONS */

/* Function initializeTimer() starts and updates the timer.
   Precondition: The player clicked the number input.
   Postcondition: The timer starts running and updates every second.
*/
function initializeTimer(endTime)
{
    // Get the timer's minutes and seconds.
    const minutesSpan = document.querySelector('.minutes');
    const secondsSpan = document.querySelector('.seconds');

    // Create a function that'll update the timer.
    function updateTimer()
    {
        // Update the timer.
        const timer = getTimeRemaining(endTime);
        minutesSpan.innerHTML = ('0' + timer.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + timer.seconds).slice(-2);

        if (timer.total <= 0) // If the timer expires
        {
            // Clear the interval from the timeInterval variable.
            clearInterval(timeInterval);

            // Display the endgame info.
            displayEndgameInfo();
        }
    }

    // Call updateTimer() to avoid a delay and create a variable that'll update the clock every second.
    updateTimer();
    const timeInterval = setInterval(updateTimer, 1000);
}

/* Function getTimeRemaining(endTime) returns an object consisting of the remaining time left on
   the timer.
   Precondition: The player clicked the number input and the timer's running.
   Postcondition: The function returns an object consisting of the remaining time left on
   the timer.
*/
function getTimeRemaining(endTime)
{
    // Calculate the number of minutes and seconds remaining on the timer.
    const total = Date.parse(endTime) - Date.parse(new Date()); // The time remaining on the deadline in milliseconds
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    // Return an object consisting of the remaining time.
    return {total, minutes, seconds};
}

/* GAME FUNCTIONS */

/* Function generateMathProblem() generates a math problem for the player to answer.
   Precondition: The webpage's fully loaded and the player clicks the "ENTER CHOICE" button.
   Postcondition: A new math problem is rendered in the game container.
*/
function generateMathProblem(mathProblem)
{
    // Generate two operands.
    mathProblem.firstOperand = Math.floor(Math.random() * 11); // Returns a random integer from 0 to 10
    mathProblem.secondOperand = Math.floor(Math.random() * 11);

    // Generate an operator.
    switch (Math.floor(Math.random() * 4) + 1)
    {
        case 1:
            mathProblem.operator = "+";
            break;
        case 2:
            mathProblem.operator = "-";
            break;
        case 3:
            mathProblem.operator = "*";
            break;
        case 4:
            mathProblem.operator = "/";
            while (mathProblem.secondOperand === 0) // So the denominator won't be 0
            {
                mathProblem.secondOperand = Math.floor(Math.random() * 11);
            }
            break;
    }

    // Display the math problem.
    document.querySelector(".math-problem").innerHTML = `${mathProblem.firstOperand} ${mathProblem.operator} 
    ${mathProblem.secondOperand}`;
}

/* Function evaluateMathProblem(firstOperand, operator, secondOperand) evaluates the current math problem.
   If the player answered correctly, then the score will increase by 10 * multiplier. Otherwise, the
   score will decrease by 5.
   Precondition: The timer hasn't expired and the player clicked the button.
   Postcondition: The score either increases or decreases.
*/
function evaluateMathProblem(firstOperand, operator, secondOperand, multiplier)
{
    // Determine whether the player answered the current math problem correctly.
    const input = document.querySelector(".player-answer");
    switch (operator)
    {
        case "+":
            if (parseInt(input.value) === firstOperand + secondOperand)
            {
                // Increase the score and the multiplier.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    multiplier.num = 2;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + (10 * multiplier.num);
                    multiplier.num = multiplier.num + 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            else
            {
                // Decrease the score by 5 and the multiplier by 1.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 10;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - (10 * (multiplier.num - 1));
                    multiplier.num = multiplier.num - 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            break;
        case "-":
            if (parseInt(input.value) === firstOperand - secondOperand)
            {
                // Increase the score and the multiplier.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    multiplier.num = 2;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + (10 * multiplier.num);
                    multiplier.num = multiplier.num + 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            else
            {
                // Decrease the score by 5 and the multiplier by 1.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 10;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - (10 * (multiplier.num - 1));
                    multiplier.num = multiplier.num - 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            break;
        case "*":
            if (parseInt(input.value) === firstOperand * secondOperand)
            {
                // Increase the score and the multiplier.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    multiplier.num = 2;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + (10 * multiplier.num);
                    multiplier.num = multiplier.num + 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            else
            {
                // Decrease the score by 5 and the multiplier by 1.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 10;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - (10 * (multiplier.num - 1));
                    multiplier.num = multiplier.num - 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            break;
        case "/":
            if ((Number.isInteger(firstOperand / secondOperand) && parseInt(input.value) === firstOperand / secondOperand) || (!Number.isInteger(firstOperand / secondOperand) && parseFloat(input.value) === Math.round((firstOperand / secondOperand) * 100) / 100))
            {
                // Increase the score and the multiplier.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    multiplier.num = 2;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) + (10 * multiplier.num);
                    multiplier.num = multiplier.num + 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            else
            {
                // Decrease the score by 5 and the multiplier by 1.
                if (multiplier.num === 1)
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 10;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - (10 * (multiplier.num - 1));
                    multiplier.num = multiplier.num - 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            break;
    }
}

/* HELPER FUNCTIONS */

/* Function displayEndgameInfo() renders a "game over" title, the final score, the high score, and a
   "play again" button. Also, it simultaneously hides the timer, math problems, input, and "enter choice" button.
   Precondition: The timer expired.
   Postcondition: a "game over" title, the final score, the high score, and a "play again" button are rendered, and 
   the timer, math problems, input, and "enter choice" button are hidden.
*/
function displayEndgameInfo()
{
    // Display the "game over" title, final score, high score, and "play again" button.
    document.querySelector(".game-over-title").classList.remove("hide-during-game");
    document.querySelector(".final-score").classList.remove("hide-during-game");
    document.querySelector(".high-score").classList.remove("hide-during-game");
    document.querySelector(".play-again-btn").classList.remove("hide-during-game");

    // Hide the timer, math problem, input, and "enter choice" button.
    document.querySelector(".timer").classList.add("hide-during-postgame");
    document.querySelector(".math-problem").classList.add("hide-during-postgame");
    document.querySelector(".player-answer").classList.add("hide-during-postgame");
    document.querySelector(".enter-answer-btn").classList.add("hide-during-postgame");

    /* Display the final score and high score. If the player broke their high score, then render a
       statement indicating that they got a new high score. Else, just display the current high score. 
    */
    document.querySelector(".final-score").innerHTML = `Final Score: ${document.querySelector(".score").innerHTML}`;

    if (parseInt(document.querySelector(".score").innerHTML) > parseInt(sessionStorage.getItem("highScore")))
    {
        document.querySelector(".high-score").innerHTML = `New High Score: ${document.querySelector(".score").innerHTML}!`;
        sessionStorage.setItem("highScore", document.querySelector(".score").innerHTML);
    }
    else
    {
        document.querySelector(".high-score").innerHTML = `High Score: ${sessionStorage.getItem("highScore")}`;
    }
}

/* Function displayNormalGameScreen() renders the timer, math problem, input, and "enter choice" button.
   Also, it simultaneously hides the "game over" title, final score, high score, and "play again" button, and
   resets the score to 0.
   Precondition: The timer expired.
   Postcondition: the timer, math problems, input, and "enter choice" button are rendered, the
   the "game over" title, final score, high score, and "play again" button are hidden, and the score's reset
   to 0.
*/
function displayNormalGameScreen()
{
    // Display the timer, math problem, input, and "enter choice" button.
    document.querySelector(".timer").classList.remove("hide-during-postgame");
    document.querySelector(".math-problem").classList.remove("hide-during-postgame");
    document.querySelector(".player-answer").classList.remove("hide-during-postgame");
    document.querySelector(".enter-answer-btn").classList.remove("hide-during-postgame");

    // Hide the "game over" title, final score, high score, and "play again" button.
    document.querySelector(".game-over-title").classList.add("hide-during-game");
    document.querySelector(".final-score").classList.add("hide-during-game");
    document.querySelector(".high-score").classList.add("hide-during-game");
    document.querySelector(".play-again-btn").classList.add("hide-during-game");

    // Reset the score to 0.
    document.querySelector(".score").innerHTML = `0`;
}