import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  getDoc
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

const paymentsDiv = document.getElementById("payments");

const q = query(
collection(db, "payments"),
orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {

paymentsDiv.innerHTML = "";

snapshot.forEach((docSnap) => {

const data = docSnap.data();

paymentsDiv.innerHTML += `
<div class="card">

<h3>${data.plan}</h3>

<p>Price: ${data.price}</p>

<p>Status: <b>${data.status}</b></p>

<button onclick="approve('${docSnap.id}')">
Approve
</button>

<button onclick="rejectPay('${docSnap.id}')">
Reject
</button>

</div>
`;

});

});

window.approve = async (id) => {
  try {
    const paymentRef = doc(db, "payments", id);
    const paymentSnap = await getDoc(paymentRef);

    if (!paymentSnap.exists()) {
      alert("Payment not found");
      return;
    }

    const payment = paymentSnap.data();

    // تایید پرداخت
    await updateDoc(paymentRef, {
      status: "approved"
    });

    // فعال کردن کاربر
    const userRef = doc(db, "users", "test");

    await updateDoc(userRef, {
      status: "active",
      mining: true,
      plan: payment.plan,
      activatedAt: new Date()
    });

    alert("Plan Activated Successfully ✅");

    location.reload();

  } catch (e) {
    console.error(e);
    alert("Approve Error:\n" + e.message);
  }
};

    const payment = paymentSnap.data();

    // فعال کردن پرداخت
    await updateDoc(paymentRef, {
      status: "approved"
    });

    // بروزرسانی کاربر
    await updateDoc(doc(db, "users", payment.uid), {
      status: "active",
      mining: true,
      plan: payment.plan
    });

    alert("User approved successfully");
    

  } catch (e) {
    alert(e.message);
    console.log(e);
  }
};

window.rejectPay = async (id) => {
  await updateDoc(doc(db, "payments", id), {
    status: "rejected"
  });
};

console.log("ADMIN FINAL VERSION");
alert
