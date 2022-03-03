import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDKA2PsJzjopDy4tkOswNriTCNQLmM08q0",
    authDomain: "iterate-cc3e3.firebaseapp.com",
    projectId: "iterate-cc3e3",
    storageBucket: "iterate-cc3e3.appspot.com",
    messagingSenderId: "181359934021",
    appId: "1:181359934021:web:594ee961377120b458c12c",
    measurementId: "G-LNVQQEP81J"
  };

//initialize firebase
firebase.initializeApp(firebaseConfig);
  
// initialize services
const myFirestore = firebase.firestore();
const myFirebaseAuth = firebase.auth();
const myFirebaseStorage = firebase.storage();
//timestamp
const timestamp = firebase.firestore.Timestamp();

export { myFirestore, myFirebaseAuth, timestamp, myFirebaseStorage }
