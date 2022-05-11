import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Classroom from './components/Classroom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='classroom' element={<Classroom />} />
    </Routes>

</BrowserRouter>
);
