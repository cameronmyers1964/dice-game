let p1Wins = 0;
let p2Wins = 0;
let rollCount = 0;
let gameOver = false;
let suddenDeath = false;

let viperPattern = [];
let viperIndex = 0;

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("startBtn").addEventListener("click", startGame);
  document.getElementById("rollBtn").addEventListener("click", roll);
  document.getElementById("resetBtn").addEventListener("click", () => location.reload());
});

function isViper(name) {
  return name.toLowerCase().includes("viper");
}

function startGame() {

  let p1 = document.getElementById("p1").value || "Player 1";
  let p2 = document.getElementById("p2").value || "Player 2";

  document.getElementById("p1Name").innerText = p1;
  document.getElementById("p2Name").innerText = p2;

  document.getElementById("rollBtn").disabled = false;
  document.getElementById("status").innerText = "Game Started";

  if (isViper(p1) || isViper(p2)) {
    buildViperPattern();
  }
}

function buildViperPattern() {

  viperPattern = [];
  let losses = 0;

  for (let i = 0; i < 10; i++) {

    if (losses < 6) {
      if (i < 6) {
        viperPattern.push(Math.random() < 0.5 ? "win" : "loss");
      } else {
        viperPattern.push("loss");
      }
    } else {
      viperPattern.push("win");
    }

    if (viperPattern[i] === "loss") losses++;
  }
}

function roll() {

  if (gameOver) return;

  document.getElementById("rolling").classList.remove("hidden");
  document.getElementById("rollBtn").disabled = true;

  setTimeout(() => {

    let a = rand();
    let b = rand();
    let c = rand();
    let d = rand();

    let total1 = a + b;
    let total2 = c + d;

    let result = "";

    // TIE RULE
    if (total1 === total2) {
      result = "Tie - Roll Again";
      render(a,b,c,d,total1,total2,result);
      document.getElementById("rolling").classList.add("hidden");
      document.getElementById("rollBtn").disabled = false;
      return;
    }

    rollCount++;

    // VIPER OVERRIDE (FIXED: decides outcome BEFORE scoring)
    if (viperPattern.length && viperIndex < viperPattern.length) {

      let outcome = viperPattern[viperIndex++];

      if (outcome === "loss") {
        total1 = total2 - 1;
      } else {
        total1 = total2 + 1;
      }
    }

    if (total1 > total2) p1Wins++;
    else p2Wins++;

    render(a,b,c,d,total1,total2,result);

    document.getElementById("rolling").classList.add("hidden");
    document.getElementById("rollBtn").disabled = false;

    checkEnd();

  }, 900);
}

function render(a,b,c,d,total1,total2,result) {

  document.getElementById("p1d1").style.backgroundImage = `url(${a}.png)`;
  document.getElementById("p1d2").style.backgroundImage = `url(${b}.png)`;
  document.getElementById("p2d1").style.backgroundImage = `url(${c}.png)`;
  document.getElementById("p2d2").style.backgroundImage = `url(${d}.png)`;

  let p1 = document.getElementById("p1Name").innerText;
  let p2 = document.getElementById("p2Name").innerText;

  document.getElementById("history").innerHTML =
    `#${rollCount} ${p1} ${total1} - ${p2} ${total2} ${result}<br>` +
    document.getElementById("history").innerHTML;

  document.getElementById("scores").innerText =
    `${p1}: ${p1Wins} | ${p2}: ${p2Wins}`;
}

function checkEnd() {

  if (p1Wins === 5 && p2Wins === 5) {
    suddenDeath = true;
    document.getElementById("status").innerText = "🔥 SUDDEN DEATH";
  }

  if (rollCount >= 10) endGame();

  if (Math.abs(p1Wins - p2Wins) > (10 - rollCount)) endGame();
}

function endGame() {

  gameOver = true;

  let winner =
    p1Wins > p2Wins ? document.getElementById("p1Name").innerText :
    p2Wins > p1Wins ? document.getElementById("p2Name").innerText :
    "Tie Game";

  document.getElementById("status").innerText = "🏆 Winner: " + winner;

  document.getElementById("rollBtn").disabled = true;
  document.getElementById("resetBtn").classList.remove("hidden");
}

function rand() {
  return Math.floor(Math.random() * 6) + 1;
}
