import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import axios from 'axios';
import Login from './components/Login/Login.jsx';

axios.defaults.baseURL = 'http://localhost:8000/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
