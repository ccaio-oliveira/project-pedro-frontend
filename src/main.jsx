import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx';
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.post['Allow-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
