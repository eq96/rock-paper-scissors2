const rockSelect = document.querySelector(".rock");
const paperSelect = document.querySelector(".paper");
const scissorSelect = document.querySelector(".scissor");
const popup = document.querySelector(".popup");
const selHand = document.querySelector(".selHand");

//Player's rock-paper-scissor
const pRock = document.querySelector(".rock-determine");
const pPaper = document.querySelector(".paper-determine");
const pScissor = document.querySelector(".scissor-determine");
const pScoreEl = document.querySelector(".pScore");

//AI's rock-paper-scissor
const aiRock = document.querySelector(".ai-rock-determine");
const aiPaper = document.querySelector(".ai-paper-determine");
const aiScissor = document.querySelector(".ai-scissor-determine");
const aiScoreEl = document.querySelector(".aiScore");

const start = document.querySelector(".start");
const winLose = document.querySelector(".fate");

start.hidden = true;
popup.hidden = true;

pRock.hidden = true;
pPaper.hidden = true;
pScissor.hidden = true;

aiRock.hidden = true;
aiPaper.hidden = true;
aiScissor.hidden = true;

let ran = 0;
let ai = [1, 2, 3];
let player = 0;
let determine = ["Tie!", "You win!", "You lose!"];
let pScore = 0;
let aiScore = 0;

const listener = () => {
  popup.setAttribute("hidden", true);

  popup.removeEventListener("transitionend", listener);
};

start.addEventListener("click", () => {
  //   popup.hidden = true;
  hide();
  player = 0;
  pScoreEl.textContent = `Player: ${pScore}`;
  aiScoreEl.textContent = `Player: ${aiScore}`;
  winLose.textContent = "";
  pRock.hidden = true;
  pPaper.hidden = true;
  pScissor.hidden = true;
  aiRock.hidden = true;
  aiPaper.hidden = true;
  aiScissor.hidden = true;
  start.hidden = true;
  winLose.classList.remove("winLose");
});

rockSelect.addEventListener("click", () => {
  player = 1;
  ran = ai[Math.floor(Math.random() * ai.length)];
  show();
  PlayHand();
  aiPlayHand();
});

paperSelect.addEventListener("click", () => {
  console.log("PAPER CLICK");
  player = 2;
  ran = ai[Math.floor(Math.random() * ai.length)];
  show();
  PlayHand();
  aiPlayHand();
});

scissorSelect.addEventListener("click", () => {
  console.log("SCISSOR CLICK");
  player = 3;
  ran = ai[Math.floor(Math.random() * ai.length)];
  show();
  PlayHand();
  aiPlayHand();
});

function hide() {
  popup.addEventListener("transitionend", listener);

  popup.classList.remove("hidden");

  selHand.hidden = false;
}

function show() {
  popup.removeAttribute("hidden");

  const reflow = popup.offsetHeight;

  // Trigger our CSS transition
  popup.classList.add("hidden");
}

function playerSelect() {
  if (player === 1) {
    pRock.hidden = false;
  } else if (player === 2) {
    pPaper.hidden = false;
  } else {
    pScissor.hidden = false;
  }
  endGame();
}

function aiSelect() {
  if (ran === 1) {
    console.log("AI ROCK" + ran);
    aiRock.hidden = false;
  } else if (ran === 2) {
    console.log("AI PAPER" + ran);
    aiPaper.hidden = false;
  } else if (ran === 3) {
    console.log("AI SCISSORS" + ran);
    aiScissor.hidden = false;
  }
}

function endGame() {
  switch (player) {
    case 1:
      if (ran === 1) {
        winLose.textContent = determine[0];
      } else if (ran === 2) {
        winLose.textContent = determine[2];
        winLose.classList.add("winLose");
        aiScore++;
      } else {
        winLose.textContent = determine[1];
        winLose.classList.add("winLose");
        pScore++;
      }
      break;
    case 2:
      if (ran === 1) {
        winLose.textContent = determine[1];
        winLose.classList.add("winLose");
        pScore++;
      } else if (ran === 2) {
        winLose.textContent = determine[0];
      } else {
        winLose.textContent = determine[2];
        winLose.classList.add("winLose");
        aiScore++;
      }
      break;
    case 3:
      if (ran === 1) {
        winLose.textContent = determine[2];
        winLose.classList.add("winLose");
        aiScore++;
      } else if (ran === 2) {
        winLose.textContent = determine[1];
        winLose.classList.add("winLose");
        pScore++;
      } else {
        winLose.textContent = determine[0];
      }
      break;
    default:
      winLose.textContent = "ERROR";
  }
  start.hidden = false;
}

function aiPlayHand() {
  setTimeout(showRock, 350);
  function showRock() {
    setTimeout(showPaper, 350);
    aiRock.hidden = false;
    aiRock.classList.add("shake");
  }
  function showPaper() {
    setTimeout(showScissor, 350);
    aiRock.hidden = true;
    aiRock.classList.remove("shake");
    aiPaper.hidden = false;
    aiPaper.classList.add("shake");
  }
  function showScissor() {
    setTimeout(aiSelected, 350);
    aiPaper.hidden = true;
    aiPaper.classList.remove("shake");
    aiScissor.hidden = false;
    aiScissor.classList.add("shake");
  }
  function aiSelected() {
    aiScissor.hidden = true;
    aiScissor.classList.remove("shake");
    aiSelect();
  }
}

function PlayHand() {
  selHand.hidden = true;
  setTimeout(showRock, 350);
  function showRock() {
    setTimeout(showPaper, 350);
    pRock.hidden = false;
    pRock.classList.add("shake");
  }
  function showPaper() {
    setTimeout(showScissor, 350);
    pRock.hidden = true;
    pRock.classList.remove("shake");
    pPaper.hidden = false;
    pPaper.classList.add("shake");
  }
  function showScissor() {
    setTimeout(pSelected, 350);
    pPaper.hidden = true;
    pPaper.classList.remove("shake");
    pScissor.hidden = false;
    pScissor.classList.add("shake");
  }
  function pSelected() {
    pScissor.hidden = true;
    pScissor.classList.remove("shake");
    playerSelect();
  }
}
