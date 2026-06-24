let p1Wins = 0;
let p2Wins = 0;
let countedRounds = 0;

let gameStarted = false;
let gameOver = false;
let tieBreaker = false;

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
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

    document.getElementById("scores").textContent =
        `${p1}: 0 wins | ${p2}: 0 wins`;

    document.getElementById("history").innerHTML = "";

    document.getElementById("status").textContent =
        "Game Started";

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

    document.getElementById("p1d1").textContent = a;
    document.getElementById("p1d2").textContent = b;

    document.getElementById("p2d1").textContent = c;
    document.getElementById("p2d2").textContent = d;

    document.getElementById("p1Total").textContent =
        `Total: ${total1}`;

    document.getElementById("p2Total").textContent =
        `Total: ${total2}`;

    if (total1 === total2) {

        document.getElementById("status").textContent =
            tieBreaker ?
            "🔥 TIE BREAKER - Tie - Roll Again" :
            "Tie - Roll Again";

        return;
    }

    const p1 = document.getElementById("p1Name").textContent;
    const p2 = document.getElementById("p2Name").textContent;

    if (tieBreaker) {

        const winner = total1 > total2 ? p1 : p2;

        document.getElementById("status").textContent =
            `🏆 Winner: ${winner}`;

        gameOver = true;
        document.getElementById("rollBtn").disabled = true;
        return;
    }

    countedRounds++;

    if (total1 > total2) {
        p1Wins++;
    } else {
        p2Wins++;
    }

    document.getElementById("scores").textContent =
        `${p1}: ${p1Wins} wins | ${p2}: ${p2Wins} wins`;

    document.getElementById("history").innerHTML =
        `Round ${countedRounds}: ${p1} ${total1} - ${total2} ${p2}<br>` +
        document.getElementById("history").innerHTML;

    if (p1Wins === 5 && p2Wins === 5) {

        tieBreaker = true;

        document.getElementById("status").textContent =
            "🔥 TIE BREAKER ROUND";

        return;
    }

    if (countedRounds >= 10 || p1Wins >= 6 || p2Wins >= 6) {

        const winner = p1Wins > p2Wins ? p1 : p2;

        document.getElementById("status").textContent =
            `🏆 Winner: ${winner}`;

        gameOver = true;
        document.getElementById("rollBtn").disabled = true;
    }
}

function resetGame() {

    gameStarted = false;
    gameOver = false;
    tieBreaker = false;

    p1Wins = 0;
    p2Wins = 0;
    countedRounds = 0;

    document.getElementById("p1Name").textContent = "Player 1";
    document.getElementById("p2Name").textContent = "Player 2";

    document.getElementById("p1d1").textContent = "-";
    document.getElementById("p1d2").textContent = "-";

    document.getElementById("p2d1").textContent = "-";
    document.getElementById("p2d2").textContent = "-";

    document.getElementById("p1Total").textContent = "";
    document.getElementById("p2Total").textContent = "";

    document.getElementById("scores").textContent = "";
    document.getElementById("history").innerHTML = "";

    document.getElementById("status").textContent =
        "Enter names and press Start Game";

    document.getElementById("rollBtn").disabled = true;
}
