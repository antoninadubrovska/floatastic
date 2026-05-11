import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// storageBucket : You've correctly used floatastic-29b68.appspot.com as your storageBucket , which is the standard default for Firebase Storage. The commented-out .firebasestorage.app is also valid, but .appspot.com is commonly seen.


// firebaseConfig: Your configuration object contains all the required fields(apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) with values that align with your project details.The measurementId is also included, which is used for Google Analytics.

const firebaseConfig = {
  apiKey: "AIzaSyAuppQRxLSNp7sa92pYWgkyWt8tAcpY8AM",
  authDomain: "floatastic-29b68.firebaseapp.com",
  projectId: "floatastic-29b68",
	//storageBucket: "floatastic-29b68.firebasestorage.app",
	//storageBucket: "floatastic-29b68.appspot.com",
	storageBucket: "floatastic-29b68.firebasestorage.app",
  messagingSenderId: "102431986555",
  appId: "1:102431986555:web:c4daa83be03d3663f2a3de",
  measurementId: "G-VL4L72CKDP"
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional







// Initialize Firebase
// Initialization : You properly initialize Firebase with initializeApp(firebaseConfig) and then retrieve the specific services (Firestore, Authentication, Storage) using getFirestore(app) , getAuth(app) , and getStorage(app) .
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);


const storage = getStorage(app);

const auth = getAuth(app)

//uid admin
// YdvxQdGZ2oNSCeRnnCjkVbqDd5m2


export { db, auth, storage };