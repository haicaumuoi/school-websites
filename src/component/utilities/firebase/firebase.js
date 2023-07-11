/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { login } from "../../../redux/slices/authSlice";

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
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

//GOOGLE SIGN IN
const googleProvider = new GoogleAuthProvider();


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

