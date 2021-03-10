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
    initializeTimer();
    document.querySelector(".player-choice").addEventListener("click", () => {
      let executed = false;

      return () =>
      {
        if (!executed)
        {
          // Start the timer.
        }
      };
    })();
}

/* Function initializeTimer() initializes the timer and renders it in the webpage.
   Precondition: The webpage's fully loaded.
   Postcondition: The timer's initialized and rendered in the webpage.
*/
function initializeTimer()
{
    // Display the timer.
    let timeInMinutes = 10;
    document.querySelector(".minutes").innerHTML = `${timeInMinutes}`;
    document.querySelector(".seconds").innerHTML = `00`;
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

/* Countdown Timer Code Below */

/*function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    
    return {
      total,
      minutes,
      seconds
    };
  }
  
  function initializeClock(id, endtime) {
    const clock = document.querySelector(id);
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
  
  const timeInMinutes = 10;
  const currentTime = Date.parse(new Date());
  const deadline = new Date(currentTime + timeInMinutes*60*1000);
  initializeClock('.timer', deadline);
  
  
*/
