let p1Wins = 0;
let p2Wins = 0;
let rollCount = 0;
let gameOver = false;

document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const rollBtn = document.getElementById("rollBtn");
  const resetBtn = document.getElementById("resetBtn");

  startBtn.addEventListener("click", startGame);
  rollBtn.addEventListener("click", roll);
  resetBtn.addEventListener("click", reset);
});

function startGame() {

  const p1 = document.getElementById("p1").value || "Player 1";
  const p2 = document.getElementById("p2").value || "Player 2";

  document.getElementById("p1Name").innerText = p1;
  document.getElementById("p2Name").innerText = p2;

  document.getElementById("rollBtn").disabled = false;

  document.getElementById("status").innerText = "Game Started!";
}

function roll() {

  if (gameOver) return;

  document.getElementById("rolling").classList.remove("hidden");
  document.getElementById("rollBtn").disabled = true;

  setTimeout(() => {

    let p1a = rand();
    let p1b = rand();
    let p2a = rand();
    let p2b = rand();

    let total1 = p1a + p1b;
    let total2 = p2a + p2b;

    // dice images
    document.getElementById("p1d1").style.backgroundImage = `url(${p1a}.png)`;
    document.getElementById("p1d2").style.backgroundImage = `url(${p1b}.png)`;
    document.getElementById("p2d1").style.backgroundImage = `url(${p2a}.png)`;
    document.getElementById("p2d2").style.backgroundImage = `url(${p2b}.png)`;

    document.getElementById("p1total").innerText = "Total: " + total1;
    document.getElementById("p2total").innerText = "Total: " + total2;

    let resultText = "";

    if (total1 === total2) {
      resultText = "TIE - Roll Again";
    } else {
      rollCount++;
      if (total1 > total2) p1Wins++;
      else p2Wins++;
    }

    const p1Name = document.getElementById("p1Name").innerText;
    const p2Name = document.getElementById("p2Name").innerText;

    document.getElementById("history").innerHTML =
      `#${rollCount} ${p1Name} ${total1} - ${p2Name} ${total2} ${resultText}<br>` +
      document.getElementById("history").innerHTML;

    document.getElementById("scores").innerText =
      `${p1Name}: ${p1Wins} | ${p2Name}: ${p2Wins}`;

    document.getElementById("rolling").classList.add("hidden");
    document.getElementById("rollBtn").disabled = false;

    checkWin();

  }, 1000);
}

function checkWin() {

  if (rollCount >= 10 || Math.abs(p1Wins - p2Wins) > (10 - rollCount)) {
    endGame();
  }
}

function endGame() {

  gameOver = true;

  document.getElementById("rollBtn").disabled = true;
  document.getElementById("resetBtn").classList.remove("hidden");

  let winner =
    p1Wins > p2Wins ? document.getElementById("p1Name").innerText :
    p2Wins > p1Wins ? document.getElementById("p2Name").innerText :
    "Tie Game";

  document.getElementById("status").innerText = "🏆 Winner: " + winner;
}

function reset() {
  location.reload();
}

function rand() {
  return Math.floor(Math.random() * 6) + 1;
}
