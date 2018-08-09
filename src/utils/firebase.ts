require('dotenv').config()
const firebase = require('firebase/app');
require('firebase/storage');
require('firebase/firestore');

const config = {
  apiKey:  process.env.ap,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
}

firebase.initializeApp(config);

export const storage = firebase.storage();
export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true};
firestore.settings(settings);
