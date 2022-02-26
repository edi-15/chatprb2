import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNphzs9yoGxfVgIa2B7rDfODCMZs4mbp0",
  authDomain: "prueba1-2e83f.firebaseapp.com",
  projectId: "prueba1-2e83f",
  storageBucket: "prueba1-2e83f.appspot.com",
  messagingSenderId: "940826450653",
  appId: "1:940826450653:web:a1a74f1d533f9ac9bf1934",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export const lgn = (email, password) => {
  console.log(email, password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.querySelector(
        "#sucsFls-lgn"
      ).innerHTML = `LOGUEADO EXITOSAMENTE`;
      window.location = "/p/ff.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.querySelector("#sucsFls-lgn").innerText = `${errorMessage}`;
    });
};

export const stateAuth = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const emailNuevo = user.email;
    document.querySelector(".userName").innerHTML = `${emailNuevo}`;
    const tlss = document.querySelector(".tools");
    const cntlgtdv = document.querySelector(".logoutButtonContent");
    cntlgtdv.innerHTML = `<a href="#" class="lgout">Cerrar sesión</a>`;
    tlss.innerHTML = `
    <form id="formChat">
    <span class="tool-emoji">&#128512;</span>
      <input class="messaje" type="text" id="msjInput" placeholder="Escribe un mensaje">
      <!--<textarea name="" id="msjInput" class="messaje" placeholder="Escribe un mensaje"></textarea>-->
      <input type="submit" value="Enviar">
      </form>
      <!--<img class="sendMessaje" src="https://cdn.icon-icons.com/icons2/1875/PNG/512/send_120237.png" alt="">-->
      `;

    const q = query(collection(db, "chat"), orderBy("ordFchour"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      document.querySelector(".mios").innerHTML = "";
      document.querySelector(".el").innerHTML = "";
      const chat = [];
      querySnapshot.forEach((doc) => {
        chat.push(doc.data().texto);

        const uidGet = doc.data().texto;
        const fechaGet = doc.data().fecha;
        const emailGet = doc.data().email;
        const horaGet = doc.data().hora;
        const gg = chat.join();
        if (doc.data().uid === user.uid && doc.data().email === emailNuevo) {
          document.querySelector(".mios").innerHTML += `
          <div class="fhml">
          <span class="emailMensaje">${emailGet}</span>
          <span class="fecha">${fechaGet}</span>
          </div>
          <div class="mensajeMio"><span class="mensajeP">${uidGet}</span><span class="hora"> ${horaGet}</span></div>
            `;
        } else if (doc.data().uid != user.uid) {
          document.querySelector(".el").innerHTML += `
                    <div class="fhml">
                    <span class="fecha">${fechaGet}</span>
                    <span class="emailMensaje">${emailGet}</span>
                    </div>
                    <div class="mensajeEl"> <span class="hora">${horaGet}</span><span class="mensajeP">${uidGet}</span></div>
            `;
        }
        document.querySelector(".mensajes").scrollTop =
          document.querySelector(".mensajes").scrollHeight;
      });
    });

    const formMensaje = document.querySelector("#formChat");

    formMensaje.addEventListener("submit", (e) => {
      e.preventDefault();
      var mensajeInput = formMensaje["msjInput"].value;
      console.log("MENSAJE ENVIADO" + mensajeInput);

      if (mensajeInput && mensajeInput != "") {
        const date = new Date();
        const output =
          String(date.getDate()).padStart(2, "0") +
          "/" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "/" +
          date.getFullYear();
        var d = new Date();
        var hora = d.getHours();
        var minutos = d.getMinutes();
        var segundos = d.getSeconds();
        var milisegundos = d.getMilliseconds();
        var horaAll = `${hora}:${minutos}:${segundos}:${milisegundos}`;
        const querySnapshot = async () => await getDocs(collection(db, "chat"));
        querySnapshot();
        const wrtmsnsf = async () => {
          await addDoc(collection(db, "chat"), {
            uid: `${user.uid}`,
            texto: `${mensajeInput}`,
            fecha: `${output}`,
            ordFchour: `${output} ${horaAll}`,
            hora: `${horaAll}`,
            email: `${emailNuevo}`,
          });
        };
        wrtmsnsf();
      }
    });

    const lgoutbtn = document.querySelector(".lgout");
    lgoutbtn.classList.toggle("clslgn");
    lgoutbtn.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth)
        .then(() => {
          console.log("SESION CERRADA");
          window.location = "/";
        })
        .catch((error) => {
          console.log("ERROR");
        });
    });
  } else {
    const cntlgtdv = document.querySelector(".logoutButtonContent");
    cntlgtdv.innerHTML = `<span>No se ha iniciado sesión</span>`;
    document.querySelector(
      "#sucsFls-lgn-cp"
    ).innerHTML = `NO SE HA INICIADO SESIÓN <a href="../index.html">Iniciar sesión</a>`;
  }
});
