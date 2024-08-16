// Import the necessary Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-Firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXSJ3iTN8qTC5JFwZ2UWLqa_zdE9FpCag",
    authDomain: "blog-website-5853a.firebaseapp.com",
    projectId: "blog-website-5853a",
    storageBucket: "blog-website-5853a.appspot.com",
    messagingSenderId: "360412752729",
    appId: "1:360412752729:web:51e89c61872f28bc4cfa48",
    measurementId: "G-BLMPHBZYXW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth,db};
