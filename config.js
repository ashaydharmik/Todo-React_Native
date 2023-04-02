import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDZoGRRLKrJlT0jRnPjMzsx1rlRD6skMr0",
    authDomain: "todo-2af52.firebaseapp.com",
    projectId: "todo-2af52",
    storageBucket: "todo-2af52.appspot.com",
    messagingSenderId: "116513528608",
    appId: "1:116513528608:web:b9ca67d2347e74b543d545",
    measurementId: "G-DPS1SNQ5QD"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };