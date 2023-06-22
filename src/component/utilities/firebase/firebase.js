/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACN477BR1rv8xcv-dNRCPKC3_LlafjnFg",
  authDomain: "school-alumni-swd.firebaseapp.com",
  projectId: "school-alumni-swd",
  storageBucket: "school-alumni-swd.appspot.com",
  messagingSenderId: "965481444328",
  appId: "1:965481444328:web:eec99358e7b11e5731aa5d",
  measurementId: "G-0TB3LF3F3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//GOOGLE SIGN IN
const googleProvider = new GoogleAuthProvider();

const auth = getAuth();
const googleSignIn = (dispatch) => { signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.idToken;

   dispatch(login({token}));

  }).catch((error) => {
    return null;
  })};

  export { googleSignIn };

