import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTnqzaCXcr5jU8AugYk8zNghW-BWNCodU",
  authDomain: "dingoprototype-e13f6.firebaseapp.com",
  databaseURL: "https://dingoprototype-e13f6.firebaseio.com",
  projectId: "dingoprototype-e13f6",
  storageBucket: "dingoprototype-e13f6.appspot.com",
  messagingSenderId: "639599143481",
  appId: "1:639599143481:web:4b491efcbdf73c7e91bbe8",
  measurementId: "G-VLG4QSG5K0",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const firebaseStorage = firebase.storage();

export { firestore, firebaseStorage };
