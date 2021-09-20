import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FirebaseContext} from './context/firebase';
import {firebase} from './library/firebase.prod';  
ReactDOM.render(
  
  <FirebaseContext.Provider value={{firebase}}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

