

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyABKVXjrjF5n0kIEU50tm8Spxit9zZkcos",
  authDomain: "chamadospmj.firebaseapp.com",
  databaseURL: "https://chamadospmj-default-rtdb.firebaseio.com",
  projectId: "chamadospmj",
  storageBucket: "chamadospmj.appspot.com",
  messagingSenderId: "503364785711",
  appId: "1:503364785711:web:302e0899d31f64013d58da",
  measurementId: "G-BDR8JDNBP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;