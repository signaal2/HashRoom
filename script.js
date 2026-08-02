console.log("HashRoom Loaded");

const tg = window.Telegram.WebApp;
tg.expand();

const startBtn = document.getElementById("startBtn");
const balance = document.getElementById("balance");
const walletBtn = document.getElementById("walletBtn");
const referralBtn = document.getElementById("referralBtn");
const mainBtn = document.getElementById("mainBtn");

let mining = false;
let miningInterval = null;
let btc = 0;
let currentUser = null;

const {
    initializeApp
} = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");

const {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc
} = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initUser() {

    currentUser = tg.initDataUnsafe.user;

    if (!currentUser) return;

    const ref = doc(db, "users", String(currentUser.id));

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        await setDoc(ref, {

            id: currentUser.id,

            username: currentUser.username || "",

            balance: 0,

            mining: false,

            updated: Date.now()

        });

        btc = 0;

    } else {

        btc = snap.data().balance || 0;

        mining = snap.data().mining || false;

    }

    balance.innerHTML = btc.toFixed(8) + " BTC";

}async function saveBalance() {

    if (!currentUser) return;

    const ref = doc(db, "users", String(currentUser.id));

    await updateDoc(ref, {

        balance: btc,

        mining: mining,

        updated: Date.now()

    });

}

async function startMining() {

    if (mining) return;

    mining = true;

    startBtn.innerText = "Mining...";

    await saveBalance();

    miningInterval = setInterval(async () => {

        btc += 0.00000001;

        balance.innerHTML = btc.toFixed(8) + " BTC";

        await saveBalance();

    }, 1000);

}

async function stopMining() {

    mining = false;

    clearInterval(miningInterval);

    miningInterval = null;

    startBtn.innerText = "Start Mining";

    await saveBalance();

}

startBtn.addEventListener("click", async () => {

    if (!mining) {

        await startMining();

    } else {

        await stopMining();

    }async function resumeMining() {

    if (!currentUser) return;

    const ref = doc(db, "users", String(currentUser.id));

    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    btc = data.balance || 0;

    mining = data.mining || false;

    balance.innerHTML = btc.toFixed(8) + " BTC";

    if (mining) {

        startBtn.innerText = "Mining...";

        miningInterval = setInterval(async () => {

            btc += 0.00000001;

            balance.innerHTML = btc.toFixed(8) + " BTC";

            await saveBalance();

        }, 1000);

    }

}

walletBtn.addEventListener("click", () => {

    tg.showAlert("Wallet Balance : " + btc.toFixed(8) + " BTC");

});

referralBtn.addEventListener("click", () => {

    const link = "https://t.me/" + tg.initDataUnsafe.user.username;

    tg.showPopup({

        title: "Referral",

        message: link

    });

});

mainBtn.addEventListener("click", () => {

    window.location.href = "index.html";

});document.addEventListener("DOMContentLoaded", async () => {

    await initUser();

    await resumeMining();

});

window.addEventListener("beforeunload", async () => {

    await saveBalance();

});

setInterval(async () => {

    if (currentUser) {

        await saveBalance();

    }

}, 10000);

console.log("HashRoom Ready");

});
// ======================
// START APP
// ======================

document.addEventListener("DOMContentLoaded", async () => {

    await initUser();

    await resumeMining();

});

// هر ۱۰ ثانیه ذخیره در Firebase
setInterval(async () => {

    if (currentUser) {

        await saveBalance();

    }

}, 10000);

// هنگام خروج از صفحه
window.addEventListener("beforeunload", async () => {

    await saveBalance();

});

console.log("HashRoom Ready");
