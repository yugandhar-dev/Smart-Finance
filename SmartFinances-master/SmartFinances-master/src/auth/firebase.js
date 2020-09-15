import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALS6RXuN2NtsGMboPi8nN5tikDyF5PLjA",
  authDomain: "smart-finance-f3bb2.firebaseapp.com",
  databaseURL: "https://smart-finance-f3bb2.firebaseio.com",
  projectId: "smart-finance-f3bb2",
  storageBucket: "smart-finance-f3bb2.appspot.com",
  messagingSenderId: "426858509639",
  appId: "1:426858509639:web:15f491081c8a128ce78862",
  measurementId: "G-2PKRMR8YXE",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
