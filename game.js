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
    const timeInMinutes = 10;
    let executed = false;
    const input = document.querySelector(".player-choice");
    input.addEventListener("click", () => {
      
        if (!executed)
        {
          executed = true;
          
          // Start the timer.
          const currentTime = Date.parse(new Date());
          const deadline = new Date(currentTime + timeInMinutes*60*1000);
          initializeTimer(deadline);
        }
      }, false);

    // Start the game.
    let multiplier = {num: 1};
    let mathProblem = 
    {
        firstOperand: 0,
        operator: "",
        secondOperand: 0
    };
    generateMathProblem(mathProblem);
    const button = document.querySelector(".enter-choice-btn");
    button.addEventListener("click", () => {
        evaluateMathProblem(mathProblem.firstOperand, mathProblem.operator, mathProblem.secondOperand, multiplier);
        generateMathProblem(mathProblem);
    });
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

        // Clear the interval from the timeInterval variable if the remaining time runs out.
        if (timer.total <= 0)
        {
          clearInterval(timeInterval);
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
    // Determine whether the player answered the problem correctly.
    const input = document.querySelector(".player-choice");
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
                    score.innerHTML = parseInt(score.innerHTML) - 5;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 5;
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
                    score.innerHTML = parseInt(score.innerHTML) - 5;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 5;
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
                    score.innerHTML = parseInt(score.innerHTML) - 5;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 5;
                    multiplier.num = multiplier.num - 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            break;
        case "/":
            if (parseInt(input.value) === firstOperand / secondOperand)
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
                    score.innerHTML = parseInt(score.innerHTML) - 5;
                }
                else
                {
                    const score = document.querySelector(".score");
                    score.innerHTML = parseInt(score.innerHTML) - 5;
                    multiplier.num = multiplier.num - 1;
                    document.querySelector(".multiplier").innerHTML = `${multiplier.num}x`;
                }
            }
            break;
    }
}