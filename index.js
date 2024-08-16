// Import the Firebase configuration and functions
import { auth } from "./firebase.mjs";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Show sign-up form
document.getElementById("show").addEventListener("click", () => {
    document.querySelector("#signup").classList.add("show");
    document.querySelector(".layer").style.display = "block";
});

// Hide sign-up form
document.getElementById("hide").addEventListener("click", () => {
    document.querySelector("#signup").classList.remove("show");
    document.querySelector(".layer").style.display = "none";
});

// Sign In Function
document.getElementById("logIn").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email1").value;
    const password = document.getElementById("pass1").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Sign in successful!");
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert("Error signing in: " + error.message);
    }
});

// Sign Up Function
document.getElementById("signUp").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign up successful!");
    } catch (error) {
        alert("Error signing up: " + error.message);
    }
});


