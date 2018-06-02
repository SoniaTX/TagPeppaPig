 var holes = document.querySelectorAll('.hole');
 var scoreBoard = document.querySelector('.score');
 var pigs = document.querySelectorAll('.pig');
 let lastHole;
 let timeUp = false;
 let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }


  function randomHole(holes) {
   var idx = Math.floor(Math.random() * holes.length);
   var hole = holes[idx];
    if (hole === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }


  function peep() {
    var time = randomTime(200, 2000);
    var hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

  function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  pigs.forEach(pig => pig.addEventListener('click', bonk));