import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <h1 className="text-center">Django React App</h1>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
