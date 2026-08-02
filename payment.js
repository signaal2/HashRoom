const params = new URLSearchParams(window.location.search);
const plan = params.get("plan");

const data = {
  basic: { name: "Basic", price: "130 USDT" },
  starter: { name: "Starter", price: "320 USDT" },
  pro: { name: "Pro", price: "590 USDT" },
  advanced: { name: "Advanced", price: "540 USDT" },
  premium: { name: "Premium", price: "860 USDT" },
  elite: { name: "Elite", price: "860 USDT" },
  vip: { name: "VIP", price: "1040 USDT" }
};

if (data[plan]) {
  document.getElementById("planName").textContent = data[plan].name;
  document.getElementById("planPrice").textContent = data[plan].price;
}

document.getElementById("copyBtn").onclick = () => {
  const wallet = document.getElementById("walletAddress").value;
  navigator.clipboard.writeText(wallet);
  alert("Wallet copied successfully");
};

document.getElementById("paidBtn").onclick = () => {
  alert("Payment request submitted.\nYour account will be activated after confirmation.");
};
