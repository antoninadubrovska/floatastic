import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuppQRxLSNp7sa92pYWgkyWt8tAcpY8AM",
  authDomain: "floatastic-29b68.firebaseapp.com",
  projectId: "floatastic-29b68",
  storageBucket: "floatastic-29b68.firebasestorage.app",
  messagingSenderId: "102431986555",
  appId: "1:102431986555:web:c4daa83be03d3663f2a3de",
  measurementId: "G-VL4L72CKDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// const db = getFirestore(app);
const db = getFirestore(app);
const auth = getAuth(app);


// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2026, 6, 3);
//     }
//   }
// }

// npm install firebase@12.12.1 --save

export { db, auth };