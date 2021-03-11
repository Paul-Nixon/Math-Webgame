if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}

/* Function ready()  */
function ready()
{
    // Start the timer whem the player clicks the number input.
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
      }
    );
}

/* Function displayTimer() initializes the timer and renders it in the webpage.
   Precondition: The webpage's fully loaded.
   Postcondition: The timer's initialized and rendered in the webpage.
*/
function displayTimer(timeInMinutes)
{
    document.querySelector(".minutes").innerHTML = `${timeInMinutes}`;
    document.querySelector(".seconds").innerHTML = `00`;
}

/* function initializeTimer()  */
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

        // Clear the interval from the timeInterval variable.
        if (timer.total <= 0)
        {
          clearInterval(timeinterval);
        }
    }

    // Call updateTimer() to avoid a delay and create a variable that'll update the clock every second.
    updateTimer();
    const timeinterval = setInterval(updateTimer, 1000);
}

/* function getTimeRemaining(endTime) */
function getTimeRemaining(endTime)
{
    // Calculate the number of minutes and seconds remaining on the timer.
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    // Return an object consisting of the remaining time.
    return {total, minutes, seconds};
}

/* Function play() */
function play()
{
    // 
}

/* Function generateMathProblem() generates a math problem for the player to answer.
   Precondition: The webpage's fully loaded and the player clicks the "ENTER CHOICE" button.
   Postcondition: A new math problem is rendered in the game container.
*/
function generateMathProblem()
{
    // 
}

