import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBy4oY7gGoHytl6MIyFEdlFKMhm4a9R310',
  authDomain: 'crwn-clothing-d1279.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-d1279.firebaseio.com',
  projectId: 'crwn-clothing-d1279',
  storageBucket: 'crwn-clothing-d1279.appspot.com',
  messagingSenderId: '288430972169',
  appId: '1:288430972169:web:2c219be7e2863e5a5b07d8',
  measurementId: 'G-G6X4MX5HYJ'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
