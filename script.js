let p1Wins = 0;
let p2Wins = 0;
let countedRounds = 0;

let gameStarted = false;
let gameOver = false;
let tieBreaker = false;

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function isViper(name) {
    return name.toLowerCase().includes("viper");
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("startBtn").addEventListener("click", startGame);
    document.getElementById("rollBtn").addEventListener("click", rollDice);
    document.getElementById("resetBtn").addEventListener("click", resetGame);

});

function startGame() {

    p1Wins = 0;
    p2Wins = 0;
    countedRounds = 0;
    tieBreaker = false;
    gameOver = false;
    gameStarted = true;

    const p1 = document.getElementById("p1").value || "Player 1";
    const p2 = document.getElementById("p2").value || "Player 2";

    document.getElementById("p1Name").textContent = p1;
    document.getElementById("p2Name").textContent = p2;

    document.getElementById("scores").textContent = "";
    document.getElementById("history").innerHTML = "";

    document.getElementById("status").textContent = "Game Started";

    document.getElementById("rollBtn").disabled = false;
}

function rollDice() {

    if (!gameStarted || gameOver) return;

    const p1 = document.getElementById("p1Name").textContent;
    const p2 = document.getElementById("p2Name").textContent;

    const p1IsViper = isViper(p1);
    const p2IsViper = isViper(p2);

    // 🎲 DEFAULT RANDOM DICE
    let a = rollDie();
    let b = rollDie();
    let c = rollDie();
    let d = rollDie();

    // 🐍 VIPER RULE (after 3 wins)
    if (p1IsViper && p1Wins >= 3) {
        c = 6;
        d = rollDie();
    }

    if (p2IsViper && p2Wins >= 3) {
        a = 6;
        b = rollDie();
    }

    const total1 = a + b;
    const total2 = c + d;

    // 🎲 UPDATE DICE IMAGES
    document.getElementById("p1d1").style.backgroundImage = `url('${a}.png')`;
    document.getElementById("p1d2").style.backgroundImage = `url('${b}.png')`;
    document.getElementById("p2d1").style.backgroundImage = `url('${c}.png')`;
    document.getElementById("p2d2").style.backgroundImage = `url('${d}.png')`;

    document.getElementById("p1Total").textContent = `Total: ${total1}`;
    document.getElementById("p2Total").textContent = `Total: ${total2}`;

    // 🤝 TIE
    if (total1 === total2) {
        document.getElementById("status").textContent =
            tieBreaker ? "🔥 TIEBREAKER - Roll Again" : "Tie - Roll Again";
        return;
    }

    const winner = total1 > total2 ? "p1" : "p2";

    const p1Name = document.getElementById("p1Name").textContent;
    const p2Name = document.getElementById("p2Name").textContent;

    // 🔥 TIEBREAKER MODE
    if (tieBreaker) {

        const finalWinner = winner === "p1" ? p1Name : p2Name;

        document.getElementById("status").textContent =
            `🏆 Winner: ${finalWinner}`;

        gameOver = true;
        document.getElementById("rollBtn").disabled = true;
        return;
    }

    countedRounds++;

    if (winner === "p1") p1Wins++;
    else p2Wins++;

    document.getElementById("scores").textContent =
        `${p1Name}: ${p1Wins} | ${p2Name}: ${p2Wins}`;

    document.getElementById("history").innerHTML =
        `Round ${countedRounds}: ${p1Name} ${total1} - ${total2} ${p2Name}<br>` +
        document.getElementById("history").innerHTML;

    // 🔥 TIEBREAKER TRIGGER
    if (p1Wins === 5 && p2Wins === 5) {
        tieBreaker = true;
        document.getElementById("status").textContent = "🔥 TIEBREAKER ROUND";
        return;
    }

    // END GAME
    if (countedRounds >= 10 || p1Wins >= 6 || p2Wins >= 6) {

        const finalWinner = p1Wins > p2Wins ? p1Name : p2Name;

        document.getElementById("status").textContent =
            `🏆 Winner: ${finalWinner}`;

        gameOver = true;
        document.getElementById("rollBtn").disabled = true;
    }
}

function resetGame() {

    p1Wins = 0;
    p2Wins = 0;
    countedRounds = 0;

    gameStarted = false;
    gameOver = false;
    tieBreaker = false;

    document.getElementById("p1Name").textContent = "Player 1";
    document.getElementById("p2Name").textContent = "Player 2";

    document.getElementById("scores").textContent = "";
    document.getElementById("history").innerHTML = "";

    document.getElementById("status").textContent =
        "Enter names and press Start Game";

    document.getElementById("rollBtn").disabled = true;

    document.getElementById("p1d1").style.backgroundImage = "";
    document.getElementById("p1d2").style.backgroundImage = "";
    document.getElementById("p2d1").style.backgroundImage = "";
    document.getElementById("p2d2").style.backgroundImage = "";
}
