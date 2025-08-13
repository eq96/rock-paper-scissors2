@@ -15,71 +15,86 @@ const aiRock = document.querySelector(".ai-rock-determine");
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

function updateScoreBoard() {
  pScoreEl.textContent = `Player: ${pScore}`;
  aiScoreEl.textContent = `AI: ${aiScore}`;
}

function bumpScore(el) {
  el.classList.add("score-update");
  el.addEventListener(
    "animationend",
    () => el.classList.remove("score-update"),
    { once: true }
  );
}

updateScoreBoard();

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
  updateScoreBoard();
  winLose.textContent = "";
  pRock.hidden = true;
  pPaper.hidden = true;
  pScissor.hidden = true;
  aiRock.hidden = true;
  aiPaper.hidden = true;
  aiScissor.hidden = true;
  start.hidden = true;
  winLose.classList.remove("winLose");
  winLose.classList.remove("winLose", "fade-in");
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
@@ -106,93 +121,108 @@ function show() {
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
  let updated = null;
  switch (player) {
    case 1:
      if (ran === 1) {
        winLose.textContent = determine[0];
      } else if (ran === 2) {
        winLose.textContent = determine[2];
        winLose.classList.add("winLose");
        aiScore++;
        updated = aiScoreEl;
      } else {
        winLose.textContent = determine[1];
        winLose.classList.add("winLose");
        pScore++;
        updated = pScoreEl;
      }
      break;
    case 2:
      if (ran === 1) {
        winLose.textContent = determine[1];
        winLose.classList.add("winLose");
        pScore++;
        updated = pScoreEl;
      } else if (ran === 2) {
        winLose.textContent = determine[0];
      } else {
        winLose.textContent = determine[2];
        winLose.classList.add("winLose");
        aiScore++;
        updated = aiScoreEl;
      }
      break;
    case 3:
      if (ran === 1) {
        winLose.textContent = determine[2];
        winLose.classList.add("winLose");
        aiScore++;
        updated = aiScoreEl;
      } else if (ran === 2) {
        winLose.textContent = determine[1];
        winLose.classList.add("winLose");
        pScore++;
        updated = pScoreEl;
      } else {
        winLose.textContent = determine[0];
      }
      break;
    default:
      winLose.textContent = "ERROR";
  }
  updateScoreBoard();
  if (updated) bumpScore(updated);
  winLose.classList.add("fade-in");
  winLose.addEventListener(
    "animationend",
    () => winLose.classList.remove("fade-in"),
    { once: true }
  );
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
