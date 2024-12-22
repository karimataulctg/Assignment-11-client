// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7zj3vZrE-mxrsl_iNklZ7iCHAH4JvCfM",
  authDomain: "library-management-syste-fae30.firebaseapp.com",
  projectId: "library-management-syste-fae30",
  storageBucket: "library-management-syste-fae30.firebasestorage.app",
  messagingSenderId: "621360904029",
  appId: "1:621360904029:web:875fbd0271e6864ed11ab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;