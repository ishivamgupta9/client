import React from 'react';
import App from './UserForm/UserForm';
import reportWebVitals from './reportWebVitals';
import MainForm from './Home/MainForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Router>
    <Routes>
      <Route exact path='/' element={<App />}></Route>
      <Route exact path='/mainForms' element={<MainForm />}></Route>
    </Routes>
  </Router>
);

reportWebVitals();
