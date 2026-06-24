let rollCount = 0;
let p1Wins = 0;
let p2Wins = 0;
let gameOver = false;
let viperPlan = [];
let viperIndex = 0;

function isViper(name){
return name.toLowerCase().includes("viper");
}

function startGame(){
const p1 = document.getElementById("p1").value || "Player 1";
const p2 = document.getElementById("p2").value || "Player 2";

document.getElementById("p1Name").innerText = p1;
document.getElementById("p2Name").innerText = p2;

document.getElementById("rollBtn").disabled = false;

rollCount = 0;
p1Wins = 0;
p2Wins = 0;
gameOver = false;

document.getElementById("history").innerHTML = "";
document.getElementById("resetBtn").classList.add("hidden");

if(isViper(p1) || isViper(p2)){
buildViperPlan(isViper(p1));
}
}

function buildViperPlan(p1IsViper){
// 10 rolls, viper loses 6 total
viperPlan = Array(10).fill(null);

let losses = 0;

// distribute losses late-heavy but not all early
for(let i=0;i<10;i++){
if(losses < 6){
if(i < 6){
viperPlan[i] = Math.random() < 0.5 ? "loss" : "win";
} else {
viperPlan[i] = "loss";
}
} else {
viperPlan[i] = "win";
}

```
if(viperPlan[i] === "loss") losses++;
```

}

viperIndex = 0;
}

function rollDice(){
if(gameOver) return;

document.getElementById("rolling").classList.remove("hidden");
document.getElementById("rollBtn").disabled = true;

setTimeout(() => {

```
let p1 = Math.floor(Math.random()*6)+1;
let p2 = Math.floor(Math.random()*6)+1;
let p3 = Math.floor(Math.random()*6)+1;
let p4 = Math.floor(Math.random()*6)+1;

let total1 = p1 + p2;
let total2 = p3 + p4;

// viper override
const p1Name = document.getElementById("p1Name").innerText;
const p2Name = document.getElementById("p2Name").innerText;

if(viperPlan.length){
  if(viperIndex < viperPlan.length){
    if(viperPlan[viperIndex] === "loss"){
      total1 = total2 + 1;
    } else {
      total1 = total2 + 1;
    }
  }
  viperIndex++;
}

// display dice
document.getElementById("p1d1").style.backgroundImage = `url(${p1}.png)`;
document.getElementById("p1d2").style.backgroundImage = `url(${p2}.png)`;
document.getElementById("p2d1").style.backgroundImage = `url(${p3}.png)`;
document.getElementById("p2d2").style.backgroundImage = `url(${p4}.png)`;

document.getElementById("p1total").innerText = "Total: " + total1;
document.getElementById("p2total").innerText = "Total: " + total2;

let result = "";

if(total1 === total2){
  result = "Tie - Roll Again";
} else {
  rollCount++;
  if(total1 > total2) p1Wins++;
  else p2Wins++;
}

document.getElementById("history").innerHTML =
  `#${rollCount} ${p1Name} ${total1} - ${p2Name} ${total2} ${result}<br>` +
  document.getElementById("history").innerHTML;

document.getElementById("scores").innerText =
  `${p1Name}: ${p1Wins} | ${p2Name}: ${p2Wins}`;

document.getElementById("rolling").classList.add("hidden");
document.getElementById("rollBtn").disabled = false;

checkWin(p1Name, p2Name);
```

}, 1200);
}

function checkWin(p1Name, p2Name){
if(rollCount >= 10){
endGame();
}

if(Math.abs(p1Wins - p2Wins) > (10 - rollCount)){
endGame();
}
}

function endGame(){
gameOver = true;
document.getElementById("rollBtn").disabled = true;
document.getElementById("resetBtn").classList.remove("hidden");

let winner =
p1Wins > p2Wins ? "Player 1 Wins!" :
p2Wins > p1Wins ? "Player 2 Wins!" :
"Tie Game";

document.getElementById("status").innerText = winner;
}

function reset(){
location.reload();
}
