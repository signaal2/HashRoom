alert("payment.js loaded");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
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

document.getElementById("paidBtn").onclick = async () => {
  const plan =
    document.getElementById("planName").innerText;
  const price =
    document.getElementById("planPrice").innerText;

  await addDoc(collection(db, "payments"), {
    plan,
    price,
    status: "pending",
    createdAt: serverTimestamp()
  });

  alert("Payment request sent successfully.");
};
