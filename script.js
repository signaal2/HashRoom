let mining = false;
let balance = 0;

const btn = document.getElementById("startBtn");
const status = document.getElementById("status");
const balanceText = document.getElementById("balance");

btn.onclick = function () {

  if (!mining) {

    mining = true;
    status.innerHTML = "Mining...";
    btn.innerHTML = "Stop Mining";

    window.miningInterval = setInterval(() => {

      balance += 0.00000012;

      balanceText.innerHTML =
        balance.toFixed(8) + " BTC";

    }, 1000);

  } else {

    mining = false;
    status.innerHTML = "Stopped";
    btn.innerHTML = "Start Mining";

    clearInterval(window.miningInterval);

  }

};
