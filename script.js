const startBtn = document.getElementById("startBtn");
const balance = document.getElementById("balance");

let mining = false;
let btc = 0.01258634;

startBtn.addEventListener("click", () => {

    mining = !mining;

    if (mining) {
        startBtn.innerHTML = "⛏ Mining...";
    } else {
        startBtn.innerHTML = "⚡ Start Mining";
    }

});

setInterval(() => {

    if (mining) {

        btc += 0.00000010;

        balance.innerHTML = btc.toFixed(8) + " BTC";

    }

}, 1000);
function buyPlan(plan) {
    alert("You selected: " + plan);

    window.location.href = "https://t.me/HashRoom_Bot";
}
