/* ================= FIREBASE IMPORTS ================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* ================= CONFIGURACIÓN FIREBASE ================= */

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tinta--web.firebaseapp.com",
  projectId: "tinta--web",
  storageBucket: "tinta--web.firebasestorage.app",
  messagingSenderId: "1062418690137",
  appId: "1:1062418690137:web:d63c596f1aa9c6180e0148"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


/* ================= PUBLICAR MENSAJES ================= */

const communityForm = document.getElementById("communityForm");

if (communityForm) {

communityForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nombre = document.getElementById("userName").value;
  const mensaje = document.getElementById("userMessage").value;

  await addDoc(collection(db, "mensajes"), {
    nombre: nombre,
    mensaje: mensaje,
    fecha: new Date(),
    aprobado: false
  });

  communityForm.reset();

  alert("Mensaje enviado. Esperando aprobación.");

});

}


/* ================= MOSTRAR MENSAJES APROBADOS ================= */

async function cargarMensajes() {

const container = document.getElementById("messages");

if(!container) return;

container.innerHTML = "";

const q = query(
  collection(db,"mensajes"),
  where("aprobado","==",true),
  orderBy("fecha","desc")
);

const snapshot = await getDocs(q);

snapshot.forEach((d)=>{

  const data = d.data();

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


/* ================= LOGIN ADMIN ================= */

document.addEventListener("DOMContentLoaded",()=>{

const loginBtn = document.getElementById("loginBtn");

if(!loginBtn) return;

loginBtn.addEventListener("click",async ()=>{

const email = document.getElementById("adminEmail").value;
const pass = document.getElementById("adminPass").value;

try{

await signInWithEmailAndPassword(auth,email,pass);

alert("Administrador conectado");

cargarMensajesAdmin();

}catch(error){

alert("Error: "+error.message);

}

});

});


/* ================= PANEL ADMIN ================= */

async function cargarMensajesAdmin(){

const container = document.getElementById("adminMessages");

if(!container) return;

container.innerHTML="";

const snapshot = await getDocs(collection(db,"mensajes"));

snapshot.forEach((d)=>{

const data = d.data();

const card = document.createElement("div");

card.classList.add("card");

card.innerHTML=`

<h3>${data.nombre}</h3>
<p>${data.mensaje}</p>

<button onclick="aprobar('${d.id}')">Aprobar</button>
<button onclick="eliminar('${d.id}')">Eliminar</button>

`;

container.appendChild(card);

});

}


/* ================= MODERAR MENSAJES ================= */

window.aprobar = async function(id){

const ref = doc(db,"mensajes",id);

await updateDoc(ref,{
  aprobado:true
});

cargarMensajesAdmin();
cargarMensajes();

}


window.eliminar = async function(id){

await deleteDoc(doc(db,"mensajes",id));

cargarMensajesAdmin();

}
