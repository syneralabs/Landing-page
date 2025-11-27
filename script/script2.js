import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // <--- resolve o CORS
app.use(express.json());

let btnSignin = document.querySelector("#signin");
let btnSignup = document.querySelector("#signup");

let body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});