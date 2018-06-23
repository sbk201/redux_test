import React from "react";
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseui from 'firebaseui'
const config = {
    apiKey: "AIzaSyDfyjrFzDcgKr2ObU_q--O0eNy-vt-6b9s",
    authDomain: "cloud-ab742.firebaseapp.com",
    databaseURL: "https://cloud-ab742.firebaseio.com",
    projectId: "cloud-ab742",
    storageBucket: "cloud-ab742.appspot.com",
    messagingSenderId: "724326141542"
};
firebase.initializeApp(config);
const db=firebase.firestore();
db.settings({timestampsInSnapshots: true});
// db.collection("messages")
    // .onSnapshot(data=>console.log(data))
export const coll=name=>db.collection(name);

const uiConfig = {
  signInFlow: 'popup',
  credentialHelper:firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: { signInSuccessWithAuthResult :()=>false}
};
export const signOut=(checkUser)=> firebase.auth().signOut().then(checkUser());
export const FirebaseUI=()=> <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>;

export default firebase