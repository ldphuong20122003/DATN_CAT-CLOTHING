import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig={
    apiKey: "AIzaSyC65JVMbRn_fcnOOUKmT7_shbVvLVp4Nu8",
    authDomain: "otpfirebase-3626a.firebaseapp.com",
    projectId: "otpfirebase-3626a",
    storageBucket: "otpfirebase-3626a.appspot.com",
    messagingSenderId: "721566213232",
    appId: "1:721566213232:web:3fd0ec195544ef477fc0b5",
    measurementId: "G-NENTF59CE9"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}