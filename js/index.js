import { lgn } from "./firebase.js";

const formLgn = document.querySelector("#login");
// const formRegister = document.querySelector("#register");

//INCIAR SESION CON EMAIL Y PASSWORD

formLgn.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("enviado");

  const email = formLgn["email-lgn"].value;
  const password = formLgn["password-lgn"].value;
  // console.log(email,password);
  if (!email) {
    alert("EMAIL OBLIGATORIO");
  }
  if (!password) {
    alert("pas OBLIGATORIO");
  }
  if (email != "" && password != "") {
    lgn(email, password);
  }
});

//REGISTRASE CON EMAIL Y PASSWORD
// formRegister.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("enviado");

//   const email = formRegister["email"].value;
//   const password = formRegister["password"].value;
//   // console.log(email,password);

//   if (!email) {
//     alert("EMAIL OBLIGATORIO");
//   }
//   if (!password) {
//     alert("pass OBLIGATORIO");
//   }
//   if (email != "" && password != "") {
//     crear(email, password);
//   }
// });

const lgoutbtn = document.querySelector(".lgout");

lgoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  logoutF();
});

// stateAuth();

// ss();
