// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
  authDomain: "react-http-9e817.firebaseapp.com",
  databaseURL: "https://react-http-9e817-default-rtdb.firebaseio.com",
  projectId: "react-http-9e817",
  storageBucket: "react-http-9e817.appspot.com",
  messagingSenderId: "774026933621",
  appId: "1:774026933621:web:65b7f567228d7af7c4cf3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore();