import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Fonts
import './fonts/LifeEF Regular.otf'
import './fonts/LifeEF Regular Italic.otf'
import './fonts/LifeEF Bold.otf'

try {

  
  ReactDOM.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  );
} catch(err) {
  console.error(err)
}
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
