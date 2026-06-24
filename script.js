let p1Wins = 0;
let p2Wins = 0;
let rollCount = 0;
let gameOver = false;

function rand() {
  return Math.floor(Math.random() * 6) + 1;
}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("startBtn").addEventListener("click", startGame);
  document.getElementById("rollBtn").addEventListener("click", roll);
  document.getElementById("resetBtn").addEventListener("click", () => location.reload());
});

function startGame() {

  const p1 = document.getElementById("p1").value || "Player 1";
  const p2 = document.getElementById("p2").value || "Player 2";

  document.getElementById("p1Name").innerText = p1;
  document.getElementById("p2Name").innerText = p2;

  document.getElementById("rollBtn").disabled = false;
  document.getElementById("status").innerText = "Game Started";
}

function isViper(name) {
  return name.toLowerCase().includes("viper");
}

function resolveWinner(total1, total2) {

  const p1 = document.getElementById("p1Name").innerText;
  const p2 = document.getElementById("p2Name").innerText;

  const p1V = isViper(p1);
  const p2V = isViper(p2);

  // BASE RULE
  let winner = total1 > total2 ? "p1" : "p2";

  // VIPER RULE (SINGLE SOURCE OF TRUTH)
  if (p1V && !p2V) {
    if (Math.random() < 0.6) winner = "p2";
  }

  if (p2V && !p1V) {
    if (Math.random() < 0.6) winner = "p1";
  }

  return winner;
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
      resultText = "Tie - Roll Again";
      render(a,b,c,d,total1,total2,resultText);
      document.getElementById("rollBtn").disabled = false;
      return;
    }

    rollCount++;

    const winner = resolveWinner(total1, total2);

    if (winner === "p1") p1Wins++;
    else p2Wins++;

    render(a,b,c,d,total1,total2,resultText);

    document.getElementById("rollBtn").disabled = false;

    checkEnd();

  }, 500);
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

function checkEnd() {
  if (rollCount >= 10) endGame();
}

function endGame() {

  gameOver = true;

  const winner =
    p1Wins > p2Wins ? document.getElementById("p1Name").innerText :
    p2Wins > p1Wins ? document.getElementById("p2Name").innerText :
    "Tie Game";

  document.getElementById("status").innerText = "Winner: " + winner;

  document.getElementById("rollBtn").disabled = true;
  document.getElementById("resetBtn").classList.remove("hidden");
}
