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

    const a = rollDie();
    const b = rollDie();
    const c = rollDie();
    const d = rollDie();

    const total1 = a + b;
    const total2 = c + d;

    // 🎲 DICE IMAGES
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

    const p1 = document.getElementById("p1Name").textContent;
    const p2 = document.getElementById("p2Name").textContent;

    const p1IsViper = isViper(p1);
    const p2IsViper = isViper(p2);

    // 🐍 VIPER BOOST RULE
    let adjusted1 = total1;
    let adjusted2 = total2;

    if (p1IsViper && p1Wins >= 4) {
        adjusted2 += 3;
    }

    if (p2IsViper && p2Wins >= 4) {
        adjusted1 += 3;
    }

    adjusted1 = Math.min(adjusted1, 12);
    adjusted2 = Math.min(adjusted2, 12);

    let winner;

    if (adjusted1 > adjusted2) winner = "p1";
    else winner = "p2";

    // 🔥 TIEBREAKER MODE
    if (tieBreaker) {

        const finalWinner = winner === "p1" ? p1 : p2;

        document.getElementById("status").textContent =
            `🏆 Winner: ${finalWinner}`;

        gameOver = true;
        document.getElementById("rollBtn").disabled = true;
        return;
    }

    countedRounds++;

    if (winner === "p1") p1Wins++;
    else p2Wins++;

    document.getElementById("history").innerHTML =
        `Round ${countedRounds}: ${p1} ${adjusted1} - ${adjusted2} ${p2}<br>` +
        document.getElementById("history").innerHTML;

    document.getElementById("scores").textContent =
        `${p1}: ${p1Wins} | ${p2}: ${p2Wins}`;

    // 🔥 TIEBREAKER TRIGGER
    if (p1Wins === 5 && p2Wins === 5) {
        tieBreaker = true;
        document.getElementById("status").textContent = "🔥 TIEBREAKER ROUND";
        return;
    }

    // END GAME CONDITIONS
    if (countedRounds >= 10 || p1Wins >= 6 || p2Wins >= 6) {

        const finalWinner = p1Wins > p2Wins ? p1 : p2;

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
