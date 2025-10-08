// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

//console.log(firebase.auth) // Undefined
//console.log(firebase.default.auth) // Function
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log("in firebase js")
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg8jWT72B8kUi1OsBzMZXgAH8wccJQ-NE",
  authDomain: "jshs-dd408.firebaseapp.com",
  databaseURL: "https://jshs-dd408-default-rtdb.firebaseio.com", 
  projectId: "jshs-dd408",
  storageBucket: "jshs-dd408.appspot.com",
  messagingSenderId: "93246688832",
  appId: "1:93246688832:web:169760e9d7088bb43319a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
console.log("db is ready!!" + database)
//export const myFirebaseApp = initializeApp(firebaseConfig);
//const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
//export const auth = firebase.auth();
//export const db = firebase.firestore();




