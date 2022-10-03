// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, limit } from "firebase/firestore"
// import wordsData from "../5letterWords.json";

// import 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyXutj8-6uTnlzHhFztJPPf0-BXogTfdA",
  authDomain: "wordle-clone-next.firebaseapp.com",
  projectId: "wordle-clone-next",
  storageBucket: "wordle-clone-next.appspot.com",
  messagingSenderId: "571515402307",
  appId: "1:571515402307:web:04abca1f568e0e086d3cf6",
  measurementId: "G-R175YDRGKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore();

const wordsColRef = collection(db, "words");
const collectionSize = 8885;
// 8885 is total number of 5 letter words in this database

const getAllWords = () => getDocs(wordsColRef)
  .then((snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push(doc.data());
    })
    console.log(data);
  });


//one time funciton to upload all words data to firebase firestore
const uploadAllData = () => {
  const wordsData = {words: []}; //temp with empty array 

  console.log(wordsData.words);
  let index = 0;

  wordsData.words.forEach((word) => {
    addDoc(wordsColRef, 
      {word: word, index}
    );
    index += 1;
  })
}

const fetchRandomWord = async () => {
  const randomIndex =  Math.floor(Math.random()*collectionSize);
  const q = query(wordsColRef, where("index", "==", randomIndex), limit(1));
  const querySnapshot = await getDocs(q);

  let result;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    result = doc.data();
  });

  return result.word;
}

const isWordInDB = async (word) => {
  const q = query(wordsColRef, where("word", "==", word.toLowerCase()), limit(1));
  const querySnapshot = await getDocs(q);

  let result;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    result = doc.data();
  });
  
  return result !== undefined;
}

export { fetchRandomWord, isWordInDB };