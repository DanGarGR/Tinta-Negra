import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCLlLytKDFF5I1BUugmJM4gC3LTh-9RFl8",
  authDomain: "tinta--web.firebaseapp.com",
  projectId: "tinta--web",
  storageBucket: "tinta--web.firebasestorage.app",
  messagingSenderId: "1062418690137",
  appId: "1:1062418690137:web:d63c596f1aa9c6180e0148"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* ---------- ENVIAR MENSAJE ---------- */

const form = document.getElementById("communityForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nombre = document.getElementById("userName").value;
  const mensaje = document.getElementById("userMessage").value;

  await addDoc(collection(db, "mensajes"), {
  nombre: nombre,
  mensaje: mensaje,
  fecha: new Date(),
  aprobado: false
});

  form.reset();

  cargarMensajes();
});


/* ---------- MOSTRAR MENSAJES ---------- */

async function cargarMensajes() {

  const container = document.getElementById("messages");

  container.innerHTML = "";

  import { where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const q = query(
  collection(db, "mensajes"),
  where("aprobado", "==", true),
  orderBy("fecha", "desc")
);

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <h3>${data.nombre}</h3>
      <p>${data.mensaje}</p>
    `;

    container.appendChild(card);

  });

}


cargarMensajes();
