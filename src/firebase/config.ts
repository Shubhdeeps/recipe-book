import firebase from "firebase/app";
import 'firebase/firestore'

interface config {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
}

const firebaseConfig: config = {
 
};


// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore: firebase.firestore.Firestore = firebase.firestore();

export { projectFirestore }