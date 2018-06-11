import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
const config = {
    apiKey: "AIzaSyDfyjrFzDcgKr2ObU_q--O0eNy-vt-6b9s",
    authDomain: "cloud-ab742.firebaseapp.com",
    databaseURL: "https://cloud-ab742.firebaseio.com",
    projectId: "cloud-ab742",
    storageBucket: "cloud-ab742.appspot.com",
    messagingSenderId: "724326141542"
};
firebase.initializeApp(config);

export default firebase