import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB2BrlPu1UJY4A880kF1Ri83q4MB17FSac",
    authDomain: "fake-yt-1.firebaseapp.com",
    projectId: "fake-yt-1",
    storageBucket: "fake-yt-1.appspot.com",
    messagingSenderId: "1069175142474",
    appId: "1:1069175142474:web:79ca36058592caa56cceb3"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase.auth()