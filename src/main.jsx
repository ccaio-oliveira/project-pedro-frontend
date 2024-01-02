import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import axios from 'axios';
import RouteElement from './routes/Routes.jsx';

axios.defaults.baseURL = 'http://localhost:8000/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouteElement />
  </React.StrictMode>,
)
