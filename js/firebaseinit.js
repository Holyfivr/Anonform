  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAH6lbJ8TUvg5z_myW2B9RKZRjPBzCvMB4",
    authDomain: "anonymousform-8ef84.firebaseapp.com",
    databaseURL: "https://anonymousform-8ef84-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "anonymousform-8ef84",
    storageBucket: "anonymousform-8ef84.firebasestorage.app",
    messagingSenderId: "634272747343",
    appId: "1:634272747343:web:7d1ea67e215a8fd6c37f3a"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);