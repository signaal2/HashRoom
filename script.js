console.log("Script Loaded");
console.log("Firebase DB:", window.db);
console.log("Telegram:", window.Telegram?.WebApp?.initDataUnsafe);
const startBtn = document.getElementById("startBtn");
const balance = document.getElementById("balance");

let mining = false;
let btc = 0;
async function loadBalance() {

    if (!window.db || !window.Telegram?.WebApp?.initDataUnsafe?.user)
        return;

    const user = Telegram.WebApp.initDataUnsafe.user;

    const { doc, getDoc } = await import(
        "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
    );

    const snap = await getDoc(doc(window.db, "users", String(user.id)));

    if (snap.exists()) {

        btc = snap.data().balance || 0;

        balance.innerHTML = btc.toFixed(8) + " BTC";

    }

}

loadBalance();
startBtn.addEventListener("click", () => {

    mining = !mining;

    if (mining) {
        startBtn.innerHTML = "⛏ Mining...";
    } else {
        startBtn.innerHTML = "⚡ Start Mining";
    }

});

setInterval(async () => {

    if (!mining) return;

    btc += 0.00000010;

    balance.innerHTML = btc.toFixed(8) + " BTC";

    if (window.db && window.Telegram?.WebApp?.initDataUnsafe?.user) {

        const user = Telegram.WebApp.initDataUnsafe.user;

        const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

        await setDoc(
            doc(window.db, "users", String(user.id)),
            {
                id: user.id,
                username: user.username || "",
                balance: btc,
                updated: Date.now()
            },
            { merge: true }
        );
    }

}, 1000);
function buyPlan(plan) {
    Telegram.WebApp.close();

    setTimeout(() => {
        location.href = "https://t.me/HashRoom_bot";
    }, 300);
}
