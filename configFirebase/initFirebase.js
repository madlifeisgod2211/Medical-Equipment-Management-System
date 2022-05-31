// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

// const config = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
//   databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
//   projectID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// };

// function initFirebase() {
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//   }
// }

// initFirebase();
// export { firebase };

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyAIMgJ9z1y4h8SXE3GgfnoThHdI65aFr7g',
//   authDomain: 'test-smartbag-app.firebaseapp.com',
//   projectId: 'test-smartbag-app',
//   storageBucket: 'test-smartbag-app.appspot.com',
//   messagingSenderId: '238399120434',
//   appId: '1:238399120434:web:15a3a8e2e6818404bb082b',
//   measurementId: 'G-ZL22ZRGV11',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';

const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyAIMgJ9z1y4h8SXE3GgfnoThHdI65aFr7g',
//   authDomain: 'test-smartbag-app.firebaseapp.com',
//   databaseURL:
//     'https://test-smartbag-app-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'test-smartbag-app',
//   storageBucket: 'test-smartbag-app.appspot.com',
//   messagingSenderId: '238399120434',
//   appId: '1:238399120434:web:15a3a8e2e6818404bb082b',
//   measurementId: 'G-ZL22ZRGV11',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyDIVZpkltz4SqMdDjIsz1rQfglvwEklgDo',
  authDomain: 'smart-bag-f74be.firebaseapp.com',
  databaseURL: 'https://smart-bag-f74be-default-rtdb.firebaseio.com',
  projectId: 'smart-bag-f74be',
  storageBucket: 'smart-bag-f74be.appspot.com',
  messagingSenderId: '669735670893',
  appId: '1:669735670893:web:b04df1b54ea830ee845b64',
  measurementId: 'G-XDJDVFL44F',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db };
