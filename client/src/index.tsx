import { createContext } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const firebaseConfig = {
  apiKey: "AIzaSyDUmdM5tF9Ch9hb5DU56lG_iz-ZxxgUjLs",
  authDomain: "react-realtime-chat-19b8b.firebaseapp.com",
  projectId: "react-realtime-chat-19b8b",
  storageBucket: "react-realtime-chat-19b8b.appspot.com",
  messagingSenderId: "4959328397",
  appId: "1:4959328397:web:f9395048ccc42651bfaac4"
};

firebase.initializeApp(firebaseConfig);

root.render(
    <App />
)

reportWebVitals()
