import * as firebase from 'firebase'
console.log('firebase init');
let database;
let config = {
apiKey: "AIzaSyB-ThB2xa6uP9OYvrD1JGQp7_7A7_eBmhs",
authDomain: "something-4aa24.firebaseapp.com",
databaseURL: "https://something-4aa24.firebaseio.com",
projectId: "something-4aa24",
storageBucket: "something-4aa24.appspot.com",
messagingSenderId: "591089591007"
}
firebase.initializeApp(config);
database =''
const dbRef=firebase.database().ref().child('text');
console.log('dbRef');
dbRef.on('value',snap=>console.log('on snap',snap.val()));
// dbRef.on('vvvaaa',snap=>console.log('on vvvaaa',snap.val()));