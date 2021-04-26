import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyC5-QtwoNYUrXdU72n-ixtz-HAd_MyJggM",
  authDomain: "instagram-clone-react-website.firebaseapp.com",
  projectId: "instagram-clone-react-website",
  storageBucket: "instagram-clone-react-website.appspot.com",
  messagingSenderId: "845178954794",
  appId: "1:845178954794:web:d858d81d568b02018a4f53",
  measurementId: "G-E3PH5SNKC9",
});

const db = firebaseConfig.firestore();

const auth = firebaseConfig.auth();

const fbProvider = new firebase.auth.FacebookAuthProvider();

const storage = firebaseConfig.storage();

export { db, auth, fbProvider, storage };
