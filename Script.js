let balance = 0;
let speed = 0.00000231;
let mining = false;

const balanceEl = document.getElementById("balance");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

function updateBalance() {
  balanceEl.innerText = balance.toFixed(8) + " BTC";
}

setInterval(() => {
  if (mining) {
    balance += speed;
    updateBalance();
  }
}, 1000);

startBtn.addEventListener("click", () => {
  mining = !mining;

  if (mining) {
    statusEl.innerText = "Mining...";
    startBtn.innerText = "Stop Mining";
  } else {
    statusEl.innerText = "Stopped";
    startBtn.innerText = "Start Mining";
  }
});

updateBalance();
