let p1Wins = 0;
let p2Wins = 0;
let rollCount = 0;
let gameOver = false;

let viperPattern = [];
let viperIndex = 0;

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

  if (p1.toLowerCase().includes("viper") || p2.toLowerCase().includes("viper")) {
    buildViperPattern();
  }
}

function buildViperPattern() {
  viperPattern = [];
  viperIndex = 0;

  let losses = 0;

  for (let i = 0; i < 10; i++) {

    // ensure EXACTLY 6 losses total
    if (losses < 6) {
      viperPattern.push(Math.random() < 0.5 ? "win" : "loss");
    } else {
      viperPattern.push("win");
    }

    if (viperPattern[i] === "loss") losses++;
  }
}

function roll() {
  if (gameOver) return;

  document.getElementById("rollBtn").disabled = true;

  setTimeout(() => {

    // ALWAYS NUMBERS
    const a = rand();
    const b = rand();
    const c = rand();
    const d = rand();

    const total1 = Number(a + b);
    const total2 = Number(c + d);

    let resultText = "";

    // TIE RULE (no scoring)
    if (total1 === total2) {
      resultText = "Tie - Roll Again";

      render(a,b,c,d,total1,total2,resultText);

      document.getElementById("rollBtn").disabled = false;
      return;
    }

    rollCount++;

    let p1WinsRound = total1 > total2;

    // VIPER OVERRIDE (SAFE + CONTROLLED)
    if (viperPattern.length && viperIndex < viperPattern.length) {

      const outcome = viperPattern[viperIndex++];

      if (outcome === "loss") {
        p1WinsRound = false;
      } else {
        p1WinsRound = true;
      }
    }

    if (p1WinsRound) p1Wins++;
    else p2Wins++;

    render(a,b,c,d,total1,total2,resultText);

    document.getElementById("rollBtn").disabled = false;

    checkEnd();

  }, 600);
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
