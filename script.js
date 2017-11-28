var holes =         document.querySelectorAll('.hole'),
    scoreBoard =    document.querySelector('.score'),
    moles =         document.querySelectorAll('.mole'),
    timerDisplay =  document.getElementById("timerDisplay"),
    countdown,
    lastHole,
    timeUp = false,
    score = 0;
    
// Generate random time for mole to appear for
function randTime(min, max){
    return Math.round(Math.random()* (max - min) + min);
}

// Generate random hole for mole to appear at
function randHole(holes){
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    // If same as last hole, generate new random hole
    if (hole === lastHole){
      return randHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Make mole pop up
function popUp(){
    const time = randTime(600, 1000);
    const hole = randHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
      hole.classList.remove("up");
      if (!timeUp) popUp();
    }, time);
}

// Start the game
function startGame(){
    score = 0;
    scoreBoard.textContent = score;
    timeUp = false;
    timer(10);
    popUp();
    setTimeout(() => timeUp = true, 10000);
}

// Countdown timer for game
function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft <= 0){
        clearInterval(countdown);
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
}

// Display time left
function displayTimeLeft(seconds){
    timerDisplay.textContent = seconds;
}

// Score point when mole is clicked
function hit(e){
    if(!e.isTrusted) return;
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
}

// Listen for clicks on moles
moles.forEach(mole => mole.addEventListener("click", hit));