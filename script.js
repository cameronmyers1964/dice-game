let p1Wins = 0;
let p2Wins = 0;
let rollCount = 0;

let gameOver = false;
let suddenDeath = false;

function rand() {
  return Math.floor(Math.random() * 6) + 1;
}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("startBtn").addEventListener("click", startGame);
  document.getElementById("rollBtn").addEventListener("click", roll);
  document.getElementById("resetBtn").addEventListener("click", resetGame);
});

function startGame() {

  const p1 = document.getElementById("p1").value || "Player 1";
  const p2 = document.getElementById("p2").value || "Player 2";

  document.getElementById("p1Name").innerText = p1;
  document.getElementById("p2Name").innerText = p2;

  document.getElementById("rollBtn").disabled = false;
  document.getElementById("status").innerText = "Game Started";
}

function roll() {

  if (gameOver) return;

  document.getElementById("rollBtn").disabled = true;

  setTimeout(() => {

    const a = rand();
    const b = rand();
    const c = rand();
    const d = rand();

    const total1 = a + b;
    const total2 = c + d;

    let resultText = "";

    // TIE RULE
    if (total1 === total2) {

      document.getElementById("status").innerText =
        suddenDeath ? "🔥 SUDDEN DEATH - TIE (ROLL AGAIN)" : "Tie - Roll Again";

      render(a,b,c,d,total1,total2,"Tie - Roll Again");

      document.getElementById("rollBtn").disabled = false;
      return;
    }

    rollCount++;

    // SUDDEN DEATH TRIGGER
    if (p1Wins === 5 && p2Wins === 5) {
      suddenDeath = true;
      document.getElementById("status").innerText = "🔥 SUDDEN DEATH";
    }

    let winner = total1 > total2 ? "p1" : "p2";

    if (!suddenDeath) {

      if (winner === "p1") p1Wins++;
      else p2Wins++;

    } else {
      // sudden death: first non-tie ends game immediately
      endGame(winner);
      return;
    }

    render(a,b,c,d,total1,total2,resultText);

    checkEnd();

    document.getElementById("rollBtn").disabled = false;

  }, 400);
}

function checkEnd() {

  if (rollCount >= 10) {
    endGame();
  }

  if (p1Wins >= 6 || p2Wins >= 6) {
    endGame();
  }
}

function render(a,b,c,d,total1,total2,resultText) {

  document.getElementById("p1d1").style.backgroundImage = `url(${a}.png)`;
  document.getElementById("p1d2").style.backgroundImage = `url(${b}.png)`;
  document.getElementById("p2d1").style.backgroundImage = `url(${c}.png)`;
  document.getElementById("p2d2").style.backgroundImage = `url(${d}.png)`;

  const p1 = document.getElementById("p1Name").innerText;
  const p2 = document.getElementById("p2Name").innerText;

  document.getElementById("history").innerHTML =
    `#${rollCount} ${p1}: ${total1} - ${p2}: ${total2} ${resultText}<br>` +
    document.getElementById("history").innerHTML;

  document.getElementById("scores").innerText =
    `${p1} ${p1Wins} | ${p2} ${p2Wins}`;
}

function endGame(forcedWinner = null) {

  gameOver = true;
  suddenDeath = false;

  document.getElementById("rollBtn").disabled = true;

  const p1 = document.getElementById("p1Name").innerText;
  const p2 = document.getElementById("p2Name").innerText;

  let winner;

  if (forcedWinner) {
    winner = forcedWinner === "p1" ? p1 : p2;
  } else {
    winner =
      p1Wins > p2Wins ? p1 :
      p2Wins > p1Wins ? p2 :
      "Tie Game";
  }

  document.getElementById("status").innerText = "🏆 Winner: " + winner;
}

function resetGame() {

  p1Wins = 0;
  p2Wins = 0;
  rollCount = 0;

  gameOver = false;
  suddenDeath = false;

  document.getElementById("history").innerHTML = "";
  document.getElementById("scores").innerText = "";
  document.getElementById("status").innerText = "Game Reset";

  document.getElementById("rollBtn").disabled = true;

  document.getElementById("p1d1").style.backgroundImage = "";
  document.getElementById("p1d2").style.backgroundImage = "";
  document.getElementById("p2d1").style.backgroundImage = "";
  document.getElementById("p2d2").style.backgroundImage = "";
}
