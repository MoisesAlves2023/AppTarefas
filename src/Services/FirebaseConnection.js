import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC-OUdU5Dpyq8KIuatRtNdbZ77eSGxFRts",
    authDomain: "meuapp-89b52.firebaseapp.com",
    databaseURL: "https://meuapp-89b52-default-rtdb.firebaseio.com",
    projectId: "meuapp-89b52",
    storageBucket: "meuapp-89b52.appspot.com",
    messagingSenderId: "203653037557",
    appId: "1:203653037557:web:77d1c0f9b7b0a6331c34bc",
    measurementId: "G-XH5N5GG4QF"
  };
  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;