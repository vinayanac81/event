// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD4SWbDqc6OjBw1UDTYJw_Bxe69BD57Zfk",
//   authDomain: "event-87881.firebaseapp.com",
//   projectId: "event-87881",
//   storageBucket: "event-87881.appspot.com",
//   messagingSenderId: "302395961936",
//   appId: "1:302395961936:web:4e6c385e8d7e3aa8b6d755",
//   measurementId: "G-JCCMK2D170"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCDUP0aTs4yUFe6hZzj_dkt2ahOevMcFt4",
  authDomain: "event-17f56.firebaseapp.com",
  projectId: "event-17f56",
  storageBucket: "event-17f56.appspot.com",
  messagingSenderId: "982516173054",
  appId: "1:982516173054:web:d4b27571ba4d144a86fdaf",
  measurementId: "G-RQMPD6JP38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


export {app,auth}

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCDUP0aTs4yUFe6hZzj_dkt2ahOevMcFt4",
//   authDomain: "event-17f56.firebaseapp.com",
//   projectId: "event-17f56",
//   storageBucket: "event-17f56.appspot.com",
//   messagingSenderId: "982516173054",
//   appId: "1:982516173054:web:d4b27571ba4d144a86fdaf",
//   measurementId: "G-RQMPD6JP38"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();


// export {app,auth}