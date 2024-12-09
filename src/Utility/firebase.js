import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf59H2i7x3AVWGyWCQbJlYTkR_cOJpUYU",
  authDomain: "clone-f872e.firebaseapp.com",
  projectId: "clone-f872e",
  storageBucket: "clone-f872e.firebasestorage.app",
  messagingSenderId: "769273121866",
  appId: "1:769273121866:web:1c3775acf32f397ac7aab3",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();


// // Initialize Firestore example
// const db = firebase.firestore();

// // Add a new document
// db.collection('products').add({
//   name: 'Awesome Product',
//   price: 19.99,
//   description: 'This is a great product!'
// })
// .then(docRef => {
//   console.log('Document written with ID: ', docRef.id);
// })
// .catch(error => {
//   console.error('Error adding document: ', error);
// });

// // Read data
// db.collection('products').get()
// .then(snapshot => {
//   snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());
//   });
// })
// .catch(error => {
//   console.error('Error getting documents: ', error);
// });
