// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCWmAHOFDEBFJmXayGmjmq_1pS2LQMOIyQ",
    authDomain: "wolverine-app.firebaseapp.com",
    projectId: "wolverine-app",
    storageBucket: "wolverine-app.appspot.com",
    messagingSenderId: "47672249220",
    appId: "1:47672249220:web:ab8965c79357ece3ffebd1",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return app;
};

export default getFirebaseApp;
