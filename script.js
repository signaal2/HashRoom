import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCb33maMPYDgLQLYV6puLxy9gwQ6OvcEzc",
  authDomain: "hashroom-f8eee.firebaseapp.com",
  projectId: "hashroom-f8eee",
  storageBucket: "hashroom-f8eee.firebasestorage.app",
  messagingSenderId: "693332836528",
  appId: "1:693332836528:web:b88877825fd09b1d7cbb75"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user;

if (!user) {
  alert("Telegram User Not Found");
  throw new Error("Telegram User Not Found");
}

document.getElementById("username").innerText = user.first_name;
document.getElementById("userid").innerText = user.id;

const uid = String(user.id);

const userRef = doc(db, "users", uid);

let userData = null;

async function initUser() {

  const snap = await getDoc(userRef);

  if (!snap.exists()) {

    await setDoc(userRef, {
      uid: uid,
      username: user.first_name,
      balance: 0,
      mining: false,
      status: "inactive",
      plan: "None",
      hashRate: 0,
      daily: 0,
      earned: 0
    });

    userData = {
      balance: 0,
      mining: false,
      status: "inactive",
      plan: "None",
      hashRate: 0,
      daily: 0,
      earned: 0
    };

  } else {

    userData = snap.data();

  }

  document.getElementById("balance").innerHTML =
    Number(userData.balance).toFixed(8) + " BTC";

  document.getElementById("plan").innerHTML =
    userData.plan;

}// ===========================
// MINING SYSTEM
// ===========================

const startBtn = document.getElementById("startBtn");
const mineStatus = document.getElementById("mineStatus");

let miningTimer = null;
let balance = Number(userData.balance || 0);

function updateBalance() {
  document.getElementById("balance").innerHTML =
    balance.toFixed(8) + " BTC";
}

async function saveMining() {

  await updateDoc(userRef, {

    balance: balance,

    earned: balance,

    mining: true

  });

}

function startMining() {

  if (userData.status === "active" && userData.mining === true) {
    startMining();
  }
  
  if (miningTimer) return;

  mineStatus.innerHTML = "🟢 Mining Active";

  startBtn.innerHTML = "Mining...";

  miningTimer = setInterval(async () => {

    balance += 0.00000001;

    updateBalance();

    await saveMining();

  }, 2000);

}

function stopMining() {

  clearInterval(miningTimer);

  miningTimer = null;

  mineStatus.innerHTML = "🔴 Mining Stopped";

  startBtn.innerHTML = "Start Mining";

}

startBtn.onclick = async () => {

  const snap = await getDoc(userRef);

  const data = snap.data();

  if (data.status !== "active") {

    alert("Buy a plan first");

    return;

  }

  if (data.mining === false) {

    alert("Admin has not approved your payment yet");

    return;

  }

  startMining();

};

// اگر ادمین قبلاً تایید کرده بود
if (userData.mining === true && userData.status === "active") {

  startMining();

}
// ===========================
// WALLET + REFERRAL
// ===========================

const walletBtn = document.querySelector(".withdraw");
const depositBtn = document.querySelector(".deposit");

walletBtn.onclick = async () => {

  const snap = await getDoc(userRef);

  const data = snap.data();

  alert(
    "Wallet\n\nBalance : " +
    Number(data.balance).toFixed(8) +
    " BTC"
  );

};

depositBtn.onclick = () => {

  window.location.href = "plans.html";

};

// ذخیره خودکار هر ۱۰ ثانیه
setInterval(async () => {

  if (miningTimer) {

    await updateDoc(userRef, {

      balance: balance,

      earned: balance,

      updated: Date.now()

    });

  }

}, 10000);

// هنگام خروج
window.addEventListener("beforeunload", async () => {

  if (miningTimer) {

    await updateDoc(userRef, {

      balance: balance,

      earned: balance

    });

  }

});

console.log("HashRoom Final Version Loaded");
