importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js')

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_uIc_PAkxFNUzoVWig7Ta3kKg66BgGL8",
  authDomain: "pwa-notes-app-26ed3.firebaseapp.com",
  projectId: "pwa-notes-app-26ed3",
  storageBucket: "pwa-notes-app-26ed3.appspot.com",
  messagingSenderId: "691290756172",
  appId: "1:691290756172:web:921926dcacf2afea3850e9",
  measurementId: "G-XLRHBB3N0B"
};

const messaging = firebase.messaging()
