import firebase from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAY1MicUxs0B-2bF5J5afQ1K0W0-pFBw1M",
    authDomain: "video-chat-8bc94.firebaseapp.com",
    projectId: "video-chat-8bc94",
    storageBucket: "video-chat-8bc94.appspot.com",
    messagingSenderId: "634513514400",
    appId: "1:634513514400:web:c965b39b0f919cad3d4ec5"
  };

export default firebase.initializeApp(firebaseConfig)